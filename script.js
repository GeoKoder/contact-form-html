const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");
const messageCount = document.getElementById("message-count");

// Error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

// Validate a single field and return true if valid
function validateName() {
  const value = nameInput.value.trim();
  if (value === "") {
    nameInput.classList.add("error");
    nameInput.classList.remove("valid");
    nameError.classList.add("visible");
    return false;
  } else {
    nameInput.classList.remove("error");
    nameInput.classList.add("valid");
    nameError.classList.remove("visible");
    return false;
  }
}

function validateEmail() {
  const value = emailInput.value.trim();
  // Simple check: must not be empty and must contain @
  if (
    value === "" ||
    !value.includes("@") ||
    value.indexOf("@") === 0 ||
    value.indexOf("@") === value.length - 1
  ) {
    emailInput.classList.add("error");
    emailInput.classList.remove("valid");
    emailError.classList.add("visible");
    return false;
  } else {
    emailInput.classList.remove("error");
    emailInput.classList.add("valid");
    emailError.classList.remove("visible");
    return true;
  }
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value.length < 10) {
    messageInput.classList.add("error");
    messageInput.classList.remove("valid");
    messageError.classList.add("visible");
    return false;
  } else {
    messageInput.classList.remove("error");
    messageInput.classList.add("valid");
    messageError.classList.remove("visible");
    return true;
  }
}

// Live validation on input — gives users instant feedback
nameInput.addEventListener("input", function () {
  // Only validate if user has started typing
  if (nameInput.value.length > 0) {
    validateName();
  }
});

emailInput.addEventListener("input", function () {
  if (emailInput.value.length > 0) {
    validateEmail();
  }
});

// Live character count for message
messageInput.addEventListener("input", function (event) {
  const length = event.target.value.trim().length;
  messageCount.textContent = length + " / 10 characters minimum";

  if (length === 0) {
    messageCount.className = "char-count";
  } else if (length < 10) {
    messageCount.className = "char-count warning";
  } else {
    messageCount.className = "char-count good";
  }

  if (length > 0) {
    validateMessage();
  }
});

// Validate all fields on blur (when user clicks away)
nameInput.addEventListener("change", validateName);
emailInput.addEventListener("change", validateEmail);
messageInput.addEventListener("change", validateMessage);

// Handle form submission
form.addEventListener("submit", function (event) {
  // CRITICAL: prevent the browser from reloading the page
  event.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  // If any field is invalid, stop here
  if (!isNameValid || !isEmailValid || !isMessageValid) {
    formStatus.className = "form-status error-status";
    formStatus.textContent = "Please fix the errors above before submitting.";
    return;
  }

  // All fields valid — show success
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // In a real app you would send this data to a server.
  // For now, we log it and show a success message.
  console.log("Form submitted:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  formStatus.className = "form-status success";
  formStatus.textContent =
    "Asante, " +
    name +
    "! Your message has been sent. We will reply to " +
    email +
    " shortly.";

  // Clear the form
  form.reset();

  // Remove all validation classes
  nameInput.classList.remove("valid", "error");
  emailInput.classList.remove("valid", "error");
  messageInput.classList.remove("valid", "error");
  messageCount.textContent = "0 / 10 characters minimum";
  messageCount.className = "char-count";
});

// Allow Ctrl+Enter or Cmd+Enter to submit the form from the textarea
messageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    form.dispatchEvent(new Event("submit"));
  }
});
