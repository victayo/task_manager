FROM php:8.2-fpm as php


ENV TM_USER=www-data


RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev libxml2-dev sudo
RUN docker-php-ext-install pdo pdo_mysql bcmath soap sockets

RUN apt-get update && \
    apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev && \
    docker-php-ext-configure gd && \
    docker-php-ext-install gd

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev
RUN docker-php-ext-install zip

RUN apt-get update \
    && apt-get install -y gnupg gosu curl ca-certificates zip unzip git sqlite3 libcap2-bin libpng-dev python3 \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


RUN usermod -u 1003 ${TM_USER}

WORKDIR /var/www/html

COPY --chown=${TM_USER}:${TM_USER} . .
RUN chmod -R 755 /var/www/html/storage
RUN chmod -R 755 /var/www/html/bootstrap

COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer

# #setup php-fpm
# COPY docker/php.ini /usr/local/etc/php/php.ini



RUN chmod +x docker/start-container.sh

ENTRYPOINT [ "docker/start-container.sh" ]
