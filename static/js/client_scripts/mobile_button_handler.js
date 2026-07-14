const left_page_button = document.getElementById("left-page-button");
const rigth_page_button = document.getElementById("right-page-button");
const mobile_chat_button = document.getElementById("mobile-chat-button");
const mobile_images_button = document.getElementById("mobile-images-button");
const mobile_main_pages = document.querySelectorAll(".mobile-page");

const mobile_background_overlay = document.getElementsByClassName("overlay-background")[0];
const mobile_overlay_pages = document.getElementsByClassName("overlay-content-pages")[0];
const mobile_overlay_container = document.getElementsByClassName("overlay-container")[0];
const dm_chat_page = document.getElementById("dm-chat-page");
const images_page = document.getElementById("images-page");

let current_page_index = 1;

document.addEventListener("DOMContentLoaded", () => {
    left_page_button.addEventListener('click', displayPreviousPage)
    rigth_page_button.addEventListener('click', displayNextPage)
    mobile_chat_button.addEventListener('click', toggleChat)
    mobile_images_button.addEventListener('click', toggleImages)
});

function displayPreviousPage() {
    current_page_index = current_page_index - 1;
    if(current_page_index < 0) {
        current_page_index = mobile_main_pages.length - 1;
    }
    displayPageAtCurrentIndex();
}

function displayNextPage() {
    current_page_index = current_page_index + 1;
    if(current_page_index == mobile_main_pages.length) {
        current_page_index = 0;
    }
    displayPageAtCurrentIndex();
}

function displayPageAtCurrentIndex() {
    mobile_main_pages.forEach(page => {
        page.classList.add("mobile-hidden");
    });

    mobile_main_pages[current_page_index].classList.remove("mobile-hidden");
}

function toggleChat() {
    if(mobile_background_overlay.classList.contains("hidden")) {
        displayOverlay();
        if (dm_chat_page.classList.contains("hidden")) {
            dm_chat_page.classList.remove("hidden");
            images_page.classList.add("hidden");
        }
    } else {

        if(dm_chat_page.classList.contains("hidden")) {
            dm_chat_page.classList.remove("hidden");
            images_page.classList.add("hidden");
        } else {
            hideOverlay();
        }
    }

}

function toggleImages() {
    if (mobile_background_overlay.classList.contains("hidden")) {
        displayOverlay();
        if (images_page.classList.contains("hidden")) {
            dm_chat_page.classList.add("hidden");
            images_page.classList.remove("hidden");
        }
    } else {

        if (images_page.classList.contains("hidden")) {
            dm_chat_page.classList.add("hidden");
            images_page.classList.remove("hidden");
        } else {
            hideOverlay();
        }
    }
}

function displayOverlay() {
    mobile_background_overlay.classList.remove("hidden");
    mobile_overlay_pages.classList.remove("hidden");
    mobile_overlay_container.classList.remove("mobile-hidden");
}

function hideOverlay() {
    mobile_background_overlay.classList.add("hidden");
    mobile_overlay_pages.classList.add("hidden");
    mobile_overlay_container.classList.add("mobile-hidden");
}