
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tablinks');
    tabs.forEach((tab) => {
        addClickListener(tab);
    });

    const spell_casting_tabs = document.querySelectorAll(".spell-casting-tab");
    spell_casting_tabs.forEach((tab) => {
        addSpellCastingTabListener(tab);
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

function addSpellCastingTabListener(tab) {
    tab.addEventListener("click", function () {
        const id = tab.id;

        const tbs = document.querySelectorAll(".spell-casting-tab");
        tbs.forEach(tab => {
            tab.classList.remove('selected-tab');
        });

        document.querySelector('#' + id).classList.add('selected-tab');

        const pages = document.querySelectorAll(".spell-casting-page");
        pages.forEach((page) => {
            page.classList.add("hidden");
        });
        const selected_id = id.replace("-tab", "-page");
        document.getElementById(selected_id).classList.remove("hidden");
    });
}