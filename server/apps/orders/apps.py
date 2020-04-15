from django.apps import AppConfig


class OrdersConfig(AppConfig):
    name = "server.apps.orders"
    verbose_name = "eCommerce orders"

    def ready(self):
        import server.apps.orders.signals  # noqa
