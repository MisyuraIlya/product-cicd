# Use the PHP 8.1 FPM base image
FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# Set the PHP memory limit to 3G
RUN echo "memory_limit=3G" > /usr/local/etc/php/conf.d/memory-limit.ini

# Set the working directory
WORKDIR /var/www/project

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash

# Copy application files
COPY . .

# Install dependencies using Composer
RUN composer install --no-scripts --no-autoloader

# Generate autoload files
RUN composer dump-autoload --optimize

# Copy initialization script
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Run Symfony commands ignoring errors and automatically answering yes to prompts
CMD ["/usr/local/bin/init.sh"]
