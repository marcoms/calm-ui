import calm from "calm-tools.js";
import skate from "skatejs";

import CalmTab from "els/calm-tab.js";

export default skate("calm-tabs", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				calm.ready(() => {
					let tabs = Array.from(this._tabs.getDistributedNodes());

					let targetTab, prevSelected;
					for(let tab of tabs) {
						if(targetTab && prevSelected) break;
						if(tab.name === name)  targetTab = tab;
						if(tab.selected === "") prevSelected = tab;
					}

					if(!targetTab) return;

					if(prevSelected) prevSelected.selected = undefined;
					targetTab.selected = "";

					this._indicator.style.width = `${targetTab.offsetWidth}px`;
					this._indicator.style.transform = `translate3d(${targetTab.offsetLeft}px, 0, 0)`;

					calm.emit(this, "select");
				});
			},
		},

		fixed: { attr: true },

		_indicator: {},
		_tabs: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				position: relative;

				display: block;
				height: 56px;

				overflow-x: auto;
				overflow-y: hidden;
			}

			:host([fixed]) #container { width: 100%; }
			:host([fixed]) ::content calm-tab { flex: 1; }

			#container {
				display: flex;
				flex-direction: row;
				height: 100%;
			}

			#indicator {
				position: absolute;
				bottom: 0;
				left: 0;

				height: 2px;

				background: currentColor;

				transition-property: transform, width;
				transition-duration: ${calm.time.med};
				transition-timing-function: ${calm.ease.out};
				will-change: transform, width;
			}
		</style>

		<div id="container"><content id="tabs" select="calm-tab"></content></div>
		<div id="indicator"></div>
	`),

	created() {
		this._indicator = this.shadowRoot.getElementById("indicator");
		this._tabs = this.shadowRoot.getElementById("tabs");

		this.shadowRoot.getElementById("container").addEventListener("click", (evt) => { this.selected = evt.target.name; });
	},
});
