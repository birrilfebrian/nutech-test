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
        <!-- Form & tombol preset -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Input + Tombol Topup -->
            <div class="md:col-span-2">
                <div class="relative">
                    <span class="absolute top-1/2 left-0 transform -translate-y-1/2 pl-3 text-gray-400">
                        <i class="fas fa-credit-card"></i>
                    </span>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        class="pl-10 mb-4 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Masukkan nominal Top Up">
                </div>
                <button
                    id="topupButton"
                    class="w-full bg-red-500 text-white  font-semibold py-2 rounded transition"
                    disabled>
                    Top Up
                </button>
            </div>

            <!-- Tombol preset nominal -->
            <div class="grid grid-cols-3 gap-2">
                <?php
                $nominals = [10000, 20000, 50000, 100000, 250000, 500000];
                foreach ($nominals as $nominal) : ?>
                    <button
                        type="button"
                        data-nominal="<?= $nominal ?>"
                        class="px-2 py-2 preset-nominal border rounded text-sm hover:bg-gray-100">
                        Rp<?= number_format($nominal, 0, ',', '.') ?>
                    </button>
                <?php endforeach ?>
            </div>
        </div>



    </main>


    <script>
        const base_url = '<?= base_url(); ?>';
    </script>
    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/topup.js') ?>"></script>
</body>

</html>