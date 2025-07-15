<?php

namespace App\Models;

use CodeIgniter\Model;

class UserTokenModel extends Model
{
    protected $table = 'sessions';
    protected $primaryKey = 'id_sessions';
    protected $allowedFields = ['email', 'token', 'expired'];

    public function deleteByEmail(string $email)
    {
        return $this->where('email', $email)->delete();
    }
}
