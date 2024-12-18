
const load_all_phone = async (status, search_box) => {
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
    const { brand, phone_name, slug, image } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mt-6 bg-base-100 w-96 shadow-xl border">
  <figure class="px-10 pt-10">
    <img class="bg-[#0D6EFD0D] px-16 py-16 rounded-xl"
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}!</h2>
    <p class='text-[18px] font-medium'>${phone_name}</p>
    <div class="card-actions">
      <button onclick="phones_details('${slug}')" class="btn btn-primary">Show Details</button>

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


const phones_details = async (slugs) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
  const data = await response.json();
  console.log(data.data);

  const { image, storage, displaySize, chipset, memory, slug, releaseDate, brand, GPS } = data.data;

  const modal_container = document.getElementById('modal_container');

  modal_container.innerHTML = `
   <dialog id="my_modal_1" class="modal">
            <div class="modal-box space-y-4">
            <img class="text-center" src="${image}" alt="">
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Storage :</span> ${data.data.mainFeatures.storage}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Display Size :</span> ${data.data.mainFeatures.displaySize}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Chipset :</span> ${data.data.mainFeatures.chipSet}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Memory :</span> ${data.data.mainFeatures.memory}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Slug :</span> ${slug}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Release Date :</span> ${releaseDate}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">Brand :</span> ${brand}</h4>
            <h4 class="text-[#706F6F]"><span class="text-xl text-[#403F3F] font-semibold">GPS :</span> ${data.data.others.GPS}</h4>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
  `;

  my_modal_1.showModal()
}

load_all_phone(false, 'iphone')
