from unittest.mock import MagicMock, patch

import pytest
from mixer.backend.django import mixer

from server.apps.products.models import (
    AncillaryService,
    ProductAllotment,
    ServiceSelectionType,
)
from server.apps.products.queries.ancillary_services import get_ancillary_services


@patch("server.apps.products.signals._do_update_availability_records", MagicMock())
@pytest.mark.django_db
class TestGetAncillaryServices:
    def test_get_all_services_with_implicit_service_types_parameter(self):
        services = [
            self._create_ancillary_service("service-1", ServiceSelectionType.OPTIONAL),
            self._create_ancillary_service("service-2", ServiceSelectionType.AUTOMATIC),
        ]
        self._create_allotment(allotment_id="allotment-ancillary-1", services=services)

        result = get_ancillary_services("allotment-ancillary-1")
        assert len(result) == 2

    def test_get_all_services_with_multiple_service_types_parameter(self):
        services = [
            self._create_ancillary_service("service-1", ServiceSelectionType.OPTIONAL),
            self._create_ancillary_service("service-2", ServiceSelectionType.AUTOMATIC),
        ]
        self._create_allotment(allotment_id="allotment-ancillary-2", services=services)

        result = get_ancillary_services(
            "allotment-ancillary-2",
            [ServiceSelectionType.AUTOMATIC, ServiceSelectionType.OPTIONAL],
        )
        assert len(result) == 2

    def test_get_automatic_services(self):
        services = [
            self._create_ancillary_service("service-1", ServiceSelectionType.OPTIONAL),
            self._create_ancillary_service("service-2", ServiceSelectionType.AUTOMATIC),
        ]
        self._create_allotment(allotment_id="allotment-ancillary-3", services=services)

        result = get_ancillary_services(
            "allotment-ancillary-3", [ServiceSelectionType.AUTOMATIC]
        )
        assert len(result) == 1
        assert result[0].service_id == "service-2"

    def test_get_optional_services(self):
        services = [
            self._create_ancillary_service("service-1", ServiceSelectionType.OPTIONAL),
            self._create_ancillary_service("service-2", ServiceSelectionType.AUTOMATIC),
        ]
        self._create_allotment(allotment_id="allotment-ancillary-4", services=services)

        result = get_ancillary_services(
            "allotment-ancillary-4", [ServiceSelectionType.OPTIONAL]
        )
        assert len(result) == 1
        assert result[0].service_id == "service-1"

    @staticmethod
    def _create_ancillary_service(service_id, selection_type):
        return mixer.blend(
            AncillaryService, service_id=service_id, selection_type=selection_type
        )

    @staticmethod
    def _create_allotment(allotment_id, services):
        return mixer.blend(
            ProductAllotment, allotment_id=allotment_id, ancillary_services=services
        )
