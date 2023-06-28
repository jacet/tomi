
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

print('Python: ', platform.python_version())
print("numpy: ", np.__version__)
print("scipy: ", scipy.__version__)
print("whisper: ", whisper.__version__)
print("requests: ", requests.__version__)


api_key = os.getenv("OPENAI_API_KEY")

class ChatGPT:

    def __init__(self):
        print('test')
        self.openai.api_key = api_key

        pass

    
    def getResponse(self, prompt_request, temprature=0.5):
        print('getResponse')            
        response = self.openai.Completion.create(
                model="text-davinci-003",
                prompt=prompt_request,
                temperature=temprature,
                max_tokens=100,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
        return response
    