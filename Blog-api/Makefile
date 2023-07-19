setup:
	@make destroy
	@make build
	@make up 
	@make composer-update
	@make data
	docker compose ps
build:
	docker-compose build 
stop:
	docker-compose stop
up:
	docker-compose up -d
restart:
	docker-compose down
	@make up
destroy:
	docker-compose down --rmi all --volumes
composer-update:
	docker exec blog bash -c "composer update"
data:
	docker exec blog bash -c "php artisan migrate"
	docker exec blog bash -c "php artisan db:seed"