// export function imageCreate(images) {
//     return images.map((image) =>
//         `<div class="gallery--card">
//             <a href="${image.largeImageURL}">
//               <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"
//               class="gallery--image" />
//             </a>
//             <div class="galery--info">
//                 <p class="galery--item">${image.likes}
//                 <b>Likes</b>
//                 </p>
//                 <p class="galery--item">${image.views}
//                 <b>Views</b>
//                 </p>
//                 <p class="galery--item">${image.comments}
//                 <b>Comments</b>
//                 </p>
//                 <p class="galery--item">${image.downloads}
//                 <b>Downloads</b>
//                 </p>
//             </div>
//         </div>`).join("");
// };

export function imageCreate(images) {
    return images.map((image) => 
        `<div class="photo-card">
            <a href="${image.largeImageURL}">
              <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"
              class="photo-ref" />
            </a>
            <div class="info">
                <p class="info-item">${image.likes}
                <b>Likes</b>
                </p>
                <p class="info-item">${image.views}
                <b>Views</b>
                </p>
                <p class="info-item">${image.comments}
                <b>Comments</b>
                </p>
                <p class="info-item shrink">${image.downloads}
                <b>Downloads</b>
                </p>
            </div>
        </div>`).join("");
};