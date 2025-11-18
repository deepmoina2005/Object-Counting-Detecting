from pymongo import MongoClient # pyright: ignore[reportMissingImports]

client = MongoClient("mongodb://localhost:27017/")
db = client["object_detection_db"]
collection = db["detections"]