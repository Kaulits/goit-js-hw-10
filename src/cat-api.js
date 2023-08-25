


export function fetchBreeds() {

const apiAdress = 'https://api.thecatapi.com/v1/breeds';

    return fetch(apiAdress)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
           
            return response.json();
        }).then(data => data.map(breed => ({ id: breed.reference_image_id, name: breed.name })))
        .catch(error => {
            console.error('Error fetching breeds:', error);
      throw error;
        });
};



export function fetchCatByBreed (breedId) {
    const BASE_ADRESS = `https://api.thecatapi.com/v1/images/${breedId}`;
   
    return fetch(BASE_ADRESS)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then (data => data)
        .catch(error => {
            console.error('Error fetching cat by breed:', error);
            throw error;
        });
}