from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import AuthResponse, TokenRefreshRequest, TokenPair
from app.schemas.user import UserCreate, UserPublic
from app.services.auth_service import authenticate_user, create_token_pair, register_user
from app.utils.security import create_access_token, decode_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    user = register_user(db, payload)
    tokens = create_token_pair(user)
    return AuthResponse(**tokens, user=UserPublic.model_validate(user))


@router.post("/login", response_model=AuthResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, username=form_data.username, password=form_data.password)
    tokens = create_token_pair(user)
    return AuthResponse(**tokens, user=UserPublic.model_validate(user))


@router.post("/refresh", response_model=TokenPair)
def refresh_token(payload: TokenRefreshRequest, db: Session = Depends(get_db)):
    try:
        decoded = decode_token(payload.refresh_token)
        if decoded.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        user_id = decoded.get("sub")
        user_id_int = int(user_id) if user_id else None
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token") from exc
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token") from exc

    if not user_id_int:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    user = db.query(User).filter(User.id == user_id_int).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    return {
        "access_token": create_access_token(subject=str(user.id)),
        "refresh_token": payload.refresh_token,
        "token_type": "bearer",
    }
