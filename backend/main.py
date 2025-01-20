import logging

# import sentry_sdk
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.api.endpoints import auth, families, reports, sensors, users, share
from backend.core.config import settings
from backend.core.logger import get_logger

# loggingセットアップ
logger = get_logger(__name__)


class NoParsingFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return not record.getMessage().find("/docs") >= 0


# /docsのログが大量に表示されるのを防ぐ
logging.getLogger("uvicorn.access").addFilter(NoParsingFilter())

app = FastAPI(
    title=settings.TITLE,
    version=settings.VERSION,
    debug=settings.DEBUG or False,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
    allow_origin_regex=r"^https?:\/\/([\w\-\_]{1,}\.|)example\.com",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["info"])
def get_info() -> dict[str, str]:
    return {"title": settings.TITLE, "version": settings.VERSION}


app.include_router(auth.router, tags=["Auth"], prefix="/auth")
app.include_router(users.router, tags=["Users"], prefix="/users")
# app.include_router(families.router, tags=["Families"], prefix="/families")
# app.include_router(reports.router, tags=["Reports"], prefix="/drive_reports")
app.include_router(sensors.router, tags=["Sensors"], prefix="/drive_sensors")
app.include_router(share.router, tags=["Share"], prefix="/email")

# debugモード時はfastapi-tool-barを有効化する
if settings.DEBUG:
    from debug_toolbar.middleware import DebugToolbarMiddleware

    app.add_middleware(
        DebugToolbarMiddleware,
        panels=["app.core.database.SQLAlchemyPanel"],
    )
