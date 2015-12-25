import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-selection";
import "./calm-tab";

export default skate("calm-tabs", {
	properties: {
		selected: skate.properties.string({
			attribute: true,
			set(el) {
				if (!el.selected) return;

				if (el.selected !== el.$["selection"].selected) {
					el.$["selection"].selected = el.selected;
				}
			},
		}),

		fixed: skate.properties.boolean({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				position: relative;

				display: block;
				height: ${calm.sizes.touchTarget};

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

				width: 100px;
				height: 2px;

				background: currentColor;

				transform-origin: left;
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

	prototype: {
		_positionIndicator() {
			if (!this.selected) return;

			const node = this.$["selection"].selectedNode;
			if (!node) return;

			let width;
			let left;

			if (this.offsetWidth === 0) {
				// store positional info to know where to put the element back
				const parent = this.parentNode;
				const nextSibling = this.nextSibling;

				// put the element inside body to determine the size of the selected tab (hope no-one notices)

				const prevDisplay = this.style.display;
				this.style.display = "block";
				document.body.appendChild(this);
				({offsetWidth: width, offsetLeft: left} = node);
				this.style.display = prevDisplay;

				if (nextSibling) {
					parent.insertBefore(this, nextSibling);
				} else {
					parent.appendChild(this);
				}
			} else {
				({offsetWidth: width, offsetLeft: left} = node);
			}

			// uses a larger base width for accuracy when scaling
			this.$["indicator"].style.transform = `translateX(${left}px) scaleX(${width / 100})`;
		},
	},

	ready(el) {
		el.$["selection"].addEventListener("select", (evt) => {
			const {selected} = evt.detail;

			el.selected = selected;
			el._positionIndicator();

			calm.emit(el, "select", {detail: evt.detail});
		});
	},
});
