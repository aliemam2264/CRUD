let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// Get Total
function getTotal(){
    if(price.value != ''){
        result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#a00b02'
    }
}


// Create Product

let dataProduct;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}

submit.onclick = function(){
    let newProduct = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && category.value != '' && newProduct.count <= 100){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataProduct.push(newProduct);
                }
            }else{
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }
        clearData();
    }
    
    localStorage.setItem('product', JSON.stringify(dataProduct))
    showData();

}


// Clear Inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// Read
function showData(){
    getTotal();
    let table = '';
    
    for(let i = 0; i < dataProduct.length; i++){
        table += `<tbody>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tbody>`
            }
            document.getElementById('tbody').innerHTML = table;

            // Delete All
            let deleteAll = document.getElementById('deleteAll');
            if(dataProduct.length > 0){
                deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
            }else{
                deleteAll.innerHTML = '';
            }
    
}
showData();

// Delete
function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// Delete All
function deleteAll(){
    dataProduct.splice(0);
    localStorage.clear();
    showData();
}


// update
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}


// search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id === 'searchByTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function getSearch(value){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        if(searchMood === 'title'){
                if(dataProduct[i].title.includes(value.toLowerCase())){
                    table += `<tbody>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tbody>`
                }
        }
        else{
                if(dataProduct[i].category.includes(value.toLowerCase())){
                    table += `<tbody>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tbody>`
                }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}