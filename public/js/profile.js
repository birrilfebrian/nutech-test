const apiUrl = "https://take-home-test-api.nutech-integrasi.com/services";

async function getBearerToken() {
  const email = localStorage.getItem("email");
  if (!email) return null;

  try {
    const response = await fetch(
      `/auth/get-token?email=${encodeURIComponent(email)}`
    );
    const result = await response.json();

    if (result.status === "success" && result.token) {
      return result.token;
    } else {
      window.location.href = "/";
    }

    console.log(result);
    return null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
}

function toggleBalance() {
  const balanceContainer = document.querySelector(".balance-dots");
  const eyeIcon = document.querySelector(".eye-icon");
  const balanceAmount = document.querySelector(".balance-amount");
  const rpSign = document.querySelector(".rp-sign");

  if (!balanceContainer) {
    createBalanceElements();
    return;
  }

  const isHidden = balanceContainer.style.display === "none";

  if (isHidden) {
    balanceContainer.style.display = "flex";
    if (balanceAmount) balanceAmount.style.display = "none";
    eyeIcon.className = "fas fa-eye text-xs eye-icon";
  } else {
    balanceContainer.style.display = "none";
    if (balanceAmount) balanceAmount.style.display = "block";
    eyeIcon.className = "fas fa-eye-slash text-xs eye-icon";
  }
}

async function loadBalance() {
  const bearerToken = await getBearerToken();
  if (!bearerToken) {
    console.warn("Tidak bisa ambil token untuk balance.");
    return;
  }

  try {
    const response = await fetch(
      "https://take-home-test-api.nutech-integrasi.com/balance",
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );

    const data = await response.json();

    if (data.status === 0) {
      const balance = data.data.balance;
      updateBalanceDisplay(balance);
    } else {
      console.warn("Balance API error:", data);
    }
  } catch (error) {
    console.error("Error loading balance:", error);
  }
}

async function loadProfile() {
  console.log("Loading username...");
  const bearerToken = await getBearerToken();
  if (!bearerToken) {
    console.warn("Tidak bisa ambil token untuk balance.");
    return;
  }

  try {
    const response = await fetch(
      "https://take-home-test-api.nutech-integrasi.com/profile",
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );

    const data = await response.json();

    if (data.status === 0) {
      const { first_name, last_name, email, profile_image } = data.data;
      const username = `${first_name} ${last_name}`;
      console.log("Username:", username);
      updateUsernameDisplay(username);
      const profileImg = document.getElementById("profileImage");
      if (profileImg && profile_image) {
        profileImg.src = profile_image;
      } else {
        console.warn("Profile API error:", data);
      }

      if (window.location.pathname === "/profile") {
        document.getElementById("email").value = email;
        document.getElementById("name").value = first_name;
        document.getElementById("surname").value = last_name;
      }
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

function updateUsernameDisplay(username) {
  const userName = document.getElementById("username");
  if (userName) {
    userName.innerHTML = username;
  }
}

function updateBalanceDisplay(balance) {
  const balanceAmount = document.querySelector(".balance-amount");
  if (balanceAmount) {
    console.log("Balance:", balance);
    balanceAmount.textContent = formatCurrency(balance);
  }
}

function formatCurrency(amount) {
  return Number(amount).toLocaleString("id-ID");
}

document.addEventListener("DOMContentLoaded", function () {
  loadBalance();
  loadProfile();
});
