# -*- coding: utf-8 -*-
import json
import logging
import os
import tempfile

import boto3
from braces.views import (
    AjaxResponseMixin,
    JSONResponseMixin,
    LoginRequiredMixin,
    SuperuserRequiredMixin,
)
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.views.generic import View
from django_sns_view.views import SNSEndpoint

from server.conf import CONFIG

from . import models, resources, xl_parser, xl_reader, xl_writer

LOGGER = logging.getLogger(__file__)


@login_required
def index(request):
    """
    Main (or index) view.

    Returns rendered default page to the user.
    """
    return render(request, "main/index.html")


class AjaxUploadView(
    LoginRequiredMixin,
    SuperuserRequiredMixin,
    JSONResponseMixin,
    AjaxResponseMixin,
    View,
):
    """
    View for uploading photos via AJAX.
    """

    def post_ajax(self, request, *args, **kwargs):
        uploaded_file = request.FILES["file"]
        _, extension = os.path.splitext(uploaded_file.name)
        with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

            try:
                xl_reader.parse_file(
                    destination.name, fname_to_parse=uploaded_file.name
                )
            except xl_parser.FileParserError as ex:
                return self.render_json_response({"error": str(ex)}, status=400)
            except Exception as ex:
                LOGGER.error(f"failed import/upload {ex}", exc_info=True)
                return self.render_json_response(
                    {"error": f"Failed import - {ex}"}, status=400
                )

            os.remove(destination.name)

        return self.render_json_response(
            {"success": "File uploaded successfully!"}, status=200
        )

    def get_ajax(self, request, *args, **kwargs):
        file_name = request.GET["fileName"]
        import_file = get_object_or_404(models.ImportFile, name=file_name)
        try:
            xl_writer.export_file(import_file)
        except Exception as ex:
            LOGGER.error(f"failed export/download {ex}", exc_info=True)
            return self.render_json_response(
                {"error": f"Failed export - {ex}"}, status=400
            )

        return self.render_json_response({"fileUrl": import_file.output_file.url})


def download_s3_file(name: str, bucket_name: str) -> None:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=CONFIG.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=CONFIG.AWS_SECRET_ACCESS_KEY,
    )

    with open(name, "wb") as f:
        s3.download_fileobj(bucket_name, name, f)


class S3SNSsubView(SNSEndpoint):
    """SNS topic subscriptor"""

    # Can override SNSEndpoint attributes outlined above

    def handle_message(self, message, payload):
        # Process the message
        msg = json.loads(message)
        for rec in msg["Records"]:
            file_name = rec["s3"]["object"]["key"]
            download_s3_file(file_name, rec["s3"]["bucket"]["name"])
            resources.import_from_file(file_name)
            os.remove(file_name)
