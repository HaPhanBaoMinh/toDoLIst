const form = document.querySelector('form');
const listItem = document.querySelector("#list");

form.addEventListener('submit', event => {
    let addItem = document.querySelector('#addItem').value;
    event.preventDefault();
    const valueItem = {
        id: new Date().toISOString(),
        name: addItem.trim()
    }
    // addItem(LS|UI)
    if(!(addItem == '')){
        addItemToLS(valueItem);
        addItemToUI(valueItem);
        
    }
    
    document.querySelector('#addItem').value = '';
})



// Lấy list từ LS
const getListLS = () => {
    return JSON.parse(localStorage.getItem('list')) || []
}



// fuction add item to LS
const addItemToLS = (item) => {
    let list = getListLS();
    list.push(item);
    let listJSON = JSON.stringify(list);
    localStorage.setItem('list', listJSON )
}

// function add to UI
const addItemToUI = (item) => {
    const newListItem = document.createElement('div');
    newListItem.className = `item ${item.id} remove`;
    newListItem.innerHTML = `<h5> ${item.name} </h5>
    <button class="btn btn-danger removeItem" > Xóa </button>`;
    document.querySelector('#list').appendChild(newListItem);
}

// function re-render khi nhaasn f5

const reRenderUI = () => {
    
    document.querySelector('#list').innerHTML = '';
    const list = getListLS();
    list.forEach(element => {
        const newListItem = document.createElement('div');
        newListItem.className = `item ${element.id} remove`;
        newListItem.innerHTML = `<h5> ${element.name} </h5>
        <button class="btn btn-danger removeItem" > Xóa </button>`;
        document.querySelector('#list').appendChild(newListItem);
    });
}

reRenderUI()

// REMOVE ALL 

const removeAll = document.querySelector('#removeAll')
removeAll.addEventListener('click', event => {
    localStorage.removeItem('list');
    reRenderUI()
})

// REMOVE ITEM
const removeItem = (item) => {
    let list = getListLS();
    list.filter(pre => pre.id == item.id)
    reRenderUI();
}

listItem.addEventListener('click', event => {
    const list = getListLS();
    if(event.target.classList.contains('removeItem')){
        // const name = event.target.previousElementSibling;
        const idElement = event.target.parentElement.classList[1];
        list.filter(item => item.id !== idElement)
        let listJSON = JSON.stringify(list.filter(item => item.id !== idElement));
        localStorage.setItem('list', listJSON )
        reRenderUI()
    }    
})

const search = document.querySelector('#search');
search.addEventListener('keyup', event => {
    let list = getListLS();
    listItem.innerHTML = '';
    list.forEach(item => {
        if(item.name.includes(search.value)){
            const newListItem = document.createElement('div');
            newListItem.className = `item ${item.id} remove`;
            newListItem.innerHTML = `<h5> ${item.name} </h5>
            <button class="btn btn-danger removeItem" > Xóa </button>`;
            document.querySelector('#list').appendChild(newListItem);
        }
    })

})










