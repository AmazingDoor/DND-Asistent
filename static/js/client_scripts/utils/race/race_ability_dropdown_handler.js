
export function addEventListeners(head, updateModifiers) {
    const options = [...head.querySelector('.ability-options').children];
    options.forEach((option) => {
        option.addEventListener("click", function() {clickListener(head, option, updateModifiers);});
    });
}

function clickListener(head, option, updateModifiers) {
    head.querySelector('p').textContent = option.textContent;
    updateModifiers();
}