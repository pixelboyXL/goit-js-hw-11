import { icons } from './icons';

export function imageCreate(images) {
    return images.map((image) => 
        `<div class="gallery--card">
            <a href="${image.largeImageURL}">
              <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"
              class="gallery--image" />
            </a>
            <div class="galery--info">
                <p class="galery--item">${image.likes}
                <b>${icons.likes}</b>
                </p>
                <p class="galery--item">${image.views}
                <b>${icons.views}</b>
                </p>
                <p class="galery--item">${image.comments}
                <b>${icons.comments}</b>
                </p>
                <p class="galery--item">${image.downloads}
                <b>${icons.downloads}</b>
                </p>
            </div>
        </div>`).join("");
};