document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const toggleBtn = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("btnLogin");

  if (!form || !toggleBtn || !emailInput || !passwordInput) return;

  const eyeIcon = JSON.parse(toggleBtn.dataset.eye);
  const eyeSlashIcon = JSON.parse(toggleBtn.dataset.eyeSlash);

  let isVisible = false;

  toggleBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    passwordInput.type = isVisible ? "text" : "password";
    toggleBtn.innerHTML = isVisible ? eyeSlashIcon : eyeIcon;
  });

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!emailInput.value.trim()) {
      emailInput.classList.replace("border-gray-300", "border-red-500");
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailInput.classList.replace("border-red-500", "border-gray-300");
      emailError.classList.add("hidden");
    }

    if (!passwordInput.value.trim()) {
      passwordInput.classList.replace("border-gray-300", "border-red-500");
      passwordError.classList.remove("hidden");
      isValid = false;
    } else {
      passwordInput.classList.replace("border-red-500", "border-gray-300");
      passwordError.classList.add("hidden");
    }

    if (!isValid) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const loginRes = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await loginRes.json();

      if (result.status === 0 && result.data?.token) {
        localStorage.setItem("email", email);
        await fetch("/auth/store-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token: result.data.token }),
        });

        window.location.href = "/dashboard";
      } else {
        alert(
          "Login gagal: " + (result.message || "Email atau password salah.")
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  });
});
