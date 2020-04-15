import datetime
import json

import pytest
from mixer.backend.django import mixer

from server.apps.orders.models import QuotationRoom
from server.apps.products.models import (
    DepartureOption,
    DepartureOptionType,
    Occupancy,
    ProductAllotment,
)
from server.apps.products.tasks.availability_update.availability_update import (
    calculate_new_availability,
)
from server.apps.products.tests.utils.product_inizializer import mock_product


@pytest.mark.usefixtures(
    "db", "mock_signal_update_avail_records",
)
class TestProductAvailabilityCalculation:
    def test_allotment_quantity_no_departure_options(self):
        product = mock_product(product_id="product-1")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-1",
            start_date_from=datetime.date(2020, 1, 10),  # noqa
            start_date_to=datetime.date(2020, 1, 17),  # noqa
            nights=8,
            days=8,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        availabilities = calculate_new_availability(allotment)

        assert len(availabilities) == 1
        availability = availabilities[0]
        self._check_u30_occupancy(availability, 2)
        assert availability.product_id == "product-1"
        assert availability.master_allotment_id == "allotment-1"
        assert availability.allotments_id == ["allotment-1"]
        assert availability.tot_allotments == 1
        assert availability.days == 8
        assert availability.nights == 8
        assert availability.start_date_from == datetime.date(2020, 1, 10)
        assert availability.start_date_to == datetime.date(2020, 1, 17)
        assert availability.departure_option_type == DepartureOptionType.NONE
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-1_2u30_none_"
        assert availability.destination_codes == ["dest_product-1_cod"]
        assert availability.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

    def test_allotment_quantity_apt_departure_options(self):
        product = mock_product(product_id="product-2")
        occupancies = [Occupancy.objects.get(occupancy_code="3U30")]
        departure_options = [
            mixer.blend(
                DepartureOption,
                type=DepartureOptionType.AIRPORT,
                value="MXP",
                display_name="Milano Malpensa",
            )
        ]
        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-2",
            start_date_from=datetime.date(2020, 1, 10),
            start_date_to=datetime.date(2020, 1, 17),
            nights=8,
            days=9,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        availabilities = calculate_new_availability(allotment)

        assert len(availabilities) == 1
        availability = availabilities[0]
        self._check_u30_occupancy(availability, 3)
        assert availability.product_id == "product-2"
        assert availability.master_allotment_id == "allotment-2"
        assert availability.allotments_id == ["allotment-2"]
        assert availability.tot_allotments == 1
        assert availability.days == 9
        assert availability.nights == 8
        assert availability.start_date_from == datetime.date(2020, 1, 10)
        assert availability.start_date_to == datetime.date(2020, 1, 17)
        assert availability.departure_option_type == DepartureOptionType.AIRPORT
        assert availability.departure_option_value == "MXP"
        assert availability.departure_option_display_name == "Milano Malpensa"
        assert availability.price == 1000
        assert availability.quantity_available == 10
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-2_3u30_airport_mxp"
        assert availability.destination_codes == ["dest_product-2_cod"]
        assert availability.destinations_data == json.dumps(
            [{"code": "dest_product-2_cod", "name": "dest_product-2_name"}]
        )

    def test_allotment_quantity_apt_departure_option_and_one_optioned(
        self, mock_signal_update_avail_records_from_quotation_room
    ):
        product = mock_product(product_id="product-3")
        occupancies = [Occupancy.objects.get(occupancy_code="3U30")]
        departure_options = [
            mixer.blend(
                DepartureOption,
                type=DepartureOptionType.AIRPORT,
                value="MXP",
                display_name="Milano Malpensa",
            )
        ]
        mixer.blend(
            QuotationRoom,
            allotments_id=["allotment-3"],
            tot_allotments=1,
            optioned=True,
        )
        mixer.blend(
            QuotationRoom,
            allotments_id=["allotment-3"],
            tot_allotments=1,
            optioned=False,
        )

        allotment = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-3",
            start_date_from=datetime.date(2020, 1, 10),
            start_date_to=datetime.date(2020, 1, 17),
            nights=8,
            days=9,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
        )

        availabilities = calculate_new_availability(allotment)

        assert len(availabilities) == 1
        availability = availabilities[0]
        self._check_u30_occupancy(availability, 3)
        assert availability.product_id == "product-3"
        assert availability.master_allotment_id == "allotment-3"
        assert availability.allotments_id == ["allotment-3"]
        assert availability.tot_allotments == 1
        assert availability.days == 9
        assert availability.nights == 8
        assert availability.start_date_from == datetime.date(2020, 1, 10)
        assert availability.start_date_to == datetime.date(2020, 1, 17)
        assert availability.departure_option_type == DepartureOptionType.AIRPORT
        assert availability.departure_option_value == "MXP"
        assert availability.departure_option_display_name == "Milano Malpensa"
        assert availability.price == 1000
        assert availability.quantity_available == 9
        assert availability.quantity_total == 10
        assert availability.availability_key == "allotment-3_3u30_airport_mxp"
        assert availability.destination_codes == ["dest_product-3_cod"]
        assert availability.destinations_data == json.dumps(
            [{"code": "dest_product-3_cod", "name": "dest_product-3_name"}]
        )

    def test_allotment_quantity_no_departure_options_two_weeks(self):
        product = mock_product(product_id="product-1")
        product2 = mock_product(product_id="product-2")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment_w1 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-1-w1",
            start_date_from=datetime.date(2020, 1, 10),
            start_date_to=datetime.date(2020, 1, 17),
            nights=7,
            days=7,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=14,
        )
        allotment_w2 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-1-w2",
            start_date_from=datetime.date(2020, 1, 18),
            start_date_to=datetime.date(2020, 1, 25),
            nights=7,
            days=7,
            quantity=8,
            price=900,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=7,
        )
        mixer.blend(
            ProductAllotment,
            product=product2,
            allotment_id="allotment--prod3-w2",
            start_date_from=datetime.date(2020, 1, 18),
            start_date_to=datetime.date(2020, 1, 25),
            nights=7,
            days=7,
            quantity=8,
            price=800,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=7,
        )

        availabilities_w1 = calculate_new_availability(allotment_w1)
        availabilities_w2 = calculate_new_availability(allotment_w2)

        assert len(availabilities_w1) == 2
        availability_w1_7gg = availabilities_w1[0]
        self._check_u30_occupancy(availability_w1_7gg, 2)
        assert availability_w1_7gg.product_id == "product-1"
        assert availability_w1_7gg.master_allotment_id == "allotment-1-w1"
        assert availability_w1_7gg.allotments_id == ["allotment-1-w1"]
        assert availability_w1_7gg.tot_allotments == 1
        assert availability_w1_7gg.days == 7
        assert availability_w1_7gg.nights == 7
        assert availability_w1_7gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_7gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_7gg.price == 1000
        assert availability_w1_7gg.quantity_available == 10
        assert availability_w1_7gg.quantity_total == 10
        assert availability_w1_7gg.availability_key == "allotment-1-w1_2u30_none_"
        assert availability_w1_7gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w1_7gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

        availability_w1_14gg = availabilities_w1[1]
        self._check_u30_occupancy(availability_w1_14gg, 2)
        assert availability_w1_14gg.product_id == "product-1"
        assert availability_w1_14gg.master_allotment_id == "allotment-1-w1"
        assert availability_w1_14gg.allotments_id == [
            "allotment-1-w1",
            "allotment-1-w2",
        ]
        assert availability_w1_14gg.tot_allotments == 2
        assert availability_w1_14gg.days == 14
        assert availability_w1_14gg.nights == 14
        assert availability_w1_14gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_14gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_14gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_14gg.price == 1900
        assert availability_w1_14gg.quantity_available == 8
        assert availability_w1_14gg.quantity_total == 8
        assert (
            availability_w1_14gg.availability_key
            == "allotment-1-w1$allotment-1-w2_2u30_none_"
        )
        assert availability_w1_14gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w1_14gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

        assert len(availabilities_w2) == 1
        availability_w2_7gg = availabilities_w2[0]
        self._check_u30_occupancy(availability_w2_7gg, 2)
        assert availability_w2_7gg.product_id == "product-1"
        assert availability_w2_7gg.master_allotment_id == "allotment-1-w2"
        assert availability_w2_7gg.allotments_id == ["allotment-1-w2"]
        assert availability_w2_7gg.tot_allotments == 1
        assert availability_w2_7gg.days == 7
        assert availability_w2_7gg.nights == 7
        assert availability_w2_7gg.start_date_from == datetime.date(2020, 1, 18)
        assert availability_w2_7gg.start_date_to == datetime.date(2020, 1, 25)
        assert availability_w2_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w2_7gg.price == 900
        assert availability_w2_7gg.quantity_available == 8
        assert availability_w2_7gg.quantity_total == 8
        assert availability_w2_7gg.availability_key == "allotment-1-w2_2u30_none_"
        assert availability_w2_7gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w2_7gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

    def test_allotment_quantity_no_departure_options_two_weeks_and_two_optioned_room_on_w2(
        self,
    ):
        product = mock_product(product_id="product-1")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment_w1 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-2-w1",
            start_date_from=datetime.date(2020, 1, 10),
            start_date_to=datetime.date(2020, 1, 17),
            nights=7,
            days=7,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=14,
        )
        allotment_w2 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-2-w2",
            start_date_from=datetime.date(2020, 1, 18),
            start_date_to=datetime.date(2020, 1, 25),
            nights=7,
            days=7,
            quantity=8,
            price=900,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=14,
        )

        mixer.blend(
            QuotationRoom,
            allotments_id=["allotment-2-w2"],
            tot_allotments=1,
            optioned=True,
        )
        mixer.blend(
            QuotationRoom,
            allotments_id=["allotment-2-w2", "allotment-2-w3"],
            tot_allotments=2,
            optioned=True,
        )

        availabilities_w1 = calculate_new_availability(allotment_w1)
        availabilities_w2 = calculate_new_availability(allotment_w2)

        assert len(availabilities_w1) == 2
        availability_w1_7gg = availabilities_w1[0]
        self._check_u30_occupancy(availability_w1_7gg, 2)
        assert availability_w1_7gg.product_id == "product-1"
        assert availability_w1_7gg.master_allotment_id == "allotment-2-w1"
        assert availability_w1_7gg.allotments_id == ["allotment-2-w1"]
        assert availability_w1_7gg.tot_allotments == 1
        assert availability_w1_7gg.days == 7
        assert availability_w1_7gg.nights == 7
        assert availability_w1_7gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_7gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_7gg.price == 1000
        assert availability_w1_7gg.quantity_available == 10
        assert availability_w1_7gg.quantity_total == 10
        assert availability_w1_7gg.availability_key == "allotment-2-w1_2u30_none_"
        assert availability_w1_7gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w1_7gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

        availability_w1_14gg = availabilities_w1[1]
        self._check_u30_occupancy(availability_w1_14gg, 2)
        assert availability_w1_14gg.product_id == "product-1"
        assert availability_w1_14gg.master_allotment_id == "allotment-2-w1"
        assert availability_w1_14gg.allotments_id == [
            "allotment-2-w1",
            "allotment-2-w2",
        ]
        assert availability_w1_14gg.tot_allotments == 2
        assert availability_w1_14gg.days == 14
        assert availability_w1_14gg.nights == 14
        assert availability_w1_14gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_14gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_14gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_14gg.price == 1900
        assert availability_w1_14gg.quantity_available == 6
        assert availability_w1_14gg.quantity_total == 8
        assert (
            availability_w1_14gg.availability_key
            == "allotment-2-w1$allotment-2-w2_2u30_none_"
        )
        assert availability_w1_14gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w1_14gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

        assert len(availabilities_w2) == 1
        availability_w2_7gg = availabilities_w2[0]
        self._check_u30_occupancy(availability_w2_7gg, 2)
        assert availability_w2_7gg.product_id == "product-1"
        assert availability_w2_7gg.master_allotment_id == "allotment-2-w2"
        assert availability_w2_7gg.allotments_id == ["allotment-2-w2"]
        assert availability_w2_7gg.tot_allotments == 1
        assert availability_w2_7gg.days == 7
        assert availability_w2_7gg.nights == 7
        assert availability_w2_7gg.start_date_from == datetime.date(2020, 1, 18)
        assert availability_w2_7gg.start_date_to == datetime.date(2020, 1, 25)
        assert availability_w2_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w2_7gg.price == 900
        assert availability_w2_7gg.quantity_available == 6
        assert availability_w2_7gg.quantity_total == 8
        assert availability_w2_7gg.availability_key == "allotment-2-w2_2u30_none_"
        assert availability_w2_7gg.destination_codes == ["dest_product-1_cod"]
        assert availability_w2_7gg.destinations_data == json.dumps(
            [{"code": "dest_product-1_cod", "name": "dest_product-1_name"}]
        )

    def test_allotment_quantity_no_departure_options_two_weeks_and_one_optioned_room_on_w1(
        self,
    ):
        product = mock_product(product_id="product-1")
        occupancies = [Occupancy.objects.get(occupancy_code="2U30")]
        departure_options = [
            mixer.blend(DepartureOption, type=DepartureOptionType.NONE)
        ]
        allotment_w1 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-3-w1",
            start_date_from=datetime.date(2020, 1, 10),
            start_date_to=datetime.date(2020, 1, 17),
            nights=7,
            days=7,
            quantity=10,
            price=1000,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=14,
        )
        allotment_w2 = mixer.blend(
            ProductAllotment,
            product=product,
            allotment_id="allotment-3-w2",
            start_date_from=datetime.date(2020, 1, 18),
            start_date_to=datetime.date(2020, 1, 25),
            nights=7,
            days=7,
            quantity=8,
            price=900,
            occupancies=occupancies,
            departure_options=departure_options,
            max_contiguous_allotment_nights=14,
        )

        mixer.blend(
            QuotationRoom,
            master_allotment_id="allotment-3-w1",
            allotments_id=["allotment-3-w1"],
            tot_allotments=1,
            optioned=True,
        )

        availabilities_w1 = calculate_new_availability(allotment_w1)
        availabilities_w2 = calculate_new_availability(allotment_w2)

        assert len(availabilities_w1) == 2
        availability_w1_7gg = availabilities_w1[0]
        self._check_u30_occupancy(availability_w1_7gg, 2)
        assert availability_w1_7gg.product_id == "product-1"
        assert availability_w1_7gg.master_allotment_id == "allotment-3-w1"
        assert availability_w1_7gg.allotments_id == ["allotment-3-w1"]
        assert availability_w1_7gg.tot_allotments == 1
        assert availability_w1_7gg.days == 7
        assert availability_w1_7gg.nights == 7
        assert availability_w1_7gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_7gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_7gg.price == 1000
        assert availability_w1_7gg.quantity_available == 9
        assert availability_w1_7gg.quantity_total == 10
        assert availability_w1_7gg.availability_key == "allotment-3-w1_2u30_none_"

        availability_w1_14gg = availabilities_w1[1]
        self._check_u30_occupancy(availability_w1_14gg, 2)
        assert availability_w1_14gg.product_id == "product-1"
        assert availability_w1_14gg.master_allotment_id == "allotment-3-w1"
        assert availability_w1_14gg.allotments_id == [
            "allotment-3-w1",
            "allotment-3-w2",
        ]
        assert availability_w1_14gg.tot_allotments == 2
        assert availability_w1_14gg.days == 14
        assert availability_w1_14gg.nights == 14
        assert availability_w1_14gg.start_date_from == datetime.date(2020, 1, 10)
        assert availability_w1_14gg.start_date_to == datetime.date(2020, 1, 17)
        assert availability_w1_14gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w1_14gg.price == 1900
        assert availability_w1_14gg.quantity_available == 8
        assert availability_w1_14gg.quantity_total == 8
        assert (
            availability_w1_14gg.availability_key
            == "allotment-3-w1$allotment-3-w2_2u30_none_"
        )

        assert len(availabilities_w2) == 1
        availability_w2_7gg = availabilities_w2[0]
        self._check_u30_occupancy(availability_w2_7gg, 2)
        assert availability_w2_7gg.product_id == "product-1"
        assert availability_w2_7gg.master_allotment_id == "allotment-3-w2"
        assert availability_w2_7gg.allotments_id == ["allotment-3-w2"]
        assert availability_w2_7gg.tot_allotments == 1
        assert availability_w2_7gg.days == 7
        assert availability_w2_7gg.nights == 7
        assert availability_w2_7gg.start_date_from == datetime.date(2020, 1, 18)
        assert availability_w2_7gg.start_date_to == datetime.date(2020, 1, 25)
        assert availability_w2_7gg.departure_option_type == DepartureOptionType.NONE
        assert availability_w2_7gg.price == 900
        assert availability_w2_7gg.quantity_available == 8
        assert availability_w2_7gg.quantity_total == 8
        assert availability_w2_7gg.availability_key == "allotment-3-w2_2u30_none_"

    def _check_u30_occupancy(self, availability_item, tot_adults):
        assert availability_item.tot_adults == tot_adults
        assert availability_item.occupancy_code == f"{tot_adults}U30"
        assert len(availability_item.adult_validators) == tot_adults
        for pax_index in range(0, tot_adults):
            assert availability_item.adult_validators[pax_index]["min_age"] == 18
            assert availability_item.adult_validators[pax_index]["max_age"] == 29
