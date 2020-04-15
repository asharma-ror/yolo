from typing import Any

from django.conf import settings
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment


class PayPalClient:
    def __init__(self):
        self.client_id = settings.PAYPAL_CLIENT_ID
        self.client_secret = settings.PAYPAL_CLIENT_SECRET

        # """Set up and return PayPal Python SDK environment with PayPal access credentials.
        #    This sample uses SandboxEnvironment. In production, use LiveEnvironment."""
        self.environment = SandboxEnvironment(
            client_id=self.client_id, client_secret=self.client_secret
        )

        # """ Returns PayPal HTTP client instance with environment that has access
        #     credentials context. Use this instance to invoke PayPal APIs, provided the
        #     credentials have access. """
        self.client = PayPalHttpClient(self.environment)

    def object_to_json(self, json_data) -> dict:  # type: ignore
        """
        Function to print all json data in an organized readable manner
        """
        result = {}
        itr = vars(json_data).items()
        for key, value in itr:
            # Skip internal attributes.
            if key.startswith("__"):
                continue
            result[key] = self._unpack_obj(value)
        return result

    def array_to_json_array(self, json_array) -> list:  # type: ignore
        result = []
        if isinstance(json_array, list):
            for item in json_array:
                result.append(self._unpack_obj(item))
        return result

    def is_primittive(self, data) -> bool:
        return isinstance(data, (str, int))

    def _unpack_obj(self, item) -> Any:
        return (
            self.array_to_json_array(item)
            if isinstance(item, list)
            else item  # noqa
            if self.is_primittive(item)
            else self.object_to_json(item)
        )
