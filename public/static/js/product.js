const user_auth_token = localStorage.getItem('user_auth_token');
const authFormData = new FormData();
authFormData.append('user_auth_token', user_auth_token);

let productsData = {}

// Send the image file and the JSON data to the endpoint
fetch("http://localhost:3000/api/product/get-products", {
  method: "POST",
  body: authFormData
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data.products);
    productsData = data.products;
    productsData.forEach(function (item) {
      var itemDiv = createItemDiv(item);
      itemsContainer.appendChild(itemDiv);
    });
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

function createItemDiv(item) {
  var itemDiv = document.createElement("div");
  itemDiv.className =
    "entry flex flex-row bg-white mt-0.5 p-4 shadow-lg justify-between";
  itemDiv.innerHTML = `
    <div class="w-2/6">
      <p id="item"> ${item.product_title}</p>
      <p class="category"><strong>Category:</strong> ${item.product_category}</p>
    </div>
    <div class="w-1/6" id="price"> ₹${item.original_price}</div>
    <div class="w-1/6"> ${item.stocks_available}</div>
    <div class="w-1/6">0</div>
    <div class="w-1/6">${item.date}</div>
    <div class="w-1/6 actionbutton">
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="4" width="30" height="30" rx="5" fill="#FF731D" fill-opacity="0.3"/>
<path d="M8.14258 19.6035C8.14258 18.9915 8.30859 18.5618 8.64062 18.3145C8.97917 18.0671 9.38607 17.9434 9.86133 17.9434C10.3236 17.9434 10.7207 18.0671 11.0527 18.3145C11.3913 18.5618 11.5605 18.9915 11.5605 19.6035C11.5605 20.1895 11.3913 20.6126 11.0527 20.873C10.7207 21.1335 10.3236 21.2637 9.86133 21.2637C9.38607 21.2637 8.97917 21.1335 8.64062 20.873C8.30859 20.6126 8.14258 20.1895 8.14258 19.6035ZM14.0457 19.6035C14.0457 18.9915 14.2117 18.5618 14.5437 18.3145C14.8823 18.0671 15.2892 17.9434 15.7645 17.9434C16.2267 17.9434 16.6238 18.0671 16.9559 18.3145C17.2944 18.5618 17.4637 18.9915 17.4637 19.6035C17.4637 20.1895 17.2944 20.6126 16.9559 20.873C16.6238 21.1335 16.2267 21.2637 15.7645 21.2637C15.2892 21.2637 14.8823 21.1335 14.5437 20.873C14.2117 20.6126 14.0457 20.1895 14.0457 19.6035ZM19.9488 19.6035C19.9488 18.9915 20.1148 18.5618 20.4469 18.3145C20.7854 18.0671 21.1923 17.9434 21.6676 17.9434C22.1298 17.9434 22.527 18.0671 22.859 18.3145C23.1975 18.5618 23.3668 18.9915 23.3668 19.6035C23.3668 20.1895 23.1975 20.6126 22.859 20.873C22.527 21.1335 22.1298 21.2637 21.6676 21.2637C21.1923 21.2637 20.7854 21.1335 20.4469 20.873C20.1148 20.6126 19.9488 20.1895 19.9488 19.6035Z" fill="#DF5E0F"/>
</svg>

    <!-- Add your action logic here --></div>
  
  `;
  return itemDiv;
}


var itemsContainer = document.getElementById('itemsContainer');


const dropdownBtn = document.querySelector("#drop-down-btn");
const dropdownMenu = document.querySelector("#drop-down-container");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

const dropdownbtn = document.querySelector("#drop-down-btn2");
const slidecontainer = document.querySelector("#slidecontainer");

dropdownbtn.addEventListener("click", () => {
  slidecontainer.classList.toggle("hidden");
});

const dropdownbutton = document.querySelector("#drop-down-btn3");
const discountdropdown = document.querySelector("#percent-discount");

dropdownbutton.addEventListener("click", () => {
  discountdropdown.classList.toggle("hidden");
});

const dropdown = document.querySelector("#drop-down-btn4");
const ratingdropdown = document.querySelector("#rating");

dropdown.addEventListener("click", () => {
  ratingdropdown.classList.toggle("hidden");
});

let filterInput = document.getElementById("search-bar");
let items = document.querySelectorAll("#item");

filterInput.addEventListener("keyup", (e) => {
  let text = e.target.value.toLowerCase();

  items.forEach((item) => {
    let itemName = item.textContent.toLowerCase();

    if (itemName.includes(text)) {
      item.parentElement.parentElement.style.display = "flex";
    } else {
      item.parentElement.parentElement.style.display = "none";
    }
  });
});

//logic for checkbox to select sort by category
const fashionCheckbox = document.getElementById("fashion");
const groceryCheckbox = document.getElementById("grocery");
const furnitureCheckbox = document.getElementById("furniture");

fashionCheckbox.addEventListener("change", filterItems);
groceryCheckbox.addEventListener("change", filterItems);
furnitureCheckbox.addEventListener("change", filterItems);

function filterItems() {
  const showFashion = fashionCheckbox.checked;
  const showFurniture = furnitureCheckbox.checked;
  const showGrocery = groceryCheckbox.checked;

  const items = document.querySelectorAll(".entry");

  items.forEach((itemDiv) => {
    const category = itemDiv
      .querySelector(".category")
      .textContent.toLowerCase()
      .split(":")[1]
      .trim();

    const isVisible =
      (showFashion && category === "fashion") ||
      (showFurniture && category === "furniture") ||
      (showGrocery && category === "grocery");

    if (!showFashion && !showFurniture && !showGrocery) {
      itemDiv.style.display = "flex";
    } else if (isVisible) {
      itemDiv.style.display = "flex";
    } else {
      itemDiv.style.display = "none";
    }
  });
}

// price range sorting
let maxlim = document.getElementById("maxlimit");
let minlim = document.getElementById("minlimit");

maxlim.addEventListener("input", pricefilter);
minlim.addEventListener("input", pricefilter);

function pricefilter() {
  let max = parseFloat(maxlim.value) || Infinity;
  let min = parseFloat(minlim.value) || 0;

  // console.log("Min Price:", min);
  // console.log("Max Price:", max);

  const items = document.querySelectorAll(".entry");

  items.forEach((item) => {
    const priceTextElement = item.querySelector("#price");
    if (!priceTextElement) {
      console.error("Price element not found in:", item);
      return;
    }

    const priceText = priceTextElement.textContent.trim();
    // console.log("Price Text:", priceText);

    const priceMatch = priceText.match(/\d+(\.\d+)?/);
    if (!priceMatch) {
      // console.error("Invalid price format:", priceText);
      return;
    }

    const price = parseFloat(priceMatch[0]);
    // console.log("Parsed Price:", price);

    if (price >= min && price <= max) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}





//discount sorting

const fiftypercent = document.getElementById("50percent");
const fortypercent = document.getElementById("40percent");
const thirtypercent = document.getElementById("30percent");
const twentypercent = document.getElementById("20percent");
const tenpercent = document.getElementById("10percent");
const lesstenpercent = document.getElementById("lessthan10");

fiftypercent.addEventListener("change", percentItems);
fortypercent.addEventListener("change", percentItems);
thirtypercent.addEventListener("change", percentItems);
twentypercent.addEventListener("change", percentItems);
tenpercent.addEventListener("change", percentItems);
lesstenpercent.addEventListener("change", percentItems);
function percentItems() {
  const items = document.querySelectorAll('.entry');

  items.forEach(item => {
    const productName = item.querySelector('#item').textContent.trim();
    const selectedItem = demoData.find(data => data.product === productName);
    if (!selectedItem) {
      console.error('Item not found in demo data:', productName);
      return;
    }

    const discount = selectedItem.discount;

    
    const fiftyPercentChecked = fiftypercent.checked;
    const fortyPercentChecked = fortypercent.checked;
    const thirtyPercentChecked = thirtypercent.checked;
    const twentyPercentChecked = twentypercent.checked;
    const tenPercentChecked = tenpercent.checked;
    const lessThanTenPercentChecked = lesstenpercent.checked;

    if(!fiftyPercentChecked && !fortyPercentChecked&& !thirtyPercentChecked && !twentyPercentChecked && !tenPercentChecked && !lessThanTenPercentChecked ){
      item.style.display = 'flex'
    }
    else if ((fiftyPercentChecked && discount >= 50) ||
      (fortyPercentChecked && discount >= 40) ||
      (thirtyPercentChecked && discount >= 30) ||
      (twentyPercentChecked && discount >= 20) ||
      (tenPercentChecked && discount >= 10) ||
      (lessThanTenPercentChecked && discount < 10)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}










  // Function to toggle the visibility of the category 
  function toggleCategoryVisibility() {
    const categorySection = document.querySelector('.category-section');
    const actioncolumn = document.querySelector('#action');
    const actionbutton = document.querySelectorAll('.actionbutton');
    const plusbutton = document.getElementById('plusbutton');
    
    if (window.matchMedia("(max-width: 768px)").matches) {
      
      categorySection.classList.add('hidden');
      actioncolumn.classList.add('hidden');
      plusbutton.innerText='+';
      

      actionbutton.forEach((a) => {
        a.classList.add('hidden');
      } );
    } else {
      
      categorySection.classList.remove('hidden');
      actioncolumn.classList.remove('hidden');
      plusbutton.innerText='+ Add product';
      actionbutton.forEach((a) => {
        a.classList.remove('hidden');
      } );
    }
  }
  
 
  toggleCategoryVisibility();
  
 
  window.addEventListener('resize', toggleCategoryVisibility);


