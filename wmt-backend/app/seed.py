import getpass

from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.utils.security import get_password_hash


def create_admin(db: Session, username: str, email: str, password: str) -> User:
    existing = db.query(User).filter((User.username == username) | (User.email == email)).first()
    if existing:
        return existing

    admin = User(
        username=username,
        email=email,
        password_hash=get_password_hash(password),
        role="admin",
        is_active=True,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


def main() -> None:
    username = input("Admin username: ").strip()
    email = input("Admin email: ").strip()
    password = getpass.getpass("Admin password: ")

    db = SessionLocal()
    try:
        admin = create_admin(db, username=username, email=email, password=password)
        print(f"Admin user ready: {admin.username} (id={admin.id})")
    finally:
        db.close()


if __name__ == "__main__":
    main()
