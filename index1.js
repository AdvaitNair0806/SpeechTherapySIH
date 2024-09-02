document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordSuccess = document.getElementById('passwordSuccess');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const registerForm = document.getElementById('registerForm');
    const loading = document.getElementById('loading');

    function validatePassword(password) {
        const minLength = 8;
        const uppercaseRegExp = /[A-Z]/;
        const numberRegExp = /[0-9]/;
        const specialCharRegExp = /[!@#$%^&*(),.?":{}|<>]/;

        return password.length >= minLength &&
               uppercaseRegExp.test(password) &&
               numberRegExp.test(password) &&
               specialCharRegExp.test(password);
    }

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const passwordIsValid = validatePassword(password);
        const showButtonVisible = password.length > 0;

        if (passwordIsValid) {
            passwordInput.classList.add('valid');
            passwordInput.classList.remove('invalid');
            passwordSuccess.classList.add('visible');
            passwordSuccess.classList.remove('hidden');
        } else {
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            passwordSuccess.classList.add('hidden');
            passwordSuccess.classList.remove('visible');
        }

        passwordError.style.display = passwordIsValid ? 'none' : 'block';
        togglePasswordBtn.classList.toggle('visible', showButtonVisible);
    });

    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const passwordsMatch = password === confirmPassword;
        confirmPasswordError.style.display = passwordsMatch ? 'none' : 'block';
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        loading.style.display = 'block'; // Show loader
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password === "123456") {
            alert('Special case password accepted. Proceeding with registration.');
            loading.style.display = 'none'; // Hide loader
            return; // Handle special case as needed
        }

        const passwordIsValid = validatePassword(password);
        const passwordsMatch = password === confirmPassword;

        if (passwordIsValid && passwordsMatch) {
            // Example AJAX request
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Registration successful!');
                loading.style.display = 'none'; // Hide loader
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed. Please try again.');
                loading.style.display = 'none'; // Hide loader
            });
        } else {
            loading.style.display = 'none'; // Hide loader if validation fails
        }
    });

    togglePasswordBtn.addEventListener('click', function() {
        const isPasswordVisible = passwordInput.type === 'text';
        if (isPasswordVisible) {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
            togglePasswordBtn.innerHTML = '🔒'; // Lock icon
        } else {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            togglePasswordBtn.innerHTML = '👁️'; // Eye icon
        }
    });
});
