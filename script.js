const pass = document.getElementById("password");
const togBtn = document.getElementById("toggleBtn");
const message = document.getElementById("message");

togBtn.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    togBtn.textContent = "Hide";
  } else {
    pass.type = "password";
    togBtn.textContent = "Show";
  }
});
