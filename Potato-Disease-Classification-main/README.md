# Potato-Disease-Classification

This project introduces a Potato Disease Classification Model, made using advanced Convolutional Neural Networks (CNN).

# Aim
To ensure precise detection of 2 diseases affecting potato crops:
1. Early Blight
2. Late Blight

# Dataset
A comprehensive dataset was taken from Kaggle.

**Data Allocations:**

 -> Training - 80%
 -> Validation - 10%
 -> Testing - 10%
 
Dataset Link: https://www.kaggle.com/datasets/arjuntejaswi/plant-village

# Pre-processing 
Prior to training, the dataset underwent a rigorous preprocessing phase to optimize model performance. Some of the key steps included image normalization to scale pixel values and data augmentation to artificially expand the training dataset with transformed images. Furthermore, the implementation of cache and prefetching techniques allowed for more efficient data loading, significantly reducing training time.

# Training
The result, of the techniques applied, was a highly accurate CNN model, which demonstrated an impressive 92% accuracy rate in classifying potato diseases. This level of precision underscores the model's capability in accurately diagnosing diseases, thereby aiding in timely and effective disease management in potato crops.

# Frontend
Used Reactjs for building website and tailwind css for styling the webpage. And the library used for making requests to the backend is axios. 

# Backend
To bring this model into practical use, a backend was developed using FastAPI, a modern, fast (high-performance) web framework for building APIs with Python. This facilitated the creation of a responsive and scalable application, capable of handling real-time disease classification requests. The model was successfully deployed on a local machine, offering users to upload images of potato leaves and receive instant disease classification results. This deployment not only highlighted the model’s potential impact on agricultural practices but also demonstrated the feasibility of integrating advanced machine learning models into practical, real-world applications.
