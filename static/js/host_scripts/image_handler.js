let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function () {
    addEventListeners();
});


function load_image(imageUrl, char_id) {
    const tab = document.getElementById(`client-${char_id}`);
    add_image_to_host(imageUrl, tab);
}

export function add_image_to_host(imageUrl, tab) {
    const img_list = tab.querySelector("#img-list");
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Shared by DM";

    imageBox.appendChild(img);
    img_list.appendChild(imageBox);
}




function addEventListeners() {
    socket.on('load_image', data => {
        const imageUrl = data.url;
        const char_id = data.char_id;
        load_image(imageUrl, char_id);
    });
}