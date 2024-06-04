let userLoggedIn = false;
let currentUserLoggedIn;
let contactsOnWebsite;
let tempContact;

if (!userLoggedIn) {
    document.getElementById('mainID').style.display = "none";
    document.getElementById('addID').style.display = "none";
    document.getElementById('updateDeleteID').style.display = "none";
}

class User {
    constructor(username, password, isAdmin, contactsList) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.contactsList = contactsList;
    }
}

class Contact {
    constructor(name, address, postCode, city) {
        this.name = name;
        this.address = address;
        this.postCode = postCode;
        this.city = city;
    }
}

let guest = new User("guest", "password", false, []);
let admin = new User("admina", "password", true, []);

let ContactOne = new Contact("Wasserspender Spandau", "Klosterstr 3", "13581", "Berlin");
let ContactTwo = new Contact("Wasserspender Marheinekeplatz", "Bergmannstraße 29", "10961", "Berlin");
let ContactThree = new Contact("Wasserspender Beusselstr", "Beusselstr 32", "10553", "Berlin");
let ContactFour = new Contact("Wasserspender Kleistpark", "Grunewaldstr 92", "10823", "Berlin");

//guest.contactsList.push(ContactOne);
//guest.contactsList.push(ContactTwo);
//guest.contactsList.push(ContactThree);
//guest.contactsList.push(ContactFour);

admin.contactsList.push(ContactOne);
admin.contactsList.push(ContactTwo);
admin.contactsList.push(ContactThree);
admin.contactsList.push(ContactFour);

contactsOnWebsite = guest.contactsList.concat(admin.contactsList);

addContactToMap(ContactOne.address, ContactOne.postCode);
addContactToMap(ContactTwo.address, ContactTwo.postCode);
addContactToMap(ContactThree.address, ContactThree.postCode);
addContactToMap(ContactFour.address, ContactFour.postCode);

addUserToStorage(ContactOne, ContactOne.name);
addUserToStorage(ContactTwo, ContactTwo.name);
addUserToStorage(ContactThree, ContactThree.name);
addUserToStorage(ContactFour, ContactFour.name);

addUserToStorage(guest, "guestFile");
addUserToStorage(admin, "adminaFile");


function addUserToStorage(user, storageFileName) {
    let myJSON = JSON.stringify(user);
    localStorage.setItem(storageFileName, myJSON);
}

let loginButton = document.getElementById("login-buttonId");
loginButton.addEventListener("click", loginButtonClicked);

function loginButtonClicked() {
    let inputUserName = document.getElementById("usernameId").value;
    let inputPassword = document.getElementById("passwordId").value;

    for (let i = 0; i < localStorage.length; i++) {
        let currentItem = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if (currentItem.username === inputUserName && currentItem.password === inputPassword) {
            document.getElementById("loginID").style.display = "none";
            document.getElementById("mainID").style.display = "block"


            currentUserLoggedIn = currentItem;

            document.getElementById("usernameId").value = "";
            document.getElementById("passwordId").value = "";

            userLoggedIn = true;
            break;
        }
    }
    if (!userLoggedIn) {
        alert("Wrong Combination of Username and Password!");
    }

    listOwnContacts();

    if (currentUserLoggedIn === guest) {
        btn_addNew = document.getElementById("AddNewStationID").style.display = "none";
    } else {
        btn_addNew = document.getElementById("AddNewStationID").style.display = "block";
    }
}

let logoutButton = document.getElementById("logoutID");
logoutButton.addEventListener("click", logoutButtonClicked);

function logoutButtonClicked() {
    document.getElementById('mainID').style.display = "none";
    document.getElementById('addID').style.display = "none";
    document.getElementById('updateDeleteID').style.display = "none";
    document.getElementById("loginID").style.display = "block";

    userLoggedIn = false;
}

let btn_addNew = document.getElementById("AddNewStationID");
btn_addNew.addEventListener("click", addNewButtonClicked);

function addNewButtonClicked() {
    document.getElementById("mainID").style.display = "none";
    document.getElementById("addID").style.display = "block";
}

let addButton = document.getElementById("btnAdd");
addButton.addEventListener("click", addButtonClicked);

function addButtonClicked() {
    let contactName = document.getElementById("name-add").value;
    let contactAddress = document.getElementById("address-add").value;
    let contactPostCode = document.getElementById("postCode-add").value;
    let contactCity = document.getElementById("city-add").value;

    let contact = new Contact(contactName, contactAddress, contactPostCode, contactCity);

    admin.contactsList.push(contact);

    if (currentUserLoggedIn.isAdmin) {
        currentUserLoggedIn = admin;
    } else {
        currentUserLoggedIn = guest;
    }

    addUserToStorage(contact, contactName);
    contactsOnWebsite.push(contact);

    listOwnContacts();
    addContactToMap(contactAddress, contactPostCode);

    document.getElementById("name-add").value = "";
    document.getElementById("address-add").value = "";
    document.getElementById("postCode-add").value = "";
    document.getElementById("city-add").value = "";

    document.getElementById("mainID").style.display = "block";
    document.getElementById("addID").style.display = "none";
}
let addCancelButton = document.getElementById("btnAddCancel");
addCancelButton.addEventListener("click", addCancelButtonClicked);

function addCancelButtonClicked() {
    document.getElementById("mainID").style.display = "block";
}

function createButton(contact) {
    let btn = document.createElement("a");
    btn.innerHTML = contact.name;
    document.getElementById("contactsID").append(btn);
    btn.addEventListener("click", function () {
        contactButtonClicked(contact);
    });
}

function contactButtonClicked(contact) {
    if (currentUserLoggedIn === guest) {
        updateButton = document.getElementById("btnUpdate").style.display = "none";
        deleteButton = document.getElementById("btnDelete").style.display = "none";
        updateButton.disabled = true;
        deleteButton.disabled = true;
    } else {
        updateButton = document.getElementById("btnUpdate").style.display = "block";
        deleteButton = document.getElementById("btnDelete").style.display = "block";
        updateButton.disabled = false;
        deleteButton.disabled = false;
    }

    document.getElementById("updateDeleteName").value = contact.name;
    document.getElementById("updateDeleteAddress").value = contact.address;
    document.getElementById("updateDeletePostCode").value = contact.postCode;
    document.getElementById("updateDeleteCity").value = contact.city;

    tempContact = contact;

    document.getElementById("mainID").style.display = "none";
    document.getElementById("updateDeleteID").style.display = "block";
}

let updateButton = document.getElementById("btnUpdate");
updateButton.addEventListener("click", updateButtonClicked);

function updateButtonClicked() {
    for (let i = 0; i < contactsOnWebsite.length; i++) {
        let currentContactFromUser = contactsOnWebsite[i];

        for (let j = 0; j < localStorage.length; j++) {
            let currentItem = JSON.parse(localStorage.getItem(localStorage.key(j)));

            if (currentContactFromUser === tempContact) {

                if (currentContactFromUser.name === currentItem.name) {

                    let oldAddress = currentContactFromUser.address;
                    let oldPostCode = currentContactFromUser.postCode;
                    removeContactFromMap(oldAddress, oldPostCode);

                    currentContactFromUser.name = document.getElementById("updateDeleteName").value;
                    currentContactFromUser.address = document.getElementById("updateDeleteAddress").value;
                    currentContactFromUser.postCode = document.getElementById("updateDeletePostCode").value;
                    currentContactFromUser.city = document.getElementById("updateDeleteCity").value;


                    let newAddress = currentContactFromUser.address;
                    let newPostCode = currentContactFromUser.postCode;
                    addContactToMap(newAddress, newPostCode);

                    for (let k = 0; k < contactsOnWebsite.length; k++) {
                        if (currentItem.name === contactsOnWebsite[k].name) {
                            /*
                            admin.contactsList.splice(k, 1);
                            admin.contactsList.push(currentContactFromUser);

                             */
                            contactsOnWebsite.splice(k, 1);
                            contactsOnWebsite[k] = currentContactFromUser;
                            break;
                        }
                    }

                    localStorage.removeItem(j);
                    addUserToStorage(currentContactFromUser);
                }
            }
        }

        document.getElementById("mainID").style.display = "block";
        document.getElementById("updateDeleteID").style.display = "none";
    }
    listOwnContacts();
}

let deleteButton = document.getElementById("btnDelete");
deleteButton.addEventListener("click", deleteButtonClicked);

function deleteButtonClicked() {
    for (let i = 0; i < contactsOnWebsite.length; i++) {
        let currentContactFromUser = contactsOnWebsite[i];

        if (currentContactFromUser === tempContact) {
            for (let j = 0; j < localStorage.length; j++) {
                let currentItem = JSON.parse(localStorage.getItem(localStorage.key(j)));
                if (currentContactFromUser.name === currentItem.name) {

                    for (let k = 0; k < admin.contactsList.length; k++) {
                        if (currentItem.name === admin.contactsList[k].name) {
                            admin.contactsList.splice(k, 1);
                            break;
                        }
                    }

                    let address = currentContactFromUser.address;
                    let postCode = currentContactFromUser.postCode;
                    removeContactFromMap(address, postCode);

                    contactsOnWebsite.splice(i, 1);
                    localStorage.removeItem(j);
                }
            }
        }

        document.getElementById("mainID").style.display = "block";
        document.getElementById("updateDeleteID").style.display = "none";
    }
    listOwnContacts();
}

let cancelButton = document.getElementById("btnCancel");
cancelButton.addEventListener("click", cancelButtonClicked);

function cancelButtonClicked() {
    document.getElementById("mainID").style.display = "block";
    document.getElementById("updateDeleteID").style.display = "block";
}

let map = L.map('map').setView([52.52, 13.405], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addContactToMap(contactAddress, contactPlz) {
    let request = new XMLHttpRequest();
    let url = "https://nominatim.openstreetmap.org/search?q=" + contactAddress + ", " + contactPlz + "&format=json&polygon=1&addressdetails=1";
    request.open("GET", url, true);

    request.onload = function (e) {
        let responseJSON = JSON.parse(this.response);
        if (responseJSON && responseJSON.length > 0) {
            let lat = responseJSON[0].lat;
            let lon = responseJSON[0].lon;
            let name = responseJSON[0].display_name;

            console.log("Lat: " + lat + " Long: " + lon);
            L.marker([lat, lon]).addTo(map)
                .bindPopup(name);
        } else {
            console.error("No response or empty response from API.");
        }
    }
    request.onerror = function (error) {
        console.error("Error fetching data from API:", error);
    }
    request.send();
}
function removeContactFromMap(address, postCode) {
    let request = new XMLHttpRequest();
    let url = "https://nominatim.openstreetmap.org/search?q=" + address + ", " + postCode + "&format=json&polygon=1&addressdetails=1";
    request.open("GET", url, true);

    request.onload = function (e) {
        let responseJSON = JSON.parse(this.response);
        if (responseJSON && responseJSON.length > 0) {
            let lat = responseJSON[0].lat;
            let lon = responseJSON[0].lon;

            map.eachLayer(function(layer) {
                // Finden die relevante Markierung und entfernen sie von der Karte
                if (layer instanceof L.Marker && layer.getLatLng().lat === parseFloat(lat) && layer.getLatLng().lng === parseFloat(lon)) {
                    map.removeLayer(layer);
                }
            });
        } else {
            console.error("No response or empty response from API.");
        }
    }
    request.onerror = function (error) {
        console.error("Error fetching data from API:", error);
    }
    request.send();
}

function listOwnContacts() {
    if (currentUserLoggedIn.isAdmin) {
        currentUserLoggedIn = admin;
    } else {
        currentUserLoggedIn = guest;
    }
    clearButtons();
    console.log(currentUserLoggedIn);
    for (let i = 0; i < contactsOnWebsite.length; i++) {
        let currentContactFromUser = contactsOnWebsite[i];
        for (let j = 0; j < localStorage.length; j++) {
            let currentItem = JSON.parse(localStorage.getItem(localStorage.key(j)));
            if (currentContactFromUser.name === currentItem.name) {
                createButton(currentContactFromUser);
                addContactToMap(currentContactFromUser.address, currentContactFromUser.postCode);
            }
        }
    }
}
function clearButtons() {
    let contactListWebsite = document.getElementById("contactsID");
    contactListWebsite.innerHTML = "";
}