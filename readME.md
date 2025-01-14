# Farmer Ally

## Problem Definition
Traditional farming practices often involve manual efforts at various stages, from crop selection to monitoring growth. The project aims to develop an automated system, **Farmer Ally**, to assist farmers throughout the farming process. By providing features such as nearby soil testing labs, crop recommendations, and plant disease detection, Farmer Ally aims to enhance farming efficiency, reduce manual labor, and provide actionable insights to farmers.

---

## Comprehensive Farming Assistance

### Soil Testing
- **Feature**: Provide a map of nearby soil testing laboratories.

### Disease Detection and Management
- **Disease Detection**: Use image analysis to detect plant diseases and recommend suitable pesticides.
- **Pest Management**: Provide targeted recommendations for pest control based on detected diseases.

### Weather Integration
- **Real-Time Weather Updates**: Provide real-time weather parameters and alerts based on location.

---

## Functional Specifications [Deliverables]

1. Display nearby soil testing laboratories on a map.
2. Implement plant disease detection from leaf images and provide pesticide recommendations.
3. Provide real-time weather parameters, including temperature and humidity, along with location-based alerts.

---

## Technology Stack

### Frontend
- React

### Backend
- Node.js

### Machine Learning
- TensorFlow, Keras

### Database
- MongoDB

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Python (for TensorFlow and Keras)

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FarmerAlly.git
   cd FarmerAlly
   ```
2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
5. Start the frontend server:
   ```bash
   npm start
   ```
6. Set up the machine learning models:
   - Place the trained TensorFlow/Keras models in the appropriate directory (e.g., `backend/models`).

---

## Future Scope

1. Crop recommendation from soil nutrition and weather data of the current location.
2. Gamified plant growth monitoring.
3. Plant disease detection from leaves images and pesticides recommendation.
4. Price prediction of crops based on location.
5. Connect with experts via video call.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch:
   ```bash
   git commit -m "Description of your changes"
   git push origin feature-name
   ```
4. Submit a pull request.

---


