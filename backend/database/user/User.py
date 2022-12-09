class User:

    def __init__(self, 
                 username, 
                 password,
                 email,
                 clientId,
                 totalMade,
                 curBid,
                 cartList,
                 itemsForSale,
                 itemsPurchased,
                 pointsObtained,
                 token,
                 salt
                ):

        self.username = username
        self.password = password
        self.email = email
        self.clientId = clientId
        self.totalMade = totalMade
        self.curBid = curBid
        self.cartList = cartList
        self.itemsForSale = itemsForSale
        self.itemsPurchased = itemsPurchased
        self.pointsObtained = pointsObtained
        self.token = token
        self.salt = salt
