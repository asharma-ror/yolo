import pytest


@pytest.fixture
def mock_signal_update_avail_records_from_quotation_room(mocker):
    """do not execute the signal receiver"""
    return mocker.patch(
        "server.apps.products.signals._update_avail_records_from_quotation_room"
    )


@pytest.fixture
def mock_signal_update_avail_records(mocker):
    """do not execute the signal receiver"""
    return mocker.patch("server.apps.products.signals._do_update_availability_records")


@pytest.fixture
def mock_signal_delete_avail_records(mocker):
    """do not execute the signal receiver"""
    return mocker.patch("server.apps.products.signals._do_delete_availability_records")
