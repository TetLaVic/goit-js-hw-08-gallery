import galleryItems from "./gallery-items.js";
const galleryListRef = document.querySelector(".gallery");

const imageList = galleryItems.map((item) => createGalleryItem(item));

galleryListRef.append(...imageList);

galleryListRef.addEventListener("click", onGalleryImageClick);

function onGalleryImageClick(event) {
  const clickedImageUrl = event.target.dataset.source;

  console.log(event.target);
}

function createGalleryItem(imageObject) {
  const listItemRef = document.createElement("li");
  const linkRef = document.createElement("a");
  const imgRef = document.createElement("img");

  listItemRef.classList.add("gallery__item");
  linkRef.classList.add("gallery__link");
  imgRef.classList.add("gallery__image");

  linkRef.setAttribute("href", imageObject.original);
  imgRef.setAttribute("src", imageObject.preview);
  imgRef.setAttribute("data-source", imageObject.original);
  imgRef.setAttribute("alt", imageObject.original.description);

  linkRef.appendChild(imgRef);
  listItemRef.appendChild(linkRef);

  return listItemRef;
}
