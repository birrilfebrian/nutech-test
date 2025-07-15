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


        <div>
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Semua Transaksi</h2>
            <section class="mt-8">
                <div id="transactionList" class="overflow-y-auto max-h-[400px] space-y-3 px-2 scrollbar-hide">
                    <!-- Data transaksi akan dirender di sini -->
                </div>
            </section>

    </main>
    <!-- Show more button -->
    <div class=" text-center mt-2">
        <button href="#" id="loadMoreBtn" class="hidden text-red-600 hover:underline text-sm">Show more</button>
    </div>
    </div>
    </div>

    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/transaction-history.js') ?>"></script>
</body>

</html>