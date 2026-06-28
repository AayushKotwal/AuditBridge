from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.control import (
    ControlCreate,
    ControlResponse,
    PaginatedControlsResponse,
)

from app.services.control_service import (
    create_control,
    get_all_controls,
    get_control_by_id,
    get_next_control_id,
    search_controls,
    update_control,
    delete_control,
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


@router.get("/",
response_model=PaginatedControlsResponse,)
def list_controls(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
):
    return get_all_controls(
        db,
        page=page,
        page_size=page_size,
    )


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

@router.put(
    "/{control_id}",
    response_model=ControlResponse,
)
def edit_control(
    control_id: int,
    control: ControlCreate,
    db: Session = Depends(get_db),
):
    updated = update_control(
        db,
        control_id,
        control,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Control not found",
        )

    return updated


@router.delete(
    "/{control_id}",
)
def remove_control(
    control_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_control(
        db,
        control_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Control not found",
        )

    return {
        "message": "Control deleted successfully",
    }