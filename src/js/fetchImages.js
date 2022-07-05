import axios from 'axios';

export const DEFAULT_PAGE = 1;
export let page = DEFAULT_PAGE;
    
export const perPage = 40;

export async function fetchImages(searchValue) {
    const searchParams = new URLSearchParams ({
        key: '28416267-980e6e5ab3caaf003a8a6cf19',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: perPage,
        page
    });
    const images = await axios.get(`https://pixabay.com/api/?${searchParams}`).then(page +=1);
    return images.data;
};

// function fetchImages(searchValue) {
//     const searchParams = new URLSearchParams ({
//         key: '28416267-980e6e5ab3caaf003a8a6cf19',
//         q: searchValue,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         per_page: perPage,
//         page
//     });
//     return fetch(`https://pixabay.com/api/?${searchParams}`)
//         .then(response => {
//             if (response.ok) {
//                 //page += 1;
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         });
// };

export function resetPage() {
    page = DEFAULT_PAGE;
};