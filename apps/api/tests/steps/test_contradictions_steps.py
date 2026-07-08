import io

import pytest
from pytest_bdd import given, parsers, scenarios, then, when

from tests.conftest import register_user

scenarios("../../features/contradictions.feature")

PRESENT_TEXT = (
    "The prosecution examined the first witness at length during the trial proceedings. "
    "The witness was present at the scene on the night of the incident and saw the accused clearly. "
    "His statement remained consistent throughout the cross examination by the defence."
)

ABSENT_TEXT = (
    "The defence produced its own account of the events of that evening before the court. "
    "The witness was not present at the scene on the night of the incident according to this record. "
    "The defence relied upon this contradiction to challenge the prosecution case."
)

NEUTRAL_A = (
    "The agreement was executed between the parties for the sale of the property in question. "
    "The consideration amount was paid through a banking instrument as recorded in the deed."
)

NEUTRAL_B = (
    "The revenue record shows the mutation was entered in favour of the purchaser. "
    "The possession of the property was handed over at the time of registration."
)


@pytest.fixture
def context():
    return {}


@given("a registered user with an authenticated session")
def auth_session(client, context):
    context["headers"] = register_user(client, email="bdd-contra@test.com")


def _case_with_docs(client, headers, texts, title="Contradiction Case"):
    case = client.post(
        "/api/v1/cases", json={"title": title, "case_type": "Criminal"}, headers=headers
    ).json()
    for index, text in enumerate(texts):
        response = client.post(
            "/api/v1/documents/upload",
            files={"file": (f"doc{index}.txt", io.BytesIO(text.encode()), "text/plain")},
            data={"case_id": str(case["id"])},
            headers=headers,
        )
        assert response.status_code == 201, response.text
    return case


@given(parsers.parse('the user has a case with a document stating "{s1}"'))
def case_doc_one(client, context, s1):
    context["texts"] = [PRESENT_TEXT]


@given(parsers.parse('the same case has another document stating "{s2}"'))
def case_doc_two(client, context, s2):
    context["case"] = _case_with_docs(client, context["headers"], context["texts"] + [ABSENT_TEXT])


@given("the user has a case whose documents do not conflict")
def consistent_case(client, context):
    context["case"] = _case_with_docs(client, context["headers"], [NEUTRAL_A, NEUTRAL_B])


@given("another user has a case with documents")
def other_users_case(client, context):
    other = register_user(client, email="bdd-contra-other@test.com")
    context["case"] = _case_with_docs(client, other, [PRESENT_TEXT, ABSENT_TEXT])


@when("the user runs contradiction analysis on the case")
@when("the user runs contradiction analysis on that case")
def run_analysis(client, context):
    context["response"] = client.post(
        f"/api/v1/cases/{context['case']['id']}/contradictions", headers=context["headers"]
    )


@then("at least one contradiction pair is reported")
def has_pair(context):
    assert context["response"].status_code == 200, context["response"].text
    assert context["response"].json()["pairs"], context["response"].json()


@then("the pair shows both conflicting sentences with their source documents")
def pair_shape(context):
    pair = context["response"].json()["pairs"][0]
    for side in ("a", "b"):
        assert pair[side]["text"]
        assert pair[side]["document_title"]
    assert pair["a"]["document_id"] != pair["b"]["document_id"]


@then("the pair carries a confidence score")
def pair_score(context):
    assert 0 <= context["response"].json()["pairs"][0]["score"] <= 1


@then("no contradiction pairs are reported")
def no_pairs(context):
    assert context["response"].status_code == 200
    assert context["response"].json()["pairs"] == []


@then("the request fails with not found")
def not_found(context):
    assert context["response"].status_code == 404
