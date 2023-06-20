const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_dOea8Yz4ptWKeXMVCJHiIJyr3AfVdhnyvOZGDRFRanE748eXkqJB95uVm7wVb2HF';

export const fetchBreeds = () =>
 fetch(`${BASE_URL}/breeds?`).then(res => {
             
        if (!res.ok) {
            throw new Error(res.status);
        }
        
        return res.json();
 })
               
        .catch(error => {
            
            console.warn(error);
        });

       
//  робочий варіант 
export const fetchCatByBreed = (breedId) => 
    fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&has_breeds=1&api_key=${API_KEY}`).then(result => {
             
       if (!result.ok) {
           throw new Error(result.status);
        }
        
        return result.json();
    })
               
        .catch(error => {
        
            console.warn(error);
        });

        


