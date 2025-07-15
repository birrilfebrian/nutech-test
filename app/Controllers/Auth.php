<?php

namespace App\Controllers;

use App\Models\UserTokenModel;
use CodeIgniter\RESTful\ResourceController;

class Auth extends ResourceController
{
    public function storeToken()
    {
        $data = $this->request->getJSON(true);

        $model = new UserTokenModel();

        // Cek apakah email sudah ada → update token
        if ($model->where('email', $data['email'])->countAllResults() > 0) {
            $model->where('email', $data['email'])->set([
                'token' => $data['token'],
                'expired' => date('Y-m-d H:i:s', strtotime('+12 hours'))
            ])->update();
        } else {
            $model->insert([
                'email' => $data['email'],
                'token' => $data['token'],
                'expired' => date('Y-m-d H:i:s', strtotime('+12 hours'))
            ]);
        }

        return $this->respond(['status' => 'success']);
    }
    public function getToken()
    {
        $model = new UserTokenModel();
        $email = $this->request->getGet('email');
        $data = $model->where('email', $email)->first();

        if (!$data) {
            $message = 'Token not found';
            return $this->fail($message, 404);
        }

        return $this->respond([
            'status' => 'success',
            'token' => $data['token']
        ]);
    }
}
