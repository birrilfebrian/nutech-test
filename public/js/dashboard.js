const baseUrl = window.location.origin;

document.addEventListener("DOMContentLoaded", function () {
  loadServices();
  setupScrollBehavior();
});

async function loadServices() {
  const bearerToken = await getBearerToken();
  const servicesGrid = document.getElementById("servicesGrid");
  const bannerGrid = document.getElementById("bannerGrid");

  showLoading("servicesGrid", "Layanan");
  showLoading("bannerGrid", "Banner");

  if (!bearerToken) {
    const cached = await getFromDatabase();
    renderServices(cached?.services || [], servicesGrid);
    renderBanners(cached?.banners || [], bannerGrid);
    return;
  }

  try {
    const [servicesRes, bannersRes] = await Promise.all([
      fetch("https://take-home-test-api.nutech-integrasi.com/services", {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }).then((res) => res.json()),

      fetch("https://take-home-test-api.nutech-integrasi.com/banner", {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }).then((res) => res.json()),
    ]);

    const services = servicesRes?.data || [];
    const banners = bannersRes?.data || [];

    const isServiceEmpty = services.length === 0;
    const isBannerEmpty = banners.length === 0;

    if (isServiceEmpty && isBannerEmpty) {
      const cached = await getFromDatabase();
      renderServices(cached?.services || [], servicesGrid);
      renderBanners(cached?.banners || [], bannerGrid);
      return;
    }

    const cached = await getFromDatabase();
    const localServices = cached?.services || [];
    const localBanners = cached?.banners || [];

    const isNewService = services.length !== localServices.length;
    const isNewBanner = banners.length !== localBanners.length;

    if (isNewService || isNewBanner) {
      await saveToDatabase(services, banners);
    }

    renderServices(services, servicesGrid);
    renderBanners(banners, bannerGrid);
  } catch (error) {
    const cached = await getFromDatabase();
    renderServices(cached?.services || [], servicesGrid);
    renderBanners(cached?.banners || [], bannerGrid);
  }
}

async function getFromDatabase() {
  try {
    const res = await fetch(`${baseUrl}/info/getFromDatabase`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    return json.status === "success" ? json.data : null;
  } catch (err) {
    return null;
  }
}

async function saveToDatabase(services, banners) {
  try {
    const res = await fetch(`${baseUrl}/info/saveToDatabase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        services: services || [],
        banners: banners || [],
      }),
    });

    const json = await res.json();
    if (json.status === "success") {
      console.log("Saved successfully");
      console.log();
    }
  } catch (err) {
    console.error("Error saving to DB:", err);
  }
}

function showLoading(containerId, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="flex justify-center items-center py-8 w-full">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      <span class="ml-2 text-gray-600">Loading ${type}...</span>
    </div>
  `;
}

function showError(containerId, message) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="flex justify-center items-center py-8 w-full">
      <div class="text-center">
        <i class="fas fa-exclamation-triangle text-red-500 text-2xl mb-2"></i>
        <p class="text-red-600 mb-2">${message}</p>
        <button onclick="loadServices()" class="text-blue-600 hover:text-blue-800 underline">
          Coba Lagi
        </button>
      </div>
    </div>
  `;
}

function renderServices(services, container) {
  container.innerHTML = "";

  services.forEach((service) => {
    const card = document.createElement("div");
    const imageUrl = service.service_icon || service.image || "";
    const title = service.service_name || service.title || "Tanpa Judul";

    card.className =
      "flex-shrink-0 w-[85px] md:w-[100px] h-[100px] md:h-[110px] bg-white rounded-lg shadow-md hover:shadow-lg flex flex-col items-center justify-center p-3 transition-all duration-200 cursor-pointer snap-start border border-gray-100";

    card.innerHTML = `
      <div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-2 bg-gray-50 rounded-lg">
        <img src="${imageUrl}" alt="${title}" class="w-8 h-8 md:w-10 md:h-10 object-contain"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-image text-gray-400 text-lg md:text-xl\\'></i>'">
      </div>
      <div class="w-full text-center">
        <span class="text-[10px] md:text-xs text-gray-700 font-medium leading-tight block">${title}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      handleServiceClick(service);
    });

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-2px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    container.appendChild(card);
  });
}

function renderBanners(banners, container) {
  container.innerHTML = "";

  banners.forEach((banner) => {
    const card = document.createElement("div");
    const imageUrl = banner.banner_image || banner.image || "";
    const title = banner.banner_name || banner.title || "Tanpa Judul";
    card.className =
      "flex-shrink-0 w-[320px] md:w-[380px] h-[160px] md:h-[180px] bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden snap-start transition-all duration-300 cursor-pointer border border-gray-100";

    card.innerHTML = `
      <div class="relative w-full h-full bg-gradient-to-br from-red-500 to-red-600 overflow-hidden">
        <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'flex items-center justify-center w-full h-full\\'>  <i class=\\'fas fa-image text-white text-4xl opacity-50\\'></i></div>'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
      
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      handleBannerClick(banner);
    });

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    container.appendChild(card);
  });
}

function handleServiceClick(service) {
  if (service.service_code) {
    window.location.href = `${baseUrl}/service/${service.service_code}`;
  } else {
    showServiceModal(service);
  }
}

function handleBannerClick(banner) {
  if (banner.banner_url) {
    window.open(banner.banner_url, "_blank");
  } else {
    showBannerModal(banner);
  }
}

function showServiceModal(service) {
  alert(
    `Layanan: ${service.service_name}\nKode: ${service.service_code}\nTarif: ${service.service_tariff}`
  );
}

function showBannerModal(banner) {
  alert(
    `Banner: ${banner.banner_name}\nDeskripsi: ${
      banner.description || "Promo menarik"
    }`
  );
}

function setupScrollBehavior() {
  const containers = ["servicesGrid", "bannerGrid"];

  containers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        const scrollAmount = e.deltaY > 0 ? 200 : -200;
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      });

      let isScrolling = false;
      let startX = 0;
      let scrollLeft = 0;

      container.addEventListener("mousedown", (e) => {
        isScrolling = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = "grabbing";
      });

      container.addEventListener("mouseleave", () => {
        isScrolling = false;
        container.style.cursor = "grab";
      });

      container.addEventListener("mouseup", () => {
        isScrolling = false;
        container.style.cursor = "grab";
      });
    }
  });
}
