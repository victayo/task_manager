#!/bin/bash

composer install --no-progress --no-interaction

# npm install

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan migrate

php artisan db:seed


exec docker-php-entrypoint "$@" &

php artisan --host=0.0.0.0 --port=80  serve
