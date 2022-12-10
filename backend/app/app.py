# Imports
from flask import Flask, send_from_directory, jsonify, render_template, request, make_response, redirect, url_for
import json
from flask_cors import CORS
import os
import sys
import hashlib
import secrets
import secrets

# Adding all files for imports
sys.path.append('/frontend/backend/database')
sys.path.append('/frontend/backend/database/exceptions')
sys.path.append('/frontend/backend/database/user')
sys.path.append('/frontend/backend/database/item')

# Adding imports from files
import database
import exceptions
import User


app = Flask(__name__, static_folder='../../build/static', template_folder='../../build/')
CORS(app)

#for the homepage html
@app.route('/')
def html():
    return render_template("index.html")


# https://stackoverflow.com/a/50660437
# The above stack overflow link allowed us to utilize React Routing while allowing Flask to handle
# any requests made to the same routes by sending it straight from the directory as a static file the
# same way React woudl. God bless this person.
@app.route('/<path:path>')
def serve(path):
     path_dir = os.path.abspath("../../build") #path react build
     if path != "" and os.path.exists(os.path.join(path_dir, path)):
         return send_from_directory(os.path.join(path_dir), path)
     else:
         return send_from_directory(os.path.join(path_dir),'index.html')


@app.route('/login', methods=["POST"])
def login(): 
    # decodes the username and password given and check if in database
    dictUser = json.loads((request.data).decode())
    haveUser = database.get_user(dictUser["username"])
    
    
    # salted entered password 
    enteredPassword = dictUser["password"].encode()
    enteredPassword += haveUser.salt
    enteredPassword = hashlib.sha256(enteredPassword).digest()

    
    if enteredPassword == haveUser.password:
        # give token to user
        token = secrets.token_hex(32)
        hashedToken = hashlib.sha256(token.encode()).digest()
        
        database.set_token(haveUser.username, hashedToken)
        # make the response and set the cookie to the response 
        
        #resp = make_response(render_template("index.html"))
        resp = redirect(url_for('html'))
        resp.set_cookie("token", token)
        
        # send response back to home page
        return resp
    else:
        # return dictionary with error 404 code. Error password not the same 
        return {"status_code" : 404, "message" : "Error: Password is not the same"}


@app.route('/register', methods=["POST"])
def register(): 
    dictUser = json.loads((request.data).decode())

    email = dictUser['email']
    username = dictUser['username']
    password = dictUser['password']

    data = {
        "username": username, 
        "password": password, 
        "email": email,
        "clientId" : 0,
        "totalMade" : 0,
        "curBid" : 0,
        "cartList" : [],
        "itemsForSale" : [],
        "itemsPurchased" : [],
        "pointsObtained" : 0,
        "token" : None
        }

    database_return = database.insert_data(data, 1)

    if database_return == 0: 
        return {"status_code" : 200, "message" : "Successfully Registered"}
    else: 
        return {"status_code" : 404, "message" : "Error unable to register"}


@app.route('/change-password', methods=["POST"])
def change_password(): 
    dictUser = json.loads((request.data).decode())

    username = dictUser['username']
    password = dictUser['password']

    database_return = database.update_password(username, password)

    haveUser = database.get_user(dictUser['username'])

    if database_return == 0: 
        return {"status_code" : 200, "message" : "Successfully Registered"}
    else: 
        return {"status_code" : 404, "message" : "Error unable to register"}


@app.route('/check-token', methods=["POST"])
def check_token():
    dictUser = json.loads((request.data).decode())

    if "token" not in dictUser.keys():
        return jsonify({"status_code" : 404, "message" : "Error not correct token"})

    user = database.get_user_token(hashlib.sha256(dictUser["token"].encode()).digest())
    
    if user:
        return jsonify({"status_code" : 200,
                "username": user.username,
                "authenticated": True, 
                "points": user.pointsObtained,
                "rewardLevel": user.pointsObtained,
                "totalProfit": user.totalMade})
    else:
        print("error for some reason\n")
        return jsonify({"status_code" : 404, "message" : "Error not correct token"})
        
    
@app.route('/all-items', methods=["GET"])
def all_items():
    items_document = []

    items_database_list = database.get_all_items()

    for n in items_database_list:
        items_document.append(
            {
                "itemId": n.itemId,
                "name": n.name,
                "price": n.price, 
                "description": n.description,
                "status": n.status, 
                "curBid": n.curBid,
                "maxBid": n.maxBid,
                "minBid": n.minBid
            }
        )

    # print(f'these are all the items {items_document}')

    return {"status_code": 200, "item": items_document}    
    

if __name__ == "__main__":
    app.run("0.0.0.0", 3000)