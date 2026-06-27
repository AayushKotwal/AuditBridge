from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AuditBridge"
    APP_VERSION: str = "1.0.0"

    DATABASE_URL: str = "sqlite:///./auditbridge.db"

    SECRET_KEY: str = "change_this_before_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()