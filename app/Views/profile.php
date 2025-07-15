<!DOCTYPE html>
<html lang="id">

<?= $this->include('addon/header') ?>

<body class="bg-gray-50">
    <!-- Header -->
    <?= $this->include('addon/navbar') ?>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto md:px-[10rem] px-[4rem] py-6 md:py-8">
        <!-- Form & tombol preset -->
        <div class="flex flex-col items-center mb-6">
            <div class="relative">
                <img src="<?= base_url('img/loader.gif') ?>" id="profileImage" alt="Avatar" class="w-32 h-32 rounded-full">
                <button type="button" id="editProfileImg"
                    class="absolute bottom-0 right-0 bg-white w- border p-1 w-8 h-8 flex items-center justify-center rounded-full shadow">
                    <i class="fas fa-pen text-gray-500 text-xs"></i>
                </button>
            </div>
            <h2 id="username" class="text-2xl font-semibold mt-4 text-center">Loading..</h2>
        </div>

        <!-- Form -->
        <form class="space-y-4">
            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fas fa-at"></i>
                    </span>
                    <input
                        type="email" id="email" name="email"
                        class="pl-10 w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value="Email" disabled>
                </div>
            </div>

            <!-- Nama Depan -->
            <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nama Depan</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fas fa-user"></i>
                    </span>
                    <input
                        type="text" id="name" name="name"
                        class="pl-10 w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value="Name" disabled>
                </div>
            </div>

            <!-- Nama Belakang -->
            <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nama Belakang</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fas fa-user"></i>
                    </span>
                    <input
                        type="text" id="surname" name="surname"
                        class="pl-10 w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value="Surname" disabled>
                </div>
            </div>

            <!-- Tombol -->
            <div class="pt-4 space-y-3">
                <button id="editButton" type="button" class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">
                    Edit Profil
                </button>
                <button id="logoutButton" type="button" class="w-full border border-red-500 text-red-500 font-semibold py-2 rounded transition hover:bg-red-50">
                    Logout
                </button>
            </div>
        </form>
    </main>
    <div id="toastContainer" class="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 space-y-2"></div>
    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/edit-profile.js') ?>"></script>
</body>

</html>