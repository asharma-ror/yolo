from typing import List

from server.apps.products.models import Product


def get_product(product_id: str) -> Product:
    return Product.objects.filter(product_id__iexact=product_id).first()


def get_company_products_id(company_id: str) -> List[str]:
    return (
        _filter_company_products(company_id).values_list("product_id", flat=True).all()
    )


def get_company_products(company_id: str) -> List[Product]:
    return _filter_company_products(company_id).all()


def _filter_company_products(company_id: str):
    return Product.objects.filter(supplier__company_id__iexact=company_id)
