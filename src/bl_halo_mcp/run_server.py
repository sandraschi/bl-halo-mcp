"""Dual transport entry: stdio (default) + `--serve` HTTP (uvicorn api:app)."""

from __future__ import annotations

import argparse
import logging
import sys

logger = logging.getLogger("bl-halo-mcp.run_server")


def main(argv: list[str] | None = None) -> None:
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser(prog="bl-halo-mcp")
    parser.add_argument("--serve", action="store_true", help="Run HTTP (uvicorn api:app) instead of stdio.")
    parser.add_argument("--port", type=int, default=None, help="HTTP port (default: config BACKEND_PORT).")
    args = parser.parse_args(sys.argv[1:] if argv is None else argv)
    if args.serve:
        import uvicorn

        from . import api, config

        port = int(args.port or config.BACKEND_PORT)
        logger.info("Serving HTTP on 127.0.0.1:%d", port)
        uvicorn.run(api.app, host="127.0.0.1", port=port)
    else:
        from .server import main as stdio_main

        stdio_main()


if __name__ == "__main__":
    main()
