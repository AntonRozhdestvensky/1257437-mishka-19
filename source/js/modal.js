var list = document.querySelectorAll(".good__order, .modal, .modal-overlay, .catalog__list");
var OrderLink = list.item(0);
var modal = list.item(list.length-2);
var overlay = list.item(list.length-1);
var href = document.location.pathname;

OrderLink.addEventListener("click", function(evt) {
  evt.preventDefault();
  if(href === "/catalog.html") {
    var pathList = evt.path;
    for (var j = 0; j < pathList.length; j++) {
      if (pathList[j].classList && pathList[j].classList.contains("catalog-item__add-to-cart")) {
        modal.classList.add("modal-show");
        overlay.classList.add("overlay-show");
      };
    };
  }
  else {
    modal.classList.add("modal-show");
    overlay.classList.add("overlay-show");
  };
});

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
