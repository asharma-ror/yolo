from contextlib import contextmanager
from typing import Iterator

from monkeytype.config import DefaultConfig


class MyConfig(DefaultConfig):
    @contextmanager
    def cli_context(self, command: str) -> Iterator[None]:
        # noinspection PyUnresolvedReferences
        from server.wsgi import application  # noqa
        import django

        django.setup()
        yield


CONFIG = MyConfig()
