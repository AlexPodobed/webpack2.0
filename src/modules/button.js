const Button = {
    node: document.createElement('button'),
    text: "press me",
    attachClickEvent(){
        this.node.addEventListener('click', () => console.log('clicked') )
    },
    init(text = this.text){
        this.node.className ="btn btn-default";
        this.node.innerHTML = text;
        this.attachClickEvent();
        return this.node;
    }
};

export default Button;