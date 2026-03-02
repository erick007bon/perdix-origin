import os
import json
import numpy as np

print("Forzando creacion de Dummies para Hugging Face...")

os.makedirs("models", exist_ok=True)

# 1. Keras Dummy
from keras.models import Sequential
from keras.layers import Dense, Flatten, Input

model = Sequential([
    Input(shape=(1, 32, 32, 32)),
    Flatten(),
    Dense(128, activation='relu') 
])

model.save("models/alzheimer_cnn_extractor.keras")
model.save("models/alzheimer_cnn_extractor.h5")
print("✅ Keras Dummies creados en /models")

# 2. XGBoost Dummy JSON
xgboost_dummy = {
  "learner": {
    "attributes": {},
    "feature_names": [],
    "feature_types": [],
    "gradient_booster": {
      "model": {
        "gbtree_model_param": {
          "num_trees": "0",
          "size_leaf_vector": "0"
        },
        "tree_info": [],
        "trees": []
      },
      "name": "gbtree"
    },
    "learner_model_param": {
      "base_score": "5E-1",
      "boost_from_average": "1",
      "num_class": "3",
      "num_feature": "131"
    },
    "objective": {
      "name": "multi:softprob",
      "softmax_multiclass_param": {
        "num_class": "3"
      }
    }
  },
  "version": [
    2,
    0,
    3
  ]
}

with open("models/alzheimer_fusion_xgb.json", "w") as f:
    json.dump(xgboost_dummy, f, indent=2)

print("✅ XGBoost JSON Dummy creado en /models")
print("💯 Listo. Arrastra esta carpeta a HuggingFace.")
