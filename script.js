let images = ["slide1.jpg","slide2.jpg","slide3.jpg"];
let i = 0;

function changeSlide(){

    i++;

    if(i >= images.length){
        i = 0;
    }

    document.getElementById("slide").src = images[i];
}

setInterval(changeSlide,3000);

function setCookie(cname,cvalue,exdays){

    let d = new Date();

    d.setTime(d.getTime() + (exdays*24*60*60*1000));

    let expires = "expires=" + d.toUTCString();

    document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname){

    let name = cname + "=";

    let decodedCookie = decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');

    for(let i=0;i<ca.length;i++){

        let c = ca[i];

        while(c.charAt(0)==' '){
            c = c.substring(1);
        }

        if(c.indexOf(name)==0){
            return c.substring(name.length,c.length);
        }
    }

    return "";
}

function saveUser(){

    let name =
    document.getElementById("name").value.trim();

    if(name==""){
        alert("Name cannot be empty");
        return;
    }

    if(name.length < 3){
        alert("Name must contain at least 3 characters");
        return;
    }

    if(name.length > 20){
        alert("Name should not exceed 20 characters");
        return;
    }

    if(!/^[A-Za-z ]+$/.test(name)){
        alert("Only alphabets are allowed");
        return;
    }

    if(name.startsWith(" ")){
        alert("Name should not start with space");
        return;
    }

    let choice =
    confirm("Do you want to register?");

    if(choice==false){
        alert("Registration Cancelled");
        return;
    }

    let city =
    prompt("Enter Your City:");

    if(city=="" || city==null){
        city="Not Provided";
    }

    localStorage.setItem("username",name);

    setCookie("username",name,30);

    let reg =
    "REG" + Math.floor(Math.random()*10000);

    document.getElementById("result").innerHTML =
    "Hello " + name +
    "<br>City : " + city +
    "<br>Your Registration ID : " + reg +
    "<br>Registration Successful ✔";

    alert("Successfully Registered!");
}

window.onload = function(){

    let user = getCookie("username");

    if(user!=""){

        document.getElementById("welcomeText").innerHTML =
        "Welcome Back, " + user + " 💖";
    }
}