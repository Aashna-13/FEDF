document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const phone = document.getElementById('phone');
  const successMessage = document.getElementById('successMessage');

  // Regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validateField = (input, isValid, errorMessageId, errorMessage) => {
    const errorElement = document.getElementById(errorMessageId);
    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      errorElement.textContent = '';
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      errorElement.textContent = errorMessage;
    }
  };

  const validateFullName = () => {
    const isValid = fullName.value.trim() !== '';
    validateField(fullName, isValid, 'fullNameError', 'Full Name is required.');
    return isValid;
  };

  const validateEmail = () => {
    const isValid = emailRegex.test(email.value);
    validateField(email, isValid, 'emailError', 'Please enter a valid email address.');
    return isValid;
  };

  const validatePassword = () => {
    const isValid = passwordRegex.test(password.value);
    const message = 'Password must be at least 8 characters, and include a letter, a number, and a special character.';
    validateField(password, isValid, 'passwordError', message);
    return isValid;
  };

  const validatePhone = () => {
    const isValid = phone.value.length === 10 && !isNaN(phone.value);
    validateField(phone, isValid, 'phoneError', 'Phone number must be exactly 10 digits.');
    return isValid;
  };

  // Add event listeners for real-time validation
  fullName.addEventListener('input', validateFullName);
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePassword);
  phone.addEventListener('input', validatePhone);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhoneValid = validatePhone();

    if (isFullNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
      // All fields are valid, show success message
      successMessage.textContent = 'Registration successful!';
      successMessage.style.display = 'block';
      form.reset();
      // Reset validation styles after successful submission
      const allInputs = document.querySelectorAll('.form-group input');
      allInputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    } else {
      successMessage.textContent = '';
      successMessage.style.display = 'none';
    }
  });
});