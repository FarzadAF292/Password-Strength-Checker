"use strict";

// Elements
const pass = document.getElementById("password");
const togBtn = document.getElementById("toggleBtn");
const message = document.getElementById("message");

const ruleLen = document.getElementById("ruleLen");
const ruleUpper = document.getElementById("ruleUpper");
const ruleNum = document.getElementById("ruleNum");
const ruleSpec = document.getElementById("ruleSpec");

const bar = document.getElementById("bar");
const strengthText = document.getElementById("strengthText");

// Helper
const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.classList.toggle("error", isError);
};

// Show/Hide password
togBtn.addEventListener("click", () => {
  const isHidden = pass.type === "password";
  pass.type = isHidden ? "text" : "password";
  togBtn.textContent = isHidden ? "Hide" : "Show";
});

// Main logic
const checkRules = (password) => {
  // If empty, reset UI
  if (!password) {
    ruleLen.classList.remove("ok");
    ruleUpper.classList.remove("ok");
    ruleNum.classList.remove("ok");
    ruleSpec.classList.remove("ok");

    bar.style.width = "0%";
    bar.style.backgroundColor = "transparent";
    strengthText.textContent = "—";
    showMessage("", false);
    return;
  }

  // Rule booleans
  const hasLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpec = /[^A-Za-z0-9]/.test(password);

  // Update rule UI
  ruleLen.classList.toggle("ok", hasLen);
  ruleUpper.classList.toggle("ok", hasUpper);
  ruleNum.classList.toggle("ok", hasNum);
  ruleSpec.classList.toggle("ok", hasSpec);

  // Strength score 0–4
  const strength =
    (hasLen ? 1 : 0) +
    (hasUpper ? 1 : 0) +
    (hasNum ? 1 : 0) +
    (hasSpec ? 1 : 0);

  // Update meter
  const percent = (strength / 4) * 100;
  bar.style.width = `${percent}%`;

  // Strength text + color
  if (strength === 1) {
    bar.style.backgroundColor = "red";
    strengthText.textContent = "Very Weak";
    showMessage(
      "Try adding more rules (8+ chars, uppercase, number, special).",
      true
    );
  } else if (strength === 2) {
    bar.style.backgroundColor = "orange";
    strengthText.textContent = "Weak";
    showMessage("Not bad — add 1–2 more rules to improve it.", false);
  } else if (strength === 3) {
    bar.style.backgroundColor = "yellow";
    strengthText.textContent = "Good";
    showMessage("Good! Add one more rule for a strong password.", false);
  } else if (strength === 4) {
    bar.style.backgroundColor = "green";
    strengthText.textContent = "Strong";
    showMessage("Strong password ✅", false);
  } else {
    // strength === 0 (should only happen if password exists but matches none)
    bar.style.backgroundColor = "transparent";
    strengthText.textContent = "—";
    showMessage("", false);
  }
};

// Run on typing
pass.addEventListener("input", () => {
  checkRules(pass.value);
});

// Optional: initialize UI on load
checkRules(pass.value);
