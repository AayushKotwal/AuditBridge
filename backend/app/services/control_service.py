from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.control import Control


def create_control(
    db: Session,
    control_data,
):
    control = Control(
        control_id=control_data.control_id,
        title=control_data.title,
        description=control_data.description,
        framework=control_data.framework,
        status=control_data.status,
        review_frequency=control_data.review_frequency,
        owner_id=control_data.owner_id,
    )

    db.add(control)
    db.commit()
    db.refresh(control)

    return control


def get_all_controls(
    db: Session,
    page: int = 1,
    page_size: int = 10,
):
    query = db.query(Control)

    total = query.count()

    items = (
        query
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": (
            (total + page_size - 1)
            // page_size
        ),
    }


def get_control_by_id(
    db: Session,
    control_id: int,
):
    return (
        db.query(Control)
        .filter(Control.id == control_id)
        .first()
    )

def search_controls(
    db: Session,
    query: str,
):
    return (
        db.query(Control)
        .filter(
            or_(
                Control.control_id.ilike(f"%{query}%"),
                Control.title.ilike(f"%{query}%"),
                Control.framework.ilike(f"%{query}%"),
                Control.status.ilike(f"%{query}%"),
            )
        )
        .all()
    )


def get_next_control_id(
    db: Session,
):
    latest_control = (
        db.query(Control)
        .order_by(Control.id.desc())
        .first()
    )

    if not latest_control:
        return {
            "control_id": "AC-01",
        }

    try:
        number = int(
            latest_control.control_id.replace("AC-", "")
        )
    except Exception:
        number = latest_control.id

    return {
        "control_id": f"AC-{number + 1:02d}",
    }

def update_control(
    db: Session,
    control_id: int,
    control_data,
    ):
    control = (
        db.query(Control)
        .filter(Control.id == control_id)
        .first()
    )

    if not control:
        return None

    control.control_id = control_data.control_id
    control.title = control_data.title
    control.description = control_data.description
    control.framework = control_data.framework
    control.status = control_data.status
    control.review_frequency = control_data.review_frequency
    control.owner_id = control_data.owner_id

    db.commit()
    db.refresh(control)

    return control


def delete_control(
    db: Session,
    control_id: int,
):
    control = (
        db.query(Control)
        .filter(Control.id == control_id)
        .first()
    )

    if not control:
        return False

    db.delete(control)
    db.commit()

    return True