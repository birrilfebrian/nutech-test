document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const formButtonsContainer = document.querySelector("form .pt-4");
  const editButton = document.getElementById("editButton");
  const logoutButton = document.getElementById("logoutButton");
  let saveButton = null;

  const editImgButton = document.getElementById("editProfileImg");
  const profileImage = document.getElementById("profileImage");

  editButton.addEventListener("click", () => {
    emailInput.disabled = false;
    nameInput.disabled = false;
    surnameInput.disabled = false;

    // Create Save button if not exists
    if (!saveButton) {
      saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.textContent = "Simpan";
      saveButton.className =
        "w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition";
      formButtonsContainer.insertBefore(saveButton, editButton);
    }

    // Hide Edit button
    logoutButton.style.display = "none";
    editButton.style.display = "none";
  });

  logoutButton.addEventListener("click", () => {
    const email = localStorage.getItem("email");
    const token = btoa(email);
    window.location.href = "/logout?token=" + encodeURIComponent(token);
  });

  // SUBMIT TEXT PROFILE
  formButtonsContainer.addEventListener("click", async (e) => {
    if (e.target !== saveButton) return;

    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const token = await getBearerToken();

    try {
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: name,
            last_name: surname,
          }),
        }
      );

      const result = await res.json();

      if (result.status === 0) {
        showToast("Profil berhasil diperbarui", "success");
        loadProfile();
        emailInput.disabled = true;
        nameInput.disabled = true;
        surnameInput.disabled = true;
        editButton.style.display = "block";
        logoutButton.style.display = "block";
        saveButton.remove();
        saveButton = null;
      } else {
        alert("Gagal memperbarui profil: " + result.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Terjadi kesalahan saat mengupdate profil.");
    }
  });

  // HANDLE UPLOAD IMAGE
  editImgButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", async () => {
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const token = await getBearerToken();

      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/profile/image",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await res.json();

        if (result.status === 0) {
          profileImage.src = URL.createObjectURL(file);
          alert("Foto profil berhasil diubah");
        } else {
          alert("Gagal upload foto: " + result.message);
        }
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Terjadi kesalahan saat upload gambar");
      }
    });

    fileInput.click();
  });

  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");

    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
    };

    const toast = document.createElement("div");
    toast.className = `text-white px-10 py-5 rounded shadow ${colors[type]}`;
    toast.innerText = message;

    container.appendChild(toast);

    // Hapus setelah 3 detik
    setTimeout(() => {
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
});
