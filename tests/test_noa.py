"""Noa cloud client tests - all mocked, no network."""

import json
import urllib.error

import bl_halo_mcp.noa_cloud as noa
from bl_halo_mcp.noa_cloud import NoaCloudError, ask_noa


class _Resp:
    def __init__(self, payload: dict):
        self._payload = payload

    def read(self):
        return json.dumps(self._payload).encode()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False


def _patch(monkeypatch, payload=None, exc=None):
    def fake_open(req, timeout=None):
        if exc is not None:
            raise exc
        return _Resp(payload or {})

    monkeypatch.setattr(noa.urllib.request, "urlopen", fake_open)


def test_live_success(monkeypatch):
    _patch(monkeypatch, {"message": "hello from Noa", "debug": {"tokens": 5}})
    out = ask_noa("hi?", api_key="preview-key")
    assert out["answer"] == "hello from Noa"
    assert out["debug"] == {"tokens": 5}


def test_error_payload(monkeypatch):
    _patch(monkeypatch, {"error": "bad key"})
    try:
        ask_noa("hi?", api_key="bad")
        raise AssertionError("should have raised")
    except NoaCloudError as exc:
        assert "bad key" in str(exc)


def test_empty_message_is_drift(monkeypatch):
    _patch(monkeypatch, {"message": ""})
    try:
        ask_noa("hi?", api_key="k")
        raise AssertionError("should have raised")
    except NoaCloudError:
        pass


def test_http_error(monkeypatch):
    _patch(monkeypatch, exc=urllib.error.HTTPError("url", 401, "unauthorized", {}, None))
    try:
        ask_noa("hi?", api_key="bad")
        raise AssertionError("should have raised")
    except NoaCloudError as exc:
        assert "401" in str(exc)


def test_missing_key_and_empty_question():
    for kwargs in ({"question": "hi?", "api_key": "  "}, {"question": "  ", "api_key": "k"}):
        try:
            ask_noa(**kwargs)
            raise AssertionError("should have raised")
        except NoaCloudError:
            pass


def test_multipart_shape():
    body, ctype = noa._multipart({"prompt": "hi"}, {})
    assert ctype.startswith("multipart/form-data; boundary=")
    assert b'name="prompt"' in body
    body2, _ = noa._multipart({}, {"image": ("p.png", b"\x89PNG", "image/png")})
    assert b"p.png" in body2
