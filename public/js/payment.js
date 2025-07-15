class PaymentDashboard {
  constructor() {
    this.apiUrl = base_url + "paymentapi";
    this.currentAmount = 0;
    this.isProcessing = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePayButton();
  }

  bindEvents() {
    const amountInput = document.getElementById("pay-amount");

    this.handleAmountInput(amountInput.value);

    const payBtn = document.getElementById("payButton");
    payBtn.addEventListener("click", () => this.showConfirmModal());
  }

  handleAmountInput(value) {
    this.currentAmount = parseInt(value) || 0;
    this.updatePayButton();
  }

  updatePayButton() {
    const payBtn = document.getElementById("payButton");
    if (!this.isProcessing) {
      payBtn.disabled = false;
      payBtn.classList.remove("opacity-50", "cursor-not-allowed");
      payBtn.classList.add("hover:bg-gray-600");
    } else {
      payBtn.disabled = true;
      payBtn.classList.add("opacity-50", "cursor-not-allowed");
      payBtn.classList.remove("hover:bg-gray-600");
    }
  }

  async executePayment() {
    this.hideModal("confirm-payment-modal");
    this.isProcessing = true;
    this.showLoading();

    try {
      const serviceCode = document.getElementById("service_code").value;
      const token = await getBearerToken();
      console.log(serviceCode);
      const response = await fetch(this.apiUrl + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          service_code: serviceCode,
          amount: this.currentAmount,
          email: localStorage.getItem("email"),
          token: token,
          transaction_type: "payment",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.showSuccessModal(result.message || "Pembayaran berhasil");
        loadBalance();
      } else {
        this.showFailedModal(result.message || "Pembayaran gagal");
      }
    } catch (error) {
      console.error("Execute payment error:", error);
      this.showFailedModal("Terjadi kesalahan saat memproses pembayaran");
    } finally {
      this.isProcessing = false;
      this.hideLoading();
    }
  }

  showConfirmModal() {
    if (this.isProcessing) return;

    const modal = this.createConfirmModal();
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("opacity-100");
      modal.querySelector(".modal-content").classList.add("scale-100");
    }, 10);
  }

  createConfirmModal() {
    const modal = document.createElement("div");
    modal.id = "confirm-payment-modal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
    modal.onclick = (e) => {
      if (e.target === modal) this.hideModal("confirm-payment-modal");
    };

    modal.innerHTML = `
      <div class="modal-content bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300">
        <div class="text-center items-center justify-center">
         <div class="mx-auto flex  h-12 w-12 rounded-full bg-orange-100 mb-4">
            <img src="${base_url}img/Logo.png" alt="Ilustrasi" class="w-full">
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Konfirmasi Pembayaran</h3>
          <p class="text-sm text-gray-600 mb-6">
            Anda yakin ingin membayar sebesar<br>
            <strong class="text-lg">Rp${this.formatNumber(
              this.currentAmount
            )}?</strong>
          </p>
          <div class="flex flex-col items-center space-y-2">
            <a href="#" onclick="paymentInstance.executePayment()" class="text-red-500 font-bold">
              Ya, Lanjutkan Pembayaran
            </a>
            <a href="#" onclick="paymentInstance.hideModal('confirm-payment-modal')" class="text-gray-400">
              Batalkan
            </a>
          </div>
        </div>
      </div>`;
    return modal;
  }
  showFailedModal(message) {
    if (document.getElementById("failed-modal")) return; // Cegah duplikat modal

    const modal = this.createFailedModal(message);
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("opacity-100");
      modal.querySelector(".modal-content").classList.add("scale-100");
    }, 10);
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
        <button onclick="paymentInstance.hideModal('failed-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-red-500"></i>
        </button>
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-400 mb-4">
            <i class="fas fa-times text-white"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Pembayaran sebesar</h3>
          <p class="text-2xl font-bold text-gray-900 mb-2">Rp${this.formatNumber(
            this.currentAmount
          )}</p>
          <p class="text-sm text-gray-600 mb-6">gagal</p>
         <a href="#" onclick="paymentInstance.hideModal('failed-modal')" class="text-red-500 font-bold mt-3">
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
        <button onclick="paymentInstance.hideModal('success-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-red-500"></i>
        </button>
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <i class="fas fa-check text-green-600"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Pembayaran sebesar</h3>
          <p class="text-2xl font-bold text-gray-900 mb-2">Rp${this.formatNumber(
            this.currentAmount
          )}</p>
          <p class="text-sm text-gray-600 mb-6">Berhasil</p>
          <a href="#" onclick="paymentInstance.hideModal('success-modal')" class="text-red-500 font-bold mt-3">
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
    const payBtn = document.getElementById("payButton");
    payBtn.disabled = true;
    payBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Memproses...`;
  }

  hideLoading() {
    const payBtn = document.getElementById("payButton");
    payBtn.textContent = "Bayar";
    this.updatePayButton();
  }

  hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("opacity-100");
      modal.querySelector(".modal-content")?.classList.remove("scale-100");
      setTimeout(() => modal.remove(), 300);
    }
  }

  resetForm() {
    document.getElementById("pay-amount").value = "";
    this.updatePayButton();
  }

  formatNumber(number) {
    return new Intl.NumberFormat("id-ID").format(number);
  }
}

// Inisialisasi
let paymentInstance;
document.addEventListener("DOMContentLoaded", () => {
  paymentInstance = new PaymentDashboard();
});
