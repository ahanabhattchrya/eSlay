'''
    This file will handle all of the custom errors/exceptions we'd like to raise.
'''

class AlreadyInDatabase(Exception):
    """
        Exception raised when the username already exists. (We don't want duplicate usernames)

        Attributes:

        username -- the username that caused the error
        message -- explanation of the error
    """

    def __init__(self, username: str, message: str = f"The username already exists. Please choose a different one.") -> None:
        self.username = username
        self.message = message
        
        super().__init__(self.message)

    def __str__(self) -> str:
        return f'{self.username} -> {self.message}'