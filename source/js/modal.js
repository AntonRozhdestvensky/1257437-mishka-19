var list = document.querySelectorAll(".good__order, .modal, .modal-overlay");
var OrderLink = list.item(0);
var modal = list.item(list.length-2);
var overlay = list.item(list.length-1);
var addToCart = document.querySelectorAll(".catalog-item__add-to-cart");
var href = document.location.pathname;

if (href === "/catalog.html") {
  for (var i = 0; i < addToCart.length; i++) {
    addToCart.item(i).addEventListener("click", function(evt) {
      evt.preventDefault();
      modal.classList.add("modal-show");
      overlay.classList.add("overlay-show");
    });
  }
} else {
  OrderLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.add("modal-show");
    overlay.classList.add("overlay-show");
  });
};

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal-show")) {
      modal.classList.remove("modal-show");
    }
    if (overlay.classList.contains("overlay-show")) {
      overlay.classList.remove("overlay-show");
    }
  }
});
