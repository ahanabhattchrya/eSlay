'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
import User
import exceptions
import os
import sys
import bcrypt
import hashlib

# Initialize the Mongo connection here
mongoClient = MongoClient('mongo')
db = mongoClient["eSlay"]
# Initialize collections here

userAccts = db["userAccts"] #collection #1: user accounts
itemListings = db["itemListings"] # collection #2: item listings

theSalt = bcrypt.gensalt()

# Custom Functions For Encoding and Decoding

# Encoding and Decoding User Custom Classes
def userCustomEncode(user):
    return {"_type": "user", 
            "username": user.username,
            "password" : user.password,
            "email" : user.email,
            "clientId" : user.clientId,
            "totalMade" : user.totalMade,
            "currBid" : user.currBid,
            "cartList" : user.cartList,
            "itemsForSale" : user.itemsForSale,
            "itemsPurchased" : user.itemsPurchased,
            "pointsObtained" : user.pointsObtained,
            "salt": user.salt,
            "token": user.token}

def userCustomDecode(document):
    assert document["_type"] == "user"
    return User.User(document["username"],
                     document["password"],
                     document["email"],
                     document["clientId"],
                     document["totalMade"],
                     document["currBid"],
                     document["cartList"],
                     document["itemsForSale"],
                     document["itemsPurchased"],
                     document["pointsObtained"],
                     document["salt"],
                     document["token"]
    )

def update_password(username, newPassword):
    '''change password when given username and new password'''
    global theSalt
    
    #salt & hash password
    newPassword = newPassword.encode
    newPassword += theSalt
    hashedPassword = hashlib.sha256(newPassword).digest()
    
    # finds user and updates the password
    user = userAccts.find({"username" : username}, {"_id" : 0})
    user.password = hashedPassword
    
    # we don't know whether or not the password is actual being updated
    userAccts.update_one({"username" : username}, {'$set' : {"user" : user}})

def insert_data(data, collection):
    '''insert data to collections userAccts and itemListings'''
    
    global theSalt

    if collection == 1:

        all_users = userAccts.find({})
        if data["username"] in all_users:
            raise exceptions.AlreadyInDatabase(data["username"])

        new_user = {}
        new_user["username"] = data["username"]

        # Salt and hash password here
        if len(data["password"]) < 10:
            raise exceptions.PasswordTooShort(data["password"])
        password = data["password"].encode()
        password += theSalt
        password = hashlib.sha256(password).digest()
        

        new_user_object = User.User(
            data["username"],
            password,
            data["email"], 
            data["clientId"],
            data["totalMade"],
            data["currBid"],
            data["cartList"],
            data["itemsForSale"],
            data["itemsPurchased"],
            data["pointsObtained"],
            theSalt,
            data["token"]
        )

        new_user["user"] = userCustomEncode(new_user_object)
        
        userAccts.insert_one(new_user)
    else:
        pass
    
    return 0
    
def delete_data(username, collection):
    '''remove data from collections userAccts and itemListings'''
    
    if collection == 1:
        all_data = userAccts.find({})        
        if username in all_data:
            userAccts.delete_one({"username": username})
        else:
            return "u forgot smth"
            #give custom error
    else:
        pass
    

def update_data():
    '''update data in userAccts and itemListings'''
    

def get_user(username):
    ''' Sees if there's a current user and returns their User object '''
    user = userAccts.find_one({"username" : username}, {"_id" : 0})
    
    if user:
        return userCustomDecode(user["user"])
    else:
        exceptions.UserNotFound(username)
