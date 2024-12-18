
const load_all_phone = async (status, search_box) => {
    console.log(search_box);
    document.getElementById('spinner').style.display = 'none';

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search_box ? search_box : 'iphone'}`);
    const data = await response.json();
    console.log(data.data)
    if (status) {
        display_all_phone(data.data);
    }
    else {
        display_all_phone(data.data.slice(0, 6))
    }
}

const display_all_phone = (phones) => {
    const phones_container = document.getElementById('phones_container');
   phones.forEach((phone) => {
    const {brand, phone_name, slug, image} = phone;
    const div = document.createElement ('div');
    div.innerHTML = `
    <div class="card mt-6 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}!</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `;
    phones_container.appendChild(div);
   });
};

const handle_show_all = () => {
    load_all_phone(true);
}


const handle_search = () => {
    document.getElementById('spinner').style.display = 'block';
    const search_box = document.getElementById('search_box').value;
    setTimeout(() => {
        load_all_phone(false, search_box);
    }, 3000);
};


load_all_phone(false, 'iphone')
