from django.apps import AppConfig


class TravelsConfig(AppConfig):
    name = "server.apps.travels"
    verbose_name = "Travel templates and assignations"

    def ready(self):
        import server.apps.travels.signals  # noqa
