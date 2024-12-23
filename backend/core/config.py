import os
from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # NOTE: .envファイルや環境変数が同名の変数にセットされる
    TITLE: str = "FastAPI Sample"
    ENV: str = ""
    DEBUG: bool = False
    VERSION: str = "0.0.1"
    CORS_ORIGINS: list[str] = [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://localhost:3333",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    BASE_DIR_PATH: str = str(Path(__file__).parent.parent.absolute())
    ROOT_DIR_PATH: str = str(Path(__file__).parent.parent.parent.absolute())
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_NAME: str = "test_db"
    DB_USER_NAME: str = "postgres"
    DB_PASSWORD: str = "reborn528"
    API_GATEWAY_STAGE_PATH: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    SECRET_KEY: str = "secret"
    LOGGER_CONFIG_PATH: str = os.path.join(BASE_DIR_PATH, "logger_config.yaml")
    SENTRY_SDK_DNS: str = ""
    MIGRATIONS_DIR_PATH: str = os.path.join(ROOT_DIR_PATH, "alembic")

    def get_database_url(self, is_async: bool = False) -> str:
        if is_async:
            return (
                "postgresql+asyncpg://"
                f"{self.DB_USER_NAME}:{self.DB_PASSWORD}@"
                f"{self.DB_HOST}/{self.DB_NAME}"
            )
        else:
            return (
                "postgresql://" f"{self.DB_USER_NAME}:{self.DB_PASSWORD}@" f"{self.DB_HOST}/{self.DB_NAME}"
            )

    model_config = SettingsConfigDict(env_file=".env")

    def get_app_title(self, app_name: str) -> str:
        return f"[{self.ENV}]{self.TITLE}({app_name=})"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
