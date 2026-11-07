from fastapi.testclient import TestClient

from range_api.app.factory import create_app
from range_infrastructure.telemetry import current_trace_id

TRACE_ID = "4bf92f3577b34da6a3ce929d0e0e4736"
TRACEPARENT = {"traceparent": f"00-{TRACE_ID}-00f067aa0ba902b7-01"}


def _client() -> TestClient:
    app = create_app()

    @app.get("/probe")
    def probe() -> dict[str, str | None]:
        return {"trace_id": current_trace_id()}

    return TestClient(app)


def test_handler_joins_the_incoming_trace() -> None:
    response = _client().get("/probe", headers=TRACEPARENT)

    assert response.json() == {"trace_id": TRACE_ID}


def test_handler_gets_a_new_trace_when_none_is_sent() -> None:
    first = _client().get("/probe").json()["trace_id"]
    second = _client().get("/probe").json()["trace_id"]

    assert first is not None
    assert first != second


def test_malformed_traceparent_starts_a_new_trace() -> None:
    response = _client().get("/probe", headers={"traceparent": "garbage"})

    assert response.json()["trace_id"] not in (None, "garbage")
