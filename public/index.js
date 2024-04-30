const login_button = document.getElementById("login-button");
login_button.addEventListener('click',()=>{
    window.location.href = '/login';
})

// Get the single-box element
const body = document.querySelector('body');
const boxCollection = document.getElementsByClassName('box-collection');
const mainSingleBox = document.getElementById('main-single-box');
const openBox = document.getElementById('open-box');


const singleBox1 = document.getElementById('single-box-1');
const singleBox2 = document.getElementById('single-box-2');
const singleBox3 = document.getElementById('single-box-3');
const singleBox4 = document.getElementById('single-box-4');

const infoCard1 = document.getElementById('info-card-1');
const infoCard2 = document.getElementById('info-card-2');
const infoCard3 = document.getElementById('info-card-3');
const infoCard4 = document.getElementById('info-card-4');

// Function to handle the parallax effect
function handleParallax() {
    // Calculate the scroll position
    const scrollPosition = window.pageYOffset;

    // Adjust the transform property based on the scroll position
    const maxTranslate = 1000; // Set the maximum translate value
    const translateValue = Math.min(scrollPosition * 1, maxTranslate); // Calculate the translate value with a maximum limit

    mainSingleBox.style.transform = `translateY(${translateValue}px)`;
    // boxCollection.style.opacity += 1 - (scrollPosition * 0.01 / maxTranslate);
    openBox.style.transform = `translateY(${translateValue}px)`;

    if (translateValue >= 400) {
        openBox.style.display = 'block';
        mainSingleBox.style.display = 'none';

    } else {
        openBox.style.display = 'none';
        mainSingleBox.style.display = 'block';
        
    }

    singleBox1.style.transform = `translateX(${-scrollPosition * 0.7}px)`;
    singleBox1.style.transform += `rotate(${-scrollPosition * 0.05}deg)`;
    singleBox2.style.transform = `translateX(${scrollPosition * 0.7}px)`;
    singleBox2.style.transform += `rotate(${scrollPosition * 0.05}deg)`;


    infoCard1.style.opacity = Math.min((scrollPosition / 350)-1, 1);
    infoCard2.style.opacity = Math.min((scrollPosition / 350)-1, 1);

    infoCard3.style.opacity = Math.min((scrollPosition / 600)-1, 1);
    infoCard4.style.opacity = Math.min((scrollPosition / 600)-1, 1);

    const maxOpacity = 1; // Set the maximum opacity value
    const opacityValue = Math.min((scrollPosition / 350) - 1, maxOpacity); // Calculate the opacity value with a maximum limit
    body.style.backgroundColor = `rgba(55, 42, 120, ${opacityValue})`;

    if (scrollPosition > 1000 && scrollPosition <= 1100) {
        const opacityValue = 1 - ((scrollPosition - 1000) / 100);
        openBox.style.opacity = Math.max(opacityValue, 0);
    } else if (scrollPosition > 1100) {
        openBox.style.opacity = 0;
    } else {
        openBox.style.opacity = 1;
    }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleParallax);
document.getElementsByClassName('register-as-seller-container')[0].onclick = function () {
    window.location.href = '/view/signup.html';
}

document.getElementsByClassName('register-as-seller')[0].onclick = function () {
    window.location.href = '/view/login.html';
}
