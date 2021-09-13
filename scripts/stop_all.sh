#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

docker compose -f ../docker-compose.yml stop
docker compose -f ./database/docker-compose.local.yml stop
