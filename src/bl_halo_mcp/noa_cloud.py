"""Noa cloud client - same call Brilliant's own public playground makes.

Contract reverse-documented from https://github.com/brilliantlabsAR/noa-playground
(js/main.js + noa_config.json), NOT an official third-party API: endpoint and
fields may move without notice. Uses only the standard library (no new deps).

    POST {api_url}  (default https://api.brilliant.xyz/dev/noa)
    Headers: Authorization: <preview-key>   (raw token, no Bearer prefix)
    Body (multipart/form-data):
      prompt:       question text
      messages:     JSON list [{role, content}] (conversation history, may be [])
      image:        optional PNG/JPEG bytes (photo for Noa to look at)
      experimental: JSON object, {} is accepted
      time:         local timestamp string
      location:     free string, may be empty
    Response JSON: {message, image?, debug?, error?}
    Auth failure surfaces as {error: ...} with HTTP 200 or 4xx - both handled.
"""

from __future__ import annotations

import datetime
import io
import json
import logging
import secrets
import urllib.error
import urllib.request

logger = logging.getLogger("bl-halo-mcp.noa_cloud")

DEFAULT_API_URL = "https://api.brilliant.xyz/dev/noa"


class NoaCloudError(Exception):
    """The Noa cloud call failed (bad key, timeout, unreachable, contract drift)."""


def _multipart(fields: dict[str, str], files: dict[str, tuple[str, bytes, str]]) -> tuple[bytes, str]:
    boundary = "----blhalo" + secrets.token_hex(8)
    buf = io.BytesIO()
    for name, value in fields.items():
        buf.write(f"--{boundary}\r\n".encode())
        buf.write(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
        buf.write(value.encode())
        buf.write(b"\r\n")
    for name, (filename, blob, ctype) in files.items():
        buf.write(f"--{boundary}\r\n".encode())
        buf.write(f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'.encode())
        buf.write(f"Content-Type: {ctype}\r\n\r\n".encode())
        buf.write(blob)
        buf.write(b"\r\n")
    buf.write(f"--{boundary}--\r\n".encode())
    return buf.getvalue(), f"multipart/form-data; boundary={boundary}"


def ask_noa(
    question: str,
    api_key: str,
    api_url: str = DEFAULT_API_URL,
    image_bytes: bytes | None = None,
    history: list | None = None,
    timeout_s: float = 30.0,
) -> dict:
    """Ask the live Noa cloud. Returns {answer, image_b64?, debug?}.

    Raises:
        NoaCloudError: on auth failure, HTTP error, timeout, or bad payload.
    """
    question = (question or "").strip()
    if not question:
        raise NoaCloudError("empty question")
    if not api_key.strip():
        raise NoaCloudError("missing preview key (set NOA_API_KEY)")
    fields = {
        "prompt": question[:2000],
        "messages": json.dumps(history or []),
        "experimental": "{}",
        "time": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
        "location": "",
    }
    files: dict[str, tuple[str, bytes, str]] = {}
    if image_bytes:
        if len(image_bytes) > 4_000_000:
            raise NoaCloudError("image too large (max ~4 MB for cloud)")
        files["image"] = ("photo.png", image_bytes, "image/png")
    body, ctype = _multipart(fields, files)
    req = urllib.request.Request(
        api_url,
        data=body,
        headers={"Authorization": api_key.strip(), "Content-Type": ctype},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout_s) as resp:
            payload = json.loads(resp.read().decode("utf-8", errors="replace"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:300]
        raise NoaCloudError(f"HTTP {exc.code}: {detail or 'cloud rejected the call (bad/expired key?)'}") from exc
    except TimeoutError as exc:
        raise NoaCloudError("cloud timed out after 30s") from exc
    except OSError as exc:
        raise NoaCloudError(f"cloud unreachable: {exc}") from exc
    if not isinstance(payload, dict):
        raise NoaCloudError("cloud returned a non-JSON-object payload (contract drift?)")
    if payload.get("error"):
        raise NoaCloudError(str(payload["error"])[:300])
    answer = str(payload.get("message", "")).strip()
    if not answer:
        raise NoaCloudError("cloud returned no message (contract drift?)")
    return {"answer": answer, "image_b64": payload.get("image"), "debug": payload.get("debug")}
