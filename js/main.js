var container = [];

function save() {
    localStorage.setItem("storage", JSON.stringify(container));
}

function fall() {
    var tempContainer = JSON.parse(localStorage.getItem("storage"));
    if (tempContainer) {
        container = tempContainer;
    }
}

var input = document.getElementById("site-name");
var input2 = document.getElementById("site-url");
var i = 0;
var x = 0;

function showPopup(message) { 
    const popupText = document.getElementById("popup-text");
    popupText.textContent = message;
    const popup = new bootstrap.Modal(document.getElementById("popup-message"));
    popup.show();
}

function hidePopup() { 
    const popup = bootstrap.Modal.getInstance(document.getElementById("popup-message")); 
    if (popup) popup.hide();
}

function addSite() {
    
    if (input.value.trim().length < 3) {
        showPopup("Site name must be at least 3 characters long.");
        return;
    }
    let url = input2.value.trim();
    if (!isValidUrl(url)) {
        showPopup("Please enter a valid URL."); 
        return;
    }

    if (!/^https?:\/\//i.test(url)) { 
        url = `http://${url}`;
    }

    var name = {
        websiteName: input.value,
        websiteUrl: url,
    };
    container.push(name);
    maketable();
    i++;
    save();
}

function isValidUrl(url) { 
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([\/\w .-]*)*\/?$/i;
    return pattern.test(url);
}

function maketable() {
    var table = document.getElementById("tableee2");
    table.innerHTML = '';
    x = 0;
    for (x; x < container.length; x++) {
        var row = document.createElement("tr");
        row.className = "bg-white text-center fs-5 border-top border-bottom";

        var c1 = document.createElement("td");
        c1.className = "w-25 p-3";
        c1.innerHTML = x;

        var c2 = document.createElement("td");
        c2.className = "w-25 p-3";
        c2.innerHTML = container[x].websiteName;

        var c3 = document.createElement("td");
        c3.className = "w-25 p-3";

        var sherry = document.createElement("a");
        sherry.href = container[x].websiteUrl;
        sherry.target = "_blank";
        c3.appendChild(sherry);

        var visitBtn = document.createElement("button");
        visitBtn.className = "btn btn-success ps-4 pe-4 fs-4";
        sherry.appendChild(visitBtn);
        visitBtn.innerHTML = `<i class="fa-solid fa-eye" style="color: #f7f7f8;"></i> Visit `;

        var c4 = document.createElement("td");
        c4.className = "w-25 p-3";

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger ps-3 pe-3 fs-4";

        deleteBtn.onclick = (function(index) { 
            return function() {
                container.splice(index, 1); 
                maketable();
            };
        })(x);

        c4.appendChild(deleteBtn);
        deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="color: #ffffff;"></i> Delete`;

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);

        table.appendChild(row);
    }
}

fall();