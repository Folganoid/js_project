FROM phpdockerio/php72-fpm:latest

RUN apt-get update && \
    apt-get install -y libmagickwand-dev imagemagick php7.2-mysql php-pear && \
    pecl install imagick && \
    docker-php-ext-enable imagick \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install git
RUN apt-get update \
    && apt-get -y install git \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

WORKDIR /var/www
CMD ["php-fpm"]