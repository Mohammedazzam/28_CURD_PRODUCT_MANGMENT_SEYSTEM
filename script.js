let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

//  console.log(title, price, taxes, taxes, ads, discount, total, count)


let mood = 'create'
let tmp;


// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = []
}
// let dataPro = [];
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(), //هيك مهم دخلت حروف كبيرة راح ينشئ صغيرة
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase() //هيك مهم دخلت حروف كبيرة راح ينشئ صغيرة
    }
    // console.log(newPro);

    if (mood == 'create') {
        //هنا بنشئ منتج واحد أو عدة منتجات
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mode = 'create';
        submit.innerHTML = 'create'
        count.style.display = 'block';
    }

    // save localStorage
    localStorage.setItem('product', JSON.stringify(dataPro))

    clearData();
    showData()
}


// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        // table =dataPro[i];
        // console.log(table);
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }
}
showData()


// delete
function deleteData(i) {
    // console.log(i);
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();

}


// count

// UpdateData
function updateData(i) {
    // console.log(i)
    //حتى أعرض البيانات لما بضغط على الأبديت في الانبوت الخاص فيهم
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal() //لتشغيل التوتال
    count.style.display = 'none'; //هيك لغيت انبوت الكاونت
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'; //هيك بغير زر الكرييت لأبديت لما بدعس على الزر
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// search
let searchMoode = 'title';

function getSearchMoode(id) {
    // console.log(id)
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMoode = 'title';
    } else {
        searchMoode = 'category';
    }
    search.placeholder = 'Search By' + searchMoode;

    searchMoode.focus();
    // console.log(searchMoode);
    search.value = '';
    showData();
}

function searchData(value) {
    // console.log(value);
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (searchMoode == 'title') {
            if (dataPro[i].title.includes(value)) {
                // console.log(i)
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
            } else {
                    if (dataPro[i].category.includes(value.toLowerCase())) {
                        // console.log(i)
                        table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                    `
                    }
                    document.getElementById('tbody').innerHTML = table;
                }
            }
            document.getElementById('tbody').innerHTML = table;
        }
    }



// clean data