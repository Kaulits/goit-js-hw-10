import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_HnPO30PKVx5ALArTOiIJIsL2isfxjtY1QD65VmzsoQrjZw3QnMWqQ9CgoO0GU2ta';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loadEl: document.querySelector('.loader'),
    divEl: document.querySelector('.cat-info'),
}


refs.selectEl.classList.add('hidden');
refs.loadEl.classList.add('hidden');
refs.divEl.classList.add('hidden');


fetchBreeds()
    .then(breeds => {
        refs.selectEl.classList.add('hidden');
        refs.loadEl.classList.add('visible');
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            refs.selectEl.appendChild(option);
        });
        new SlimSelect({
            select: refs.selectEl,
        });
    }).
    catch(error => {
        console.log('I HATE THIS', error);
    }).finally(() => {
        setTimeout(() => { refs.selectEl.classList.remove('hidden');
        refs.loadEl.classList.remove('visible')   }, 500);
    });


    

refs.selectEl.addEventListener('change', onSelectCat);

function onSelectCat(e) {
    e.preventDefault();
    const breedId = e.target.value;
    clearCatInfo();
      refs.loadEl.classList.add('visible');
    refs.loadEl.classList.remove('hidden');
     refs.divEl.classList.add('hidden');
      refs.divEl.classList.remove('visible');
    fetchCatByBreed(breedId)
        .then(data => {
            const breed = data.breeds[0]; 
            const cats = {
                id: breed.id,
                name: breed.name, 
                description: breed.description,
                temperament: breed.temperament,
                url: data.url,
            };
            setTimeout(() => {
                markUpCats(cats);
                refs.loadEl.classList.add('hidden');
      refs.loadEl.classList.remove('visible');
     refs.divEl.classList.add('visible');
      refs.divEl.classList.remove('hidden');
            }, 1000);
            
        }).catch(error => {
            Notiflix.Notify.failure('The cats have run away, try again');
            console.log(error);
        });
};



function markUpCats(cats) {
  const markup = `
  <img src="${cats.url}" alt="${cats.name}">
  <div class="breed-box__text"><h2>${cats.name}</h2><p>${cats.description}</p><p><span class="bold">Temperament:</span> ${cats.temperament}</p></div>`;
  refs.divEl.innerHTML = markup;
}


function clearCatInfo() {
   refs.divEl.textContent = '';
}

