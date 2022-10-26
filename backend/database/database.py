'''
    Database file for eSlay app
'''

# Imports
from pymongo import MongoClient
import os
import sys

# Initialize the Mongo connection here
mongo_client = MongoClient('mongo')

# Initialize collections here
