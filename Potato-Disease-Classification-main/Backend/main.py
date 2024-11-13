from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Load the model
try:
    MODEL = tf.keras.models.load_model(r"C:\Users\hruth\Downloads\Potato-Disease-Classification-main (3)\Potato-Disease-Classification-main\Model\model_1.keras")
    CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

@app.get("/test")
async def ping():
    return {"message": "Houston, we are a GO!"}

def read_file_as_image(data: bytes) -> np.ndarray:
    try:
        image = Image.open(BytesIO(data))
        image = image.resize((256, 256))  # Optional: resize to match model's expected input
        return np.array(image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image reading error: {e}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = read_file_as_image(image_data)
        image_batch = np.expand_dims(image, 0)

        # Predicting class
        prediction = MODEL.predict(image_batch)
        predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
        confidence = np.max(prediction[0])

        return {
            'class': predicted_class,
            'confidence': float(confidence)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
