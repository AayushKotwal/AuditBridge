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
):
    return db.query(Control).all()


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