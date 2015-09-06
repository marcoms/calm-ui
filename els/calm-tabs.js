import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-tab.js";
import "els/calm-selection.js";

export default skate("calm-tabs", {
	properties: {
		selected: {
			attr: true,
			type: calm.propType(String),
			set(name) {
				if(name !== this.$["selection"].selected) this.$["selection"].selected = name;
			},
		},

		fixed: {
			attr: true,
			type: Boolean,
		},
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
				transition-duration: ${calm.durations.medium};
				transition-timing-function: ${calm.easings.out};
			}
		</style>

		<calm-selection tapselect id="selection">
			<content select="calm-tab"></content>
		</calm-selection>

		<div id="indicator"></div>
	`),

	created() {
		this.$["selection"].addEventListener("select", (evt) => {
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

			const node = this.$["selection"].selectedNode;

			let width, left;

			if(this.offsetWidth === 0) {
				// store positional info to know where to put the element back
				const parent = this.parentNode;
				const nextSibling = this.nextSibling;

				// put the element inside body to determine the size of the selected tab (hope no-one notices)

				const prevDisplay = this.style.display;
				this.style.display = "block";
				document.body.appendChild(this);
				({ offsetWidth: width, offsetLeft: left } = node);
				this.style.display = prevDisplay;

				if(nextSibling) {
					parent.insertBefore(this, nextSibling);
				} else {
					parent.appendChild(this);
				}
			} else {
				({ offsetWidth: width, offsetLeft: left } = node);
			}

			this.$["indicator"].style.width = `${width}px`;
			this.$["indicator"].style.transform = `translateX(${left}px)`;
		},
	},
});
