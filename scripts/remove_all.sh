#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Removing database"
docker-compose -f ./database/docker-compose.local.yml down
echo "Removing database volume"
docker volume rm database_database

echo "Removing contact-list"
docker-compose -f ../docker-compose.yml down --rmi local

echo "Removing contact_list_network"
docker network rm contact_list_network || true
