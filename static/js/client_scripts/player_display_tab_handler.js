document.addEventListener("DOMContentLoaded", function() {
    const tablinks = document.querySelectorAll('.player-display-tablink');
    tablinks.forEach((link) => {
        link.addEventListener('click', function() {select_tab(link.id)});
    });
});

const playerStatsDisplayTabs = document.querySelectorAll(".player-stats-display-tabs")[0];
const playerStatsDisplayPages = document.querySelectorAll(".player-stats-display-pages")[0];
const playerStatContainer = document.querySelectorAll(".player-stats-container")[0];

export function select_tab(tab_id) {
    const selectedTab = playerStatsDisplayTabs.querySelectorAll(".selected-tab")[0];

    if(!playerStatsDisplayPages.classList.contains("mobile-hidden")) {
        if(String(selectedTab.id) == String(tab_id)) {
            playerStatsDisplayPages.classList.add("mobile-hidden");
            playerStatContainer.classList.remove('combat-overlay-open')
            return;
        }
    } else {
        playerStatsDisplayPages.classList.remove("mobile-hidden");
        playerStatContainer.classList.add('combat-overlay-open');
    }


    
    const tablinks = document.querySelectorAll('.player-display-tablink');
    const selected_tab = document.querySelector('#' + tab_id);
    const display_page = document.querySelector('#' + tab_id.replace('tab', 'container'));
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