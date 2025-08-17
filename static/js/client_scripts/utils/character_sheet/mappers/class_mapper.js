let class = null;
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function setClass(class_name) {
    class = class_name;
}

export function getClassName() {
    return class;
}

export function getClassData() {
    console.log("Implement this")
}