# This Dockerfile uses multi-stage build to customize DEV and PROD images:
# https://docs.docker.com/develop/develop-images/multistage-build/

FROM python:3.7.7-slim as development_build

LABEL maintainer="jnoortheen@gmail.com"
LABEL vendor="divisible"

ARG DJANGO_ENV

ENV DJANGO_ENV=${DJANGO_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100

# System deps:
RUN apt-get update && apt-get install -y \
     software-properties-common \
     curl \
     gcc \
     gettext \
     git \
     libffi-dev \
     libpq-dev \
     musl-dev \
  && pip install poetry

# Add wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /bin/wait-for-it
RUN chmod +x /bin/wait-for-it

# add s6 supervisor
ADD https://github.com/just-containers/s6-overlay/releases/download/v1.21.8.0/s6-overlay-amd64.tar.gz /tmp/
RUN gunzip -c /tmp/s6-overlay-amd64.tar.gz | tar -xf - -C /
ENTRYPOINT ["/init"]

WORKDIR /setup

## install libreoffice and python uno-bridge
#ENV PYTHONPATH="${PYTHONPATH}:/usr/lib/python3/dist-packages"
#COPY ./docker/soffice/service.sh /etc/services.d/soffice/run
#COPY ./docker/soffice/install.sh /setup/install-libreoffice.sh
#RUN sh /setup/install-libreoffice.sh

# Project initialization:
# Copy only requirements, to cache them in docker layer
COPY ./poetry.lock ./pyproject.toml /setup/
RUN poetry config virtualenvs.create false \
  && poetry install $(test "$DJANGO_ENV" = production && echo "--no-dev") --no-interaction --no-ansi

# clean up
RUN apt-get clean && apt-get autoclean

# This dir will become the mountpoint of development code
WORKDIR /code

# The following stage is only for Prod:
# https://wemake-django-template.readthedocs.io/en/latest/pages/template/production.html

FROM development_build as production_build

COPY . /code
