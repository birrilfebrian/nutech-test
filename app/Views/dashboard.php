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
            <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">Layanan</h2>
            <div class="relative">
                <!-- Scroll indicators -->
                <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
                <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>

                <!-- Services Container - KONSISTEN -->
                <div id="servicesGrid" class="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x snap-mandatory px-1">
                    <!-- Loading State -->
                    <div id="servicesLoading" class="flex justify-center items-center py-8 w-full">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        <span class="ml-2 text-gray-600">Loading services...</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Promo Section - IMPROVED -->
        <div class="mb-6">
            <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">Temukan promo menarik</h2>
            <div class="relative">
                <!-- Scroll indicators -->
                <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
                <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>

                <!-- Banners Container - BESAR & SIDE SCROLLING -->
                <div id="bannerGrid" class="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x snap-mandatory px-1">
                    <!-- Loading State -->
                    <div id="bannerLoading" class="flex justify-center items-center py-16 w-full">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        <span class="ml-2 text-gray-600">Loading banners...</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Instructions for better UX -->
        <div class="text-center mt-8 text-sm text-gray-500">
            <p><i class="fas fa-info-circle mr-1"></i> Scroll horizontal untuk melihat lebih banyak layanan dan promo</p>
        </div>
    </main>

    <!-- Loading Overlay (optional) -->
    <div id="globalLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="display: none;">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p class="text-gray-600">Memuat...</p>
        </div>
    </div>


    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/dashboard.js') ?>"></script>
</body>

</html>