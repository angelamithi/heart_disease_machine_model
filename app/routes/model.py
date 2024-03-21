import pickle
import numpy as np
from flask import Blueprint,make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse


# create classification model  blueprint
Classification_bp = Blueprint('classification_bp', __name__)

# register blueprints with  api

api = Api(Classification_bp)

# Load the classification model
model=pickle.load(open("gs_log_model_1.pkl","rb"))
post_args = reqparse.RequestParser()
post_args.add_argument('name', type=str, required=True,
                       help="name is required")


class ModelPrediction(Resource):
    def get(self):
        #Find a way to grab all the values from the front end 

        #convert all the features into a numpy array
        features=[np.array(all_features)]
        prediction=model.predict(features)
        response = make_response(jsonify(prediction), 200)
        return response
api.add_resource(ModelPrediction,"/predict")