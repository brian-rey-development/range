from functools import lru_cache
from typing import Literal

from pydantic import PostgresDsn, RedisDsn, SecretStr, ValidationError
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_PREFIX = "RANGE_"
ENV_FILE = ".env"

type Environment = Literal["local", "test", "production"]
type LogLevel = Literal["debug", "info", "warning", "error"]


class ConfigurationError(RuntimeError):
    """Raised at startup when the environment cannot build valid settings."""


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix=ENV_PREFIX, extra="ignore")

    environment: Environment = "local"
    log_level: LogLevel = "info"
    database_url: PostgresDsn
    redis_url: RedisDsn
    anthropic_api_key: SecretStr | None = None


def load_settings(env_file: str | None = ENV_FILE) -> Settings:
    try:
        return Settings(_env_file=env_file)
    except ValidationError as error:
        raise ConfigurationError(_describe(error)) from error


@lru_cache
def get_settings() -> Settings:
    return load_settings()


def _describe(error: ValidationError) -> str:
    # Only the message is reported, because the input value can be a secret.
    problems = [
        f"  {ENV_PREFIX}{str(item['loc'][0]).upper()}: {item['msg']}" for item in error.errors()
    ]
    return "Invalid configuration. Copy .env.example to .env and fix these values.\n" + "\n".join(
        problems
    )
