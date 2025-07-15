<?php

namespace App\Controllers;

use App\Models\InformationModel;
use CodeIgniter\RESTful\ResourceController;

class InfoController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new InformationModel();
    }

    // POST: /information/saveToDatabase
    public function saveToDatabase()
    {
        $data = $this->request->getJSON(true);
        $services = $data['services'] ?? [];
        $banners = $data['banners'] ?? [];

        try {
            if (!empty($services)) {
                $this->model->insertServices($services);
            }

            if (!empty($banners)) {
                $this->model->insertBanners($banners);
            }

            return $this->respond(['status' => 'success'], 200);
        } catch (\Exception $e) {
            return $this->failServerError('Failed to save data: ' . $e->getMessage());
        }
    }

    public function getBannerService()
    {
        try {
            $services = $this->model->getServices();
            $banners = $this->model->getBanners();

            return $this->respond([
                'status' => 'success',
                'data' => [
                    'services' => $services,
                    'banners' => $banners
                ]

            ], 200);
        } catch (\Exception $e) {
            return $this->failServerError('Failed to fetch data: ' . $e->getMessage());
        }
    }
}
