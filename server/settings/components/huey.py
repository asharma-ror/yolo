# https://huey.readthedocs.io/en/latest/contrib.html
from django.conf import settings
from huey import RedisHuey
from redis import ConnectionPool

from server.conf import CONFIG

pool = ConnectionPool(
    host=CONFIG.REDIS_HOST, port=CONFIG.REDIS_PORT, max_connections=10
)
HUEY = RedisHuey(
    name=CONFIG.POSTGRES_DB,  # Use db name for huey.
    connection_pool=pool,
    results=True,  # Store return values of tasks.
    # store_none= False,  # If a task returns None, do not save to results.
    immediate=(settings.DEBUG),  # run like regular functions during development
    # utc=True,  # Use UTC for all times internally.
    blocking=True,  # Perform blocking pop rather than poll Redis.
)
