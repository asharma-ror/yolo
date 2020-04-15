import datetime

import pytest
from mixer.backend.django import mixer

from server.apps.orders.tests.utils.quotation_initializer import mock_quotation_room
from server.apps.products.models import (
    DepartureOption,
    DepartureOptionType,
    Occupancy,
    ProductAllotment,
    ProductAvailability,
)
from server.apps.products.tasks.availability_update.availability_delete import (
    delete_availability_records,
)
from server.apps.products.tasks.availability_update.availability_update import (
    update_avail_records_from_quotation_room,
    update_availability_records,
)
from server.apps.products.tests.utils.product_inizializer import mock_product


@pytest.mark.usefixtures(
    "db", "mock_signal_update_avail_records", "mock_signal_delete_avail_records",
)
class TestProductAvailabilityUpdate:
    def test_new_availability_insert(self):
        product = mock_product(product_id="product-ins-1")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-1",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),  # noqa
            start_date_to=datetime.date.fromisoformat("2020-01-17"),  # noqa
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-1"]
        ).all()
        assert not len(allotment_availabilities)  # noqa

        # test run
        update_availability_records(allotment)

        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-1"]
        ).all()
        assert len(allotment_availabilities) == 1  # noqa
        availability = allotment_availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-ins-1"
        assert availability.master_allotment_id == "allotment-ins-1"
        assert availability.allotments_id == ["allotment-ins-1"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-ins-1_2u30_none_"

    def test_existing_availability_update(self):
        product = mock_product(product_id="product-ins-2")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-2",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        mixer.blend(
            ProductAvailability,
            availability_key="allotment-ins-2_2u30_none_",
            master_allotment_id="allotment-ins-2",
            allotments_id=["allotment-ins-2"],
            tot_allotments=1,
            product_id="product-ins-2",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            tot_adults=2,
            occupancy_code="2U30",
            price=1000,
            quantity_available=10,
            quantity_total=10,
            departure_option_type=DepartureOptionType.NONE,
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-2"]
        ).all()
        assert len(allotment_availabilities) == 1

        # test run
        update_availability_records(allotment)
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-2"]
        ).all()
        assert len(allotment_availabilities) == 1
        availability = allotment_availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-ins-2"
        assert availability.master_allotment_id == "allotment-ins-2"
        assert availability.allotments_id == ["allotment-ins-2"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-ins-2_2u30_none_"

    def test_existing_availability_delete_and_new_insert(self):
        product = mock_product(product_id="product-ins-3")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-3",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        mixer.blend(
            ProductAvailability,
            availability_key="allotment-ins-3_2u30_airport_mxp",
            master_allotment_id="allotment-ins-3",
            allotments_id=["allotment-ins-3"],
            tot_allotments=1,
            product_id="product-ins-3",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            tot_adults=2,
            occupancy_code="2U30",
            price=1000,
            quantity_available=10,
            quantity_total=10,
            departure_option_type=DepartureOptionType.AIRPORT,
            departure_option_value="MXP",
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-3"]
        ).all()
        assert len(allotment_availabilities) == 1
        assert (
            allotment_availabilities[0].availability_key
            == "allotment-ins-3_2u30_airport_mxp"
        )

        # test run
        update_availability_records(allotment)
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-3"]
        ).all()
        assert len(allotment_availabilities) == 1
        availability = allotment_availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-ins-3"
        assert availability.master_allotment_id == "allotment-ins-3"
        assert availability.allotments_id == ["allotment-ins-3"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-ins-3_2u30_none_"

    def test_allotment_delete(self):
        product = mock_product(product_id="product-ins-4")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-4",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        mixer.blend(
            ProductAvailability,
            availability_key="allotment-ins-4_2u30_airport_none",
            master_allotment_id="allotment-ins-4",
            allotments_id=["allotment-ins-4"],
            tot_allotments=1,
            product_id="product-ins-4",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            tot_adults=2,
            occupancy_code="2U30",
            price=1000,
            quantity_available=10,
            quantity_total=10,
            departure_option_type=DepartureOptionType.NONE,
            departure_option_value="",
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-4"]
        ).all()
        assert len(allotment_availabilities) == 1
        assert (
            allotment_availabilities[0].availability_key
            == "allotment-ins-4_2u30_airport_none"
        )

        # test run
        delete_availability_records(allotment)
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-4"]
        ).all()
        assert len(allotment_availabilities) == 0

    def test_update_availability_from_optioned_quotation(self):
        product = mock_product(product_id="product-ins-4")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-4",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        mixer.blend(
            ProductAvailability,
            availability_key="allotment-ins-4_2a_none_",
            master_allotment_id="allotment-ins-4",
            allotments_id=["allotment-ins-4"],
            tot_allotments=1,
            product_id="product-ins-4",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            tot_adults=2,
            occupancy_code="2U30",
            price=1000,
            quantity_available=10,
            quantity_total=10,
            departure_option_type=DepartureOptionType.NONE,
        )

        quotation_room = mock_quotation_room(
            allotment_id="allotment-ins-4", optioned=True
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-4"]
        ).all()
        assert len(allotment_availabilities) == 1

        # test run
        update_avail_records_from_quotation_room(quotation_room)
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-4"]
        ).all()
        assert len(allotment_availabilities) == 1
        availability = allotment_availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-ins-4"
        assert availability.master_allotment_id == "allotment-ins-4"
        assert availability.allotments_id == ["allotment-ins-4"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 9
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-ins-4_2u30_none_"

    def test_update_availability_from_unoptioned_quotation(self):
        product = mock_product(product_id="product-ins-5")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-ins-5",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        mixer.blend(
            ProductAvailability,
            availability_key="allotment-ins-5_2u30_none_",
            master_allotment_id="allotment-ins-5",
            allotments_id=["allotment-ins-5"],
            tot_allotments=1,
            product_id="product-ins-5",
            start_date_from=datetime.date.fromisoformat("2020-01-10"),
            start_date_to=datetime.date.fromisoformat("2020-01-17"),
            nights=8,
            days=8,
            tot_adults=2,
            occupancy_code="2U30",
            price=1000,
            quantity_available=9,
            quantity_total=10,
            departure_option_type=DepartureOptionType.NONE,
        )

        quotation_room = mock_quotation_room(
            allotment_id="allotment-ins-5", optioned=False
        )

        # precondition check
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-5"]
        ).all()
        assert len(allotment_availabilities) == 1

        # test run
        update_avail_records_from_quotation_room(quotation_room)
        allotment_availabilities = ProductAvailability.objects.filter(
            allotments_id=["allotment-ins-5"]
        ).all()
        assert len(allotment_availabilities) == 1
        availability = allotment_availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-ins-5"
        assert availability.master_allotment_id == "allotment-ins-5"
        assert availability.allotments_id == ["allotment-ins-5"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-ins-5_2u30_none_"

    def _check_u30_occupancy(self, availability_item, tot_adults):
        assert availability_item.tot_adults == tot_adults
        assert availability_item.occupancy_code == f"{tot_adults}U30"
        assert len(availability_item.adult_validators) == tot_adults
        for pax_index in range(0, tot_adults):
            assert availability_item.adult_validators[pax_index]["min_age"] == 18
            assert availability_item.adult_validators[pax_index]["max_age"] == 29
