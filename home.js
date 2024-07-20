import { checkToken, redirect } from "./utils.js";

const dataArray = JSON.parse(localStorage.getItem('products')) || [];

(function() {
    const hasToken = checkToken();
    if (hasToken == false) {
        redirect("/login.html");
    }
})();

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();



    const btn_loader = document.getElementById("btn_loader");
    btn_loader.style.display = "inline-block";
    
    const name = document.getElementById('name').value;
    const surname = document.getElementById('products').value;
    const description = document.getElementById('description').value;
    const imageURL = document.getElementById('imageURL').value;
    const price = document.getElementById('price').value;
    
    const dataObject = {
        name,
        surname,
        description,
        imageURL,
        price,
    };
    
    dataArray.push(dataObject);
    localStorage.setItem('products', JSON.stringify(dataArray));
    
    setTimeout(() => {
        updateDataList();
        btn_loader.style.display = "none";
    }, 2000);
    
    document.getElementById('dataForm').reset();
});

function updateDataList() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    if (dataArray.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your item list is empty!!!";
        emptyMessage.style.fontSize = "26px";
        dataList.appendChild(emptyMessage);

        const loader = document.getElementById("loader");
        loader.style.display = "none";
    } else {
        dataArray.forEach((item, index) => {
            const loader = document.getElementById("loader");
            loader.style.display = "inline-block";


            const itemWrapper = document.createElement("div");
            itemWrapper.className = "itemWrapper";

            const img = document.createElement('img');
            img.src = item.imageURL;
            img.alt = 'Submitted Image';
            img.width = 350;
            img.style.marginBottom = "20px";

            itemWrapper.append(img);

            const itemName = document.createElement('li');
            itemName.textContent = `Product Name: ${item.name}`;
            itemWrapper.append(itemName);

            const itemSurname = document.createElement('li');
            itemSurname.textContent = `Number of Products: ${item.surname} ta`;
            itemWrapper.append(itemSurname);

            const itemDescription = document.createElement('li');
            itemDescription.textContent = `Description: ${item.description}`;
            itemWrapper.append(itemDescription);

            const itemPrice = document.createElement('li');
            itemPrice.textContent = `Price: ${item.price}$`;
            itemWrapper.append(itemPrice);

            const div = document.createElement('div');
            div.insertAdjacentHTML("afterbegin", `<button id="deleteButton${index}" type="submit">Delete <span class="btn_loader2" id="btn_loader2_${index}"></span></button>`);
            itemWrapper.append(div);

            const deleteButton = div.querySelector(`#deleteButton${index}`);

            deleteButton.onclick = function() {
                div.innerHTML= ""
                div.insertAdjacentHTML("afterbegin", `<button id="deleteButton${index}" type="submit"><span class="btn_loader2" id="btn_loader2_${index}">Deleting</span></button>`)
                deleteItem(index);
            };
            dataList.append(itemWrapper);

            loader.style.display = "none";
        });
    }
}

function deleteItem(index) {
    const btn_loader = document.querySelector(`#btn_loader2_${index}`);
    btn_loader.style.display = "inline-block";

    dataArray.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(dataArray));
    setTimeout(() => {
        updateDataList();
        btn_loader.style.display = "none";
    }, 2000);
}

setTimeout(() => {
    updateDataList();
}, 2000);
