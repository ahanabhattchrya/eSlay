'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
from user import User
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


def update_password(username, newPassword):
    '''change password when given username and new password'''
    
    #salt & hash password
    salt = bcrypt.genSalt()
    newPassword = newPassword.append(salt)
    hashedPassword = hashlib.sha256(newPassword).digest()
    
    #update passsword in db
    userAccts.update_one({"password": hashedPassword})

def insert_data(data, collection):
    '''insert data to collections userAccts and itemListings'''

    if collection == 1:

        all_users = userAccts.find({})
        if data["username"] in all_users:
            return "error"

        new_user = {}
        new_user["username"] = data["username"]

        # Salt and hash password here
        password = "PLACEHOLDER"

        new_user_object = User(
            data["username"],
            password, 
            data["clientId"],
            data["totalMade"],
            data["currBid"],
            data["cartList"],
            data["itemsForSale"],
            data["itemsPurchased"],
            data["pointsObtained"]
        )

        userAccts.insert_one(new_user)
    else:
        pass
    
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
