const user_auth_token = localStorage.getItem('user_auth_token');
const authsFormData = new FormData();
authsFormData.append('user_auth_token', user_auth_token);
console.log("tokn"+user_auth_token)

// Function to load Chart.js dynamically

function loadChartJs() {
    return new Promise((resolve, reject) => {
        // Create a new script element
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';

        // Resolve the promise once Chart.js is loaded
        script.onload = resolve;

        // Reject the promise if there's an error loading Chart.js
        script.onerror = reject;

        // Add the script element to the document's head
        document.head.appendChild(script);
    });
}

// Function to initialize the dashboard
function initDashboard() {
    // Your existing code here
    fetch('http://localhost:3000/static/js/data.json')
        .then(response => response.json())
        .then(data => {
            let mychart = document.getElementById('mychart').getContext('2d');

            let costchart = new Chart(mychart, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Cost',
                        data: data,
                        backgroundColor: 'lightgreen',
                        borderColor: '#777',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Earning Month Wise'
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    },
                    layout: {
                        padding: {
                            left: 100,
                            right: 0,
                            bottom: 0,
                            top: 100
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    fetch('http://localhost:3000/static/js/data_categories.json')
        .then(response => response.json())
        .then(otherData => {
            let pieChartCanvas = document.getElementById('pieChart').getContext('2d');

            let pieChart = new Chart(pieChartCanvas, {
                type: 'pie',
                data: {
                    labels: Object.keys(otherData),
                    datasets: [{
                        label: 'Categories',
                        data: Object.values(otherData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribution of Categories'
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data for pie chart:', error));
}

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
      updateUI(item);
      // itemsContainer.appendChild(itemDiv);
    });
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });


  function updateUI(item) {
    document.querySelector('.total-order').textContent = item.total_order;
    document.querySelector('.total-earning').textContent = item.total_earning;
    document.querySelector('.product-count').textContent = item.product_count;
    document.querySelector('.unit-left').textContent = item.unit_left;

  }

// Load Chart.js dynamically and then initialize the dashboard
loadChartJs()
    .then(initDashboard)
    .catch(error => console.error('Error loading Chart.js:', error));

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user_auth_token');
    // window.location.href = 'http://localhost:3000/login';
    window.location.reload();
});