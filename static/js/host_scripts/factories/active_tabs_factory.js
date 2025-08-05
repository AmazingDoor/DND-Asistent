let affected_tabs = [];

export function setAffectedTabs(tabs) {
    affected_tabs = tabs;
}

export function getAffectedTabs() {
    return affected_tabs;
}

export function spliceAffectedTabs(index) {
    affected_tabs.splice(index, 1);
}

export function addAffectedTab(t) {
    affected_tabs.push(t);
}