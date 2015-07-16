import calm from "calm-tools.js";
import skate from "skatejs";

import CalmTab from "els/calm-tab.js";
import CalmSelection from "els/calm-selection.js";

export default skate("calm-tabs", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				calm.ready(() => {
					this._selection.selected = name;
				});
			},
		},

		fixed: { attr: true },

		_indicator: {},
		_selection: {},
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

			:host([fixed]) ::content calm-tab { flex: 1; }

			#selection {
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
			}
		</style>

		<calm-selection tapselect id="selection">
			<content select="calm-tab"></content>
		</calm-selection>

		<div id="indicator"></div>
	`),

	created() {
		this._indicator = this.shadowRoot.getElementById("indicator");
		this._selection = this.shadowRoot.getElementById("selection");

		this._selection.addEventListener("select", (evt) => {
			calm.ready(() => {
				const { name, node } = evt.detail;

				this.selected = name;

				let selectedWidth, selectedLeft;
				if(this.offsetWidth > 0) {
					selectedWidth = node.offsetWidth;
					selectedLeft = node.offsetLeft;
				} else {
					let clone = this.cloneNode(true);
					clone.style.display = "block";
					clone.style.position = "absolute";
					clone.style.right = "100%";
					document.body.appendChild(clone);

					clone.selected = clone.selected;
					let cloneSelected = clone._selection.selectedNode;
					selectedWidth = cloneSelected.offsetWidth;
					selectedLeft = cloneSelected.offsetLeft;

					clone.remove();
				}

				this._indicator.style.width = `${selectedWidth}px`;
				this._indicator.style.transform = `translateX(${selectedLeft}px)`;

				calm.emit(this, "select", { detail: evt.detail });
			});
		});
	},
});
