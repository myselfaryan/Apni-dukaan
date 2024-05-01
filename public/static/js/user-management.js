document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem('token');
    const verifyFormData = new FormData();
    verifyFormData.append('token', token);
    fetch('http://localhost:3000/api/admin/verify-admin', {
        method: 'POST',
        body: verifyFormData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status != 'ok') {
                window.location.href = '/admin';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = '/admin';
        });

    const userSearchButton = document.getElementById('user-search-button');
    let currentUserData;

    userSearchButton.addEventListener('click', function (event) {
        event.preventDefault();

        let userSearchInput = document.getElementById('user-number-search').value;

        const userSearchFormData = new FormData();
        userSearchFormData.append('personal_contact_number', userSearchInput);
        console.log(userSearchInput);



        fetch('http://localhost:3000/api/admin/get-user', {
            method: 'POST',
            body: userSearchFormData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status != 'ok') {
                    alert('Failed to get user');
                } else {
                    currentUserData = data;
                    document.getElementById('first-name-input').value = currentUserData.first_name;
                    document.getElementById('last-name-input').value = currentUserData.last_name;
                    document.getElementById('email-input').value = currentUserData.personal_email;
                    document.getElementById('contact-number-input').value = currentUserData.personal_contact_number;
                    document.getElementById('address-input').value = currentUserData.personal_address;
                    var user_finder = document.querySelector('.user-finder');
                    user_finder.style.display = 'none';
                    // var user_info = document.querySelector('.user-info');
                    // user_info.style.display = 'block';
                    document.getElementById('user-details-container').style.display = 'block';
                    document.getElementById('footer').style.display = 'block';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to get user');
            });
    });


    const userUpdateButton = document.getElementById('user-update-button');
    userUpdateButton.addEventListener('click', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('first-name-input').value;
        const lastName = document.getElementById('last-name-input').value;
        const email = document.getElementById('email-input').value;
        const contactNumber = document.getElementById('contact-number-input').value;
        const address = document.getElementById('address-input').value;

        const userData = new FormData();
        userData.append('first_name', firstName);
        userData.append('last_name', lastName);
        userData.append('personal_email', email);
        userData.append('personal_contact_number', contactNumber);
        userData.append('personal_address', address);
        userData.append('token', token);

        fetch('http://localhost:3000/api/admin/update-user', {
            method: 'POST',
            body: userData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status == 'denied'){
                    alert("permission denied !");
                }
                else if (data.status != 'ok') {
                    alert('Failed to update user');
                } else {
                    alert('User updated successfully');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to update user');
            });

    })

    const deleteUserButton = document.getElementById('delete-user-button');
    deleteUserButton.addEventListener('click', function (event) {
        console.log(currentUserData);
        event.preventDefault();

        const userDeleteFormData = new FormData();
        userDeleteFormData.append('personal_contact_number', currentUserData.personal_contact_number);
        userDeleteFormData.append('token', token);
        fetch('http://localhost:3000/api/admin/delete-user', {
            method: 'POST',
            body: userDeleteFormData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status == 'denied'){
                    alert("permission denied !");
                }
                else if (data.status != 'ok') {
                    alert('Failed to delete user');

                } else {
                    alert('User deleted successfully');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to delete user');
            });
    });
});

document.getElementById("edit-product").addEventListener("click", function () {
    window.location.href = "upd_products.html";
});