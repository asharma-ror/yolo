class UserAlreadyRegisteredError(Exception):
    """ The user is already registered """


class UserNotFoundError(Exception):
    """ The user does not exists """


class InvalidTokenError(Exception):
    """ The user token is not valid """


class InvalidUserAgeError(Exception):
    """ The provided birthday does not satisfy the minimum age constraint """
