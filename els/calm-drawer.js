import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";

export default skate("calm-drawer", {
	properties: {
		nodim: {
			attr: true,
		},

		shown: {
			attr: true,
		},
	},

	prototype: {
		show() {
			this.shown = "";
		},

		hide() {
			this.shown = undefined;
		},

		toggle() {
			this.shown = (this.shown === "" ? undefined : "");
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				width: 320px;
			}

			#drawer {
				position: fixed;
				top: 0;
				right: 100%;
				z-index: 99;

				height: 100%;
				width: inherit;

				visibility: hidden;
				overflow: auto;
				border-radius: 0;

				transition-property: transform, visibility;
				transition-duration: ${calm.time.long};
				transition-timing-function: ${calm.ease.out};
			}

			#overlay {
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 98;

				opacity: 0;
				background: #000;
				visibility: hidden;

				transition-property: opacity, visibility;
				transition-duration: ${calm.time.long};
				transition-timing-function: ${calm.ease.out};
			}

			:host([shown]) #drawer {
				transform: translateX(100%);
				visibility: visible;
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}

			:host([nodim]) #overlay {
				background: transparent;
			}
		</style>

		<calm-card z="2" id="drawer">
			<content></content>
		</calm-card>

		<div id="overlay"></div>
	`),

	created() {
		this.shadowRoot.getElementById("overlay").addEventListener("click", () => this.hide());
	},
});
