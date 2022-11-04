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
'''

def insert_data():
    '''insert data to collections userAccts and itemListings'''

def delete_data():
    '''remove data from collections userAccts and itemListings'''

def update_data():
    '''update data in userAccts and itemListings'''
