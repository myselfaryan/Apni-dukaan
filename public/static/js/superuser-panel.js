document.addEventListener('DOMContentLoaded', function () {
    let mangersListElement = document.getElementById('managers-list');
    let deleteUserPermissionCheck = document.getElementById('delete-user-permission');
    let updateUserPermissionCheck = document.getElementById('update-user-permission');
    let updateProductPermissionCheck = document.getElementById('update-product-permission');


    const token = localStorage.getItem('token');
    const verifyFormData = new FormData();
    verifyFormData.append('token', token);

    let managers;
    let currentSelectedManagerEmail = "";

    fetch('http://localhost:3000/api/admin/verify-admin', {
        method: 'POST',
        body: verifyFormData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status != 'ok') {
                window.location.href = '/admin';
            }
            console.log
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = '/admin';
        });

    fetch('http://localhost:3000/api/admin/get-managers', {
        method: 'POST',
        body: verifyFormData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status != 'ok') {
                alert('Failed to get managers');
            }
            managers = data.managers;
            managers.forEach(manager => {
                let managerDiv = document.createElement('div');
                managerDiv.className = 'manager-div';
                managerDiv.id = manager.email;
                managerDiv.innerHTML = `
                <p>${manager.name}</p>
                <p>${manager.email}</p>
                <input class='manager-checkbox' type='checkbox' id="${manager.email}"></input>
                `;

                mangersListElement.appendChild(managerDiv);
            });

            deleteUserPermissionCheck.value = data.delete_user_permission;
            updateUserPermissionCheck.value = data.update_user_permission;
            updateProductPermissionCheck.value = data.update_product_permission;

        }).then(() => {
            const managerDivs = document.querySelectorAll('.manager-div');
            managerDivs.forEach(div => {
                div.addEventListener('click', function () {
                    const email = div.id;
                    currentSelectedManagerEmail = email;
                    const manager = managers.find(manager => manager.email === email);
                    if (manager) {
                        deleteUserPermissionCheck.checked = manager.delete_user_permission;
                        updateUserPermissionCheck.checked = manager.update_user_permission;
                        updateProductPermissionCheck.checked = manager.update_product_permission;
                    } else {
                        console.log('Manager not found');
                    }
                });
            });
        })
        .catch((error) => {
            alert('Failed to get managers');
        });


    const updatePermissionsButton = document.getElementById('update-permissions-button');
    updatePermissionsButton.addEventListener('click', function (event) {
        event.preventDefault();

        const updateManagerPermissionFormData = new FormData();
        updateManagerPermissionFormData.append('email', currentSelectedManagerEmail);
        updateManagerPermissionFormData.append('delete_user_permission', deleteUserPermissionCheck.checked);
        updateManagerPermissionFormData.append('update_user_permission', updateUserPermissionCheck.checked);
        updateManagerPermissionFormData.append('update_product_permission', updateProductPermissionCheck.checked);

        fetch('http://localhost:3000/api/admin/update-manager-permissions', {
            method: 'POST',
            body: updateManagerPermissionFormData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status != 'ok') {
                    alert('Failed to update manager permission');
                } else {
                    alert('Permissions updated successfully');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to update manager permission');
            });
    });

    var boom = document.getElementById('searchi');
    boom.addEventListener('input', function () {
        var searchValue = this.value.toLowerCase();
        var usersDiv = document.querySelector('.bottle');
        var userDivs = usersDiv.querySelectorAll('div');

        userDivs.forEach(function (div) {
            var id = div.id.toLowerCase();
            if (id.includes(searchValue)) {
                div.style.display = 'flex';
            } else {
                div.style.display = 'none';
            }
        });
    });

    const addManagerButton = document.getElementById("adder-butt");
    const addManagerDiv = document.getElementById("add-manager");

    const createManagerButton = document.getElementById('submit-manager')

    createManagerButton.addEventListener('click', function () {

        const name = document.getElementById('manager-name').value;
        const email = document.getElementById('manager-email').value;
        const password = document.getElementById('manager-password').value;

        const createManagerFormData = new FormData();
        createManagerFormData.append('name', name);
        createManagerFormData.append('email', email);
        createManagerFormData.append('password', password);

        fetch('http://localhost:3000/api/admin/create-manager', {
            method: 'POST',
            body: createManagerFormData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status != 'ok') {
                    alert('Failed to create manager');
                } else {
                    alert('Manager created successfully');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to create manager');
            });
    });


    addManagerButton.addEventListener("click", function () {
        addManagerDiv.style.visibility = "visible";
    });

    var submitManagerButton = document.getElementById("submit-manager");

    submitManagerButton.addEventListener("click", function (event) {
        event.preventDefault();
        addManagerDiv.style.visibility = "hidden";
    });

    const deleteManagerButton = document.getElementById('del-butt');
    deleteManagerButton.addEventListener('click', function () {
        const deleteManagerFormData = new FormData();
        deleteManagerFormData.append('email', currentSelectedManagerEmail);

        fetch('http://localhost:3000/api/admin/delete-manager', {
            method: 'POST',
            body: deleteManagerFormData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status != 'ok') {
                    alert('Failed to delete manager');
                } else {
                    alert('Manager deleted successfully');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to delete manager');
            });
    });

});
document.getElementById("user").addEventListener("click", function () {
    window.location.href = "user-management";
});
