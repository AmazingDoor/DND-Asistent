

export function setSize(num) {
    const size_nums = document.querySelectorAll('.size-num');
    size_nums.forEach((size_num) => {
        size_num.textContent = num.toString();
    });

}

export function setSpeed(num) {
    const speed_nums = document.querySelectorAll('.speed-num');
    speed_nums.forEach((speed_num) => {
        speed_num.textContent = num.toString();
    });
}