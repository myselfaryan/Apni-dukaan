// const user_auth_token = localStorage.getItem('user_auth_token');
// const authsFormData = new FormData();
// authsFormData.append('user_auth_token', user_auth_token);

// // // let productsData = {}

// // // Send the image file and the JSON data to the endpoint
// // fetch("http://localhost:3000/api/sales/get-orders", {
// //   method: "POST",
// // })
// //   .then(response => response.json())
// //   .then(data => {
// //     // Handle the response from the server
// //     console.log(data.products);
// //     productsData = data.products;
// //     productsData.forEach(function (item) {
// //       var itemDiv = createItemDiv(item);
// //       itemsContainer.appendChild(itemDiv);
// //     });
// //   })
// //   .catch(error => {
// //     // Handle any errors
// //     console.error(error);
// //   });




// let ordersData = {};

// // Send a request to fetch orders
// fetch("http://localhost:3000/api/sales/get-orders", {
//   method: "POST",
//   body:authsFormData
// })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response from the server
//     console.log(data.products);
//     ordersData = data.products;
//     ordersData.forEach(function (item) {
//       var itemDiv = createItemDiv(item);
//       itemsContainer.appendChild(itemDiv);
//     });
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error(error);
//   });


// function createItemDiv(item) {
//   var itemDiv = document.createElement("div");
//   itemDiv.className =
//     "entry flex flex-row bg-white mt-0.5 p-4 shadow-lg justify-between";
//   itemDiv.innerHTML = `
//     <div class="w-2/8">
//       <p id="item"> ${item.order_id}</p>
//       <p class="category"><strong>Category:</strong> ${item.personal_contact_number}</p>
//     </div>
//     <div class="w-1/8">${item.product_title}</div>
//     <div class="w-1/8" id="price"> ₹${item.original_price}</div>
//     <div class="w-1/8"> ${item.ordered_on}</div>
//     <div class="w-1/8">0</div>
    
//     <div class="w-1/8">${item.Payment_method}</div>
//     <div class="w-1/8">${item.delivery_status}</div>
//     <div class="w-1/8 actionbutton">
//     <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
// <rect y="4" width="30" height="30" rx="5" fill="#FF731D" fill-opacity="0.3"/>
// <path d="M8.14258 19.6035C8.14258 18.9915 8.30859 18.5618 8.64062 18.3145C8.97917 18.0671 9.38607 17.9434 9.86133 17.9434C10.3236 17.9434 10.7207 18.0671 11.0527 18.3145C11.3913 18.5618 11.5605 18.9915 11.5605 19.6035C11.5605 20.1895 11.3913 20.6126 11.0527 20.873C10.7207 21.1335 10.3236 21.2637 9.86133 21.2637C9.38607 21.2637 8.97917 21.1335 8.64062 20.873C8.30859 20.6126 8.14258 20.1895 8.14258 19.6035ZM14.0457 19.6035C14.0457 18.9915 14.2117 18.5618 14.5437 18.3145C14.8823 18.0671 15.2892 17.9434 15.7645 17.9434C16.2267 17.9434 16.6238 18.0671 16.9559 18.3145C17.2944 18.5618 17.4637 18.9915 17.4637 19.6035C17.4637 20.1895 17.2944 20.6126 16.9559 20.873C16.6238 21.1335 16.2267 21.2637 15.7645 21.2637C15.2892 21.2637 14.8823 21.1335 14.5437 20.873C14.2117 20.6126 14.0457 20.1895 14.0457 19.6035ZM19.9488 19.6035C19.9488 18.9915 20.1148 18.5618 20.4469 18.3145C20.7854 18.0671 21.1923 17.9434 21.6676 17.9434C22.1298 17.9434 22.527 18.0671 22.859 18.3145C23.1975 18.5618 23.3668 18.9915 23.3668 19.6035C23.3668 20.1895 23.1975 20.6126 22.859 20.873C22.527 21.1335 22.1298 21.2637 21.6676 21.2637C21.1923 21.2637 20.7854 21.1335 20.4469 20.873C20.1148 20.6126 19.9488 20.1895 19.9488 19.6035Z" fill="#DF5E0F"/>
// </svg>

//     <!-- Add your action logic here --></div>
  
//   `;
//   return itemDiv;
// }



const user_auth_token = localStorage.getItem('user_auth_token');
const authsFormData = new FormData();
authsFormData.append('user_auth_token', user_auth_token);
console.log("tokn"+user_auth_token)

let ordersData = {};

// Send a request to fetch orders
fetch("http://localhost:3000/api/sales/get-orders", {
  method: "POST",
  body: authsFormData // Remove quotes around authsFormData
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data.products);
    ordersData = data.products;
    ordersData.forEach(function (item) {
      var itemDiv = createItemDiv(item);
      itemsContainer.appendChild(itemDiv);
    });
  })
  .then(()=>{
    const itemDivs = document.querySelectorAll('.order-row ');
    itemDivs.forEach(div => {
      div.addEventListener('click', function () {
          const id = div.id;
          console.log(id);
          localStorage.setItem('order_id',id);
          window.location.href = '/order-details';
      });
  });

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

function createItemDiv(item) {
  var itemDiv = document.createElement("div");
  itemDiv.id = item._id;
  itemDiv.className =
    "order-row entry flex flex-row bg-white mt-0.5 p-4 shadow-lg justify-between";
  itemDiv.innerHTML = `
    <div id="itemID" class="w-2/9 text-xs">${item._id}</div>
    <div class="w-1/9">${item.personal_contact_number}</div>
    <div class="w-1/9">${item.product_title}</div>
    <div class="w-1/9" id="price"> ₹${item.original_price}</div>
    <div class="w-1/9"> ${item.ordered_on}</div>
    
    
    <div class="w-1/9">${item.Payment_method}</div>
    <div class="w-1/9">${item.delivery_status}</div>
    <div class="w-1/9 actionbutton">
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="4" width="30" height="30" rx="5" fill="#FF731D" fill-opacity="0.3"/>
      <path d="M8.14258 19.6035C8.14258 18.9915 8.30859 18.5618 8.64062 18.3145C8.97917 18.0671 9.38607 17.9434 9.86133 17.9434C10.3236 17.9434 10.7207 18.0671 11.0527 18.3145C11.3913 18.5618 11.5605 18.9915 11.5605 19.6035C11.5605 20.1895 11.3913 20.6126 11.0527 20.873C10.7207 21.1335 10.3236 21.2637 9.86133 21.2637C9.38607 21.2637 8.97917 21.1335 8.64062 20.873C8.30859 20.6126 8.14258 20.1895 8.14258 19.6035ZM14.0457 19.6035C14.0457 18.9915 14.2117 18.5618 14.5437 18.3145C14.8823 18.0671 15.2892 17.9434 15.7645 17.9434C16.2267 17.9434 16.6238 18.0671 16.9559 18.3145C17.2944 18.5618 17.4637 18.9915 17.4637 19.6035C17.4637 20.1895 17.2944 20.6126 16.9559 20.873C16.6238 21.1335 16.2267 21.2637 15.7645 21.2637C15.2892 21.2637 14.8823 21.1335 14.5437 20.873C14.2117 20.6126 14.0457 20.1895 14.0457 19.6035ZM19.9488 19.6035C19.9488 18.9915 20.1148 18.5618 20.4469 18.3145C20.7854 18.0671 21.1923 17.9434 21.6676 17.9434C22.1298 17.9434 22.527 18.0671 22.859 18.3145C23.1975 18.5618 23.3668 18.9915 23.3668 19.6035C23.3668 20.1895 23.1975 20.6126 22.859 20.873C22.527 21.1335 22.1298 21.2637 21.6676 21.2637C21.1923 21.2637 20.7854 21.1335 20.4469 20.873C20.1148 20.6126 19.9488 20.1895 19.9488 19.6035Z" fill="#DF5E0F"/>
    </svg>

    <!-- Add your action logic here -->
    </div>
  `;
  return itemDiv;
}

let filterInput = document.getElementById("search-bar");

// Get all items in the list
const items = document.querySelectorAll("#itemsContainer .entry");

filterInput.addEventListener("keyup", (e) => {

  const searchQuery = e.target.value.trim().toLowerCase();

  
  items.forEach((item) => {
    
    const orderID = item.querySelector(".w-2/9").textContent.toLowerCase();

    if (orderID.includes(searchQuery)) {
      
      item.style.display = "flex";
    } else {
      
      item.style.display = "none";
    }
  });
});
