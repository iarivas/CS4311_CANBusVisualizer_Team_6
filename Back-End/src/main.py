from fastapi import FastAPI
from routers import projectManager, packetManager, nodeManager
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projectManager.router)
app.include_router(packetManager.router)
app.include_router(nodeManager.router)

@app.get("/")
async def root():
    return{"message": "application started..."}