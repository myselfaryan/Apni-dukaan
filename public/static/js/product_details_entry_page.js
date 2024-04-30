const user_auth_token = localStorage.getItem('user_auth_token');

// Demo data
const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
];

// Select input element
const productCategory = document.getElementById("product-category");

// Iterate through the data and add options to the select input
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    productCategory.appendChild(option);
});

// Select the submit button
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");

// Add event listener to the submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // If all input values are filled, proceed with sending the values
    const productTitle = document.getElementById("product-title").value;
    const productDescription = document.getElementById("product-description").value;
    const manufacturerName = document.getElementById("manufacturer-name").value;
    const brand = document.getElementById("brand-name").value;
    const originalPrice = document.getElementById("original-price").value;
    const discountPercentage = document.getElementById("discounts-percentage").value;
    const status = document.getElementById("status").value;
    const visibility = document.getElementById("visibility").value;
    const productCategory = document.getElementById("product-category").value;
    const stocksAvailable = document.getElementById("stocks-available").value;
    const fileInput = document.getElementById("dropzone-file");
    const file = fileInput.files[0];

    // Create an object with the data
    const data = {
        productTitle,
        productDescription,
        manufacturerName,
        brand,
        originalPrice,
        discountPercentage,
        status,
        visibility,
        productCategory,
        stocksAvailable
    };

    
    let isEmpty = false;
    let validationMessage = "Please fill in all the fields";
    Object.keys(data).forEach(key => {
        if (data[key] === "") { isEmpty = true; }
        if (key === "originalPrice" && isNaN(data[key])) { isEmpty = true; validationMessage = "Please enter a valid price"; }
        if (key === "discountPercentage" && isNaN(data[key])) { isEmpty = true; validationMessage = "Please enter a valid discount"; if(Number(data[key])>100){validationMessage = "Discount should be less than 100"} }
        if (key === "stocksAvailable" && isNaN(data[key])) { isEmpty = true; validationMessage = "Please enter a valid stock count"; }
    });
    if(fileInput.files.length === 0) { isEmpty = true; validationMessage = "Please upload an image"; }
    if (isEmpty) {
        message.innerHTML = validationMessage;
        message.style.display = "block";
        message.style.color = "red";
        return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", file);
    formData.append('user_auth_token', user_auth_token);

    // Append the JSON data to the FormData object
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    // Send the image file and the JSON data to the endpoint
    fetch("http://localhost:3000/api/product/add", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the server
            console.log(result);
            //submitButton.style.display = "none";
            message.innerHTML = result.message;
            message.style.display = "block";
            message.style.color = result.status === "success" ? "green" : "red";
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
});

