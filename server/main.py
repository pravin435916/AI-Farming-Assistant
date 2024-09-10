import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Load the model
try:
    MODEL = tf.keras.models.load_model("./model/Potato_model.keras")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Class names for the prediction
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# Function to read file as image
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

# Route to predict the class of the image
@app.post("/predict/potato")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image_data = await file.read()
        image = read_file_as_image(image_data)
        
        # Ensure image is valid
        if image.ndim != 3:
            return JSONResponse(content={"error": "Invalid image format"}, status_code=400)
        
        # Prepare the image for prediction
        img_batch = np.expand_dims(image, 0)
    
        # Make predictions
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
    
        # Return the result as JSON
        return JSONResponse(content={
            'class': predicted_class,
            'confidence': float(confidence)
        })
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# To run the app with uvicorn, use the command below
# uvicorn main:app --reload
