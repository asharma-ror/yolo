from pytest_bdd import scenario, then

from server.tests.bdd import get_feature

availability_feature = get_feature("b2c", "purchase", "availability.feature")


@scenario(
    availability_feature, "Search package with some places available",
)
def _scenario():
    """def"""


@then("I find availability for <tot_rooms> at <room_price> € for room")
def i_find_availability(products_client, a_product_allotment, tot_rooms, room_price):
    result = products_client.get_availability(a_product_allotment, tot_rooms)["data"][
        "allProductAvailabilities"
    ]["edges"]
    assert len(result) == 1
    assert result[0]["node"]["price"] == float(room_price)


@scenario(
    availability_feature, "Search package with no places available",
)
def no_place_scenario():
    pass


@then("I don't find availability for <tot_rooms>")
def i_dont_find_availability(products_client, a_product_allotment, tot_rooms):
    result = products_client.get_availability(a_product_allotment, tot_rooms)
    assert not len(result["data"]["allProductAvailabilities"]["edges"])
