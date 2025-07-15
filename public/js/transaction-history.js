let currentOffset = 0;
let allDataLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  setupScrollDetector();
  setupShowMoreClick();
});

async function loadTransactions() {
  const container = document.getElementById("transactionList");
  const bearerToken = await getBearerToken();
  container.innerHTML =
    "<p class='text-sm text-gray-500'>Loading transaksi...</p>";

  try {
    const res = await fetch(
      `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${currentOffset}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    const json = await res.json();

    if (json.status == "0" && json.data.records) {
      renderTransactions(json.data.records, true);
    } else {
      throw new Error("API tidak mengembalikan data");
    }
  } catch (error) {
    console.warn("API gagal, fallback ke DB:", error.message);
    try {
      const resDb = await fetch("/transactions/from-db");
      const jsonDb = await resDb.json();
      if (jsonDb.status === "success") {
        renderTransactions(jsonDb.data, true);
        allDataLoaded = true;
      } else {
        container.innerHTML =
          "<p class='text-sm text-red-500'>Gagal memuat transaksi dari DB.</p>";
      }
    } catch (dbError) {
      container.innerHTML =
        "<p class='text-sm text-red-500'>Tidak dapat memuat transaksi.</p>";
      console.error("Gagal DB juga:", dbError);
    }
  }
}

function renderTransactions(transactions, reset = false) {
  const container = document.getElementById("transactionList");
  if (reset) container.innerHTML = "";

  if (transactions.length === 0 && reset) {
    container.innerHTML =
      "<p class='text-sm text-gray-500'>Tidak ada transaksi.</p>";
    allDataLoaded = true;
    return;
  }

  transactions.forEach((trx) => {
    const item = document.createElement("div");

    const isTopup = trx.transaction_type === "TOPUP";
    const sign = isTopup ? "+" : "-";
    const amountColor = isTopup ? "text-green-500" : "text-red-500";
    const amountFormatted = `Rp${Number(trx.total_amount).toLocaleString(
      "id-ID"
    )}`;

    const date = new Date(trx.created_on);
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} WIB`;

    item.className =
      "flex justify-between items-center p-4 mb-3 rounded-lg bg-white shadow-sm border border-gray-100";

    item.innerHTML = `
      <div>
        <p class="font-semibold ${amountColor}">${sign} ${amountFormatted}</p>
        <p class="text-xs text-gray-400 mt-1">${formattedDate}   ${formattedTime}</p>
      </div>
      <div class="text-right text-sm text-gray-600 font-medium">
        ${trx.description}
      </div>
    `;

    container.appendChild(item);
  });

  currentOffset += transactions.length;
}

function setupScrollDetector() {
  const container = document.getElementById("transactionList");
  const btn = document.getElementById("loadMoreBtn");

  container.addEventListener("scroll", () => {
    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10;

    if (isAtBottom && !allDataLoaded) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  });
}

function setupShowMoreClick() {
  const btn = document.getElementById("loadMoreBtn");
  btn.addEventListener("click", async () => {
    const bearerToken = await getBearerToken();
    try {
      const res = await fetch(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${currentOffset}`,
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }
      );
      const json = await res.json();

      if (json.status == "0" && json.data.records) {
        renderTransactions(json.data.records, false);
      } else {
        allDataLoaded = true;
        btn.classList.add("hidden");
      }
    } catch (err) {
      console.error("Gagal load transaksi tambahan:", err);
      btn.classList.add("hidden");
    }
  });
}
