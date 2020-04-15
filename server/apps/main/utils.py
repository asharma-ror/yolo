import os
import shutil
import tempfile

from django.core.files import File


def create_temporary_copy(src: File):
    # create the temporary file in read/write mode (r+)
    _, extension = os.path.splitext(src.name)

    tf = tempfile.NamedTemporaryFile(mode="r+b", suffix=extension, delete=False)

    shutil.copyfileobj(src.file, tf)

    # rewind the temporary file
    tf.seek(0)
    return tf
