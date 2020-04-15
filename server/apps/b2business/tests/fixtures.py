import pytest


@pytest.fixture
def b2b_user(django_user_model):
    username = "b2b_user"
    password = "password"
    return django_user_model.objects.create_user(username=username, password=password)


@pytest.fixture(name="get_test_client")
def _get_test_client(rf, client):
    def _factory(user=None):
        request = rf.get("/")
        if user:
            client.login(request=request, username=user.username, password="password")
        return client

    return _factory


@pytest.fixture
def b2b_client(get_test_client, b2b_user):
    return get_test_client(b2b_user)


@pytest.fixture
def admin_client(get_test_client, admin_user):
    return get_test_client(admin_user)
