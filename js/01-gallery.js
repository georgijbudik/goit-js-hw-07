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

  const originalImageEl = basicLightbox.create(
    `
    <img src="${source}" alt="${alt}" />
  `,
    {
      onShow: (originalImageEl) =>
        window.addEventListener("keydown", onEscPress),
      onClose: (originalImageEl) =>
        window.removeEventListener("keydown", onEscPress),
    }
  );

  originalImageEl.show();

  function closeModal() {
    originalImageEl.close();
  }

  function onEscPress(event) {
    if (event.code === "Escape") {
      closeModal();
    }
  }
}
