const socket = io({ query: { role: "host" } });
let current_div = null;

window.onload = function () {
    load_campaign_list();
};

function load_campaign_list() {
    socket.emit('get_campaigns');
}

function create_campaign() {
    const campaign_name = prompt("Campaign Name:");
    socket.emit('create_campaign', {campaign_name: campaign_name});
}

function create_campaign_success() {
    finish_selection();
}

function select_campaign() {
    const t = current_div.firstElementChild.textContent;
    socket.emit('selected_campaign', {campaign_name: t});
}

function delete_campaign() {
    const t = current_div.firstElementChild.textContent;
    socket.emit('delete_campaign', {name: t});
    current_div.remove();
}

function create_campaign_fail(e) {
    if (e == 'no_name') {
        const campaign_name = prompt("Campaign Must Have a Name. Enter Name:")
    } else if (e == 'existing_name') {
        const campaign_name = prompt("Campaign Name Already Exists. Enter Different Name:")
    }
    socket.emit('create_campaign', {campaign_name: campaign_name});

}

function finish_selection() {
    window.location.href='/host';
}


socket.on('create_campaign_success', function() {
create_campaign_success()
});

socket.on('return_campaigns', ({campaigns}) => {
const campaign_box = document.getElementById("campaign-box");
    campaigns.forEach((campaign) => {
        const list_item = document.createElement("div");
        list_item.classList.add("list-item");

        const p = document.createElement("p");
        p.classList.add('list-text');
        p.textContent = campaign;

        list_item.appendChild(p);
        campaign_box.appendChild(list_item);


        list_item.addEventListener("click", function() {
        const divs = document.querySelectorAll('.list-item');
        divs.forEach(d => d.style.backgroundColor = "white");
        list_item.style.backgroundColor = "lightgray";
        current_div = list_item;
    });

    });
});

socket.on('create_campaign_fail', ({error}) => {
    create_campaign_fail(error);
});

socket.on('continue_to_dashboard', function() {
    finish_selection();
});
