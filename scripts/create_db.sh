#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path/database"
pwd
echo "Creating database"
docker compose -f docker-compose.local.yml up -d
