<!DOCTYPE html>
<html lang="id">

<?= $this->include('addon/header') ?>

<body class="bg-gray-50">
    <!-- Header -->
    <?= $this->include('addon/navbar') ?>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <!-- User Profile Section -->
        <?= $this->include('addon/profile') ?>


        <!-- Services Section - IMPROVED -->
        <div class="mb-8">

            <div class="relative">
                <div class=" rounded-lg w-full md:w-full mx-auto">
                    <h2 class="text-lg md:text-xl font-semibold text-gray-600 mb-4">Pembayaran</h2>
                    <div class=" flex items-center mb-12">
                        <img src="<?= $service['image'] ?>" alt="Icon" class="w-12 h-12 mr-2">
                        <h2 class="text-lg font-semibold text-gray-800"><?= $service['title'] ?></h2>
                    </div>

                    <div class="mb-4">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i class="fas fa-credit-card"></i>
                            </span>
                            <input
                                type="text"
                                id="pay-amount"
                                name="pay-amount"
                                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                value="<?= $service['service_tariff'] ?>" disabled>
                        </div>
                        <input
                            type="hidden"
                            name="service_code" \
                            id="service_code"
                            value="<?= $service['service_code'] ?>" />
                    </div>

                    <button
                        class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition" id="payButton">
                        Bayar
                    </button>
                </div>
            </div>
        </div>
        </div>


    </main>

    <script>
        const base_url = '<?= base_url(); ?>';
    </script>

    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/payment.js') ?>"></script>
</body>

</html>