from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# データベースURL（SQLiteの場合）
SQLALCHEMY_DATABASE_URL = "sqlite:///test.db"

# SQLAlchemy エンジンの作成
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# セッションの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()