"""API contract tests - REST surface (uvicorn-equivalent paths via TestClient)."""

from starlette.testclient import TestClient

from bl_halo_mcp.api import app

client = TestClient(app)


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_dashboard_tools():
    assert client.get("/api/dashboard").status_code == 200
    assert client.get("/api/tools").status_code == 200
    assert client.get("/api/skills").status_code == 200
    assert client.get("/api/llm/providers").status_code == 200
    assert client.get("/api/llm/discover").status_code == 200
    assert client.get("/api/devices").status_code == 200
    assert client.get("/api/logs").status_code == 200


def test_photos_pagination():
    r = client.get("/api/photos", params={"limit": 5})
    assert r.status_code == 200
    assert "has_more" in r.json()
    assert client.get("/api/photos", params={"limit": "x"}).status_code == 400


def test_halo_action_passthrough():
    r = client.post("/api/halo", json={"operation": "status"})
    assert r.status_code == 200
    assert r.json()["success"] is True
    assert client.post("/api/halo", json={}).status_code == 400
    assert client.post("/api/halo", json={"operation": "show_text", "text": ""}).json()["success"] is False


def test_shutdown_guard():
    assert client.post("/api/shutdown", json={}).status_code == 400
    r = client.post("/api/shutdown", json={"confirm": True})
    assert r.status_code == 200
    assert r.json()["result"] == {"connected": False}


def test_llm_chat_and_gpus():
    assert client.post("/api/llm/chat", json={}).status_code == 400
    r = client.post("/api/llm/chat", json={"message": "hello"})
    assert r.status_code == 200
    assert "answer" in r.json()
    g = client.get("/api/llm/gpus")
    assert g.status_code == 200
    assert isinstance(g.json()["gpus"], list)
