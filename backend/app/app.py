# Imports
from flask import Flask, send_from_directory, jsonify, render_template, request
import json
from flask_cors import CORS
import os
import sys

# Adding all files for imports
sys.path.append('/frontend/backend/database')
sys.path.append('/frontend/backend/database/exceptions')
sys.path.append('/frontend/backend/database/user')

# Adding imports from files
import database
import exceptions
import User


app = Flask(__name__, static_folder='../build/static', template_folder='../build/')
CORS(app)

#for the homepage html
@app.route('/')
def html():
    return render_template("index.html")


@app.route("/<path:path>")
def static_proxy(path):
    ''' This will serve the static files needed for our site '''
    file_name = path.split("/")[-1]
    directory_name = os.path.join(app.static_folder, "/".join(path.split("/")[:1]))
    return send_from_directory(directory_name, file_name)

#for the front end js
@app.route('/frontendjs')
def frontendjs():
    pass
    # return app.send_static_file("frontend.js")

@app.route('/login', methods=["POST"])
def login(): 
    # print(request.data)
    dictUser = json.loads((request.data).decode())
    print(database.userAccts)
    pass
    # return app.send_static_file()

#for the get and post request

if __name__ == "__main__":
    app.run("0.0.0.0", 3000)