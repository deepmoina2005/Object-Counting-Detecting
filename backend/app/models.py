from pydantic import BaseModel # pyright: ignore[reportMissingImports]
from typing import Dict

class Detection(BaseModel):
    file_name: str
    saved_image: str
    image_url: str
    objects: Dict[str, int]
    timestamp: str
