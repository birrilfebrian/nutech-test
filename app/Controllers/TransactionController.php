<?php

namespace App\Controllers;

use App\Models\InformationModel;
use CodeIgniter\RESTful\ResourceController;

class TransactionController extends ResourceController
{
    // Transaction.php
    public function fromApi()
    {
        try {
            $token = $this->getBearerTokenFromDB();
            $client = \Config\Services::curlrequest();

            $response = $client->get('https://third-party-api.com/transactions/history', [
                'headers' => ['Authorization' => 'Bearer ' . $token],
                'query'   => ['offset' => 0, 'limit' => 10]
            ]);

            $data = json_decode($response->getBody());

            if (!empty($data->data)) {
                return $this->response->setJSON(['status' => 'success', 'data' => $data->data]);
            } else {
                return $this->response->setJSON(['status' => 'empty', 'data' => []]);
            }
        } catch (\Exception $e) {
            return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function fromDb()
    {
        $userId = session('id_user');

        $data = db_connect()
            ->table('transactions')
            ->where('id_user', $userId)
            ->orderBy('transaction_id', 'DESC')
            ->limit(10)
            ->get()
            ->getResult();

        return $this->response->setJSON(['status' => 'success', 'data' => $data]);
    }

    private function getBearerTokenFromDB()
    {
        $email = session('email');

        return db_connect()
            ->table('tokens')
            ->where('email', $email)
            ->get()
            ->getRow('token');
    }
}
