// check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {

    document.documentElement.style.setProperty("--main-color", mainColor);

    // Remove Active Class From All (li)
    document.querySelectorAll(".colors-list li").forEach((ele) => {

        ele.classList.remove("active");

        // Add Class Active To Current (li target)
        if (ele.dataset.color == mainColor) {
            ele.classList.add("active");
        }

    }); 
}

// Toggle Spin Class On setting icon 
document.querySelector(".toggle-settings .gear-icon").onclick = function () {

    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};


// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);

    });
});

let backgroundOption = true;
let backgroundInterval;

// Random Background-Color Option
let randomBgrounds = document.querySelectorAll(".random-backgrounds span");

// Check If There's local Storage randomBackgroundOption
let localRandomBack = localStorage.getItem("background-option");

if (localRandomBack !== null) {

    // Remove Active
    randomBgrounds.forEach((span) => span.classList.remove("active"));

    if (localRandomBack == "true") {

        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add('active');

    } else {

        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
        document.querySelector(".landing-page").style.backgroundImage = localStorage.getItem("localRandomBack");
    }
}

randomBgrounds.forEach((span) => {

    span.addEventListener("click", (e) => {

        handleActive(e);


        // Check backgoundOption
        if (e.target.dataset.background == "yes") {

            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background-option', true);

        } else {

            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background-option', false)
        }
    });
});


// Select landing-page Element
let landingPage = document.querySelector(".landing-page");

// Array Of Background Images
let arrayImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Generate Random Number Of arrayImgs
            let randomNumber = Math.trunc(Math.random() * arrayImgs.length);
        
            // Change BackgroundImgs
            landingPage.style.backgroundImage = 'url("images/' + arrayImgs[randomNumber] + '")';

            // Save Value On localStaorage
            localStorage.setItem("localRandomBack", 'url("images/' + arrayImgs[randomNumber] + '")');
        
        }, 10000);
    }
};

randomizeImgs();


// Handle option_box (show bullets)
let bulletsContainer = document.querySelector(".nav-bullets");
let showBullets = document.querySelectorAll(".show-bullets span");
let localFixedBullets = localStorage.getItem("display-bullet");

if (localFixedBullets !== null) {

    showBullets.forEach((span) => span.classList.remove("active"));

    if (localFixedBullets == "none") {

        bulletsContainer.style.display = "none";
        document.querySelector(".show-bullets .no").classList.add("active");

    } else {

        bulletsContainer.style.display = "block";
        document.querySelector(".show-bullets .yes").classList.add("active");

    }
}

showBullets.forEach((span) => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.show == "block") {

            bulletsContainer.style.display = "block";
            localStorage.setItem("display-bullet", "block");

        } else {

            bulletsContainer.style.display = "none";
            localStorage.setItem("display-bullet", "none");

        }
    });
});





// ****************    Start Skills Section *****************

// Select skills Selector
let ourSkills = document.querySelector(".my-skills");

window.onscroll = function () {

    // ourSkills offsetHeight
    let skillsOffsetHeight = ourSkills.offsetHeight;

    // window scrollTop
    let windowScrollY = this.scrollY;

    if (windowScrollY > skillsOffsetHeight) {
        document.querySelectorAll(".skills-box .div-progress span").forEach((span) => span.style.width = span.dataset.progress);
    }
};


// **************** Start Gallery Section *********************************

// Create Popup with image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // Create popup overlay
        let overlay = document.createElement("div");

        // Add Class
        overlay.className = "popup-overlay";

        // Append To web page
        document.body.appendChild(overlay);

        // Create popup-box
        let popupBox = document.createElement("div");

        // Add Class To popup-box
        popupBox.className = "popup-box"

        // Create img Element
        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        // Append
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        if (img.alt !== null) {

            // create Heading
            let imgHeading = document.createElement("h3");

            // CreateText
            let imgText = document.createTextNode(img.alt);

            // Append
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);

        }

        // Create Close Button
        let closeButton = document.createElement("span");

        // Create Text
        let closeText = document.createTextNode("X");

        // Create Class To button Box
        closeButton.className = "close-button";

        // Append
        closeButton.appendChild(closeText);
        popupBox.prepend(closeButton);

    });
});


// Close Popoup
document.addEventListener("click", (e) => { 

    if (e.target.className == "close-button") {

        // Remove popup-box
        e.target.parentNode.remove();

        // Remove popup-overlay
        document.querySelector(".popup-overlay").remove();

    }
});

// **************** End Gallery Section *********************

// **************** Start Fixed Bullets & Header Links *********************

// Select All Bullets
let allFixedBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All headerlinks
let headerlinks = document.querySelectorAll(".header-area .links a");

// Create scrollToSection Function
function scrollToSection(elements) {

    elements.forEach((ele) => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });

        });
    });
};

scrollToSection(allFixedBullets);
scrollToSection(headerlinks);

// **************** End Fixed Bullets & Header Links *********************

// Function To Handle Active Class 
function handleActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {

        element.classList.remove("active");

    });

    // Add Active Class To current Element (On self)
    ev.target.classList.add("active");

};


// Handle Reset-Button
document.querySelector(".reset-button").onclick = function () {

    localStorage.removeItem("display-bullet");
    localStorage.removeItem("background-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("localRandomBack");

    // Reload Page
    window.location.reload();

};

// ************************ Start Toggle Menu ******************************
let toggleBtn = document.querySelector(".landing-page .links-container .toggle-menu");
let tlinks = document.querySelector(".landing-page .links-container .links");


toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");
    
    tlinks.classList.toggle("open");

};


document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tlinks) {

        // Check if tlinks contain class open
        if (tlinks.classList.contains("open")) {

            tlinks.classList.toggle("open");

            toggleBtn.classList.toggle("menu-active");

        }

    }

});

tlinks.onclick = function (e) {
    e.stopPropagation();
};

// ******************************* End Toggle Menu ***********************