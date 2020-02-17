(function () {
  let template = document.createElement("template");
  template.innerHTML = `<p id = "customWidgetText"></p>`;
  
  class Demo extends HTMLElement {
    constructor () {
      super();
      let shadowHost = this.attachShadow({mode : "open"});
      shadowHost.appendChild(template.content.cloneNode(true));
      this.addEventListener("click", event => {
        var event = new Event("onClick");
        this.dispatchEvent(event);
      });
      var this._textElement = document.getElementByID("customWidgetText");
      this._props = {};
    }
    
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {...this._props, ...changedProperties};
    }
    
    onCustomWidgetAfterUpdate(changedProperties) {
      if ("text" in changedProperties) {
        this._textElement.innerHTML = changedProperties["text"];
      }
    }
    
    set text(newText) {
      this._textElement.innerHTML = newText;
    }
    
    get text() {
      return this._textElement.innerHTML;
    }
  }
  customElements.define(com-jp-demo, Demo);
})();
