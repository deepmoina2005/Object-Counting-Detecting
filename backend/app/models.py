from pydantic import BaseModel, EmailStr, constr
from typing import Dict, Optional


class Detection(BaseModel):
    file_name: str
    saved_image: str
    image_url: str
    objects: Dict[str, int]
    timestamp: str

class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    username: str
    email: EmailStr
    is_active: bool = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
