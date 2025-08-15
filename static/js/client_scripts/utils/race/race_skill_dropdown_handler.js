
export function addEventListeners(head, updateSkills) {
    const options = [...head.querySelector('.skill-options').children];
    options.forEach((option) => {
        option.addEventListener("click", function() {clickListener(head, option, updateSkills);});
    });
}

function clickListener(head, option, updateSkills) {
    head.querySelector('p').textContent = option.textContent;
    updateSkills();
}