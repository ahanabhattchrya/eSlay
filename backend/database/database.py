'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
from user import User
from exceptions import exceptions
import os
import sys

# Initialize the Mongo connection here
mongoClient = MongoClient('mongo')
db = mongoClient["eSlay"]
# Initialize collections here

userAccts = db["userAccts"] #collection #1: user accounts
itemListings = db["itemListings"] # collection #2: item listings


def insert_data(data, collection):
    '''insert data to collections userAccts and itemListings'''

    if collection == 1:

        all_users = userAccts.find({})
        if data["username"] in all_users:
            raise exceptions.AlreadyInDatabase(data["username"])

        new_user = {}
        new_user["username"] = data["username"]

        # Salt and hash password here
        if len(data["password"] < 10):
            raise exceptions.PasswordTooShort(data["password"])
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

        new_user["user"] = new_user_object
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


def get_user_shopping_cart(username):
    ''' Grabs the user's shopping cart. '''

    the_user = userAccts.find_one({"username": username}, {"_id" : 0})

    if not the_user:
        pass
        # call error that username does not exist
    
    user_object = the_user["user"]

    return user_object.cartList