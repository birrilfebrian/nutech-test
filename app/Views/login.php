<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Login | SIMS PPOB</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="flex h-screen bg-white">

    <!-- Left: Form -->
    <div class="w-full md:w-1/2 flex flex-col justify-center px-10">
        <div class="max-w-sm w-full mx-auto space-y-6">
            <div class="flex justify-center gap-2">
                <img src="<?= base_url('img/Logo.png') ?>" class="w-7" />
                <span class="text-lg font-semibold text-gray-800">SIMS PPOB</span>
            </div>
            <h1 class="text-2xl font-bold text-center text-gray-800">Masuk atau buat akun untuk memulai</h1>

            <form id="loginForm" class="space-y-4 justify-center">
                <div>
                    <input type="email" name="email" id="email" placeholder="@ wallet@nutech.com"
                        class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                    <p id="emailError" class="text-sm text-red-500 mt-1 hidden">Email wajib diisi</p>
                </div>

                <div class="relative">
                    <input type="password" name="password" id="password" placeholder="masukkan password anda"
                        class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                    <span class="absolute right-4 top-3 text-gray-400 cursor-pointer"
                        id="togglePassword"
                        data-eye='<?= json_encode(view('icons/eye')) ?>'
                        data-eye-slash='<?= json_encode(view('icons/eye-slash')) ?>'>
                        <?= view('icons/eye') ?>
                    </span>
                    <p id="passwordError" class="text-sm text-red-500 mt-1 hidden">Email wajib diisi</p>
                </div>

                <button type="button" id="btnLogin"
                    class="w-full bg-red-600 text-white font-medium py-2 rounded hover:bg-red-700 transition duration-200">
                    Masuk
                </button>
            </form>

            <p class="text-sm text-gray-500 text-center">
                Belum punya akun? <a href="<?= base_url('register') ?>" class="text-red-600 font-semibold">registrasi di sini</a>
            </p>

            <div id="errorBox" class="bg-red-100 text-red-700 text-sm p-3 rounded mt-4 hidden">
                password yang anda masukan salah
            </div>
        </div>
    </div>

    <!-- Right: Illustration -->
    <div class="hidden md:flex md:w-[50%] lg:w-[40%] ml-auto items-center justify-end bg-red-50">
        <img src="<?= base_url('img/illus_login.png') ?>" alt="Ilustrasi" class="w-*">
    </div>

    <script src="<?= base_url('js/login.js') ?>"></script>
</body>

</html>