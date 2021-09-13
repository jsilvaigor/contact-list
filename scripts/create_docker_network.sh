#!/usr/bin/env bash

docker network inspect contact_list_network >/dev/null 2>&1 || \
    docker network create --driver bridge contact_list_network
