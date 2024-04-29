const loadPhone = async (searchInput, showAllPhone) => {
      const fetchedPhone = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput}`);
      const data = await fetchedPhone.json();
      const phones = data.data;
      displayPhones(phones, showAllPhone);
}

const displayPhones = (phones, showAllPhone) => {

      document.getElementById('phone-container').innerHTML = '';

      // no phone warning
      if (phones.length === 0) {
            document.getElementById('no-found-message').classList.remove('hidden')
      }
      else {
            document.getElementById('no-found-message').classList.add('hidden')
      }

      // showAll button
      if (phones.length > 12 && !showAllPhone) {
            document.getElementById('showAllBtn').classList.remove('hidden')
      }
      else {
            document.getElementById('showAllBtn').classList.add('hidden')
      }

      if (!showAllPhone) {
            // firstly showing 12 phone only
            phones = phones.slice(0, 12);
      }

      for (let phone of phones) {

            const { brand, phone_name, slug, image } = phone;
            const div = document.createElement('div');

            div.innerHTML = `
            <div class="card border border-[#CFCFCF] p-5">
                  <figure class="py-10 bg-[#0d6efd0d]">
                        <img src="${image}" alt="Shoes"
                                    class="rounded-lg" />
                  </figure>
                  <div class="card-body items-center text-center">
                        <h2 class="card-title text-[#403F3F] text-2xl font-bold">${phone_name}</h2>
                        <p class="text-[#706F6F] text-lg font-normal">There are many variations of passages of available, but the majority have suffered</p>
                        <h4 class="text-[#403F3F] text-2xl font-bold">$999</h4>
                        <div class="card-actions pt-5">
                              <button onclick="handleModal('${slug}')" class="px-8 py-3 bg-[#0D6EFD] text-white font-bold text-xl rounded-lg">Show Details</button>
                        </div>
                  </div>
            </div>
            `;

            document.getElementById('phone-container').appendChild(div);
      }
}

const handleSearch = (showAllPhone) => {
      const inputFieldValue = document.getElementById('search-input').value;
      loadPhone(inputFieldValue, showAllPhone)
}

const showAllPhone = () => {
      handleSearch(true)
}

const handleModal = async (phoneId) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
      const data = await res.json();
      const phone = data.data;

      document.getElementById('my_modal_5').innerHTML = '';
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="modal-box w-11/12 max-w-5xl">

            <figure class="flex items-center justify-center py-10 bg-[#0d6efd0d]">
                  <img src="${phone?.image}" alt="Shoes"
                        class="rounded-lg" />
            </figure>
            <div>
                  <h4 class="my-7 text-3xl font-bold text-[#403F3F]">${phone?.name}</h4>
                  <p class="text-[#706F6F]">It is a long established fact that reader will be distracted
                        by the
                        readable content of a
                        page when looking at its layout.</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Storage</span> : ${phone?.mainFeatures?.storage}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Display Size </span> : ${phone?.mainFeatures?.displaySize}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Chipset </span> : ${phone?.mainFeatures?.chipSet}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Memory </span> : ${phone?.mainFeatures?.memory}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Slug </span> : ${phone?.slug}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Release data </span> : ${phone?.releaseDate}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">Brand </span> : ${phone?.brand}</p>

                  <p class="mt-5 mb-4 text-[#706F6F] font-normal text-xl"><span
                        class="text-[#403F3F] font-semibold">GPS </span> : ${phone?.others?.GPS || 'No GPS available'}</p>
            </div>
            <div class="modal-action">
                  <form method="dialog">
                        <button class="btn bg-red-400 text-whithover:bg-red-400">Close</button>
                  </form>
            </div>
      </div>
      `
      document.getElementById('my_modal_5').appendChild(div);

      my_modal_5.showModal();
}


document.getElementById('search-input').addEventListener('keyup', function (e) {

      if(e.key==='Enter'){ 
          handleSearch();  
      }
});

// loadPhone()