const  loadPhones  = async(searchText,show) =>{
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL)
    const data = await res.json()
    displayPhones(data.data,show);
}
const phoneProcess = (show)=>{
    spinner(true);
    const inputField = document.getElementById('search-field').value;
    loadPhones(inputField, show);
}
const displayPhones = (phones,show) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = ''
    

    if (show && phones.length > 10) {
        phones = phones.slice(0,10);
        document.getElementById('show-all-btn').classList.remove('d-none')
        
    }
    else{
        document.getElementById('show-all-btn').classList.add('d-none')
    }



    if (phones.length === 0) {
        document.getElementById('phone-found-message').classList.remove('d-none')  
        spinner(false);      
    }
    else{
        document.getElementById('phone-found-message').classList.add('d-none') 
    }
    phones.forEach(phone => {
        

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Phone Details
  </button>
        </div>
      </div>
      
        `;
        phoneContainer.appendChild(div);
        spinner(false);
    });
}
document.getElementById('search-btn').addEventListener('click', function () {
    phoneProcess(10);
})
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        phoneProcess(10);
    }
});


const spinner = (isLoading) =>{
    if (isLoading) {
        document.getElementById('spinner').classList.remove('d-none');
    }
    else{
        document.getElementById('spinner').classList.add('d-none');
    }
}
document.getElementById('show-all-btn').addEventListener('click', function(){
    phoneProcess()
    document.getElementById('search-field').value = '';
})

const showDetails = async (id)=>{
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(URL)
    const data = await res.json()
    phoneDetails(data.data);
}

const phoneDetails = phone =>{
    console.log(phone);
    document.getElementById('exampleModalLabel').innerText = phone.name;
    document.getElementById('phone-detals-body-modal').innerHTML =`
             <img class="text-center p-1" src="${phone.image}" alt="">
            <p>release Date: ${phone.releaseDate} </p>    
            <p>chipSet: ${phone.mainFeatures.chipSet} </p>    
            <p>Display Size: ${phone.mainFeatures.displaySize} </p>    
            <p>Memory: ${phone.mainFeatures.memory} </p>    
            <p>Storage: ${phone.mainFeatures.storage} </p>    
    `;
    
}
loadPhones('phone');