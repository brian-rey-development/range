from range_api.app.factory import create_app
from range_infrastructure.config import get_settings
from range_infrastructure.telemetry import configure_logging, configure_tracing

SERVICE_NAME = "range-api"

settings = get_settings()
configure_logging(settings.log_level, json_output=settings.environment != "local")
configure_tracing(SERVICE_NAME)
app = create_app()
