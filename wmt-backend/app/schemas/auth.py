from pydantic import BaseModel, Field

from app.schemas.user import UserPublic


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthResponse(TokenPair):
    user: UserPublic


class TokenRefreshRequest(BaseModel):
    refresh_token: str = Field(min_length=10)
