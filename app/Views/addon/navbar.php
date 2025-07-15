<header class="bg-white border-b border-gray-200 px-4 md:px-6 py-4 shadow-sm">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
        <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <img src="<?= base_url('img/Logo.png') ?>" class="w-7" />
            </div>
            <a href="<?= base_url('/dashboard') ?>" class="font-semibold text-gray-800 text-lg">SIMS PPOB</a>
        </div>
        <nav class="flex space-x-4 md:space-x-8">
            <a href="<?= base_url('topupv') ?>" class="text-gray-600 hover:text-gray-800 font-medium text-sm md:text-base transition-colors">Top Up</a>
            <a href="<?= base_url('transaksi') ?>" class="text-gray-600 hover:text-gray-800 font-medium text-sm md:text-base transition-colors">Transaction</a>
            <a href="<?= base_url('profile') ?>" class="text-gray-600 hover:text-gray-800 font-medium text-sm md:text-base transition-colors">Akun</a>
        </nav>
    </div>
</header>