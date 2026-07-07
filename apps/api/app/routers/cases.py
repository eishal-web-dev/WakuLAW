from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ai.analysis.contradictions import find_contradictions
from ai.timeline.extract import extract_events
from app.auth import get_current_user
from app.db import get_db
from app.models import Case, Chunk, Document, User
from app.schemas import (
    CaseCreate,
    CaseList,
    CaseOut,
    CaseUpdate,
    ContradictionsResponse,
    DocumentList,
    TimelineResponse,
)

router = APIRouter(prefix="/cases", tags=["cases"])

ALLOWED_STATUS = {"Active", "Review", "On Hold", "Closed"}
ALLOWED_PRIORITY = {"Low", "Medium", "High", "Critical"}


def _get_owned_case(db: Session, case_id: int, user: User) -> Case:
    case = db.get(Case, case_id)
    if case is None or case.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Case not found.")
    return case


def _case_out(db: Session, case: Case) -> dict:
    docs = db.scalar(select(func.count()).where(Document.case_id == case.id)) or 0
    return {
        "id": case.id,
        "case_number": case.case_number,
        "title": case.title,
        "case_type": case.case_type,
        "status": case.status,
        "priority": case.priority,
        "description": case.description,
        "deadline": case.deadline,
        "num_documents": docs,
        "created_at": case.created_at,
    }


def _validate(status: str | None, priority: str | None) -> None:
    if status is not None and status not in ALLOWED_STATUS:
        raise HTTPException(status_code=422, detail=f"status must be one of {sorted(ALLOWED_STATUS)}")
    if priority is not None and priority not in ALLOWED_PRIORITY:
        raise HTTPException(status_code=422, detail=f"priority must be one of {sorted(ALLOWED_PRIORITY)}")


@router.post("", response_model=CaseOut, status_code=201)
def create_case(request: CaseCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    _validate(request.status, request.priority)
    year = __import__("datetime").date.today().year
    count = db.scalar(select(func.count()).where(Case.owner_id == user.id)) or 0
    case = Case(
        owner_id=user.id,
        case_number=f"WL-{year}-{count + 1:03d}",
        title=request.title.strip(),
        case_type=request.case_type.strip(),
        status=request.status or "Active",
        priority=request.priority or "Medium",
        description=request.description or "",
        deadline=request.deadline,
    )
    db.add(case)
    db.commit()
    db.refresh(case)
    return _case_out(db, case)


@router.get("", response_model=CaseList)
def list_cases(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    cases = db.scalars(
        select(Case).where(Case.owner_id == user.id).order_by(Case.created_at.desc())
    ).all()
    return {"items": [_case_out(db, case) for case in cases], "total": len(cases)}


@router.get("/{case_id}", response_model=CaseOut)
def get_case(case_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return _case_out(db, _get_owned_case(db, case_id, user))


@router.patch("/{case_id}", response_model=CaseOut)
def update_case(
    case_id: int,
    request: CaseUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    case = _get_owned_case(db, case_id, user)
    _validate(request.status, request.priority)
    for field in ("title", "case_type", "status", "priority", "description", "deadline"):
        value = getattr(request, field)
        if value is not None:
            setattr(case, field, value)
    db.commit()
    db.refresh(case)
    return _case_out(db, case)


@router.delete("/{case_id}", status_code=204)
def delete_case(case_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    case = _get_owned_case(db, case_id, user)
    # detach documents rather than deleting them
    for document in db.scalars(select(Document).where(Document.case_id == case.id)):
        document.case_id = None
    db.delete(case)
    db.commit()


@router.get("/{case_id}/timeline", response_model=TimelineResponse)
def case_timeline(case_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    case = _get_owned_case(db, case_id, user)
    documents = db.scalars(select(Document).where(Document.case_id == case.id)).all()
    events = []
    for document in documents:
        for event in extract_events(document.text):
            events.append(
                {**event.__dict__, "document_id": document.id, "document_title": document.title}
            )
    events.sort(key=lambda event: event["date"])
    return {"events": events}


@router.post("/{case_id}/contradictions", response_model=ContradictionsResponse)
def case_contradictions(
    case_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    case = _get_owned_case(db, case_id, user)
    documents = db.scalars(select(Document).where(Document.case_id == case.id)).all()
    pairs = find_contradictions([(d.id, d.title, d.text) for d in documents])
    return {
        "pairs": pairs,
        "documents_analyzed": len(documents),
        "disclaimer": (
            "Automated contradiction detection is a prototype: it flags clearly "
            "conflicting statements and may miss subtle inconsistencies. Verify "
            "against the original documents."
        ),
    }


@router.get("/{case_id}/documents", response_model=DocumentList)
def case_documents(case_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    case = _get_owned_case(db, case_id, user)
    documents = db.scalars(
        select(Document).where(Document.case_id == case.id).order_by(Document.created_at.desc())
    ).all()
    counts = dict(
        db.execute(select(Chunk.document_id, func.count()).group_by(Chunk.document_id)).all()
    )
    from app.routers.documents import _meta

    return {
        "items": [_meta(document, counts.get(document.id, 0)) for document in documents],
        "total": len(documents),
    }
