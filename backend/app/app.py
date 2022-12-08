# Imports
from flask import Flask, send_from_directory, jsonify, render_template, request
import json
from flask_cors import CORS
import os
import sys
import hashlib
import jwt

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
    # decodes the username and password given and check if in database
    dictUser = json.loads((request.data).decode())
    haveUser = database.get_user(dictUser["username"])
    
    #print("")
    
    # salted entered password 
    enteredPassword = dictUser["password"].encode()
    enteredPassword += database.theSalt
    enterPassword = hashlib.sha256(enteredPassword).digest()
    
    #print("Database password: " + str(haveUser.password) + "\n")
    #print("Entered password: " + str(enteredPassword) + "\n")
    
    if enteredPassword == haveUser.password:
        # give token to user
        token = JWT(None, dictUser["username"], None)
        return token 
    else:
        # return dictionary with error 404 code. Error password not the same 
        return {"404" : "Error: Password is not the same"}
    
    # return app.send_static_file()

#for the get and post request

if __name__ == "__main__":
    app.run("0.0.0.0", 3000)