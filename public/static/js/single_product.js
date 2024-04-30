  const orderEndpoint = "static/js/orderData.json";

  fetch('http://localhost:3000/api/single_order/product-image', {
    method: 'POST',
    body: authFormData,
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching profile image');
        }
        return response.blob();
    })
    .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        imgElement.src = imgUrl;
    })
    .catch(error => {
        console.error('Error fetching profile image:', error);
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
function calculateTotalBill(orderData) {
  const subtotal = orderData.order_items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const discount = orderData.order_items.reduce((total, item) => {
    return total + Math.floor(item.product.price * item.quantity * (item.product.discount / 100));
  }, 0);
  
  const logistics = orderData.logistics.charge;
  const tax = (subtotal - discount + logistics) * 0.18; // Assuming a tax rate of 18%
  const totalAmount = subtotal - discount + logistics + tax;

  return {
    subtotal,
    discount,
    logistics,
    tax,
    totalAmount
  };
}

  // Function to update the UI with order data
  function updateUI(orderData) {
    // Update customer details
    document.querySelector('.jonathan-james').textContent = orderData.customer.name;
    document.querySelector('.jjgmailcom').textContent = orderData.customer.email;
    document.querySelector('.order-processed-label').textContent = orderData.customer.phone;

    // Update shipping address
    document.querySelector('.jonathan-james1').textContent = orderData.customer.name;
    document.querySelector('.ag-rocky-mount').textContent = orderData.shipping_address.street;
    document.querySelector('.ahmedabad-11111').textContent = `${orderData.shipping_address.city} - ${orderData.shipping_address.zipcode}`;
    document.querySelector('.india').textContent = orderData.shipping_address.country;

    
    // Update product details
    const productsList = document.querySelector('.products-list');
    productsList.innerHTML = '';
    orderData.order_items.forEach(item => {
      const productElement = document.createElement('div');
      productElement.classList.add('div3');
      productElement.innerHTML = `
      <img class="child" loading="lazy" alt="" src="./static/images/shoes.svg" />
      <div class="adidas-mens-restound-m-running-wrapper">
      <div class="adidas-mens-restound">${item.product.name}</div>
      </div>
      <div class="inner">
      <div class="dr-parent">
      <div class="dr">#${item.product.id}</div>
      <div class="div4">₹ ${item.product.price}</div>
      <div class="div5">${item.quantity}</div>
      <div class="div6">₹ ${item.subtotal}</div>
      </div>
      </div>
      `;
      
      const subtotal = calculateSubTotal(item.product.price, item.quantity);
      productElement.querySelector('.div6').textContent = `₹ ${subtotal}`;
      productsList.appendChild(productElement);
    });
    
    // Update logistics details
    document.querySelector('.abx-logistics').textContent = orderData.logistics.provider_name;
    document.querySelector('.abxgmailcom').textContent = orderData.logistics.provider_email;
    document.querySelector('.id-345ascr676chnj9001').textContent = `Id : ${orderData.logistics.tracking_number}`;
    document.querySelector('.amount-charged').textContent = `Amount charged : ₹ ${orderData.logistics.charge}`;
    document.querySelector('.payment-method1').textContent = `Payment method : ${orderData.payment.payment_method}`;
    
    const totalBill = calculateTotalBill(orderData);
    document.querySelector('.div16').textContent = `₹ ${totalBill.subtotal}`;
    document.querySelector('.div17').textContent = `₹ ${totalBill.discount}`;
    document.querySelector('.div18').textContent = `₹ ${totalBill.logistics}`;
    document.querySelector('.div19').textContent = `₹ ${totalBill.tax}`;
    document.querySelector('.b').textContent = `₹ ${totalBill.totalAmount}`;
    
    // Update payment details
    document.querySelector('.vhgf735271600123').textContent = orderData.payment.transaction_id;
    document.querySelector('.paytm').textContent = orderData.payment.payment_method;
    document.querySelector('.joseph-james').textContent = orderData.payment.cardholder_name;
    document.querySelector('.div1').textContent = `**** **** **${orderData.payment.card_number.slice(-4)}`;
    document.querySelector('.div2').textContent = `₹ ${totalBill.totalAmount}`;
  }

  // Call the functions to fetch and update the UI
  fetchOrderData()
  .then(orderData => {
      updateUI(orderData);
      console.log("Order data fetched successfully:", orderData)
    })
    .catch(error => {
      console.error('Error updating UI:', error);
    });