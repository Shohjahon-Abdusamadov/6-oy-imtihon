const dataArray = JSON.parse(localStorage.getItem('products')) || [];

function updateDataList() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';
    
    dataArray.forEach((item, index) => {
        const itemWrapper = document.createElement("div");
        itemWrapper.className = "itemWrapper";

        const img = document.createElement('img');
        img.src = item.imageURL;
        img.alt = 'Submitted Image';
        img.width = 200;
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteItem(index);
        };
        itemWrapper.append(deleteButton);

        dataList.append(itemWrapper);
    });
}

function deleteItem(index) {
    dataArray.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(dataArray));
    updateDataList();
}

// Initial load
updateDataList();
