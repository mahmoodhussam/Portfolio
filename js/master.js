let mainColor = localStorage.getItem("option_color");

if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color",mainColor);
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        if(element.dataset.color === mainColor){
            element.classList.add("active");
        }
    })
}


let setting_icon = document.querySelector('.setting-icon');
let setting_box = document.querySelector('.setting-box');
setting_icon.addEventListener('click',()=>{
    setting_box.classList.toggle("open");
})
let landingPage = document.querySelector('.landing-page');  

let imgs = ['1.jpg','4.jpg','5.jpg'];

let randomNumber;
let backgroundRandom = true;
let bgOption = localStorage.getItem("option_bg"); 
let bgInterval;
if(bgOption !== null){
    if(bgOption === "true") {
        backgroundRandom = true;
    }
    else {
        backgroundRandom = false;
    }
    document.querySelectorAll(".random-background-container span").forEach(e=>{
        e.classList.remove("active");
    
    })
    if(backgroundRandom === true){
        document.querySelector(".random-background-container .yes").classList.add("active");
    }
    else {
        document.querySelector(".random-background-container .no").classList.add("active");
    }
}
function randomImage(){
    if(backgroundRandom){
        bgInterval = setInterval(()=>{
            randomNumber = Math.floor(Math.random()*imgs.length);
            landingPage.style.backgroundImage = 'url("imgs/'+ imgs[randomNumber] +'")';
            console.log(randomNumber);
        },1000);
    }
}


let colorsLi = document.querySelectorAll(".colors-list li");
console.log(colorsLi);
colorsLi.forEach((li)=>{
    li.addEventListener("click",(e)=>{
        console.log(e.target.dataset.color);
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        localStorage.setItem("option_color", e.target.dataset.color);

        e.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    })
});

let BackRandom = document.querySelectorAll(".random-background-container span")

BackRandom.forEach(element =>{
    console.log(element)
    element.addEventListener("click",(e)=>{
        e.target.parentElement.querySelectorAll(".active").forEach(item=>{
            item.classList.remove("active");
        })
        e.target.classList.add("active");
        if(e.target.dataset.bg === "yes"){
            backgroundRandom = true;
            console.log("Yes");
            randomImage();
            localStorage.setItem("option_bg", true);
            
        }
        else {
            backgroundRandom = false;
            console.log("No");
            clearInterval(bgInterval);
            localStorage.setItem("option_bg", false);
        }
    });
})
randomImage();

let ourSkills = document.querySelector(".skills")
window.addEventListener('scroll', ()=>{
    let skillsOffsetTop= ourSkills.offsetTop;
    let skillsOffsetHight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollUp = this.pageYOffset;
    let allSkills = document.querySelectorAll(".skill-progress span")
    if(windowScrollUp > skillsOffsetTop + skillsOffsetHight - windowHeight){
        allSkills.forEach((element)=>{
            element.style.width = element.dataset.progress;
        })
    }
    else {
        allSkills.forEach((element)=>{
            element.style.width = "0%";
        })
    }
    // console.log(windowScrollUp);
});

let ourGallery = document.querySelectorAll('.image-box img');

ourGallery.forEach(img =>{
    img.addEventListener("click", e =>{
        let overlay = document.createElement("div");
        overlay.classList = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if(img.alt !== ""){
            let imageHeading = document.createElement("h3");
            let imageHeadingContent = document.createTextNode(img.alt);
            imageHeading.appendChild(imageHeadingContent);
            popupBox.appendChild(imageHeading); 
        }
        let popupImage = document.createElement("img");
        popupImage.classList = "popup-image";
        popupImage.src = img.src;
        popupBox.appendChild(popupImage); 
        console.log(img.src);
        
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "popup-close";
        popupBox.appendChild(closeButton);
        overlay.appendChild(popupBox); 

        // closeButton.addEventListener("click", (e)=>{
        //     overlay.remove()
        // })
    });
})

document.addEventListener("click", (e)=>{
    if(e.target.className ===  "popup-close"){
        // e.target.parentElement.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

const Scrolled = (links) =>{
    links.forEach(link => {
        link.addEventListener("click", (e)=>{
            e.preventDefault();
            console.log(e.target.dataset.section);
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

let allBullets = document.querySelectorAll(".nav-bullet .bullet");
console.log(allBullets);

Scrolled(allBullets);
// allBullets.forEach(bullet =>{
//     bullet.addEventListener("click", (e)=>{
//         // console.log(e.target.dataset.section);
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth" 
//         })
//     })
// })

let allLinks = document.querySelectorAll('.header-menu a');

// allLinks.forEach(link=>{
//     console.log(link);
//     link.addEventListener("click", (e)=>{
//         e.preventDefault();
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// });
Scrolled(allLinks);

let showBullets = document.querySelectorAll(".show-bullets span");
let bullets = document.querySelector(".nav-bullet");
let bulletsLocal = localStorage.getItem("bullets_option");
if ( bulletsLocal !== null ) {
    // console.log("Not Empty");
        showBullets.forEach(span =>{
            span.classList.remove("active");
        })
        if( bulletsLocal === "block" ) {
            bullets.style.display = "block";
            document.querySelector(".show-bullets .yes").classList.add("active");
        } else {
            bullets.style.display = "none";
            document.querySelector(".show-bullets .no").classList.add("active");
        }
}
showBullets.forEach(span => {
    span.addEventListener("click", (e)=>{
        e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        e.target.classList.add("active");
        if(e.target.dataset.display === "yes") {
            bullets.style.display = "block";
            localStorage.setItem("bullets_option" , "block");
        } else {
            bullets.style.display = "none";
            localStorage.setItem("bullets_option" , "none");
        }
    });
});

// clear the local storage 

document.querySelector(".restart").addEventListener("click", (e)=>{
    localStorage.clear();
    window.location.reload();
});


// Toggle Menu 

let menuIcon = document.querySelector(".toggle-menu");
let menuOpen = document.querySelector(".header-menu");
menuIcon.addEventListener("click", (e)=>{
    e.stopPropagation();
    menuOpen.classList.toggle("open");
    menuIcon.classList.toggle("menu-active");
})

// Click Any Where to colse the menu in smale screen 

document.addEventListener("click", (e)=>{
    if(menuOpen != e.target) {
        menuOpen.classList.remove("open");
        menuIcon.classList.remove("menu-active");
    }
})

// Replace Links with the menus 

let linksTest = document.querySelector(".header-menu");
let showLinks = document.querySelectorAll(".show-links span");
let toggleMenu = document.querySelector(".toggle-menu")
let showLinksLocalStorage = localStorage.getItem("option_links");
let showLinksContainer =  document.querySelector(".show-links");
if ( showLinksLocalStorage != null ) {
    showLinksContainer.querySelectorAll(".active").forEach(ele =>{
        ele.classList.remove("active")
    })
    if (showLinksLocalStorage == "yes") {
        linksTest.style.display = "flex";
        toggleMenu.style.display = "none";
        document.querySelector(".show-links .yes").classList.add("active");
    }
    else {
        linksTest.style.display = "none";
        toggleMenu.style.display = "block";
        document.querySelector(".show-links .no").classList.add("active");
    }
}

showLinks.forEach(span =>{
    span.addEventListener("click", (e)=>{
        // Remove all the element have active class
        e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active")
        })
        e.target.classList.add("active");
        if (e.target.dataset.links === "yes") {
            linksTest.style.display = "flex";
            toggleMenu.style.display = "none";
            localStorage.setItem("option_links", "yes");
        }
        else {
            linksTest.style.display = "none";
            toggleMenu.style.display = "block";
            localStorage.setItem("option_links", "no");
        }
    })
});