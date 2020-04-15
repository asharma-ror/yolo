# -*- coding: utf-8 -*-

from django.shortcuts import reverse


def test_index_page(admin_client):
    """This test ensures that hello page works."""
    response = admin_client.get(reverse("main:index"))

    assert response.status_code == 200
