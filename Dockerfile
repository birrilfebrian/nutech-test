FROM php:8.1-apache

# Install dependensi dan ekstensi PHP
RUN apt-get update && apt-get install -y \
    libicu-dev \
    && docker-php-ext-install intl pdo pdo_mysql

# Aktifkan mod_rewrite
RUN a2enmod rewrite

# Set Apache DocumentRoot ke /var/www/html/public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Allow .htaccess di public
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Copy semua project ke container
COPY . /var/www/html/

# Set permission
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Jalankan Apache
CMD ["apache2-foreground"]
