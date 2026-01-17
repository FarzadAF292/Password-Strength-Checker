"use strict";
// Get DOM elements
const pass = document.getElementById("password");
const toggBtn = document.getElementById("toggleBtn");
const message = document.getElementById("message");

const ruleLen = document.getElementById("ruleLen");
const ruleUpper = document.getElementById("ruleUpper");
const ruleNum = document.getElementById("ruleNum");
const ruleSpec = document.getElementById("ruleSpec");

// Toggle password visibility
toggBtn.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    toggBtn.textContent = "Hide";
  } else {
    pass.type = "password";
    toggBtn.textContent = "Show";
  }
});

// Function to check password rules
const checkRules = (password) => {
  // Rule 1: Minimum length of 8 characters
  if (password.length >= 8) {
    ruleLen.classList.add("ok");
  } else {
    ruleLen.classList.remove("ok");
  }

  // Rule 2: At least one uppercase letter
  if (/[A-Z]/.test(password)) {
    ruleUpper.classList.add("ok");
  } else {
    ruleUpper.classList.remove("ok");
  }

  // Rule 3: At least one number
  if (/[0-9]/.test(password)) {
    ruleNum.classList.add("ok");
  } else {
    ruleNum.classList.remove("ok");
  }

  // Rule 4: At least one special character
  if (/[^A-Za-z0-9]/.test(password)) {
    ruleSpec.classList.add("ok");
  } else {
    ruleSpec.classList.remove("ok");
  }
};

pass.addEventListener("input", () => {
  checkRules(pass.value);
});
