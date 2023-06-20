
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
//import catCardTemplate from '../templates/cat-card.hbs';

const selectBreedEl = document.querySelector('.breed-select');
const mesLoaderEl = document.querySelector('.loader');
const mesErrorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

let breedsList = '';


mesErrorEl.setAttribute('hidden', true);





fetchBreeds()
  .then(data => {

    //selectBreedEl.setAttribute('hidden', true);
    
    console.log(data)

    if (!data) {
           
    Notiflix.Notify.failure(

            `❌Oops! Something went wrong! Try reloading the page!`
          );
  
    }  
      
    
    data.forEach(element => { 

      mesLoaderEl.setAttribute('hidden', true);
      
    
    breedsList += `<option value="${element.id}">${element.name}</option>`;
     
 });
    selectBreedEl.insertAdjacentHTML('afterbegin', breedsList);
    
  });

  
// відображаємо вибрану породу 

const onSelecthCat = (event) => {

  clearCardCat();

  mesLoaderEl.removeAttribute('hidden');

  //  показуємо в консолі вибране значення , тобто ID породи
  
  console.log(event.target.value);
   
  fetchCatByBreed(event.target.value)
    
    .then(data => {

      //mesLoaderEl.setAttribute('hidden', true);
 
      (catInfoEl.innerHTML = createCardCat(data));

     // console.log(data);
      //mesLoaderEl.setAttribute('hidden', true);
  });
};


function createCardCat(objectCat) {
  
    if (!objectCat) {

    Notiflix.Notify.failure(

            `❌Oops! Something went wrong! Try reloading the page!`
          );
  
  }
  
  mesLoaderEl.setAttribute('hidden', false);

  return objectCat.map(({ url, breeds: [{ name, temperament, description }] }) => 
    
  ` <div class="card-img-cat">
        <img src="${ url}" alt="${name} class="foto-cat" width="400" height="300"">
        
             <h2 class="card-title">${ name}</h2>
        <p class="card-description">${ description }</p>
      <p class="cat-temperament"><b>Temperament: </b> ${ temperament }</p>
      
    </div>`).join('');
  
  
};
function clearCardCat() {

  catInfoEl.innerHTML = '';
}
  
selectBreedEl.addEventListener('change', onSelecthCat);



