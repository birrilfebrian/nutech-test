<?php

namespace App\Controllers;

use App\Models\InformationModel;
use App\Models\UserTokenModel;
use CodeIgniter\RESTful\ResourceController;

class Home extends BaseController
{
    protected $model;
    protected $token;

    public function __construct()
    {
        $this->model = new InformationModel();
        $this->token = new UserTokenModel();
    }
    public function index(): string
    {
        return view('login.php');
    }
    public function register(): string
    {
        return view('register.php');
    }
    public function dashboard(): string
    {
        return view('dashboard.php');
    }
    public function topup(): string
    {
        return view('topup.php');
    }
    public function transaksi(): string
    {
        return view('transaction.php');
    }
    public function profile(): string
    {
        return view('profile.php');
    }
    public function pembayaran($serviceCode)
    {
        $service = $this->model->where('service_code', $serviceCode)->first();

        return view('payment', [
            'service' => $service
        ]);
    }

    public function logout()
    {
        $token = $this->request->getGet('token');
        if (!$token) {
            return redirect()->to('/')->with('error', 'Token tidak ditemukan');
        }

        $email = base64_decode($token);
        if ($email) {
            $this->token->deleteByEmail($email);
            session()->destroy();
            return redirect()->to('/')->with('message', 'Berhasil logout');
        }

        return redirect()->to('/')->with('error', 'Token tidak valid');
    }
}
