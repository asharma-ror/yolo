import pytest

from server.apps.products.models import ProductDestination


@pytest.fixture
def b2c_client(get_test_client):
    return get_test_client()


@pytest.fixture()
def dest_factory(mixer):
    def _factory(**kwargs):
        return mixer.blend(ProductDestination, **kwargs)

    return _factory


@pytest.mark.usefixtures("db")
class TestDestinationApi:
    @pytest.mark.parametrize(
        "destinations, expected",
        [
            (
                [("dest1", "Destination1", False), ("dest2", "Destination2", True)],
                ("dest2", "Destination2"),
            )
        ],
    )
    def test_get_destinations_query(
        self, b2c_client, dest_factory, destinations, expected
    ):
        for code, name, searchable in destinations:
            dest_factory(code=code, name=name, searchable=searchable)

        resp = b2c_client.query(QUERY_DESTINATIONS)
        destinations = resp.json()["data"]["allProductDestinations"]
        assert len(destinations["edges"]) == 1
        assert destinations["edges"][0]["node"]["code"] == expected[0]
        assert destinations["edges"][0]["node"]["name"] == expected[1]


QUERY_DESTINATIONS = """
    query allProductDestinations {
      allProductDestinations {
        edges {
          node {
            code
            name
          }
        }
      }
    }
"""
