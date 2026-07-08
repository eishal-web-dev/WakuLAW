import io

import pytest
from pytest_bdd import given, parsers, scenarios, then, when

from tests.conftest import register_user

scenarios("../../features/citations.feature")

CITED_TEXT = (
    "The appellant was convicted under Section 302(b) of the Pakistan Penal Code by the trial court. "
    "It is a settled principle under Article 4 of the Constitution that due process must be observed. "
    "In Muhammad Akram versus The State reported as 2009 SCMR 230 this Court extended the benefit of doubt. "
    "For the foregoing reasons the appeal is allowed and the conviction is set aside forthwith."
)

DUPLICATE_TEXT = (
    "The accused was charged under Section 302 of the Penal Code before the sessions court. "
    "The learned counsel argued that Section 302 requires proof of intention beyond reasonable doubt. "
    "The prosecution failed to establish the necessary ingredients of the charged offence at trial."
)

PLAIN_TEXT = (
    "The court heard the arguments of the learned counsel for both parties at length. "
    "The evidence on record was examined carefully and found insufficient for conviction. "
    "The benefit of doubt was accordingly extended to the accused in this matter."
)


@pytest.fixture
def context():
    return {}


@given("a registered user with an authenticated session")
def auth_session(client, context):
    context["headers"] = register_user(client, email="bdd-cite@test.com")


def _upload(client, headers, text):
    response = client.post(
        "/api/v1/documents/upload",
        files={"file": ("cited.txt", io.BytesIO(text.encode()), "text/plain")},
        headers=headers,
    )
    assert response.status_code == 201, response.text
    return response.json()


@given(parsers.parse('the user uploaded a judgment citing "{c1}", "{c2}" and "{c3}"'))
def upload_cited(client, context, c1, c2, c3):
    context["document"] = _upload(client, context["headers"], CITED_TEXT)


@given(parsers.parse('the user uploaded a document citing "{cite}" twice'))
def upload_duplicate(client, context, cite):
    context["document"] = _upload(client, context["headers"], DUPLICATE_TEXT)


@given("the user uploaded a document containing no citations")
def upload_plain(client, context):
    context["document"] = _upload(client, context["headers"], PLAIN_TEXT)


@when("the user requests the document citations")
def get_citations(client, context):
    context["response"] = client.get(
        f"/api/v1/documents/{context['document']['id']}/citations", headers=context["headers"]
    )
    assert context["response"].status_code == 200, context["response"].text


def _find(context, kind, needle):
    return [
        c
        for c in context["response"].json()["citations"]
        if c["type"] == kind and needle.lower() in c["text"].lower()
    ]


@then(parsers.parse('a statute citation "{needle}" is found'))
def statute_found(context, needle):
    assert _find(context, "statute", needle), context["response"].json()


@then(parsers.parse('a constitution citation "{needle}" is found'))
def constitution_found(context, needle):
    assert _find(context, "constitution", needle), context["response"].json()


@then(parsers.parse('a case-law citation "{needle}" is found'))
def caselaw_found(context, needle):
    assert _find(context, "case_law", needle), context["response"].json()


@then("every citation includes the sentence it appears in")
def citations_have_context(context):
    for citation in context["response"].json()["citations"]:
        assert len(citation["context"].split()) >= 5


@then(parsers.parse('the citation list contains exactly one entry for "{needle}"'))
def exactly_one(context, needle):
    matches = [
        c
        for c in context["response"].json()["citations"]
        if needle.lower() in c["text"].lower()
    ]
    assert len(matches) == 1, matches


@then("the citation list is empty")
def citations_empty(context):
    assert context["response"].json()["citations"] == []
