from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from fastapi.staticfiles import StaticFiles  # type: ignore
from app.routers import animal_detect  # animal-only detect router

app = FastAPI(title="Object Counting Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict to frontend domain if needed
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    animal_detect.router,
    prefix="/animal",
    tags=["Animal Detection"]
)


app.mount("/output", StaticFiles(directory="output"), name="output")
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn  # type: ignore
    uvicorn.run(
        "app.main:app",  # adjust if your main.py location differs
        host="0.0.0.0",
        port=8000,
        reload=True
    )
