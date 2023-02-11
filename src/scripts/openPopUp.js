
const popUp = document.querySelector(".popup-window");
const closeBtn = document.querySelector("#bee_header_main_2");

closeBtn.onclick = function() {
    popUp.className = "popup-window-opened";
}