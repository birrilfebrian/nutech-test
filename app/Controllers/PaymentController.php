<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TransactionModel;

class PaymentController extends ResourceController
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

            if (!$json || !isset($json->service_code) || !isset($json->email)) {
                return $this->fail('Parameter Tidak Valid', 400);
            }

            $service_code = $json->service_code;
            $amount = $json->amount;
            $email = $json->email;
            $token = $json->token;


            // Panggil third-party API untuk payment
            $api = $this->callThirdPartyAPI($service_code, $token);

            if (!$api['success']) {
                return $this->respond([
                    'success' => false,
                    'message' => $api['message'] ?? 'Pembayaran gagal'
                ]);
            }

            // Simpan transaksi
            $this->transactionModel->insert([
                'email' => $email,
                'transaction_type' => 'PAYMENT',
                'total_amount' => $amount,
                'service_code' => $service_code,
                'created_on' => date('Y-m-d H:i:s')
            ]);

            return $this->respond([
                'success' => true,
                'message' => 'Pembayaran berhasil',
                'data' => [
                    'balance' => $api['data']['balance'] ?? 0,
                    'amount' => $amount
                ]
            ]);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    private function callThirdPartyAPI($service_code, $token)
    {
        // Ganti dengan endpoint payment dari third-party
        $apiUrl = 'https://take-home-test-api.nutech-integrasi.com/transaction';
        $apiKey = $token;

        $payload = json_encode(['service_code' => $service_code]);

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
        $result = json_decode($res, true);
        if ($code !== 200) {
            return ['success' => false, 'message' => $result['message'] ?: 'API error'];
        }


        return ($result && $result['status'] === 0)
            ? ['success' => true, 'data' => $result['data']]
            : ['success' => false, 'message' => $result['message'] ?? 'Unknown'];
    }
}
