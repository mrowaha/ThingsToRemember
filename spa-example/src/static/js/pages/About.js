import View from './view'

export default class extends View {
    constructor(){
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <div class="text">
                <h1>What we do at Meowie</h1>
                <p>
                    Meowies lets you upload pictures of your cats so that you never lose them. 
                </p>
            </div>

            <div>
            <img src="/res/catshome.jpg" alt="cat in ribbons" class="img">
            </div>    
        `
    }
}