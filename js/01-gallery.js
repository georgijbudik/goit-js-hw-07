import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");
galleryList.innerHTML = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

galleryList.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") return;

  const { source, alt } = target.dataset;

  const originalImageEl = basicLightbox.create(`
    <img src="${source}" alt="${alt}" />
  `);

  originalImageEl.show();

  window.addEventListener("keydown", onEscPress);

  function closeModal() {
    originalImageEl.close();
    window.removeEventListener("keydown", onEscPress);
  }

  function onEscPress(event) {
    if (event.code === "Escape") {
      closeModal();
    }
  }
}
