from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.control import (
    ControlCreate,
    ControlResponse,
)

from app.services.control_service import (
    create_control,
    get_all_controls,
    get_control_by_id,
    get_next_control_id,
    search_controls
)

router = APIRouter(
    prefix="/controls",
    tags=["Controls"],
)


@router.post(
    "/",
    response_model=ControlResponse,
)
def create_new_control(
    control: ControlCreate,
    db: Session = Depends(get_db),
):
    return create_control(
        db,
        control,
    )


@router.get("/next-id")
def next_control_id(
    db: Session = Depends(get_db),
):
    return get_next_control_id(db)


@router.get(
    "/",
    response_model=list[ControlResponse],
)
def list_controls(
    db: Session = Depends(get_db),
):
    return get_all_controls(db)


@router.get("/search")
def search_controls_endpoint(
    q: str,
    db: Session = Depends(get_db),
):
    return search_controls(
        db,
        q,
    )


@router.get(
    "/{control_id}",
    response_model=ControlResponse,
)
def get_single_control(
    control_id: int,
    db: Session = Depends(get_db),
):
    control = get_control_by_id(
        db,
        control_id,
    )

    if not control:
        raise HTTPException(
            status_code=404,
            detail="Control not found",
        )

    return control