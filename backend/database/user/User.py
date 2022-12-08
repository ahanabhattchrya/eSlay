class User:

    def __init__(self, 
                 username, 
                 password,
                 email,
                 clientId,
                 totalMade,
                 currBid,
                 cartList,
                 itemsForSale,
                 itemsPurchased,
                 pointsObtained,
                 salt
                ):

        self.username = username
        self.password = password
        self.email = email
        self.clientId = clientId
        self.totalMade = totalMade
        self.currBid = currBid
        self.cartList = cartList
        self.itemsForSale = itemsForSale
        self.itemsPurchased = itemsPurchased
        self.pointsObtained = pointsObtained
        self.salt = salt