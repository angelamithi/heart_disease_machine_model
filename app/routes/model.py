import pickle
import numpy as np

from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, reqparse

# create classification model blueprint
Classification_bp = Blueprint('classification_bp', __name__)

# register blueprints with api
api = Api(Classification_bp)

# Load the classification model
model = pickle.load(open("../gs_log_reg_model_6.pkl", "rb"))


post_args = reqparse.RequestParser()
post_args.add_argument('age', type=float, required=True, help="age is required")
post_args.add_argument('sex', type=str, required=True, help="sex is required (male or female)")
post_args.add_argument('cp', type=float, required=True, help="cp is required")
post_args.add_argument('trestbps', type=float, required=True, help="trestbps is required")
post_args.add_argument('chol', type=float, required=True, help="chol is required")
post_args.add_argument('fbs', type=float, required=True, help="fbs is required (fasting blood sugar in mg/dl)")
post_args.add_argument('restecg', type=float, required=True, help="restecg is required")
post_args.add_argument('thalach', type=float, required=True, help="thalach is required")
post_args.add_argument('exang', type=str, required=True, help="exang is required (yes or no)")
post_args.add_argument('oldpeak', type=float, required=True, help="oldpeak is required")
post_args.add_argument('slope', type=float, required=True, help="slope is required")
post_args.add_argument('ca', type=float, required=True, help="ca is required")
post_args.add_argument('thal', type=float, required=True, help="thal is required")

class Home(Resource):
    def get(self):
        return "Heart Disease Prediction Model"
api.add_resource(Home,"/")

class ModelPrediction(Resource):
    def post(self):
        args = post_args.parse_args()
        
        # Mapping sex to 1 (male) or 0 (female)
        sex = 1 if args['sex'].lower() == 'male' else 0
        
        # Mapping fbs > 120 mg/dl to 1 and fbs <= 120 mg/dl to 0
        fbs = 1 if args['fbs'] > 120 else 0
        
        # Mapping exang to 1 (yes) or 0 (no)
        exang = 1 if args['exang'].lower() == 'yes' else 0
        
        # Inserting variables into all_features array
        all_features = [
            args['age'], 
            sex,
            args['cp'],
            args['trestbps'],
            args['chol'],
            fbs,
            args['restecg'],
            args['thalach'],
            exang,
            args['oldpeak'],
            args['slope'],
            args['ca'],
            args['thal']
        ]
        
        features = np.array([all_features])
        prediction = model.predict(features)
        # Convert prediction to a Python list
        prediction_list = prediction.tolist()
        response = make_response(jsonify(prediction_list), 200)
        return response

api.add_resource(ModelPrediction, "/predict")
