import { PAGES_PATH, PAGES_CSS_PATH, PAGES_JS_PATH } from '../../config.js';


document.addEventListener('DOMContentLoaded', function () {
    // verify if user is logged in 
    const user_auth_token = localStorage.getItem('user_auth_token');
    const authFormData = new FormData();
    authFormData.append('user_auth_token', user_auth_token);


    fetch('http://localhost:3000/api/auth/verify-user', {
        method: 'POST',
        body: authFormData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status != 'ok') {
                window.location.href = '/login';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = '/login';
        });

    const container = document.getElementById('content-block');
    const dashboard_button = document.getElementById('dashboard-button');
    const profile_button = document.getElementById('profile-button');
    const products_button = document.getElementById('products-button');
    const add_product_button = document.getElementById('add-product-button');
    const sidebar = document.getElementById('sidebar-panel');
    const hamburger = document.getElementById('hamburger-icon');

    let sidebar_show = 'none';
    hamburger.addEventListener('click', function () {
        if (sidebar_show === 'block') {
            sidebar.style.display = 'none';
            sidebar_show = 'none';
        } else {
            sidebar.style.display = 'block';
            sidebar_show = 'block';
        }
    });


    function render_block(htmlFilePath, cssFilePath, jsFilePath) {
        fetch(htmlFilePath)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                addJs(jsFilePath);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        addCss(cssFilePath);
    }

    function addCss(filePath) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = filePath;
        document.head.appendChild(link);
    }

    function addJs(filePath) {
        const scriptId = 'dynamic-script';
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }
        let script = document.createElement('script');
        script.id = scriptId;
        script.src = filePath;
        script.defer = true;
        document.head.appendChild(script);
    }

    function button_action(button, htmlFile, cssFile, jsFile) {
        const htmlFilePath = PAGES_PATH + htmlFile;
        const cssFilePath = PAGES_CSS_PATH + cssFile;
        const jsFilePath = PAGES_JS_PATH + jsFile;

        button.addEventListener('click', function () {
            if (window.innerWidth < 750) {
                if (sidebar_show === 'block') {
                    sidebar.style.display = 'none';
                    sidebar_show = 'none';
                } else {
                    sidebar.style.display = 'block';
                    sidebar_show = 'block';
                }
            }

            localStorage.setItem('selectedPage', htmlFile); // Store the selected page in localStorage
            render_block(htmlFilePath, cssFilePath, jsFilePath);
            location.reload(); // will try to remove this. js was not loading properly so had to reload.
        })
    }

    // Retrieve the selected page from localStorage and render it
    let selectedPage = localStorage.getItem('selectedPage');
    console.log(selectedPage);
    if (selectedPage != null) {
        const htmlFilePath = PAGES_PATH + selectedPage;
        const cssFilePath = PAGES_CSS_PATH + selectedPage.replace('.html', '.css');
        const jsFilePath = PAGES_JS_PATH + selectedPage.replace('.html', '.js');
        render_block(htmlFilePath, cssFilePath, jsFilePath);
    }else{
        selectedPage = 'profile_management.html';
        const htmlFilePath = PAGES_PATH + selectedPage;
        const cssFilePath = PAGES_CSS_PATH + selectedPage.replace('.html', '.css');
        const jsFilePath = PAGES_JS_PATH + selectedPage.replace('.html', '.js');
        render_block(htmlFilePath, cssFilePath, jsFilePath);
        console.log('selected page not found');
    }

    // add actions to sidebar buttons
    button_action(add_product_button, 'product_details_entry_page.html', 'product_details_entry_page.css', 'product_details_entry_page.js');
    button_action(profile_button, 'profile_management.html', 'profile_management.css', 'profile_management.js');
    button_action(products_button, 'product.html', 'output.css', 'product.js');
    button_action(dashboard_button, 'sales.html', 'output.css', 'sales.js');

});
