# app/routers/detect.py
from fastapi import APIRouter, UploadFile, File, WebSocket, WebSocketDisconnect
from app.database import collection
from ultralytics import YOLO
import cv2
import numpy as np
import uuid
from datetime import datetime
import os
import base64

router = APIRouter()

# Ensure output folder exists
os.makedirs("output", exist_ok=True)

# Load YOLOv8 nano model for speed
model = YOLO("yolov8n.pt")


# -------------------------
# Upload image & detect
# -------------------------
@router.post("/detect")
async def detect(file: UploadFile = File(...)):
    try:
        # Read image bytes
        img_bytes = await file.read()
        npimg = np.frombuffer(img_bytes, np.uint8)
        image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        # Run YOLO detection
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = model(rgb, imgsz=640, conf=0.25)[0]

        detected_objects = {}
        output = rgb.copy()

        for box in results.boxes:
            cls_id = int(box.cls)
            label = results.names[cls_id]
            detected_objects[label] = detected_objects.get(label, 0) + 1

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(output, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(output, label, (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        # Save annotated image
        file_id = f"{uuid.uuid4()}.jpg"
        out_path = f"output/{file_id}"
        cv2.imwrite(out_path, cv2.cvtColor(output, cv2.COLOR_RGB2BGR))
        image_url = f"http://localhost:8000/output/{file_id}"

        # Save detection to DB
        collection.insert_one({
            "_id": str(uuid.uuid4()),
            "file_name": file.filename,
            "saved_image": file_id,
            "image_url": image_url,
            "objects": detected_objects,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        return {"status": True, "objects": detected_objects, "annotated_image": image_url}

    except Exception as e:
        return {"status": False, "error": str(e)}


# -------------------------
# Get all previous detections
# -------------------------
@router.get("/detections")
def get_all():
    data = list(collection.find({}, {"_id": 0}))
    return {"status": True, "total": len(data), "data": data}
