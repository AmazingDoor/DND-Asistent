let focus = 0;

export function setFocus(n) {
    focus = n;
}

export function incrementFocus() {
    focus = focus + 1;
}

export function decrementFocus() {
    focus = focus - 1;
}

export function getFocus() {
    return focus;
}