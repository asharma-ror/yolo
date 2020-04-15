from django.apps import AppConfig


class ProductsConfig(AppConfig):
    name = "server.apps.products"
    verbose_name = "Products catalog and availability"

    def ready(self):
        import server.apps.products.signals  # noqa
