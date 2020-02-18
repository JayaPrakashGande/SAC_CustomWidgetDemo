(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 1px;
			border-color: black;
			border-style: solid;
            display: block;
            text-align : center;
		} 
        </style> 
        <p id="customElement">Default Text.</p>
	`;
    
	class Demo extends HTMLElement {
        constructor() {
            console.log("--------in Constructor----------");
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
            this._pElement = this.shadowRoot.getElementById("customElement");
            this._props = {};
        }
        
        connectedCallback() {
            console.log("--------in connectedCallback----------");
        }
        
        disconnectedCallback() {
            console.log("--------in disconnectedCallback----------");
        }
        
        onCustomWidgetDestroy() {
            console.log("--------in Destroy----------");
        }
    
		onCustomWidgetBeforeUpdate(changedProperties) {
            console.log("--------in onCustomWidgetBeforeUpdate----------");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
            console.log("--------in onCustomWidgetAfterUpdate----------");
			if ("text" in changedProperties) {
                this._pElement.innerHTML = changedProperties["text"];
              }
        }
        
        onCustomWidgetResize(x, y) {
            console.log("--------in Resize----------" + x + "------" + y);
        }
	}
    
    console.log("--------just Before Registring the WC----------");
	customElements.define("com-jp-demo", Demo);
})();
