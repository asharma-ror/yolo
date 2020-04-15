from server.apps.orders.models import QuotationRoom

from .calculate_room_price import calculate_room_price


def update_room_price(room_quotation: QuotationRoom):
    updated_price = calculate_room_price(
        list(room_quotation.get_services()), room_quotation.tot_adults
    )

    room_quotation.room_price = updated_price.get_total_amount()
    room_quotation.room_discount = updated_price.get_discount_amount()
