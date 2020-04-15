import pytest


@pytest.fixture(scope="function")
def mdb():
    """easy handling of models during tests"""
    import db

    db.connect()
    yield db
    db.me.disconnect()
