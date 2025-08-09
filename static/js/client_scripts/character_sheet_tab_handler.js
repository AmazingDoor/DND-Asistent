import './class_stats_handler.js';
import './ability_handler.js';

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tablinks');
    tabs.forEach((tab) => {
        addClickListener(tab);
    });
});

function addClickListener(tab) {
    tab.addEventListener("click", function () {
        const id = tab.id;

        const tbs = document.querySelectorAll('.tablinks');
        tbs.forEach((tab) => {
            tab.classList.remove('selected-tab');
        });

        document.querySelector('#' + id).classList.add('selected-tab');

        const tabs = document.querySelectorAll(".character-sheet-tab-contents");
        tabs.forEach((tab) => {
            tab.classList.add('hidden');
        });

        const content_id = id + "-tab-contents";
        document.querySelector("#" + content_id).classList.remove('hidden');
    });
}