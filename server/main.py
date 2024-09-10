import numpy as np
from io import BytesIO
from PIL import Image
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",  # Adjust port as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models for different plant types
models = {
    "potato": {
        "model": tf.keras.models.load_model("./model/Potato_model.keras"),
        "class_names": ["Early Blight", "Late Blight", "Healthy"]
    },
    "tomato": {
        "model": tf.keras.models.load_model("./model/Potato_model.keras"),
        "class_names": ["Early Blight", "Late Blight", "Healthy"]
    }
}

# Function to read file as image
def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data))
    image = image.convert("RGB")  # Ensure image is in RGB mode
    return np.array(image)

# Route to predict the class of the image
@app.post("/predict/{plant}")
async def predict(plant: str, file: UploadFile = File(...)):
    # Check if the plant type is valid
    if plant not in models:
        return JSONResponse(content={"error": "Invalid plant type"}, status_code=400)
    
    # Read the uploaded image file
    image_data = await file.read()
    image = read_file_as_image(image_data)
    
    # Ensure image is valid
    if image.ndim != 3:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)
    
    # Prepare the image for prediction
    img_batch = np.expand_dims(image, axis=0)
    
    # Get the appropriate model and class names
    model = models[plant]["model"]
    class_names = models[plant]["class_names"]
    
    # Make predictions
    predictions = model.predict(img_batch)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    # Return the result as JSON
    return JSONResponse(content={
        'class': predicted_class,
        'confidence': float(confidence)
    })

# To run the app with uvicorn, use the command below
# uvicorn main:app --reload
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
