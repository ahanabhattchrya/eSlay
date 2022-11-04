'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
import os
import sys

# Initialize the Mongo connection here
mongoClient = MongoClient('mongo')
db = mongoClient["eSlay"]
# Initialize collections here

userAccts = db["userAccts"] #collection #1: user accounts
itemListings = db["itemListings"] # collection #2: item listings


'''
    In order to successfully put elements into the database. It's
    imperative that everyone knows how the data is formatted. Therefore,
    there will be two formats that will be followed. The first one will
    pertain to the collection userAccts and the second one will pertain to
    the collection itemListings.

    userAccts Format:

    {
        "username" : username, 
        "password" : password, 
        "clientId" : id from client address,
        "totalMade" : total $ made,
        "currBid" : the current bid tbis user holds,
        "cartList" : list of item objects in this users cart,
        "itemsForSale" : items this user put up for sale,
        "itemsPurchased" : items this user has purchased,
        "pointsObtained" : # of points this user has obtained
    }

    
    itemListings Format:

    WORK-IN-PROGRESS (COULD BE USING AN ITEM CLASS)

'''

# Parameters : 
#   collection - collection to input to
#   data - data that needs to be inserted
def insert_data(data, collection):
    '''insert data to collections userAccts and itemListings'''

    
def delete_data():
    '''remove data from collections userAccts and itemListings'''

def update_data():
    '''update data in userAccts and itemListings'''
