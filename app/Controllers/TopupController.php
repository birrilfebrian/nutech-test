<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TransactionModel;

class TopupController extends ResourceController
{
    protected $transactionModel;
    protected $format = 'json';

    public function __construct()
    {
        $this->transactionModel = new TransactionModel();
    }

    public function index()
    {
        try {
            $json = $this->request->getJSON();

            if (!$json || !isset($json->amount) || !isset($json->email)) {
                return $this->fail('Amount dan email wajib diisi', 400);
            }

            $amount = (int) $json->amount;
            $email = $json->email;
            $token = $json->token;

            if ($amount < 10000) {
                return $this->fail('Minimal top-up Rp 10.000', 400);
            }
            if ($email == null || $token == null) {
                return $this->fail('Email dan token wajib diisi', 400);
            }
            // Panggil third-party API langsung
            $api = $this->callThirdPartyAPI($amount, $token);

            if (!$api['success']) {
                return $this->respond([
                    'success' => false,
                    'message' => $api['message'] ?? 'Top-up gagal'
                ]);
            }

            // Simpan transaksi hanya jika berhasil
            $this->transactionModel->insert([
                'email' => $email,
                'transaction_type' => 'Topup',
                'total_amount' => $amount,
                'created_on' => date('Y-m-d H:i:s')
            ]);

            return $this->respond([
                'success' => true,
                'message' => 'Top-up berhasil',
                'data' => [
                    'balance' => $api['data']['balance'] ?? 0,
                    'amount' => $amount
                ]
            ]);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    private function callThirdPartyAPI($amount, $token)
    {
        $apiUrl = 'https://take-home-test-api.nutech-integrasi.com/topup';
        $apiKey = $token;

        $payload = json_encode(['top_up_amount' => $amount]);

        $ch = curl_init($apiUrl);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $apiKey
            ],
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => false
        ]);

        $res = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err || $code !== 200) {
            return ['success' => false, 'message' => $err ?: 'API error'];
        }

        $result = json_decode($res, true);
        return ($result && $result['status'] === 0)
            ? ['success' => true, 'data' => $result['data']]
            : ['success' => false, 'message' => $result['message'] ?? 'Unknown'];
    }
}
