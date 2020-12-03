import galleryItems from "./gallery-items.js";

const galleryListRef = document.querySelector(".js-gallery");
const modalImageRef = document.querySelector(".lightbox__image");
const lightboxRef = document.querySelector("div.lightbox");
const modalBtnClose = document.querySelector(
  "button[data-action='close-lightbox']"
);
const clickOnLightboxOverlayRef = document.querySelector(".lightbox__overlay");

let ind = 0;
let activeIndex = 0;
const imageList = galleryItems.map((item) => createGalleryItem(item));

galleryListRef.append(...imageList);

galleryListRef.addEventListener("click", onModalOpen);
modalBtnClose.addEventListener("click", onModalClose);
clickOnLightboxOverlayRef.addEventListener("click", onModalClose);

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
  imgRef.setAttribute("alt", imageObject.description);
  imgRef.setAttribute("data-index", ind++);

  linkRef.appendChild(imgRef);
  listItemRef.appendChild(linkRef);

  return listItemRef;
}

function onModalOpen(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  lightboxRef.classList.add("is-open");
  modalImageRef.setAttribute("src", event.target.dataset.source);
  activeIndex = Number(event.target.dataset.index);

  window.addEventListener("keydown", onKeyPressed);
}

function onModalClose() {
  lightboxRef.classList.remove("is-open");
  modalImageRef.src = "";

  window.removeEventListener("keydown", onKeyPressed);
}

function onKeyPressed(event) {
  if (event.code === "Escape") {
    onModalClose();
  }

  if (event.code === "ArrowRight") {
    if (activeIndex < galleryItems.length - 1) {
      const nextImage = galleryItems[activeIndex + 1];
      modalImageRef.src = nextImage.original;
      activeIndex += 1;
    }
  }

  if (event.code === "ArrowLeft") {
    if (activeIndex >= 1) {
      const previousImage = galleryItems[activeIndex - 1];
      modalImageRef.src = previousImage.original;
      activeIndex -= 1;
    }
  }
}
