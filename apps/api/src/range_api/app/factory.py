from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from range_api.routers.health import router as health_router

API_TITLE = "Range API"
API_VERSION = "0.0.0"


def create_app() -> FastAPI:
    app = FastAPI(title=API_TITLE, version=API_VERSION)
    app.include_router(health_router)
    FastAPIInstrumentor.instrument_app(app)
    return app
