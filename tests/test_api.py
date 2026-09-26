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


def test_tool_schema_and_run():
    r = client.get("/api/tools/halo_device")
    assert r.status_code == 200
    tool = r.json()["tool"]
    assert tool["kind"] == "portmanteau"
    assert "operation" in tool["parameters"]["properties"]
    assert client.get("/api/tools/nope").status_code == 404
    run = client.post("/api/tools/halo_device", json={"arguments": {"operation": "status"}})
    assert run.status_code == 200
    assert run.json()["result"]["success"] is True
    help_run = client.post("/api/tools/halo_help", json={"arguments": {"topic": "noa"}})
    assert help_run.json()["result"]["success"] is True
    bad = client.post("/api/tools/halo_device", json={"arguments": {"operation": "nope"}})
    assert bad.json()["result"]["success"] is False


def test_llm_detect_shape():
    r = client.get("/api/llm/detect")
    assert r.status_code == 200
    ids = [p["id"] for p in r.json()["providers"]]
    assert ids == ["ollama", "lmstudio", "vllm"]


def test_llm_chat_and_gpus():
    assert client.post("/api/llm/chat", json={}).status_code == 400
    r = client.post("/api/llm/chat", json={"message": "hello"})
    assert r.status_code == 200
    assert "answer" in r.json()
    g = client.get("/api/llm/gpus")
    assert g.status_code == 200
    assert isinstance(g.json()["gpus"], list)
