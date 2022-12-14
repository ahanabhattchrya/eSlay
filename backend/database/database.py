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
itemIdCollect = db["itemId"]

theSalt = bcrypt.gensalt()

# Get the next id in the items collection
def get_next_id():
    id_object = itemIdCollect.find_one({})
    if id_object:
        next_id = int(id_object['last_id']) + 1
        itemIdCollect.update_one({}, {'$set': {'last_id' : next_id}})
        return next_id
    else:
        itemIdCollect.insert_one({"last_id" : 1})
        return 1

# Custom Functions For Encoding and Decoding

# Encoding and Decoding User Custom Classes
def userCustomEncode(user):
    return {"_type": "user", 
            "username": user.username,
            "password" : user.password,
            "email" : user.email,
            "clientId" : user.clientId,
            "totalMade" : user.totalMade,
            "curBid" : user.curBid,
            "cartList" : user.cartList,
            "itemsForSale" : user.itemsForSale,
            "itemsPurchased" : user.itemsPurchased,
            "pointsObtained" : user.pointsObtained,
            "salt": user.salt}

def userCustomDecode(document):
    assert document["_type"] == "user"
    return User.User(document["username"],
                    document["password"],
                    document["email"],
                    document["clientId"],
                    document["totalMade"],
                    document["curBid"],
                    document["cartList"],
                    document["itemsForSale"],
                    document["itemsPurchased"],
                    document["pointsObtained"],
                    document["salt"]
    )

def itemCustomEncode(item):
    return {"_type": "item", 
            "itemId": item.itemId,
            "name" : item.name,
            "price" : item.price,
            "description" : item.description,
            "image" : item.image,
            "status" : item.status,
            "curBid" : item.curBid,
            "maxBid" : item.maxBid,
            "minBid" : item.minBid,
            "userSelling" : item.userSelling
            }

def itemCustomDecode(document):
    assert document["_type"] == "item"
    return Item.Item(document["itemId"],
                    document["name"],
                    document["price"],
                    document["description"],
                    document["image"],
                    document["status"],
                    document["curBid"],
                    document["maxBid"],
                    document["minBid"],
                    document["userSelling"]
    )

def update_password(username, newPassword):
    '''change password when given username and new password'''
    global theSalt
    
    #salt & hash password
    newPassword = newPassword.encode()
    newPassword += theSalt
    hashedPassword = hashlib.sha256(newPassword).digest()
    
    # finds user and updates the password
    user = userAccts.find_one({"username" : username}, {"_id" : 0})
    user = userCustomDecode(user["user"])
    user.password = hashedPassword
    user.salt = theSalt

    # we don't know whether or not the password is actual being updated
    userAccts.update_one({"username" : username}, {'$set' : {"user" : userCustomEncode(user)}})
    
    return 0

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
            data["curBid"],
            data["cartList"],
            data["itemsForSale"],
            data["itemsPurchased"],
            data["pointsObtained"],
            theSalt,
        )

        new_user["user"] = userCustomEncode(new_user_object)
        
        userAccts.insert_one(new_user)
    else:
        all_items = itemListings.find({})
        
        itemId = get_next_id()
        
        new_item = { "itemId" : itemId }
        
        new_item_object = Item.Item(
            itemId,
            data["name"], 
            data["price"],
            data["description"],
            data["image"],
            1,
            None,
            None,
            None,
            data["usernameSelling"]
        )

        new_item["item"] = itemCustomEncode(new_item_object)
        
        itemListings.insert_one(new_item)
        return new_item["item"]
    
def delete_data(idGiven, collection):
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
    

### ALL GET FUNCTIONS ARE UNDER THIS LINE


##### All OF THESE WILL BE THE GET FUNCTIONS FOR USERS #####

def get_user(username):
    ''' Sees if there's a current user and returns their User object '''
    user = userAccts.find_one({"username" : username}, {"_id" : 0})
    
    if user:
        return userCustomDecode(user["user"])
    else:
        exceptions.UserNotFound(username)


def get_user_token(token):
    user = userAccts.find_one({"token" : token}, {"_id": 0})
    print(f"get_user_token: {user}")
    if user:
        return userCustomDecode(user["user"])
    else:
        pass
    

def set_token(username, token):
    user = userAccts.find_one({"username": username}, {"_id": 0})
    if user:
        userAccts.update_one({"username" : username}, {'$set' : {"token" : token}})
        return
    else:
        pass


#This returns a [item, item, ... ]
def get_user_shopping_cart(username):
    ''' Grabs the user's shopping cart. '''

    the_user = userAccts.find_one({"username": username}, {"_id" : 0})

    if not the_user:
        raise exceptions.UserNotFound(username)
        # call error that username does not exist

    user_object = userCustomDecode(the_user["user"])

    cartList = []

    for n in user_object.cartList:
        cartList.append(itemCustomDecode(n))

    return cartList


def get_items_for_sale(username):
    ''' Gets the users items that they're selling '''

    the_user = userAccts.find_one({"username" : username}, {"_id" : 0})

    if not the_user:
        raise exceptions.UserNotFound(username)
    
    user_object = userCustomDecode(the_user["user"])

    itemsForSale = []

    for n in user_object.itemsForSale:
        itemsForSale.append(itemCustomDecode(n))

    return itemsForSale


def empty_shopping_cart(username):
    ''' Empties the user's shopping cart and moves them into purchased '''

    user = userAccts.find_one({"username" : username}, {"_id" : 0})

    if user:
        user = userCustomDecode(user["user"])

        for item in user.cartList: 
            user.itemsPurchased.append(item)
        
        user.cartList = []


        userAccts.update_one({"username" : username}, {'$set' : {"user" : userCustomEncode(user)}})

    else:
        raise exceptions.UserNotFound(username)
    

def update_sellings(user, newItem):
    ''' Updates the selling items for the specific user. '''
    username = user.username

    user.itemsForSale.append(newItem)

    userAccts.update_one({"username" : username}, {'$set' : {'user' : userCustomEncode(user)}})


def add_item_to_cart(username, userObject, itemObject, userSelling):

    currItemObject = itemObject
    currItemObject.status = 0
    # Handle changing up the user whos selling this items list
    sellerUser = userSelling
    for item in sellerUser.itemsForSale:
        if item["itemId"] == currItemObject.itemId:
            item["status"] = 0
    userAccts.update_one({"username" : userSelling.username}, {'$set': {"user" : userCustomEncode(sellerUser)}})

    userObject.cartList.append(itemCustomEncode(currItemObject))

    itemListings.delete_one({"itemId": itemObject.itemId})

    userAccts.update_one({"username" : username}, {'$set' : {"user" : userCustomEncode(userObject)}})

    return 0


##### ALL OF THESE WILL BE THE GET FUNCTIONS FOR ITEMS #####


def get_item(itemId):
    ''' Sees if there's a current item and returns their Item  object '''
    item = itemListings.find_one({"itemId" : itemId}, {"_id" : 0})
    
    if item:
        return itemCustomDecode(item["item"])
    else:
        exceptions.UserNotFound(itemId)


def get_all_items(): 
    cursor = itemListings.find({})

    item_list = []

    if cursor.explain().get("executionStats", {}).get("nReturned") == 0:
        return item_list

    for n in cursor:
        print(n)
        item_list.append(itemCustomDecode(n["item"]))

    return item_list


def get_purchased_history_items(username):
    user = userAccts.find_one({"username" : username}, {"_id" : 0})
    if user:
        user = userCustomDecode(user["user"])
        if user.itemsPurchased != []:
            newList = []
            for i in user.itemsPurchased:
                item = itemCustomDecode(i)
                newList.append(item)
            return newList
        else:
            return []
    else:
        raise exceptions.UserNotFound(username)