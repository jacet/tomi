from typing import Union

from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from api.chatgpt import ChatGPT

router = APIRouter()

chat = ChatGPT()



@router.get("/")
async def read_root():
    return {"Hello": "World"}

@router.get("/chat/message/{prompt}")
def read_chat(prompt:str):
    return chat.getResponse(prompt)

@router.get("/chat/new")
def new_chat():
    return chat.newConversation()
@router.get("/chat/persona")
def get_persona():
    return chat.getPersona()



#    Test APIS
class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None
@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
@router.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}



app = FastAPI()
app.include_router(router, prefix="/api")