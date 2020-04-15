from dynamic_conf import Config


class CONFIG(Config):
    """singleton to be used for configuring from os.environ and env.py"""

    MONGO_DB_NAME = "wigo-crawler-store"
    MONGO_DB_HOST = "127.0.0.1"
    REDIS_PORT = 6379
    REDIS_HOST = "localhost"
