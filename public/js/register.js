document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordConfrmInput = document.getElementById("confirmpassword");
  const first_name = document.getElementById("name");
  const last_name = document.getElementById("surname");
  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");
  const surnameError = document.getElementById("surnameError");
  const passwordError = document.getElementById("passwordError");
  const passwordConfrmError = document.getElementById("passwordConfrmError");
  const toggleBtn = document.getElementById("togglePassword");
  const toggleConfrmBtn = document.getElementById("toggleConfrmPassword");
  const submitBtn = document.getElementById("btnLogin");

  const responsebox = document.getElementById("responseBox");

  if (!form || !toggleBtn || !emailInput || !passwordInput) return;

  const eyeIcon = JSON.parse(toggleBtn.dataset.eye);
  const eyeSlashIcon = JSON.parse(toggleBtn.dataset.eyeSlash);

  let isVisible = false;

  // Toggle Password Visibility
  toggleBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    passwordInput.type = isVisible ? "text" : "password";
    toggleBtn.innerHTML = isVisible ? eyeSlashIcon : eyeIcon;
  });
  toggleConfrmBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    passwordConfrmInput.type = isVisible ? "text" : "password";
    passwordConfrmInput.innerHTML = isVisible ? eyeSlashIcon : eyeIcon;
  });

  // Form Submit
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let isValid = true;

    // Email Validation
    if (!emailInput.value.trim()) {
      emailInput.classList.replace("border-gray-300", "border-red-500");
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailInput.classList.replace("border-red-500", "border-gray-300");
      emailError.classList.add("hidden");
    }

    // Name Validation
    if (!first_name.value.trim()) {
      first_name.classList.replace("border-gray-300", "border-red-500");
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      first_name.classList.replace("border-red-500", "border-gray-300");
      nameError.classList.add("hidden");
    }

    // Surname Validation
    if (!last_name.value.trim()) {
      last_name.classList.replace("border-gray-300", "border-red-500");
      surnameError.classList.remove("hidden");
      isValid = false;
    } else {
      last_name.classList.replace("border-red-500", "border-gray-300");
      surnameError.classList.add("hidden");
    }

    // Password Validation
    if (!passwordInput.value.trim()) {
      passwordInput.classList.replace("border-gray-300", "border-red-500");
      passwordError.classList.remove("hidden");
      passwordError.innerHTML = "Password harus diisi.";
      isValid = false;
    } else if (passwordInput.value.trim().length < 8) {
      passwordInput.classList.replace("border-gray-300", "border-red-500");
      passwordError.classList.remove("hidden");
      passwordError.innerHTML = "Password minimal 8karakter";
      isValid = false;
    } else if (
      passwordInput.value.trim() !== passwordConfrmInput.value.trim()
    ) {
      passwordInput.classList.replace("border-gray-300", "border-red-500");
      passwordError.classList.remove("hidden");
      passwordError.innerHTML = "Password tidak sama";
      isValid = false;
    } else {
      passwordInput.classList.replace("border-red-500", "border-gray-300");
      passwordError.classList.add("hidden");
    }

    if (!passwordConfrmInput.value.trim()) {
      passwordConfrmInput.classList.replace(
        "border-gray-300",
        "border-red-500"
      );
      passwordConfrmError.classList.remove("hidden");
      passwordConfrmError.innerHTML = "Password harus diisi.";
      isValid = false;
    } else if (
      passwordInput.value.trim() !== passwordConfrmInput.value.trim()
    ) {
      passwordConfrmInput.classList.replace(
        "border-gray-300",
        "border-red-500"
      );
      passwordConfrmError.classList.remove("hidden");
      passwordConfrmError.innerHTML = "Password tidak sama";
      isValid = false;
    } else {
      passwordConfrmInput.classList.replace(
        "border-red-500",
        "border-gray-300"
      );
      passwordConfrmError.classList.add("hidden");
    }

    if (!isValid) return;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const name = first_name.value.trim();
    const surname = last_name.value.trim();
    try {
      const loginRes = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            first_name: name,
            last_name: surname,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await loginRes.json();

      if (result.status === 0) {
        responsebox.classList.remove("hidden");
        responsebox.innerHTML = result.message;
      } else {
        responsebox.classList.remove("hidden");
        responsebox.classList.replace("bg-green-100", "bg-red-100");
        responsebox.classList.replace("text-green-700", "text-red-700");
        responsebox.innerHTML = result.message;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  });
});
