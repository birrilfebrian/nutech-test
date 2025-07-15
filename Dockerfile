FROM php:8.1-apache

# Install ekstensi PHP
RUN docker-php-ext-install pdo pdo_mysql

# Salin semua file project ke dalam image
COPY . /var/www/html/

# Aktifkan mod_rewrite Apache
RUN a2enmod rewrite

# Konfigurasi Apache untuk .htaccess (CI4)
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
