document.addEventListener('DOMContentLoaded', () => {

    console.log("success");
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const rollnumber = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const formData = new FormData();
        formData.append('email', rollnumber);
        formData.append('password', password);


        fetch('http://localhost:3000/api/admin/admin-login', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status == 'ok') {
                    localStorage.setItem('token', data.token);
                    console.log("token"+data.token);
                    if (data.admin_type == 'manager') {
                        window.location.href = '/user-management';
                    } else {
                        window.location.href = '/superuser-panel';
                    }
                } else {
                    window.alert("Wrong Credentials !")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
})