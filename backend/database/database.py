'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
import User
import Item
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
            data["clientId"],
            data["totalMade"],
            data["curBid"],
            data["cartList"],
            data["itemsForSale"],
            data["itemsPurchased"],
            data["pointsObtained"],
            data["token"],
            theSalt
        )

        new_user["user"] = userCustomEncode(new_user_object)
        
        userAccts.insert_one(new_user)
    else:
        all_items = itemListings.find({})
        
        if data["itemId"] in all_items:
            raise exceptions.AlreadyInDatabase(data["itemId"])
        
        new_item = { "itemId" : data["itemId"] }
        
        new_item_object = Item.Item(
            data["itemId"],
            data["name"], 
            data["price"],
            data["description"],
            data["image"],
            data["status"],
            data["currBid"],
            data["maxBid"],
            data["minBid"]
        )

        new_item["item"] = itemCustomEncode(new_item_object)
        
        itemListings.insert_one(new_item)
    
def delete_data(username, collection):
    '''remove data from collections userAccts and itemListings'''
    
    if collection == 1:
        all_data = userAccts.find({})        
        if idGiven in all_data:
            userAccts.delete_one({"username": idGiven})
        else:
            return "no cust error delete_data"
            #give custom error
    else:
        all_data = itemListings.find({})
        if idGiven in all_data:
            itemListings.delete_one({"itemId": idGiven})
        else:
            return "no custom error delete_data"
    

def update_data():
    '''update data in userAccts and itemListings'''
    

def get_user(username):
    ''' Sees if there's a current user and returns their User object '''
    user = userAccts.find_one({"username" : username}, {"_id" : 0})
    
    if user:
        return userCustomDecode(user["user"])
    else:
        exceptions.UserNotFound(username)

def get_item(itemId):
    ''' Sees if there's a current item and returns their Item  object '''
    item = itemListings.find_one({"itemId" : itemId}, {"_id" : 0})
    
    if item:
        return itemCustomDecode(item["item"])
    else:
        exceptions.UserNotFound(itemId)