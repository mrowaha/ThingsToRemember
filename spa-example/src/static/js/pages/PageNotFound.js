import View from './view'

export default class extends View {
    constructor(){
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <div class="text">
                <h1>404! Page Not Found</h1>
            </div>
        `
    }
}