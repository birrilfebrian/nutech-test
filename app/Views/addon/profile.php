<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-6 lg:space-y-0">
    <!-- Kiri: Info Pengguna -->
    <div class="flex flex-col  items-center lg:items-start text-center lg:text-start space-y-2 w-full lg:w-auto">
        <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
            <img src="<?= base_url('img/loader.gif') ?>" id="profileImage" alt="Avatar" class="w-full h-full rounded-full">
        </div>
        <div>
            <p class="text-gray-600 text-xl lg:text-2xl">Selamat datang,</p>
            <h1 id="username" class="text-3xl lg:text-3xl font-bold text-gray-800">Loading..</h1>
        </div>
    </div>


    <!-- Kanan: Balance Card -->
    <div class="w-full lg:w-[580px] bg-[url('<?= base_url('img/bg-balance.png') ?>')] bg-no-repeat bg-cover bg-center text-white p-6 rounded-xl shadow-lg hover-scale">
        <p class="text-sm opacity-90 mb-2">Saldo anda</p>
        <div class="flex items-center space-x-2 mb-3">
            <span class="text-2xl rp-sign font-bold">Rp</span>
            <span class="balance-amount text-2xl mr-3 font-bold hidden">0</span>
            <div class="balance-dots flex space-x-1">
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
                <span class="w-3 h-3 bg-white rounded-full balance-dot"></span>
            </div>
        </div>
        <button onclick="toggleBalance()" class="text-sm text-white opacity-90 hover:opacity-100 flex items-center space-x-2 transition-opacity">
            <span>Lihat Saldo</span>
            <i class="fas fa-eye text-xs eye-icon"></i>
        </button>
    </div>
</div>