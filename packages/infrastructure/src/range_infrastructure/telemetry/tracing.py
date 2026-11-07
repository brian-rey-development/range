from opentelemetry import trace
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider

TRACE_ID_FORMAT = "032x"
SPAN_ID_FORMAT = "016x"


def configure_tracing(service_name: str) -> None:
    """Install the tracer provider once. Without it OpenTelemetry returns an all-zero trace id."""
    if isinstance(trace.get_tracer_provider(), TracerProvider):
        return
    trace.set_tracer_provider(
        TracerProvider(resource=Resource.create({SERVICE_NAME: service_name}))
    )


def current_trace_id() -> str | None:
    context = trace.get_current_span().get_span_context()
    return format(context.trace_id, TRACE_ID_FORMAT) if context.is_valid else None


def current_span_id() -> str | None:
    context = trace.get_current_span().get_span_context()
    return format(context.span_id, SPAN_ID_FORMAT) if context.is_valid else None
