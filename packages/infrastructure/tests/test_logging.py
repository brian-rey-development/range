import io
import json
import logging

from opentelemetry import trace

from range_infrastructure.telemetry import configure_logging, current_trace_id, get_logger

tracer = trace.get_tracer("range.tests")


def _lines(stream: io.StringIO) -> list[dict[str, object]]:
    return [json.loads(line) for line in stream.getvalue().splitlines()]


def test_json_lines_carry_trace_and_span_ids_inside_a_span() -> None:
    stream = io.StringIO()
    configure_logging("info", json_output=True, stream=stream)

    with tracer.start_as_current_span("hand") as span:
        get_logger("test").info("inside", hand=7)
        expected = span.get_span_context()
    get_logger("test").info("outside")

    inside, outside = _lines(stream)
    assert inside["trace_id"] == format(expected.trace_id, "032x")
    assert inside["span_id"] == format(expected.span_id, "016x")
    assert inside["event"] == "inside"
    assert inside["hand"] == 7
    assert "trace_id" not in outside


def test_standard_library_loggers_are_routed_and_carry_the_trace_id() -> None:
    stream = io.StringIO()
    configure_logging("info", json_output=True, stream=stream)

    with tracer.start_as_current_span("hand"):
        logging.getLogger("uvicorn.error").warning("from a framework")
        trace_id = current_trace_id()

    (line,) = _lines(stream)
    assert line["trace_id"] == trace_id
    assert line["level"] == "warning"


def test_level_filters_lower_severity() -> None:
    stream = io.StringIO()
    configure_logging("warning", json_output=True, stream=stream)

    get_logger("test").info("dropped")

    assert stream.getvalue() == ""


def test_no_trace_id_outside_a_span() -> None:
    assert current_trace_id() is None
