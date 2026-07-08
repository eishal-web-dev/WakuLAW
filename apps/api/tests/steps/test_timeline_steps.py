import io

import pytest
from pytest_bdd import given, parsers, scenarios, then, when

from tests.conftest import register_user

scenarios("../../features/timeline.feature")

DATED_TEXT = (
    "The occurrence took place on 14th March 2019 when the complainant lodged the report. "
    "The trial court convicted the appellant after full trial and the sentence was announced. "
    "The impugned majority judgment dated 12.07.2024 was later challenged before this Court. "
    "The appeal was finally allowed and the conviction was set aside by the larger bench."
)

SECOND_DATED_TEXT = (
    "The agreement between the parties was executed on 5 January 2021 before the notary. "
    "A legal notice was served upon the respondent demanding compliance within thirty days. "
    "The suit was instituted thereafter and remained pending before the civil court."
)

NO_DATES_TEXT = (
    "The court considered the arguments of both sides at considerable length. "
    "The principles of natural justice require that both parties be heard fairly. "
    "The burden of proof rests upon the prosecution throughout the trial."
)


@pytest.fixture
def context():
    return {}


@given("a registered user with an authenticated session")
def auth_session(client, context):
    context["headers"] = register_user(client, email="bdd-user@test.com")


def _upload(client, headers, text, filename="doc.txt", case_id=None):
    data = {"case_id": str(case_id)} if case_id else {}
    response = client.post(
        "/api/v1/documents/upload",
        files={"file": (filename, io.BytesIO(text.encode()), "text/plain")},
        data=data,
        headers=headers,
    )
    assert response.status_code == 201, response.text
    return response.json()


@given(parsers.parse('the user uploaded a judgment mentioning events on "{d1}" and "{d2}"'))
def upload_dated(client, context, d1, d2):
    context["document"] = _upload(client, context["headers"], DATED_TEXT)


@given("the user has a case with two documents mentioning different dates")
def case_with_two_docs(client, context):
    case = client.post(
        "/api/v1/cases",
        json={"title": "Timeline Case", "case_type": "Civil"},
        headers=context["headers"],
    ).json()
    context["case"] = case
    context["doc_a"] = _upload(client, context["headers"], DATED_TEXT, "a.txt", case["id"])
    context["doc_b"] = _upload(client, context["headers"], SECOND_DATED_TEXT, "b.txt", case["id"])


@given("the user uploaded a document containing no dates")
def upload_undated(client, context):
    context["document"] = _upload(client, context["headers"], NO_DATES_TEXT)


@given("another user uploaded a document with dates")
def other_user_doc(client, context):
    other = register_user(client, email="bdd-other@test.com")
    context["document"] = _upload(client, other, DATED_TEXT)


@when("the user requests the document timeline")
@when("the user requests that document's timeline")
def get_doc_timeline(client, context):
    context["response"] = client.get(
        f"/api/v1/documents/{context['document']['id']}/timeline", headers=context["headers"]
    )


@when("the user requests the case timeline")
def get_case_timeline(client, context):
    context["response"] = client.get(
        f"/api/v1/cases/{context['case']['id']}/timeline", headers=context["headers"]
    )


@then(parsers.parse('the timeline contains an event dated "{date}"'))
def timeline_has_date(context, date):
    events = context["response"].json()["events"]
    assert any(event["date"] == date for event in events), events


@then("events are ordered chronologically")
def ordered(context):
    dates = [event["date"] for event in context["response"].json()["events"]]
    assert dates == sorted(dates)


@then("every event includes the sentence it was extracted from")
def events_have_text(context):
    for event in context["response"].json()["events"]:
        assert len(event["text"].split()) >= 5


@then("the timeline contains events from both documents")
def events_from_both(context):
    ids = {event["document_id"] for event in context["response"].json()["events"]}
    assert context["doc_a"]["id"] in ids and context["doc_b"]["id"] in ids


@then("each event names its source document")
def events_name_source(context):
    for event in context["response"].json()["events"]:
        assert event["document_title"]


@then("the timeline is empty")
def timeline_empty(context):
    assert context["response"].json()["events"] == []


@then("the request fails with not found")
def not_found(context):
    assert context["response"].status_code == 404
