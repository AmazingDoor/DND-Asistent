export class CloseableOverlay {
    constructor(onClose = null) {

        this.onClose = onClose;

        this.main_div = document.createElement('div');
        this.main_div.style.position = 'absolute';
        this.main_div.style.left = '0';
        this.main_div.style.top = '0';
        this.main_div.style.width = '100%';
        this.main_div.style.height = '100%';
        this.main_div.style.backgroundColor = 'orange';
        document.body.appendChild(this.main_div);

        let close_button_container = document.createElement('div');
        this.main_div.appendChild(close_button_container);

        let close_button = document.createElement('button');
        close_button.textContent = "X";
        close_button.addEventListener("click", () => {this.closeOverlay()});
        close_button_container.appendChild(close_button);

        this.body = document.createElement('div');
        this.main_div.appendChild(this.body);
    }

    getBody() {
        return this.body;
    }

    closeOverlay() {
        this.main_div.remove();
        this.onClose?.();
    }
}