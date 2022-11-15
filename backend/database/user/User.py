class User:

    def __init__(self, 
                 username, 
                 password, 
                 clientId,
                 totalMade,
                 currBid,
                 cartList,
                 itemsForSale,
                 itemsPurchased,
                 pointsObtained
                ):

        self.username = username
        self.password = password
        self.clientId = clientId
        self.totalMade = totalMade
        self.currBid = currBid
        self.cartList = cartList
        self.itemsForSale = itemsForSale
        self.itemsPurchased = itemsPurchased
        self.pointsObtained = pointsObtained
