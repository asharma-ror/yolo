#!/usr/bin/env sh

#set -e
#set -u

# export DEBIAN_FRONTEND=noninteractive
mkdir -p /usr/share/man/man1

# https://hub.docker.com/r/xcgd/libreoffice/dockerfile
apt-get install -y default-jre-headless libreoffice-script-provider-python libreoffice-calc python3-uno

# --install-recommends libreoffice-java-common
