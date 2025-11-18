from fastapi import APIRouter, UploadFile, File
from app.database import collection
from ultralytics import YOLO
import cv2
import numpy as np
import uuid
from datetime import datetime
import os

router = APIRouter()
os.makedirs("output", exist_ok=True)

model = YOLO("yolov8n.pt")

ANIMAL_CLASSES = [
    "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe",
    "antelope", "bat", "beaver", "bison", "boar", "buffalo", "camel", "canary", "capybara",
    "caribou", "cheetah", "chimpanzee", "chipmunk", "cougar", "coyote", "crab", "deer",
    "dolphin", "donkey", "dove", "duck", "eagle", "ferret", "fox", "frog", "gazelle", "goat",
    "goldfish", "hamster", "hedgehog", "hippopotamus", "hummingbird", "kangaroo", "koala",
    "leopard", "lion", "lizard", "llama", "lobster", "monkey", "moose", "mouse", "otter",
    "owl", "panda", "parrot", "penguin", "pig", "platypus", "polar bear", "porcupine",
    "rabbit", "raccoon", "rat", "reindeer", "rhinoceros", "seagull", "seal", "shark",
    "sheepdog", "skunk", "sloth", "snake", "squirrel", "swan", "tiger", "tortoise", "turkey",
    "turtle", "walrus", "weasel", "whale", "wolf", "wombat", "woodpecker", "yak"
]

ANIMAL_NAME_MAP = {
    "birds": "bird",
    "doves": "dove",
    "seagulls": "seagull",
    "hummingbirds": "hummingbird",
    "parrots": "parrot",
    "cats": "cat",
    "dogs": "dog",
    "sheepdogs": "sheepdog",
    "horses": "horse",
    "elephants": "elephant",
    "bears": "bear",
    "cows": "cow",
    "zebras": "zebra",
    "giraffes": "giraffe",
    "hippopotamuses": "hippopotamus",
    "rhinoceroses": "rhinoceros",
    "mooses": "moose",
    "wolves": "wolf",
    "lions": "lion",
    "tigers": "tiger",
    "leopards": "leopard",
    "kangaroos": "kangaroo",
    "koalas": "koala",
    "pandas": "panda",
    "wombats": "wombat",
    "camels": "camel",
    "buffalos": "buffalo",
    "bison": "bison",
    "boars": "boar",
    "antelopes": "antelope",
    "reindeers": "reindeer",

    "mice": "mouse",
    "rats": "rat",
    "squirrels": "squirrel",
    "chipmunks": "chipmunk",
    "ferrets": "ferret",
    "otters": "otter",
    "beavers": "beaver",
    "raccoons": "raccoon",
    "skunks": "skunk",
    "sloths": "sloth",
    "hedgehogs": "hedgehog",
    "hamsters": "hamster",
    "platypuses": "platypus",

    "frogs": "frog",
    "snakes": "snake",
    "lizards": "lizard",
    "turtles": "turtle",
    "tortoises": "tortoise",

    "dolphins": "dolphin",
    "whales": "whale",
    "sharks": "shark",
    "seals": "seal",
    "lobsters": "lobster",
    "crabs": "crab",
    "goldfishes": "goldfish",

    "owls": "owl",

    "horses": "horse",
    "llamas": "llama",
    "caribous": "caribou",
    "cougars": "cougar",
    "coyotes": "coyote",
    "chimps": "chimpanzee",
    "chimpanzees": "chimpanzee",
    "eagles": "eagle",
    "turkeys": "turkey",
    "woodpeckers": "woodpecker",
    "ferrets": "ferret",
    "capybaras": "capybara",
    "polar bears": "polar bear",
    "porcupines": "porcupine",
    "gazelles": "gazelle",
    "goats": "goat",
}


@router.post("/animal-detect")
async def animal_detect(file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        npimg = np.frombuffer(img_bytes, np.uint8)
        if npimg.size == 0:
            return {"status": False, "error": "Invalid image"}

        image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        if image is None:
            return {"status": False, "error": "Failed to decode image"}

        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = model(rgb, imgsz=640, conf=0.25)[0]

        detected_animals = {}
        output = rgb.copy()

        for box in results.boxes:
            cls_id = int(box.cls[0].item()) if hasattr(box.cls, "__getitem__") else int(box.cls)
            label = results.names[cls_id].lower()

            label = ANIMAL_NAME_MAP.get(label, label)

            if label not in ANIMAL_CLASSES:
                continue

            detected_animals[label] = detected_animals.get(label, 0) + 1
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            cv2.rectangle(output, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(output, label, (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        file_id = f"{uuid.uuid4()}.jpg"
        out_path = f"output/{file_id}"
        cv2.imwrite(out_path, cv2.cvtColor(output, cv2.COLOR_RGB2BGR))
        image_url = f"http://localhost:8000/output/{file_id}"

        collection.insert_one({
            "_id": str(uuid.uuid4()),
            "file_name": file.filename,
            "saved_image": file_id,
            "image_url": image_url,
            "animals": detected_animals,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        return {"status": True, "animals": detected_animals, "annotated_image": image_url}

    except Exception as e:
        return {"status": False, "error": str(e)}
