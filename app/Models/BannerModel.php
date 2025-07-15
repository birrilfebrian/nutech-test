<?php

namespace App\Models;

use CodeIgniter\Model;

class BannerModel extends Model
{
    protected $table = 'banners_cache';
    protected $allowedFields = ['image_url'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
}
