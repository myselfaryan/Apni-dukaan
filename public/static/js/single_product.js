const user_auth_token = localStorage.getItem('user_auth_token');
const authsFormData = new FormData();
authsFormData.append('user_auth_token', user_auth_token);
console.log("tokn"+user_auth_token)

const orderEndpoint = "static/js/orderData.json";

//   fetch('http://localhost:3000/api/single_order/product-image', {
//     method: 'POST',
//     body: authFormData,
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error fetching profile image');
//         }
//         return response.blob();
//     })
//     .then(blob => {
//         const imgUrl = URL.createObjectURL(blob);
//         imgElement.src = imgUrl;
//     })
//     .catch(error => {
//         console.error('Error fetching profile image:', error);
//     });
    
    // Send a request to fetch orders
fetch("http://localhost:3000/api/sales/get-orders-details", {
  method: "POST",
  body: authsFormData // Remove quotes around authsFormData
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data.products);
    ordersData = data.products;
    ordersData.forEach(function (item) {
      updateUI(item);
      // itemsContainer.appendChild(itemDiv);
    });
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

  async function fetchOrderData() {
    try {
      const response = await fetch(orderEndpoint);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      } else {
        const orderData = await response.json();
        return orderData;
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  }

  function calculateSubTotal(price, quantity) {
    const subtotal = price * quantity;
    return subtotal;
  }

// Function to calculate total bill
function calculateTotalBill(items) {
  // const subtotal = items.reduce((total, item) => {
  //   return total + calculateSubTotal(item.original_price, item.quantity);
  // }, 0);

  // const discount = items.reduce((total, item) => {
  //   return total + Math.floor(item.original_price * item.quantity * (item.discount / 100));
  // }, 0);
  const subtotal = items.original_price * items.quantity;
  const discount = Math.floor(items.original_price * items.quantity * (items.discount / 100));
  const tax = (subtotal - discount) * 0.18; // Assuming a tax rate of 18%
  const totalAmount = subtotal - discount + tax;

  return {
    subtotal,
    discount,
    tax,
    totalAmount
  };
}

  // Function to update the UI with order data
  function updateUI(item) {
    // Update customer details
    document.querySelector('.order-id').textContent = "Order ID : " +"#"+item._id;
    document.querySelector('.jonathan-james').textContent = item.name;
    document.querySelector('.jjgmailcom').textContent = item.email;
    document.querySelector('.order-processed-label').textContent = item.personal_contact_number;

    // Update shipping address
    document.querySelector('.jonathan-james1').textContent = item.name;
    document.querySelector('.ag-rocky-mount').textContent = item.shipping_address;
    // document.querySelector('.ag-rocky-mount').textContent = item.shipping_address.street;
    // document.querySelector('.ahmedabad-11111').textContent = `${item.shipping_address.city} - ${item.shipping_address.zipcode}`;
    // document.querySelector('.india').textContent = item.shipping_address.country;

    
    // Update product details
    const productsList = document.querySelector('.products-list');
    // productsList.innerHTML = '';
    // if (Array.isArray(data)) {
    //   data.forEach(item => {
      // const productElement = document.createElement('div');
      // productElement.classList.add('div3');
      productsList.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img class="child" loading="lazy" alt="" src="./static/images/shoes.svg" />
        <div class="adidas-mens-restound-m-running-wrapper">
          <div class="adidas-mens-restound" style="margin-left:40px;">${item.product_title}</div>
        </div>
        <div class="inner">
          <div class="dr-parent" style="display: flex; gap: 90px;">
            <div class="dr" style="align-item:centre; right:50px">#${item.product_id}</div>
            <div class="div4">₹ ${item.original_price}</div>
            <div class="div5" style="left:2rem;">${item.quantity}</div>
            <div class="div6" style="left:2rem;">₹</div> <!-- Corrected this line -->
          </div>
        </div>
      </div>`;
      
      
      const subtotal = calculateSubTotal(item.original_price, item.quantity);
      productsList.querySelector('.div6').textContent = `₹ ${subtotal}`;
      // productsList.appendChild(productElement);
  //   });
  // } else {
  //   console.error('Data is not an array:', data);
  // }
    
    // Update logistics details
    // document.querySelector('.abx-logistics').textContent = orderData.logistics.provider_name;
    // document.querySelector('.abxgmailcom').textContent = orderData.logistics.provider_email;
    // document.querySelector('.id-345ascr676chnj9001').textContent = `Id : ${orderData.logistics.tracking_number}`;
    // document.querySelector('.amount-charged').textContent = `Amount charged : ₹ ${orderData.logistics.charge}`;
    // document.querySelector('.payment-method1').textContent = `Payment method : ${orderData.payment.payment_method}`;
    
    const totalBill = calculateTotalBill(item);
    document.querySelector('.div16').textContent = `₹ ${totalBill.subtotal}`;
    document.querySelector('.div17').textContent = `₹ ${totalBill.discount}`;
    // document.querySelector('.div18').textContent = `₹ ${totalBill.logistics}`;
    document.querySelector('.div19').textContent = `₹ ${totalBill.tax}`;
    document.querySelector('.b').textContent = `₹ ${totalBill.totalAmount}`;
    
    // Update payment details
    // document.querySelector('.vhgf735271600123').textContent = orderData.payment.transaction_id;
    document.querySelector('.paytm').textContent = item.payment_method;
    document.querySelector('.joseph-james').textContent = item.name;
    // document.querySelector('.div1').textContent = `**** **** **${item.payment.card_number.slice(-4)}`;
    document.querySelector('.div2').textContent = `₹ ${totalBill.totalAmount}`;
  }

  // Call the functions to fetch and update the UI
  // fetchOrderData()
  // .then(orderData => {
  //     updateUI(orderData);
  //     console.log("Order data fetched successfully:", orderData)
  //   })
  //   .catch(error => {
  //     console.error('Error updating UI:', error);
  //   });