import pytest

from range_infrastructure.telemetry import configure_tracing


@pytest.fixture(scope="session", autouse=True)
def tracing() -> None:
    configure_tracing("range-test")
