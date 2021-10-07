function login() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    console.log(userName)
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            let responseStatus = serverResponse.status;
            let isAdmin = serverResponse.mail;
            if (responseStatus == true && isAdmin == "Sachinabs.js@gmail.com") {
                document.cookie = "admin" + "=" + isAdmin + ";" + ";path=/";
                window.location.href = "http://127.0.0.1:5500/src/admin/dashboard.html";

            }
            else {
                document.cookie = "user" + "=" + userName + ";" + ";path=/";
                window.location.href = "http://127.0.0.1:5500/src/users/services.html";
            }
        }
    };
    http.open("GET", `http://127.0.0.1:1999/login?userEmail=${userName}&userPassword=${password}`, true);
    http.send();
}


function signIn() {
    let userName = document.getElementById("userNameSignIn").value;
    let password = document.getElementById("passwordSignIn").value;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.status == false) {
                alert("Account Exists try login.");
                window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
            }
            else {
                alert("New Account created.");
                window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
            }

        }
    };
    http.open("GET", `http://127.0.0.1:1999/signIn?UserMail=${userName}&userPassword=${password}`, true);
    http.send();
}


function chooseService() {
    let findUser = document.cookie.split('=');
    let user = findUser[1];
    console.log(user)
    if (user == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }
    else {
        let serviceOption = document.getElementById("service").value;
        let bikeNumber = document.getElementById("bikeNumber").value;

        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let serverResponse = JSON.parse(this.response);
                console.log(serverResponse);
                if (serverResponse.status == false) {
                    alert("something went wrong");
                }
                else {
                    alert("service booked successfully");
                    window.location.href = "http://127.0.0.1:5500/src/users/userStatus.html";
                }

            }
        };
        http.open("GET", `http://127.0.0.1:1999/service?service=${serviceOption}&userBike=${bikeNumber}&user=${user}`, true);
        http.send();
    }
}

function userStat(EMail,bikenum, date, service, status)
{
    let mainDiv = document.querySelector('.main-container');

    let card = document.createElement('div'); 
    card.className = "card";
    mainDiv.appendChild(card);

    mail = document.createElement('h4');
    mail.id = "email";
    mail.innerHTML = EMail;
    card.appendChild(mail);

    BikeNum = document.createElement('p');
    BikeNum.id = "Number";
    BikeNum.innerHTML = bikenum;
    card.appendChild(BikeNum);

    AppDate = document.createElement('p');
    AppDate.id = "Date";
    AppDate.innerHTML = date;
    card.appendChild(AppDate);

    Service = document.createElement('p');
    Service.id = "serviceType";
    Service.innerHTML = service;
    card.appendChild(Service);

    Stat = document.createElement('p');
    Stat.id = "serviceType";
    Stat.innerHTML = status;
    card.appendChild(Stat);
}   


function userStatus() {
    let findUser = document.cookie.split('=');
    let user = findUser[1];
    console.log(user)
    if (user == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }
    else {

        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let serverResponse = JSON.parse(this.response);
                console.log(serverResponse);
                if (serverResponse.length == 0) {
                    alert("No bookings");
                }
                else {
                    for (var i = 0; i < serverResponse.length; i++) {
                        let stat;
                        if(serverResponse[i].Status == 0)
                        {
                            stat = "Not yet started"
                        }
                        if(serverResponse[i].Status == 1)
                        {
                            stat = "Started"
                        }
                        if(serverResponse[i].Status == 2)
                        {
                            stat = "Out For Delivery"
                        }
                        userStat(serverResponse[i].Email,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service, stat)

                    }
                }


            }
        };
        http.open("GET", `http://127.0.0.1:1999/customerStatus/?email=${user}`, true);
        http.send();
    }
}

function history(EMail,bikenum, date, service)
    {
        let mainDiv = document.querySelector('.main-container');
  
        let card = document.createElement('div'); 
        card.className = "card";
        mainDiv.appendChild(card);

        mail = document.createElement('h4');
        mail.id = "email";
        mail.innerHTML = EMail;
        card.appendChild(mail);
    
        BikeNum = document.createElement('p');
        BikeNum.id = "Number";
        BikeNum.innerHTML = bikenum;
        card.appendChild(BikeNum);
    
        AppDate = document.createElement('p');
        AppDate.id = "Date";
        AppDate.innerHTML = date;
        card.appendChild(AppDate);
    
        Service = document.createElement('p');
        Service.id = "serviceType";
        Service.innerHTML = service;
        card.appendChild(Service);
    }


function userHistory() {
    let findUser = document.cookie.split('=');
    let user = findUser[1];
    console.log(user)
    if (user == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }
    else {

        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let serverResponse = JSON.parse(this.response);
                console.log(serverResponse);
                if (serverResponse.length == 0) {
                    alert("No History");
                }
                else {
                    for (var i = 0; i <= serverResponse.length; i++) {
                        history(serverResponse[i].Email,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service)
                    }
                }


            }
        };
        http.open("GET", `http://127.0.0.1:1999/userHistory/?email=${user}`, true);
        http.send();
    }

    
}


function BookingStatus() {
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }


    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.length == 0) {
                console.log("no booking status");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {
                    // make in table if only the status is 1 & 2 add with a href and set that to id res.id
                    // console.log(serverResponse[i])
                    progress(serverResponse[i].Email,serverResponse[i].ServiceId,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service)
                }
            }


        }
    };
    http.open("GET", `http://localhost:1999/allBookingStatus`, true);
    http.send();

}

function progress(EMail, id, bikenum, date, service)
{
    let mainDiv = document.querySelector('.main-container');

    let card = document.createElement('div'); 
    card.className = "card";
    mainDiv.appendChild(card);

    mail = document.createElement('h4');
    mail.id = "email";
    mail.innerHTML = EMail;
    card.appendChild(mail);

    BikeNum = document.createElement('p');
    BikeNum.id = "Number";
    BikeNum.innerHTML = bikenum;
    card.appendChild(BikeNum);
    
    ID = document.createElement('p');
    ID.id = "Number";
    ID.innerHTML = id;
    card.appendChild(ID);;

    AppDate = document.createElement('p');
    AppDate.id = "Date";
    AppDate.innerHTML = date;
    card.appendChild(AppDate);

    Service = document.createElement('p');
    Service.id = "serviceType";
    Service.innerHTML = service;
    card.appendChild(Service);

    Delivery = document.createElement('a');
    Delivery.id = "deliv";        
    Delivery.innerHTML = "Change to work";
    Delivery.href = "http://localhost:1999/inprogress?ServiceId="+ id; 
    card.appendChild(Delivery);
}   

function inprogress() {
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);

            if (serverResponse.length == 0) {
                console.log("no booking status");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {
                    if(serverResponse[i].Status == 0)
                    {
                        progress(serverResponse[i].Email,serverResponse[i].ServiceId,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service)
                    }
                }
            }
        }
    };
    http.open("GET", `http://localhost:1999/pendingBookings`, true);
    http.send();
}

function pending(EMail, id, bikenum, service)
{
    let mainDiv = document.querySelector('.main-container');

    let card = document.createElement('div'); 
    card.className = "card";
    mainDiv.appendChild(card);

    mail = document.createElement('h4');
    mail.id = "email";
    mail.innerHTML = EMail;
    card.appendChild(mail);

    BikeNum = document.createElement('p');
    BikeNum.id = "Number";
    BikeNum.innerHTML = bikenum;
    card.appendChild(BikeNum);
    
    ID = document.createElement('p');
    ID.id = "Number";
    ID.innerHTML = id;
    card.appendChild(ID);

    Service = document.createElement('p');
    Service.id = "serviceType";
    Service.innerHTML = service;
    card.appendChild(Service);

    Delivery = document.createElement('a');
    Delivery.id = "deliv";        
    Delivery.innerHTML = "Set Out For Delivery";
    Delivery.href = "http://localhost:1999/outForDelivery?ServiceId="+ id; 
    card.appendChild(Delivery);
}


function showPending() {
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }


    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.length == 0) {
                console.log("no pending");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {
                
                    if (serverResponse[i].Status == 1 || serverResponse[i].Status == 0) {
                        pending(serverResponse[i].Email,serverResponse[i].ServiceId,serverResponse[i].BikeNumber,serverResponse[i].Service)
                    }
                }
            }


        }
    };
    http.open("GET", `http://localhost:1999/pendingBookings`, true);
    http.send();

}

function delievered(EMail,id, bikenum, date, service)
{
    let mainDiv = document.querySelector('.main-container');

    let card = document.createElement('div'); 
    card.className = "card";
    mainDiv.appendChild(card);

    mail = document.createElement('h4');
    mail.id = "email";
    mail.innerHTML = EMail;
    card.appendChild(mail);

    BikeNum = document.createElement('p');
    BikeNum.id = "Number";
    BikeNum.innerHTML = bikenum;
    card.appendChild(BikeNum);
    
    ID = document.createElement('p');
    ID.id = "Number";
    ID.innerHTML = id;
    card.appendChild(ID);;

    AppDate = document.createElement('p');
    AppDate.id = "Date";
    AppDate.innerHTML = date;
    card.appendChild(AppDate);

    Service = document.createElement('p');
    Service.id = "serviceType";
    Service.innerHTML = service;
    card.appendChild(Service);

    Delivery = document.createElement('a');
    Delivery.id = "deliv";        
    Delivery.innerHTML = "Out For Delivery";
    Delivery.href = "http://localhost:1999/update?ServiceId="+ id; 
    card.appendChild(Delivery);

}

function showDeliveredList() {
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }


    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.length == 0) {
                console.log("no pending");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {

                    if(serverResponse[i].Status == 2)
                    {
                        delievered(serverResponse[i].Email,serverResponse[i].ServiceId,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service)
                    }
                }
            }
        }
    };
    http.open("GET", `http://localhost:1999/deliveredList`, true);
    http.send();
}

function completed(EMail, id, bikenum, service)
{
    let mainDiv = document.querySelector('.main-container');

    let card = document.createElement('div'); 
    card.className = "card";
    mainDiv.appendChild(card);

    mail = document.createElement('h4');
    mail.id = "email";
    mail.innerHTML = EMail;
    card.appendChild(mail);

    BikeNum = document.createElement('p');
    BikeNum.id = "Number";
    BikeNum.innerHTML = bikenum;
    card.appendChild(BikeNum);
    
    ID = document.createElement('p');
    ID.id = "Number";
    ID.innerHTML = id;
    card.appendChild(ID);

    Service = document.createElement('p');
    Service.id = "serviceType";
    Service.innerHTML = service;
    card.appendChild(Service);

    Delivery = document.createElement('a');
    Delivery.id = "deliv";        
    Delivery.innerHTML = "Notify Client";
    Delivery.href = "http://localhost:1999/sendEmail?Id="+ id; 
    card.appendChild(Delivery);
}

function showAllOutForDeliver()
{
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }


    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.status == 0) {
                console.log("no list");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {
                    completed(serverResponse[i].Email,serverResponse[i].ServiceId,serverResponse[i].BikeNumber,serverResponse[i].AppliedDate,serverResponse[i].Service)

                }
            }
        }
    };
    http.open("GET", `http://localhost:1999/showAllCompleted`, true);
    http.send();
}

function sendMail()
{
    let id = document.getElementById("id").value;
    let findAdmin = document.cookie.split('admin=');
    let admin = findAdmin[1];
    console.log(admin)
    if (admin == '') {
        alert("You must login.");
        window.location.href = "http://127.0.0.1:5500/PureJs/index.html";
    }

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let serverResponse = JSON.parse(this.response);
            console.log(serverResponse);
            if (serverResponse.status == 0) {
                console.log("no list");
            }
            else {
                for (var i = 0; i < serverResponse.length; i++) {
                    
                    console.log(serverResponse[i]);

                }
            }
        }
    };
    http.open("GET", `http://localhost:1999/sendEmail?Id=${id}`, true);
    http.send();
}