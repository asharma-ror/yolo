"""checks that models function """
from datetime import datetime, timedelta


def test_save_model(mdb):
    dt_from = datetime.now()
    hlist = mdb.HotelListing(
        source="travis",
        occupancy=[mdb.HotelOccupancy(persons="adult", number=2)],
        hotel_name="hotel-1",
        destination=mdb.Destination(dest_id="dest-id", name="Paris"),
        date_from=dt_from,
        date_to=dt_from + timedelta(days=7),
        prices=[mdb.HotelPrice(company="company-1", price="100")],
        product_type="hotel",
    )
    hlist.save()
    assert hlist.created_utc
    assert hlist.pk
