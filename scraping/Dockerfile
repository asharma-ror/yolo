# This Dockerfile uses multi-stage build to customize DEV and PROD images:
# https://docs.docker.com/develop/develop-images/multistage-build/

FROM python:3.8-slim as development_build

LABEL maintainer="jnoortheen@gmail.com"
LABEL vendor="divisible"

ARG ENV

ENV ENV=${ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  TINI_VERSION="v0.18.0" \
    # set display port to avoid crash
  DISPLAY=:99


# System deps:
RUN apt-get -qq update && apt-get -q install -y \
     software-properties-common \
     curl \
     gcc \
     gettext \
     git \
     libffi-dev \
     libpq-dev \
     musl-dev \
     wget xvfb unzip gnupg2 \
  && pip install poetry


# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -qq -y update && apt-get -q install -y google-chrome-stable
# install chromedriver
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# Add wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /bin/wait-for-it
RUN chmod +x /bin/wait-for-it

# set tini as entrypoint
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /setup

# Project initialization:
# Copy only requirements, to cache them in docker layer
COPY ./poetry.lock ./pyproject.toml /setup/
RUN poetry config virtualenvs.create false \
  && poetry install $(test "$ENV" = production && echo "--no-dev") --no-interaction --no-ansi

# clean up
RUN apt-get clean && apt-get autoclean && apt-get autoremove --purge -y

# This dir will become the mountpoint of development code
WORKDIR /code

#RUN groupadd -r nruser && useradd -m -r -g nruser nruser && chown -R nruser:nruser /code
#USER nruser

# The following stage is only for Prod:
# https://wemake-django-template.readthedocs.io/en/latest/pages/template/production.html

FROM development_build as production_build

COPY . /code
