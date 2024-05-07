from fastapi import FastAPI
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import jwt
import secrets
app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers = ['*']
)
secret_key = secrets.token_urlsafe(32)
SECRET_KEY = secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 900

class Status(BaseModel):
    message: str


database = {}


class Signup(BaseModel):
    username: str
    password: str


class Login(BaseModel):
    username: str
    password: str

class Todo(BaseModel):
    task : str
    done : bool = False

todos=[]

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


@app.post('/signup')
async def signup(signup_item: Signup):
    hashed_password = hash_password(signup_item.password)
    database[signup_item.username] = hashed_password
    return {"message": "User signed up successfully"}


@app.post('/login')
async def login(login_item: Login):
    if login_item.username in database:
        if verify_password(login_item.password, database[login_item.username]):
            encoded_jwt = jwt.encode({"username": login_item.username}, SECRET_KEY, ALGORITHM)
            return {"token": encoded_jwt}
    return {"message": "Login failed"}

@app.post('/addtodo/')
async def addtodo(todo: Todo):
    todos.append(todo)
    return todo

@app.get("/todos/")
async def read_todos():
    return todos

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    del todos[todo_id]
    return {"message": "Todo deleted successfully"}

@app.get('/')
def index():
    return {"msg":"read from /docs"}