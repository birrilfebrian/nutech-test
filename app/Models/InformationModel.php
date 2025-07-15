<?php

namespace App\Models;

use CodeIgniter\Model;

class InformationModel extends Model
{
    protected $table = 'information';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $protectFields = true;

    protected $allowedFields = ['information_type', 'image', 'title', 'service_code', 'service_tariff'];

    // Timestamps
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    /**
     * Get all services
     */
    public function getServices(): array
    {
        return $this->where('information_type', 'services')->orderBy('id', 'ASC')->findAll();
    }

    /**
     * Get all banners
     */
    public function getBanners(): array
    {
        return $this->where('information_type', 'banner')->orderBy('id', 'ASC')->findAll();
    }

    /**
     * Insert multiple services (check if already exists by title)
     */
    public function insertServices(array $services): bool
    {
        foreach ($services as $service) {
            $exists = $this->where([
                'information_type' => 'services',
                'title' => $service['service_name']
            ])->first();

            if (!$exists) {
                $this->insert([
                    'information_type' => 'services',
                    'image' => $service['service_icon'],
                    'title' => $service['service_name'],
                    'service_code' => $service['service_code'],
                    'service_tariff' => $service['service_tariff']
                ]);
            }
        }
        return true;
    }

    /**
     * Insert multiple banners (check if already exists by title)
     */
    public function insertBanners(array $banners): bool
    {
        foreach ($banners as $banner) {
            $exists = $this->where([
                'information_type' => 'banner',
                'title' => $banner['banner_name']
            ])->first();

            if (!$exists) {
                $this->insert([
                    'information_type' => 'banner',
                    'image' => $banner['banner_image'],
                    'title' => $banner['banner_name']
                ]);
            }
        }
        return true;
    }
}
