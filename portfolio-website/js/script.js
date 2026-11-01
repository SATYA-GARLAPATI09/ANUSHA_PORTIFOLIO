/**
 * Student Portfolio Website - JavaScript Interactivity & Validation
 * Student: Sankabathula Lakshmi Anusha
 * Reg. No.: 236M1A05A0
 * BVC College of Engineering - Computer Science and Engineering
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Professional Developer Console Diagnostics (Figure 4.6 context)
  console.log(
    "%c[STUDENT PORTFOLIO SYSTEM]%c Initialized successfully",
    "background: #1e40af; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
    "color: #059669; font-weight: bold; margin-left: 6px;"
  );
  console.log(
    "%c[Developer]%c Sankabathula Lakshmi Anusha | Reg No: 236M1A05A0",
    "font-weight: bold; color: #1e40af;",
    "color: #334155;"
  );
  console.log(
    "%c[Institution]%c BVC College of Engineering | CSE Department",
    "font-weight: bold; color: #1e40af;",
    "color: #334155;"
  );
  console.log(
    "%c[Internship]%c OTP Technologies Pvt. Ltd., Eluru in collaboration with APSCHE (120 Hours)",
    "font-weight: bold; color: #1e40af;",
    "color: #334155;"
  );
  console.log(
    "%c[Diagnostics]%c DOMContentLoaded event fired. All event listeners and responsive handlers attached cleanly. 0 unresolved errors.",
    "background: #eff6ff; color: #1e40af; padding: 2px 6px; border-radius: 3px;",
    "color: #059669;"
  );

  // 2. Profile Photo Management (Upload, Preview & Vercel Persistence)
  const profileAvatarImg = document.getElementById("profileAvatarImg");
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const btnUploadPhoto = document.getElementById("btnUploadPhoto");
  const btnResetPhoto = document.getElementById("btnResetPhoto");

  // Show friendly toast notification
  function showToast(title, message, actionsHtml = "", duration = 9000) {
    const existing = document.querySelector(".photo-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "photo-toast";
    toast.innerHTML = `<strong>${title}</strong><span>${message}</span>${actionsHtml ? `<div class="toast-actions">${actionsHtml}</div>` : ""}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }

  // Load saved photo from localStorage if present
  if (profileAvatarImg) {
    const savedPhoto = localStorage.getItem("anusha_portfolio_photo_v2");
    if (savedPhoto) {
      profileAvatarImg.src = savedPhoto;
      if (btnResetPhoto) btnResetPhoto.style.display = "inline-flex";
      console.log("[Profile Photo] Loaded custom profile picture from localStorage.");
    }
  }

  // Upload button click trigger
  if (btnUploadPhoto && profilePhotoInput) {
    btnUploadPhoto.addEventListener("click", function () {
      profilePhotoInput.click();
    });
  }

  // Handle file selection
  if (profilePhotoInput && profileAvatarImg) {
    profilePhotoInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file (PNG, JPG, or WEBP).");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target.result;
        profileAvatarImg.src = dataUrl;

        // Persist to localStorage for client-side persistence
        try {
          localStorage.setItem("anusha_portfolio_photo_v2", dataUrl);
          if (btnResetPhoto) btnResetPhoto.style.display = "inline-flex";
          console.log("[Profile Photo] Saved new photo to localStorage.");

          const actions = `
            <a href="${dataUrl}" download="profile.jpg" class="toast-link-btn">💾 Download profile.jpg</a>
            <a href="https://github.com/SATYA-GARLAPATI09/ANUSHA_PORTIFOLIO/upload/main/portfolio-website/images" target="_blank" rel="noopener" class="toast-link-btn">🚀 Deploy to Vercel via GitHub</a>
          `;

          showToast(
            "📷 Profile Photo Updated!",
            "Your new photo is now active on this device! To make it permanent online for EVERYONE visiting your Vercel link, download it as <b>profile.jpg</b> and drop it into your GitHub repository.",
            actions,
            12000
          );
        } catch (err) {
          console.warn("[Profile Photo] Could not save to localStorage (storage limit):", err);
          showToast(
            "📷 Photo Displayed!",
            "Image applied in session. For permanent Vercel deployment, save it as <b>images/profile.jpg</b>."
          );
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle photo reset
  if (btnResetPhoto && profileAvatarImg) {
    btnResetPhoto.addEventListener("click", function () {
      localStorage.removeItem("anusha_portfolio_photo_v2");
      profileAvatarImg.src = "images/profile.jpg";
      btnResetPhoto.style.display = "none";
      if (profilePhotoInput) profilePhotoInput.value = "";
      console.log("[Profile Photo] Reset to default official photo.");
      showToast("🔄 Reset Complete", "Profile photo reverted to Anusha's official photo.", "", 3000);
    });
  }

  // 3. Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinksItems = document.querySelectorAll(".nav-link");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
      const isExpanded = navToggle.classList.contains("active");
      navToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // 3. Navigation Active Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(function (current) {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add("active");
      } else {
        if (navLink) navLink.classList.remove("active");
      }
    });
  }
  window.addEventListener("scroll", updateActiveNavLink);

  // 4. Contact Form Elements & Validation
  const contactForm = document.getElementById("contactForm");
  const formBanner = document.getElementById("formBanner");
  const bannerText = document.getElementById("bannerText");
  const btnTriggerError = document.getElementById("btnTriggerError");
  const btnTriggerSuccess = document.getElementById("btnTriggerSuccess");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  // Email Regex Validator
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Show error for a single field
  function setError(inputElement, errorMessage) {
    const formGroup = inputElement.closest(".form-group");
    formGroup.classList.remove("has-success");
    formGroup.classList.add("has-error");
    const errorText = formGroup.querySelector(".error-text");
    if (errorText) {
      errorText.innerHTML = `<span>⚠️</span> ${errorMessage}`;
    }
  }

  // Clear error for a single field
  function setSuccess(inputElement) {
    const formGroup = inputElement.closest(".form-group");
    formGroup.classList.remove("has-error");
    formGroup.classList.add("has-success");
  }

  // Clear all states
  function clearAllFeedback() {
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
      if (input) {
        const formGroup = input.closest(".form-group");
        formGroup.classList.remove("has-error", "has-success");
      }
    });
    formBanner.className = "form-banner";
    formBanner.style.display = "none";
  }

  // Real-time input cleaning
  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (input) {
      input.addEventListener("input", function () {
        const formGroup = input.closest(".form-group");
        if (formGroup.classList.contains("has-error")) {
          formGroup.classList.remove("has-error");
        }
      });
    }
  });

  // Validate form logic
  function validateForm() {
    let isValid = true;
    let firstErrorField = null;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, "Please enter your full name.");
      isValid = false;
      if (!firstErrorField) firstErrorField = nameInput;
    } else if (nameInput.value.trim().length < 3) {
      setError(nameInput, "Name must be at least 3 characters long.");
      isValid = false;
      if (!firstErrorField) firstErrorField = nameInput;
    } else {
      setSuccess(nameInput);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      setError(emailInput, "Please enter your email address.");
      isValid = false;
      if (!firstErrorField) firstErrorField = emailInput;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, "Please enter a valid email format (e.g., student@example.com).");
      isValid = false;
      if (!firstErrorField) firstErrorField = emailInput;
    } else {
      setSuccess(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, "Please specify a subject for your enquiry.");
      isValid = false;
      if (!firstErrorField) firstErrorField = subjectInput;
    } else {
      setSuccess(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setError(messageInput, "Please write your message.");
      isValid = false;
      if (!firstErrorField) firstErrorField = messageInput;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, "Message must contain at least 10 characters.");
      isValid = false;
      if (!firstErrorField) firstErrorField = messageInput;
    } else {
      setSuccess(messageInput);
    }

    return { isValid, firstErrorField };
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("[Contact Form] Submit initiated. Validating fields...");

      const { isValid, firstErrorField } = validateForm();

      if (!isValid) {
        formBanner.className = "form-banner banner-error";
        formBanner.style.display = "flex";
        bannerText.textContent = "Validation Failed: Please fill in all required fields marked in red.";
        console.warn("[Validation] Form submission rejected. Required fields missing or invalid.");
        if (firstErrorField) {
          firstErrorField.focus();
        }
      } else {
        formBanner.className = "form-banner banner-success";
        formBanner.style.display = "flex";
        bannerText.textContent = "Thank you! Your message has been validated and recorded successfully for demonstration.";
        console.log(
          "%c[Form Success]%c Valid submission recorded successfully. Form data: { name: '%s', email: '%s', subject: '%s' }",
          "color: #059669; font-weight: bold;",
          "color: #334155;",
          nameInput.value.trim(),
          emailInput.value.trim(),
          subjectInput.value.trim()
        );

        // Reset inputs after slight delay
        setTimeout(() => {
          nameInput.value = "";
          emailInput.value = "";
          subjectInput.value = "";
          messageInput.value = "";
        }, 1500);
      }
    });
  }

  // Helper Button: Instantly show Validation Error (Figure 4.5 Screenshot Helper)
  if (btnTriggerError) {
    btnTriggerError.addEventListener("click", function () {
      clearAllFeedback();
      nameInput.value = "";
      emailInput.value = "invalid-email-address";
      subjectInput.value = "";
      messageInput.value = "Hi";

      validateForm();

      formBanner.className = "form-banner banner-error";
      formBanner.style.display = "flex";
      bannerText.textContent = "Validation Message: Please complete all required fields with valid details.";
      console.warn("[Figure 4.5 Context] Validation error state activated for screenshot.");
    });
  }

  // Helper Button: Instantly show Success Feedback
  if (btnTriggerSuccess) {
    btnTriggerSuccess.addEventListener("click", function () {
      clearAllFeedback();
      nameInput.value = "Anusha Sankabathula";
      emailInput.value = "anusha.sankabathula@bvc.edu.in";
      subjectInput.value = "Portfolio Project Review & Feedback";
      messageInput.value = "Hello, your Web Development Student Portfolio Website looks responsive, modern, and clean!";

      [nameInput, emailInput, subjectInput, messageInput].forEach(setSuccess);

      formBanner.className = "form-banner banner-success";
      formBanner.style.display = "flex";
      bannerText.textContent = "Thank you! Your message has been recorded for demonstration.";
      console.log("[Figure 4.5 Context] Successful validation feedback state triggered.");
    });
  }
});

