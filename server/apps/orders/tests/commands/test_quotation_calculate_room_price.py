import pytest
from mixer.backend.django import mixer

from server.apps.orders.commands.quotation import calculate_room_price
from server.apps.orders.exceptions import InvalidServiceConfigurationError
from server.apps.orders.models import PriceType, QuantityType, QuotationService
from server.apps.orders.utils.quotation_services_util import (
    get_ancillary_quotation_service_type,
    get_base_price_quotation_service_type,
    get_discount_quotation_service_type,
)


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestRoomPriceCalculation:
    def test_invalid_discount_supplement_raises_error(self):
        services = [
            mixer.blend(  # noqa
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Discount",
                price=100,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_discount_quotation_service_type(),
            ),
        ]

        with pytest.raises(InvalidServiceConfigurationError):
            calculate_room_price(services, tot_adults=2)  # noqa

    def test_invalid_percent_per_person_supplement_raises_error(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=100,
                price_type=PriceType.PERCENT,
                priority=0,
                quantity_type=QuantityType.PER_PERSON,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        with pytest.raises(InvalidServiceConfigurationError):
            calculate_room_price(services, tot_adults=2)

    def test_invalid_percent_supplement_with_price_gt_100_raises_error(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=101,
                price_type=PriceType.PERCENT,
                priority=100,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        with pytest.raises(InvalidServiceConfigurationError):
            calculate_room_price(services, tot_adults=2)

    def test_invalid_percent_supplement_with_price_lt_0_raises_error(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=-1,
                price_type=PriceType.PERCENT,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        with pytest.raises(InvalidServiceConfigurationError):
            calculate_room_price(services, tot_adults=2)

    def test_base_price_calculation(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            )
        ]

        quotation = calculate_room_price(services, tot_adults=2)
        assert quotation.get_total_amount() == 399
        assert quotation.get_discount_amount() == 0

    def test_base_price_and_one_ancillary_fixed_service_per_room(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=50.5,
                price_type=PriceType.TOTAL,
                priority=100,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 449.5
        assert price.get_discount_amount() == 0

    def test_base_price_and_one_ancillary_fixed_service_per_reservation(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=50.5,
                price_type=PriceType.TOTAL,
                priority=100,
                quantity_type=QuantityType.PER_RESERVATION,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 449.5
        assert price.get_discount_amount() == 0

    def test_base_price_and_one_ancillary_fixed_service_per_person(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=50.5,
                price_type=PriceType.TOTAL,
                priority=100,
                quantity_type=QuantityType.PER_PERSON,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 500
        assert price.get_discount_amount() == 0

    def test_base_price_and_one_ancillary_percentage_service_per_room(self):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=5,
                price_type=PriceType.PERCENT,
                priority=100,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 418.95
        assert price.get_discount_amount() == 0

    def test_base_price_and_one_ancillary_fixed_service_per_person_and_one_discount(
        self,
    ):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=50.5,
                price_type=PriceType.TOTAL,
                priority=100,
                quantity_type=QuantityType.PER_PERSON,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Discount",
                price=-100,
                price_type=PriceType.TOTAL,
                priority=200,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_discount_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 400
        assert price.get_discount_amount() == 100

    def test_base_price_and_one_ancillary_percentage_service_per_person_and_one_discount(
        self,
    ):
        services = [
            mixer.blend(
                QuotationService,
                name="Base Price",
                price=399,
                price_type=PriceType.TOTAL,
                priority=0,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_base_price_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Additional Service",
                price=5,
                price_type=PriceType.PERCENT,
                priority=100,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_ancillary_quotation_service_type(),
            ),
            mixer.blend(
                QuotationService,
                name="Discount",
                price=-100,
                price_type=PriceType.TOTAL,
                priority=200,
                quantity_type=QuantityType.PER_ROOM,
                quantity=1,
                service_type=get_discount_quotation_service_type(),
            ),
        ]

        price = calculate_room_price(services, tot_adults=2)
        assert price.get_total_amount() == 318.95
        assert price.get_discount_amount() == 100
