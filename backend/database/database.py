'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
from user import User
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

def delete_data():
    '''remove data from collections userAccts and itemListings'''

def update_data():
    '''update data in userAccts and itemListings'''
