import io

from ai.qa.rag import classify_query
from tests.conftest import SAMPLE_JUDGMENT, register_user


def test_classify():
    assert classify_query("Justice") == "vague"
    assert classify_query("the") == "vague"
    assert classify_query("Justice Muhammad Hashim Khan Kakar") == "lookup"
    assert classify_query("died Justice Muhammad Hashim Khan Kakar") == "lookup"
    assert classify_query("What was the outcome of the appeal?") == "question"
    assert classify_query("who were the judges") == "question"
    assert classify_query(
        "the appellant was convicted under section 302 by the trial court and appealed"
    ) == "question"


def test_vague_query_gets_guidance(client):
    headers = register_user(client)
    response = client.post("/api/v1/ask", json={"question": "Justice???"}, headers=headers)
    body = response.json()
    assert "too short" in body["answer"]
    assert body["sources"] == []
    assert body["model"] == "none"


def test_lookup_query_lists_documents(client):
    headers = register_user(client)
    client.post(
        "/api/v1/documents/upload",
        files={"file": ("murder_appeal.txt", io.BytesIO(SAMPLE_JUDGMENT.encode()), "text/plain")},
        headers=headers,
    )
    response = client.post(
        "/api/v1/ask", json={"question": "Pakistan Penal Code"}, headers=headers
    )
    body = response.json()
    assert body["model"] == "lookup"
    assert "murder appeal" in body["answer"]        # document title listed
    assert "ask a specific question" in body["answer"].lower()


def test_lookup_for_absent_name_says_not_found(client):
    headers = register_user(client)
    client.post(
        "/api/v1/documents/upload",
        files={"file": ("case.txt", io.BytesIO(SAMPLE_JUDGMENT.encode()), "text/plain")},
        headers=headers,
    )
    response = client.post(
        "/api/v1/ask", json={"question": "Barrister Zubair Nawaz"}, headers=headers
    )
    body = response.json()
    assert "does not appear" in body["answer"]
    assert body["sources"] == []
