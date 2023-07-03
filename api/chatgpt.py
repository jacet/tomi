
from base64 import b64decode
import numpy as np
import scipy
from scipy.io.wavfile import read as wav_read
import io
import ffmpeg
import whisper
import openai
import platform
import os
import requests
from enum import Enum

print('Python: ', platform.python_version())
print("numpy: ", np.__version__)
#print("scipy: ", scipy.__version__)
print("whisper: ", whisper.__version__)
print("requests: ", requests.__version__)

# Global Variables
api_key = os.getenv("OPENAI_API_KEY")

class ChatRole(Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"
class ChatSystemPersona(Enum):
    TOMI_DEFAULT = "You are a witty, succient and efficiently helpful assistant with a sharp sense of humor. Keep your responses short and to the point."
    TOMI_KIDS = "You are a cheerful and fun childrens assistant. Keep your responses short and to the point, tailored for 8 year olds and under with simple concepts that are easily relatable to children."


class ChatGPT:
    current_persona : ChatSystemPersona 
    converstaion : list= []

    def __init__(self, system_role=ChatSystemPersona.TOMI_DEFAULT):
        #print('API Key:' + api_key)
        openai.api_key = api_key
        self.current_persona = system_role
        

    def createMessage(self, role: ChatRole, content: str):
        return {
            "role": role.value,
            "content": content
        }

    def newConversation(self):
        self.converstaion.clear()
        return f"New converstaion with {self.current_persona.value}"
    def changePersona(self, persona : ChatSystemPersona):
        self.current_persona = persona
        return self.newConversation()
    def getPersona(self):
        return [persona.name for persona in ChatSystemPersona]

    def getResponse(self, prompt: str):
        print('getResponse')        

        if len(self.converstaion) == 0:
            self.converstaion.append(self.createMessage(ChatRole.SYSTEM, self.current_persona.value))
        self.converstaion.append(self.createMessage(ChatRole.SYSTEM, self.current_persona.value))
        self.converstaion.append(self.createMessage(ChatRole.USER, prompt))
            
        response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=self.converstaion,
                temperature=0.5,
                max_tokens=1024,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
        
        response_message = response["choices"][0]["message"] # type: ignore

        self.converstaion.append(response_message)

        return response_message["content"]
    