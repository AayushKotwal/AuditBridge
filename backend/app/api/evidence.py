from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile
from fastapi import File

import shutil
import os
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.evidence import (
    EvidenceCreate,
    EvidenceResponse
)

from app.services.evidence_service import (
    create_evidence,
    get_all_evidence,
    get_evidence_by_id
)

from app.schemas.evidence import (
    EvidenceCreate,
    EvidenceResponse,
    EvidenceReview
)


from app.services.evidence_service import (
    create_evidence,
    get_all_evidence,
    review_evidence
)

router = APIRouter(
    prefix="/evidence",
    tags=["Evidence"]
)


@router.post(
    "/",
    response_model=EvidenceResponse
)
def create_new_evidence(
    evidence: EvidenceCreate,
    db: Session = Depends(get_db)
):
    return create_evidence(
        db,
        evidence
    )


@router.get(
    "/",
    response_model=list[EvidenceResponse]
)
def list_evidence(
    db: Session = Depends(get_db)
):
    return get_all_evidence(db)


@router.get(
    "/{evidence_id}",
    response_model=EvidenceResponse
)
def get_single_evidence(
    evidence_id: int,
    db: Session = Depends(get_db)
):
    evidence = get_evidence_by_id(
        db,
        evidence_id
    )

    if not evidence:
        raise HTTPException(
            status_code=404,
            detail="Evidence not found"
        )

    return evidence

@router.post("/upload")
def upload_file(
    file: UploadFile = File(...)
):
    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "filename": file.filename,
        "path": file_path
    }

@router.put(
    "/{evidence_id}/review",
    response_model=EvidenceResponse
)
def review_uploaded_evidence(
    evidence_id: int,
    review: EvidenceReview,
    db: Session = Depends(get_db)
):
    evidence = review_evidence(
        db,
        evidence_id,
        review
    )

    if not evidence:
        raise HTTPException(
            status_code=404,
            detail="Evidence not found"
        )

    return evidence