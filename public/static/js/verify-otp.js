const submitOtpButton = document.getElementById('submit-otp-button');
const message = document.getElementById('message');

submitOtpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const otp = document.getElementById('otp').value;
    const otp_token = localStorage.getItem('otp_token');
    const user_exist = localStorage.getItem('user_exist');

    // Create a FormData object
    const formData = new FormData();
    formData.append('otp', otp);
    formData.append('otp_token', otp_token);
    formData.append('user_exist', user_exist);


    // Send the data to the server
    fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 'ok') {
                localStorage.setItem('user_auth_token', data.user_auth_token);
                window.location.href = '/main';
            }else{
                alert("Invalid OTP");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Server Error! Please try again later.');
        });
});