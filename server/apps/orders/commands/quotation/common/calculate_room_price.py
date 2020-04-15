from typing import List

from server.apps.orders.exceptions import InvalidServiceConfigurationError
from server.apps.orders.models import PriceType, QuantityType, QuotationService
from server.apps.orders.types.price import Price


def calculate_room_price(services: List[QuotationService], tot_adults: int) -> Price:
    """ It calculates a quotation price starting from a list of services """

    ordered_services = _order_services(services)
    return _update_room_price(Price.zero(), ordered_services, tot_adults)


def _update_room_price(
    price: Price, services: List[QuotationService], tot_adults: int
) -> Price:
    """ It quote and add the quoted price to a starting base price """

    if not services:
        return price

    # list copy for input list immutability
    services_list = services.copy()
    service_to_quote = services_list.pop(0)

    service_price = _calculate_service_price(
        current_price=price, service=service_to_quote, tot_adults=tot_adults
    )
    current_price = price + service_price
    return _update_room_price(current_price, services_list, tot_adults)


def _calculate_service_price(
    service: QuotationService, current_price: Price, tot_adults: int
) -> Price:
    """ It calculates the price for an individual service """

    _check_service_consistency(service)

    unitary_service_price = _get_service_unitary_price(service, current_price)
    units = _get_service_total_units(service, tot_adults)

    total_service_price = unitary_service_price * units
    service_discount = (
        abs(total_service_price)
        if service.service_type and service.service_type.is_discount()
        else 0
    )

    return Price(total_amount=total_service_price, discount_amount=service_discount)


def _check_service_consistency(service: QuotationService):
    """ It checks that the service has a consistent definition """

    if not service.service_type:
        raise InvalidServiceConfigurationError(
            f"Missing service type for service {service.id} {service.name}"
        )

    if service.service_type.is_discount() and service.price > 0:
        raise InvalidServiceConfigurationError(
            "Discount price cannot be positive", service.name, service.service_id
        )

    if (
        service.price_type == PriceType.PERCENT
        and service.quantity_type == QuantityType.PER_PERSON
    ):
        raise InvalidServiceConfigurationError(
            "Percent supplement allowed only for quantity type Per Person",
            service.name,
            service.service_id,
        )

    if service.price_type == PriceType.PERCENT and (
        service.price < 0 or service.price > 100
    ):
        raise InvalidServiceConfigurationError(
            "Percent supplement amounts should have a price value between 0 and 100",
            service.name,
            service.service_id,
        )


def _get_service_unitary_price(
    service: QuotationService, current_price: Price
) -> float:
    """ It calculates the unitary price for a given service """

    if service.price_type == PriceType.TOTAL:
        return _calculate_abs_service_unitary_price(service)

    if service.price_type == PriceType.PERCENT:
        return _calculate_percentage_service_unitary_price(service, current_price)

    raise NotImplementedError(f"Invalid price type {service.price_type}")


def _get_service_total_units(service: QuotationService, tot_adults: int) -> int:
    """ It calculates ths total quantity of a service based on its quantity_type """

    if service.quantity_type == QuantityType.PER_PERSON:
        return tot_adults

    if service.quantity_type in {QuantityType.PER_ROOM, QuantityType.PER_RESERVATION}:
        return 1

    raise NotImplementedError(f"Invalid quantity type {service.quantity_type}")


def _calculate_percentage_service_unitary_price(
    service: QuotationService, current_price: Price
) -> float:
    """ It calculates the price for a percentage price service """

    return float(service.price) * current_price.get_total_amount() / 100.0


def _calculate_abs_service_unitary_price(service: QuotationService) -> float:
    """ It calculates the price for a fixed price service """

    return float(service.price)


def _order_services(services: List[QuotationService]) -> List[QuotationService]:
    """ It order services based on the order that it needs to be respected when calculating the overall quotation price """

    return sorted(services, key=lambda x: (x.priority, x.service_id))
