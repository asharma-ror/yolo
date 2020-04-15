from server.apps.orders.models import DiscountTicket


def get_discount_ticket(code: str) -> DiscountTicket:
    return DiscountTicket.objects.filter(code__iexact=code).first()
