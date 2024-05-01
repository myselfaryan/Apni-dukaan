const loginButton = document.getElementById('login-button');
const message = document.getElementById('message');

loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const personal_contact_number = document.getElementById('personal-contact-number').value;


    // Create a FormData object
    const formData = new FormData();
    formData.append('personal_contact_number', personal_contact_number);

    // Append the JSON data to the FormData object

    // Send the data to the server
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 'ok') {
                localStorage.setItem('otp_token', data.otp_token);
                localStorage.setItem('user_exist', data.user_exist);
                window.location.href = '/verify-otp';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

const register1 = document.querySelector('.register1');
const leftimgview = register1.querySelector('.features');
const accountform = register1.querySelector('.create-account-form')

function toggleCategoryVisibility() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        leftimgview.classList.add('hidden');
        accountform.classList.add('w-4/5');
    } else {
        leftimgview.classList.remove('hidden');
        accountform.classList.remove('w-4/5');
    }
}

toggleCategoryVisibility();
window.addEventListener('resize', toggleCategoryVisibility);
