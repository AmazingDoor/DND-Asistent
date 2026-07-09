const overlay_content_pages = document.querySelector(".overlay-content-pages");
const overlay_background = document.querySelector(".overlay-background");

document.addEventListener("DOMContentLoaded", () => {
const tabs = document.querySelectorAll('.overlay-tab');
tabs.forEach((tab) => {
        AddOverlayTabClickListener(tab);
    });
});

function AddOverlayTabClickListener(tab) {
    tab.addEventListener("click", function () {
        if(overlay_content_pages.classList.contains("hidden")) {
            overlay_content_pages.classList.remove("hidden");
            overlay_background.classList.remove("hidden");
        } else {
            if (tab.classList.contains("selected-vertical-tab")) {
                overlay_content_pages.classList.add("hidden");
                overlay_background.classList.add("hidden");
                return;
            }
        }
        
        const id = tab.id;

        const tbs = document.querySelectorAll('.overlay-tab');
        tbs.forEach((tab) => {
            tab.classList.remove('selected-vertical-tab');
        });

        document.querySelector('#' + id).classList.add('selected-vertical-tab');
    
        const pages = document.querySelectorAll(".overlay-content-page");
        pages.forEach((page) => {
            page.classList.add('hidden');
        });

        const page_id = id.replace("-tab", "-page");
        console.log(page_id);
        document.querySelector("#" + page_id).classList.remove('hidden');
    });
}