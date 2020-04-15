from dataclasses import dataclass
from typing import List

from server.apps.products.models import ProductAvailability


@dataclass(frozen=True)
class AvailabilityValidationError:
    message: str


@dataclass(frozen=True)
class AvailabilityCachedValidationResult:

    is_available: bool
    availability_items: List[ProductAvailability]
    validation_errors: List[AvailabilityValidationError]

    @staticmethod
    def available(
        availability_items: List[ProductAvailability],
    ) -> "AvailabilityCachedValidationResult":
        return AvailabilityCachedValidationResult(
            is_available=True,
            availability_items=availability_items,
            validation_errors=[],
        )

    @staticmethod
    def unavailable(
        availability_items: List[ProductAvailability],
        validation_errors: List[AvailabilityValidationError],
    ) -> "AvailabilityCachedValidationResult":
        return AvailabilityCachedValidationResult(
            is_available=False,
            availability_items=availability_items,
            validation_errors=validation_errors,
        )


@dataclass(frozen=True)
class AvailabilityRealtimeValidationResult:

    is_available: bool
    validation_errors: List[AvailabilityValidationError]

    @staticmethod  # noqa
    def available() -> "AvailabilityRealtimeValidationResult":  # noqa
        return AvailabilityRealtimeValidationResult(
            is_available=True, validation_errors=[]
        )

    @staticmethod
    def unavailable(
        validation_errors: List[AvailabilityValidationError],
    ) -> "AvailabilityRealtimeValidationResult":
        return AvailabilityRealtimeValidationResult(
            is_available=False, validation_errors=validation_errors
        )
