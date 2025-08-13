document.addEventListener("DOMContentLoaded", function() {
    const tablinks = document.querySelectorAll('.player-display-tablink');
    tablinks.forEach((link) => {
        link.addEventListener('click', function() {select_tab(link.id)});
    });
});

export function select_tab(tab_id) {
    const selected_tab = document.querySelector('#' + tab_id);
    const display_page = document.querySelector('#' + tab_id.replace('tab', 'container'));
    const tablinks = document.querySelectorAll('.player-display-tablink');
    const display_pages = document.querySelectorAll('.player-stats-display-page');

    resetAll(tablinks, display_pages);

    selected_tab.classList.add('selected-tab');
    display_page.classList.remove('hidden');
}

function resetAll(tablinks, display_pages) {
    tablinks.forEach((tablink) => {
        tablink.classList.remove('selected-tab');
    });

    display_pages.forEach((display_page) => {
        display_page.classList.add('hidden');
    });
}