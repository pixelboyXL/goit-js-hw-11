import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchImages, DEFAULT_PAGE, page, perPage, resetPage } from './js/fetchImages';
import { imageCreate } from './js/imageCreate';

const form = document.querySelector(".search-form");
const input = document.querySelector(".input");
const gallery = document.querySelector(".gallery");
const buttonLoadMore = document.querySelector(".load-more");

form.addEventListener("submit", onSubmit);
buttonLoadMore.addEventListener("click", onNextImagesAdd);

let searchValue = '';

const optionsSL = {
    overlayOpacity: 0.5,
    captionsData: "alt",
    captionDelay: 250,
};
let simpleLightbox;

// const optionsIO = {
//     rootMargin: '200px',
//     treshold: 1.0,
// };
// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (searchValue === '') {
//             return;
//         } else if (entry.isIntersecting) {
//             onNextImagesAdd();
//         };
//     });
// }, optionsIO);

async function onSubmit(event) {
    event.preventDefault();
    searchValue = input.value.trim();
    if (searchValue === '') {
        clearAll();
        buttonHidden();
        Notiflix.Notify.info('You cannot search by empty field, try again.');
        return;
    } else {
        try {
            resetPage();
            const result = await fetchImages(searchValue);
            if (result.hits < 1) {
                clearAll();
                buttonHidden();
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                gallery.innerHTML = imageCreate(result.hits);
                simpleLightbox = new SimpleLightbox(".gallery a", optionsSL).refresh();
                buttonUnHidden();
                // observer.observe(document.querySelector(".scroll-guard"));
                Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
            };
        } catch (error) {
            ifError();
        };
    };
};

// function onSubmit(event) {
//     event.preventDefault();
//     searchValue = input.value.trim();
//     if (searchValue === '') {
//         clearAll();
//         Notiflix.Notify.info('You cannot search by empty field, try again.');
//         return;
//     } else {
//         resetPage()
//         fetchImages(searchValue).then(allImages => {
//             if (allImages.hits < 1) {
//                 clearAll();
//                 buttonLoadMore.classList.add("visually-hidden");
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//             } else {
//                 gallery.innerHTML = imageCreate(allImages.hits);
//                 buttonLoadMore.classList.remove("visually-hidden");
//                 Notiflix.Notify.success(`Hooray! We found ${allImages.totalHits} images.`);
//             };
//         }).catch(() => {
//             ifError();
//         });
//     };
// };

async function onNextImagesAdd() {
    //page += 1;
    simpleLightbox.destroy();
    try {
        const result = await fetchImages(searchValue);
        const totalPages = page * perPage;
            if (result.totalHits <= totalPages) {
                buttonHidden();
                Notiflix.Report.info('Wow', "We're sorry, but you've reached the end of search results.", 'Okay');
            }
        gallery.insertAdjacentHTML('beforeend', imageCreate(result.hits));
        smothScroll();
        simpleLightbox = new SimpleLightbox(".gallery a", optionsSL).refresh();
    } catch (error) {
        ifError();
    };
};

// function onNextImagesAdd() {
//   //page += 1;
//     fetchImages(searchValue).then(allImages => {
//         const totalPages = page * perPage;
//         if (allImages.totalHits <= totalPages) {
//             buttonLoadMore.classList.add("visually-hidden");
//             Notiflix.Report.info('Wow', "We're sorry, but you've reached the end of search results.", 'Okay');
//         }
//         gallery.insertAdjacentHTML('beforeend', imageCreate(allImages.hits));
//     }).catch(() => {
//         ifError();
//     });
// };

function ifError() {
    clearAll();
    buttonHidden();
    Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
};

function clearAll() {
    gallery.innerHTML = '';
};

function buttonHidden() {
    buttonLoadMore.classList.add("visually-hidden");
};

function buttonUnHidden() {
    buttonLoadMore.classList.remove("visually-hidden");
};

function smothScroll() {
    const { height: cardHeight } =
        document.querySelector(".gallery--card").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3.9,
    behavior: "smooth",
});
};