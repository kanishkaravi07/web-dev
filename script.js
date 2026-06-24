let images = ["slide1.jpg", "slide2.jpg", "slide3.jpg"];
let i = 0;

function changeSlide() {
    i++;
    if (i >= images.length) {
        i = 0;
    }
    let slideElem = document.getElementById("slide");
    if (slideElem) {
        slideElem.src = images[i];
    }
}

setInterval(changeSlide, 3000);

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function saveUser() {
    let nameElem = document.getElementById("name");
    let emailElem = document.getElementById("email");
    
    if (!nameElem || !emailElem) return;

    let name = nameElem.value.trim();
    let email = emailElem.value.trim();

    if (name == "") {
        alert("Name cannot be empty");
        return;
    }
    if (name.length < 3) {
        alert("Name must contain at least 3 characters");
        return;
    }
    if (name.length > 20) {
        alert("Name should not exceed 20 characters");
        return;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Only alphabets are allowed");
        return;
    }
    if (name.startsWith(" ")) {
        alert("Name should not start with space");
        return;
    }

    if (email == "") {
        alert("Email cannot be empty");
        return;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

    let choice = confirm("Do you want to register?");
    if (choice == false) {
        alert("Registration Cancelled");
        return;
    }

    let city = prompt("Enter Your City:");
    if (city == "" || city == null) {
        city = "Not Provided";
    }

    setCookie("username", name, 30);
    setCookie("useremail", email, 30);
    localStorage.setItem("username", name);

    let regID = "REG" + Math.floor(Math.random() * 10000);
    let resultElem = document.getElementById("result");
    
    if (resultElem) {
        resultElem.innerHTML =
            "Hello " + name +
            "<br>City : " + city +
            "<br>Your Registration ID : " + regID +
            "<br>Registration Successful ✔";
    }

    alert("Successfully Registered!");
    
    let welcomeElem = document.getElementById("welcomeText");
    if (welcomeElem) {
        welcomeElem.innerHTML = "Welcome Back, " + name + " 💖";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let user = localStorage.getItem("username") || getCookie("username");
    if (user && user != "") {
        let welcomeElem = document.getElementById("welcomeText");
        if (welcomeElem) {
            welcomeElem.innerHTML = "Welcome Back, " + user + " 💖";
        }
    }
});
