from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user import UserRegister
from app.schemas.user import UserResponse

from app.schemas.user import UserLogin
from app.schemas.user import TokenResponse

from app.core.security import create_access_token

from app.services.user_service import authenticate_user

from app.dependencies.auth import get_current_user

from app.dependencies.roles import require_roles

from app.services.user_service import (
    get_user_by_email,
    create_user
)

from app.schemas.token import Token
from app.schemas.user import UserLogin

from app.services.user_service import (
    authenticate_user
)

from app.core.security import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    created_user = create_user(
        db,
        user.full_name,
        user.email,
        user.password
    )

    return created_user

@router.post(
    "/login",
    response_model=TokenResponse
)
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": authenticated_user.email,
            "role": authenticated_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user
    
@router.get("/verify-token")
def verify_token_endpoint(
    current_user=Depends(get_current_user)
):
    return current_user

@router.get("/admin-only")
def admin_only_route(
    current_user=Depends(
        require_roles("Admin")
    )
):
    return {
        "message": "Admin access granted"
    }

@router.get("/test")
def test_auth():
    return {"message": "auth working"}

@router.post(
    "/login",
    response_model=Token
)
def login(
    user_data: UserLogin,
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        user_data.email,
        user_data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }