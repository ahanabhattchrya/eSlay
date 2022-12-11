class Item:

    def __init__(self, itemId, 
                name, 
                price,
                description,
                image,
                status, # 0 = sold (not at auction), 
                        # 1 = unsold (not at auction), 
                        # 2 = sold (at auction), 
                        # 3 = unsold (not at auction)
                curBid = None,
                maxBid = None,
                minBid = None,
                userSelling=""
                ):

        self.itemId = itemId
        self.name = name
        self.price = price
        self.description = description
        self.image = image
        self.status = status
        self.curBid = curBid
        self.maxBid = maxBid
        self.minBid = minBid
        self.userSelling = userSelling