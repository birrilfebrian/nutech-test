<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/register', 'Home::register');
$routes->get('/dashboard', 'Home::dashboard');
$routes->get('/topupv', 'Home::topup');
$routes->get('/transaksi', 'Home::transaksi');
$routes->get('/profile', 'Home::profile');
$routes->get('/logout', 'Home::logout');
$routes->get('service/(:segment)', 'Home::pembayaran/$1');
$routes->get('transaction', 'TransactionController::fromDb');

$routes->group('auth', function ($routes) {
    $routes->post('store-token', 'Auth::storeToken');
    $routes->get('get-token', 'Auth::getToken');
});

$routes->group('info', function ($routes) {
    $routes->post('saveToDatabase', 'InfoController::saveToDatabase');
    $routes->get('getFromDatabase', 'InfoController::getBannerService');
});

//semsial mau nambahin callback dll pake grup dulu 
$routes->group('topupapi', function ($routes) {
    $routes->post('/', 'TopupController::index');
});
$routes->group('paymentapi', function ($routes) {
    $routes->post('/', 'PaymentController::index');
});
