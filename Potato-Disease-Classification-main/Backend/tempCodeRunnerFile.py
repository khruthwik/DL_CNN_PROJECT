from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model(r"C:\Users\hruth\Downloads\Potato-Disease-Classification-main (3)\Potato-Disease-Classification-main\Model\model_1.keras")
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

@app.get("/test")  
async def ping():
    return "Houston, we are a GO !"

def read_file_as_image(data) -> np.ndarray: #return np.ndarray
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")  
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())   #using await and async, requests can be handled simulataneously 
   
    image_batch = np.expand_dims(image, 0)          #adding another dimension
    prediction = MODEL.predict(image_batch)

    predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    confidence = np.max(prediction[0])

    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host = "localhost", port=8000)