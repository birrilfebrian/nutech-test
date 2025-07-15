class TopUpDashboard {
  constructor() {
    this.apiUrl = base_url + "topupapi";
    this.currentAmount = 0;
    this.isProcessing = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateTopUpButton();
  }

  bindEvents() {
    const amountInput = document.getElementById("amount");
    amountInput.addEventListener("input", (e) => {
      this.handleAmountInput(e.target.value);
    });

    // Tombol preset nominal
    const presetButtons = document.querySelectorAll("[data-nominal]");
    presetButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nominal = parseInt(btn.getAttribute("data-nominal")) || 0;
        this.currentAmount = nominal;
        document.getElementById("amount").value = nominal;
        this.updateTopUpButton();
      });
    });

    // Tombol submit topup
    const topUpBtn = document.getElementById("topupButton");
    topUpBtn.addEventListener("click", () => this.showConfirmModal());
  }

  handleAmountInput(value) {
    this.currentAmount = parseInt(value) || 0;
    this.updateTopUpButton();
  }

  updateTopUpButton() {
    const topUpBtn = document.getElementById("topupButton");
    if (this.currentAmount > 0 && !this.isProcessing) {
      topUpBtn.disabled = false;
      topUpBtn.classList.remove("opacity-50", "cursor-not-allowed");
      topUpBtn.classList.add("hover:bg-red-600");
    } else {
      topUpBtn.disabled = true;
      topUpBtn.classList.add("opacity-50", "cursor-not-allowed");
      topUpBtn.classList.remove("hover:bg-red-600");
    }
  }

  async executeTopUp() {
    this.hideModal("confirm-modal");
    this.isProcessing = true;
    this.showLoading();

    try {
      const token = await getBearerToken();
      const response = await fetch(this.apiUrl + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          amount: this.currentAmount,
          confirmed: true,
          email: localStorage.getItem("email"),
          token: token,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.showSuccessModal(result.message || "Top-up berhasil");
      } else {
        this.showFailedModal(result.message || "Top-up gagal");
      }
    } catch (error) {
      console.error("Execute top-up error:", error);
      this.showFailedModal("Terjadi kesalahan saat memproses top-up");
    } finally {
      this.isProcessing = false;
      this.hideLoading();
    }
  }

  showConfirmModal() {
    if (this.currentAmount <= 0 || this.isProcessing) return;

    const modal = this.createConfirmModal();
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("opacity-100");
      modal.querySelector(".modal-content").classList.add("scale-100");
    }, 10);
  }

  showFailedModal(message = "Top Up gagal") {
    if (document.getElementById("failed-modal")) return; // Cegah duplikat modal

    const modal = this.createFailedModal(message);
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("opacity-100");
      modal.querySelector(".modal-content").classList.add("scale-100");
    }, 10);
  }

  createConfirmModal() {
    const modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
    modal.onclick = (e) => {
      if (e.target === modal) this.hideModal("confirm-modal");
    };

    modal.innerHTML = `
      <div class="modal-content bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
            <img src="${base_url}img/Logo.png" alt="Ilustrasi" class="w-full">
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Konfirmasi Top Up</h3>
          <p class="text-sm text-gray-600 mb-6">
            Anda yakin untuk Top Up sebesar<br>
            <strong class="text-lg">Rp${this.formatNumber(
              this.currentAmount
            )}</strong>?
          </p>
          <div class="flex flex-col items-center space-y-2">
            <a href="#" onclick="topUpInstance.executeTopUp()" class="text-red-500 font-bold">
              Ya, lanjutkan Top Up
            </a>
            <a href="#" onclick="topUpInstance.hideModal('confirm-modal')" class="text-gray-400">
              Batalkan
            </a>
          </div>
        </div>
      </div>`;
    return modal;
  }

  createFailedModal(message) {
    const modal = document.createElement("div");
    modal.id = "failed-modal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
    modal.onclick = (e) => {
      if (e.target === modal) this.hideModal("failed-modal");
    };

    modal.innerHTML = `
      <div class="modal-content bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300 relative">
        <button onclick="topUpInstance.hideModal('failed-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-400 mb-4">
            <i class="fas fa-times text-white"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Top Up sebesar</h3>
          <p class="text-2xl font-bold text-gray-900 mb-2">Rp${this.formatNumber(
            this.currentAmount
          )}</p>
          <p class="text-sm text-gray-600 mb-6">gagal</p>
         <a href="#" onclick="topUpInstance.hideModal('failed-modal')" class="text-red-500 font-bold mt-3">
            Kembali ke Beranda
          </a>
        </div>
      </div>`;
    return modal;
  }

  createSuccessModal(message) {
    const modal = document.createElement("div");
    modal.id = "success-modal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
    modal.onclick = (e) => {
      if (e.target === modal) this.hideModal("success-modal");
    };

    modal.innerHTML = `
      <div class="modal-content bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300 relative">
        <button onclick="topUpInstance.hideModal('success-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <i class="fas fa-check text-green-600"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Top Up sebesar</h3>
          <p class="text-2xl font-bold text-gray-900 mb-2">Rp${this.formatNumber(
            this.currentAmount
          )}</p>
          <p class="text-sm text-gray-600 mb-6">Berhasil</p>
          <a href="#" onclick="topUpInstance.hideModal('success-modal')" class="text-red-500 font-bold mt-3">
            Kembali ke Beranda
          </a>
        </div>
      </div>`;
    return modal;
  }

  showSuccessModal(message) {
    if (document.getElementById("success-modal")) return; // Cegah duplikat modal

    const modal = this.createSuccessModal(message);
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("opacity-100");
      modal.querySelector(".modal-content").classList.add("scale-100");
    }, 10);
  }

  showLoading() {
    const topUpBtn = document.getElementById("topupButton");
    topUpBtn.disabled = true;
    topUpBtn.innerHTML = `
      <i class="fas fa-spinner fa-spin mr-2"></i>
      Memproses...
    `;
  }

  hideLoading() {
    const topUpBtn = document.getElementById("topupButton");
    topUpBtn.textContent = "Top Up";
    this.updateTopUpButton();
  }

  updateBalance(newBalance) {
    const balanceElements = document.querySelectorAll(
      ".balance-amount, .saldo-amount"
    );
    balanceElements.forEach((el) => {});
  }
}
