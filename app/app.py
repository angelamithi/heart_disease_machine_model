import numpy as np
from flask import Flask
from flask_cors import CORS
from routes.model import Classification_bp



def create_app():
   app=Flask(__name__)
   app.register_blueprint(Classification_bp)
   CORS(app, resources={r"/api/*": {"origins": "*"}})
   return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)


