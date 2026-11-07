import logging
import sys
from typing import TextIO

import structlog
from structlog.typing import EventDict, Processor

from range_infrastructure.config.settings import LogLevel
from range_infrastructure.telemetry.tracing import current_span_id, current_trace_id

_FRAMEWORK_LOGGERS = ("uvicorn", "uvicorn.error", "uvicorn.access")


def add_trace_id(_logger: object, _method: str, event: EventDict) -> EventDict:
    trace_id = current_trace_id()
    if trace_id is not None:
        event["trace_id"] = trace_id
        event["span_id"] = current_span_id()
    return event


def configure_logging(level: LogLevel, *, json_output: bool, stream: TextIO | None = None) -> None:
    shared: list[Processor] = [
        add_trace_id,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso", utc=True),
        structlog.processors.format_exc_info,
    ]
    structlog.configure(
        processors=[*shared, structlog.stdlib.ProcessorFormatter.wrap_for_formatter],
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
    _install_handler(level, shared, json_output=json_output, stream=stream or sys.stderr)


def get_logger(name: str) -> structlog.stdlib.BoundLogger:
    return structlog.stdlib.get_logger(name)


def _install_handler(
    level: LogLevel, shared: list[Processor], *, json_output: bool, stream: TextIO
) -> None:
    renderer: Processor = (
        structlog.processors.JSONRenderer()
        if json_output
        else structlog.dev.ConsoleRenderer(colors=stream.isatty())
    )
    handler = logging.StreamHandler(stream)
    handler.setFormatter(
        structlog.stdlib.ProcessorFormatter(
            foreign_pre_chain=shared,
            processors=[structlog.stdlib.ProcessorFormatter.remove_processors_meta, renderer],
        )
    )
    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(level.upper())
    for name in _FRAMEWORK_LOGGERS:
        framework = logging.getLogger(name)
        framework.handlers = []
        framework.propagate = True
