from fastapi import APIRouter

from range_api.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health")
def read_health() -> HealthResponse:
    return HealthResponse(status="ok")
