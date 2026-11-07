from pathlib import Path

import pytest

from range_infrastructure.config import ConfigurationError, load_settings

DATABASE_URL = "postgresql://range:secret-pass@localhost:5432/range"
REDIS_URL = "redis://localhost:6379/0"
EXAMPLE_FILE = Path(__file__).parents[3] / ".env.example"


@pytest.fixture(autouse=True)
def clean_environment(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in ("ENVIRONMENT", "LOG_LEVEL", "DATABASE_URL", "REDIS_URL", "ANTHROPIC_API_KEY"):
        monkeypatch.delenv(f"RANGE_{name}", raising=False)


def test_loads_required_values_and_defaults(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("RANGE_DATABASE_URL", DATABASE_URL)
    monkeypatch.setenv("RANGE_REDIS_URL", REDIS_URL)

    settings = load_settings(env_file=None)

    assert settings.environment == "local"
    assert settings.log_level == "info"
    assert settings.anthropic_api_key is None


def test_missing_values_name_the_environment_variables() -> None:
    with pytest.raises(ConfigurationError) as raised:
        load_settings(env_file=None)

    message = str(raised.value)
    assert "RANGE_DATABASE_URL" in message
    assert "RANGE_REDIS_URL" in message
    assert ".env.example" in message


def test_invalid_value_error_does_not_leak_the_input(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("RANGE_DATABASE_URL", "mysql://range:secret-pass@localhost/range")
    monkeypatch.setenv("RANGE_REDIS_URL", REDIS_URL)

    with pytest.raises(ConfigurationError) as raised:
        load_settings(env_file=None)

    assert "RANGE_DATABASE_URL" in str(raised.value)
    assert "secret-pass" not in str(raised.value)


def test_api_key_is_masked(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("RANGE_DATABASE_URL", DATABASE_URL)
    monkeypatch.setenv("RANGE_REDIS_URL", REDIS_URL)
    monkeypatch.setenv("RANGE_ANTHROPIC_API_KEY", "sk-ant-very-secret")

    settings = load_settings(env_file=None)

    assert "very-secret" not in repr(settings)
    assert settings.anthropic_api_key is not None
    assert settings.anthropic_api_key.get_secret_value() == "sk-ant-very-secret"


def test_example_file_is_valid() -> None:
    settings = load_settings(env_file=str(EXAMPLE_FILE))

    assert settings.environment == "local"
