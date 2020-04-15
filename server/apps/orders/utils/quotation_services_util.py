from server.apps.orders.models import QuotationServiceType, QuotationServiceTypes


def get_base_price_quotation_service_type() -> QuotationServiceType:
    return get_quotation_service_type(QuotationServiceTypes.BASE_PRICE)


def get_discount_quotation_service_type() -> QuotationServiceType:
    return get_quotation_service_type(QuotationServiceTypes.DISCOUNT)


def get_ancillary_quotation_service_type() -> QuotationServiceType:
    return get_quotation_service_type(QuotationServiceTypes.ANCILLARY_SERVICE)


def get_quotation_service_type(service_type: str) -> QuotationServiceType:
    return QuotationServiceType.objects.filter(code=service_type).get()
