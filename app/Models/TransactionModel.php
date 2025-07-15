<?php

namespace App\Models;

use CodeIgniter\Model;

class TransactionModel extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'transaction_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = [
        'email',
        'transaction_type',
        'service_code',
        'total_amount',
        'created_on'
    ];

    protected $returnType = 'array';
    protected $useTimestamps = false;

    public function getLatestByUser($email, $limit = 5)
    {
        return $this->where('email', $email)
            ->orderBy('created_on', 'DESC')
            ->limit($limit)
            ->findAll();
    }

    public function insertTransaction($data)
    {
        return $this->insert($data);
    }
}
