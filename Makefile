.PHONY: all create_netwotk app db clean

all: db app

create_netwotk:
	@echo "Creating network contact_list_network"

app: db
	@echo "Execute application"

db: create_netwotk
	@echo "Creating database"

stop:
	@echo "Stopping containers"

clean:
	@echo "Remove all dependencies"
