/* ================================================================
   HENMAT INTERNATIONAL SCHOOL — Application Page JavaScript
   Handles: validation, photo upload, progress steps, submission
   ================================================================ */

(function () {
  'use strict';

  /* ── DOM References ─────────────────────────────────────── */
  const form          = document.getElementById('applicationForm');
  const submitBtn     = document.getElementById('submitBtn');
  const btnText       = submitBtn.querySelector('.btn-text');
  const btnLoading    = submitBtn.querySelector('.btn-loading');
  const successBanner = document.getElementById('successBanner');

  // Upload
  const uploadZone        = document.getElementById('uploadZone');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const uploadPreview     = document.getElementById('uploadPreview');
  const previewImg        = document.getElementById('previewImg');
  const passportInput     = document.getElementById('passportPhoto');
  const removePhotoBtn    = document.getElementById('removePhotoBtn');

  // Mobile nav
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav    = document.getElementById('mobileNav');

  /* ── Validation Rules ───────────────────────────────────── */
  const rules = {
    studentFullName:   { required: true, label: 'Student full name' },
    dateOfBirth:       { required: true, label: 'Date of birth' },
    gender:            { required: true, label: 'Gender' },
    classApplying:     { required: true, label: 'Class applying for' },
    passportPhoto:     { required: true, label: 'Passport photo', type: 'file' },
    parentFullName:    { required: true, label: 'Parent full name' },
    phoneNumber:       { required: true, label: 'Phone number', type: 'phone' },
    emailAddress:      { required: true, label: 'Email address', type: 'email' },
    occupation:        { required: true, label: 'Occupation' },
    homeAddress:       { required: true, label: 'Home address' },
    previousSchoolName:{ required: true, label: 'Previous school name' },
    lastClassCompleted:{ required: true, label: 'Last class completed' },
    declaration:       { required: true, label: 'Declaration', type: 'checkbox' },
  };

  /* ── Helper: show / clear error ────────────────────────── */
  function showError(fieldId, message) {
    const errEl = document.getElementById('err-' + fieldId);
    const group = document.querySelector('[data-field="' + fieldId + '"]');
    if (errEl)  errEl.textContent = message;
    if (group)  group.classList.add('has-error');
  }

  function clearError(fieldId) {
    const errEl = document.getElementById('err-' + fieldId);
    const group = document.querySelector('[data-field="' + fieldId + '"]');
    if (errEl)  errEl.textContent = '';
    if (group)  group.classList.remove('has-error');
  }

  /* ── Validate a single field ────────────────────────────── */
  function validateField(fieldId) {
    const rule = rules[fieldId];
    if (!rule) return true;

    const el = document.getElementById(fieldId);
    if (!el) return true;

    let value = el.value.trim();

    // Checkbox
    if (rule.type === 'checkbox') {
      if (!el.checked) {
        showError(fieldId, 'You must confirm this declaration to proceed.');
        return false;
      }
      clearError(fieldId);
      return true;
    }

    // File
    if (rule.type === 'file') {
      if (!passportInput.files || !passportInput.files.length) {
        showError(fieldId, 'Please upload a passport photo.');
        return false;
      }
      clearError(fieldId);
      return true;
    }

    // Required check
    if (rule.required && !value) {
      showError(fieldId, rule.label + ' is required.');
      return false;
    }

    // Email format
    if (rule.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(fieldId, 'Please enter a valid email address (must contain @).');
        return false;
      }
    }

    // Phone: must contain at least 7 digits
    if (rule.type === 'phone' && value) {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 7) {
        showError(fieldId, 'Please enter a valid phone number.');
        return false;
      }
    }

    clearError(fieldId);
    return true;
  }

  /* ── Real-time validation on blur ───────────────────────── */
  Object.keys(rules).forEach(function (fieldId) {
    const el = document.getElementById(fieldId);
    if (!el) return;

    const event = rules[fieldId].type === 'checkbox' ? 'change' : 'blur';

    el.addEventListener(event, function () {
      validateField(fieldId);
      updateProgress();
    });

    // Clear error on input
    el.addEventListener('input', function () {
      clearError(fieldId);
      updateProgress();
    });
  });

  /* ── Progress Steps ─────────────────────────────────────── */
  // Map section numbers to their required fields
  const sectionFields = {
    1: ['studentFullName', 'dateOfBirth', 'gender', 'classApplying', 'passportPhoto'],
    2: ['parentFullName', 'phoneNumber', 'emailAddress', 'occupation', 'homeAddress'],
    3: ['previousSchoolName', 'lastClassCompleted'],
    4: ['declaration'],
  };

  function isSectionComplete(sectionNum) {
    return sectionFields[sectionNum].every(function (fieldId) {
      const el = document.getElementById(fieldId);
      if (!el) return false;
      const rule = rules[fieldId];
      if (!rule) return true;

      if (rule.type === 'checkbox') return el.checked;
      if (rule.type === 'file') return passportInput.files && passportInput.files.length > 0;
      return el.value.trim() !== '';
    });
  }

  function updateProgress() {
    for (var i = 1; i <= 4; i++) {
      const stepEl = document.querySelector('.progress-step[data-step="' + i + '"]');
      if (!stepEl) continue;

      if (isSectionComplete(i)) {
        stepEl.classList.add('done');
        stepEl.classList.remove('active');
      } else {
        stepEl.classList.remove('done');
        // Mark as active if previous section is done or it's the first
        if (i === 1 || isSectionComplete(i - 1)) {
          stepEl.classList.add('active');
        } else {
          stepEl.classList.remove('active');
        }
      }
    }

    // Colour the connectors between done steps
    const connectors = document.querySelectorAll('.progress-connector');
    connectors.forEach(function (connector, idx) {
      const stepNum = idx + 1;
      if (isSectionComplete(stepNum)) {
        connector.style.background = 'var(--blue)';
      } else {
        connector.style.background = 'var(--border)';
      }
    });
  }

  /* ── Photo Upload ───────────────────────────────────────── */
  uploadZone.addEventListener('click', function () {
    passportInput.click();
  });

  passportInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
      handlePhotoFile(this.files[0]);
    }
  });

  uploadZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', function () {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', function (e) {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handlePhotoFile(file);
  });

  removePhotoBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    resetPhoto();
  });

  function handlePhotoFile(file) {
    // Type check
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) {
      showError('passportPhoto', 'Only JPG and PNG files are accepted.');
      return;
    }

    // Size check (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      showError('passportPhoto', 'File is too large. Maximum size is 5 MB.');
      return;
    }

    clearError('passportPhoto');

    // Swap to DataTransfer to populate the input
    const dt = new DataTransfer();
    dt.items.add(file);
    passportInput.files = dt.files;

    // Preview
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      uploadPlaceholder.style.display = 'none';
      uploadPreview.style.display     = 'flex';
    };
    reader.readAsDataURL(file);

    updateProgress();
  }

  function resetPhoto() {
    passportInput.value   = '';
    previewImg.src        = '';
    uploadPreview.style.display     = 'none';
    uploadPlaceholder.style.display = 'flex';
    updateProgress();
  }

  /* ── Full Form Validation ───────────────────────────────── */
  function validateAll() {
    let valid = true;
    Object.keys(rules).forEach(function (fieldId) {
      if (!validateField(fieldId)) valid = false;
    });
    return valid;
  }

  /* ── Simulated Submission ───────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      // Scroll to first error
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Start loading state
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled       = true;

    // Simulate a network request (1.5 s)
    setTimeout(function () {
      // Reset loading
      btnText.style.display    = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled       = false;

      // Show success
      successBanner.classList.add('visible');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Reset form
      form.reset();
      resetPhoto();
      updateProgress();

      // Re-clear all errors
      Object.keys(rules).forEach(clearError);
    }, 1500);
  });

  /* ── Mobile Nav Toggle ──────────────────────────────────── */
  mobileToggle.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
  });

  /* ── Init ───────────────────────────────────────────────── */
  updateProgress();

})();
