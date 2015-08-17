import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-tab.js";
import "els/calm-selection.js";

export default skate("calm-tabs", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				this._selection.selected = name;
			},
		},

		fixed: {
			attr: true,
		},

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

			:host([fixed]) ::content calm-tab {
				flex: 1;
			}

			#selection {
				display: flex;
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
	},

	attached() {
		this._selection.addEventListener("select", (evt) => {
			const { name } = evt.detail;

			this.selected = name;
			this._positionIndicator();

			calm.emit(this, "select", { detail: evt.detail });
		});

		this._positionIndicator();
	},

	prototype: {
		_positionIndicator() {
			if(this.selected === undefined) return;

			const node = this._selection.selectedNode;

			let width, left;
			if(this.offsetWidth > 0) {
				({ offsetWidth: width, offsetLeft: left } = node);
			} else {
				let clone = this.cloneNode(true);
				clone.style.position = "fixed";
				clone.style.right = "100%";
				clone.style.display = "block";
				document.body.appendChild(clone);

				let cloneSelected = clone._selection.selectedNode;
				({ offsetWidth: width, offsetLeft: left } = cloneSelected);

				clone.remove();
			}

			this._indicator.style.width = `${width}px`;
			this._indicator.style.transform = `translateX(${left}px)`;
		},
	},
});
