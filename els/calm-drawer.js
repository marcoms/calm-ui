import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-drawer", {
	properties: {
		nodim: { attr: true },
		shown: { attr: true },
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
				width: 320px;
				display: block;
			}

			#drawer {
				position: fixed;
				top: 0;
				right: 100%;
				z-index: 99;

				height: 100%;
				width: inherit;

				visibility: hidden;
				background: #fff;
				box-shadow: ${calm.shadow[2]};
				overflow: auto;

				transition: transform ${calm.time.long} ${calm.ease.out}, visibility ${calm.time.long} linear;
				will-change: transform, visibility;
			}

			::content > calm-menu { width: 100%; }

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

				transition: opacity ${calm.time.long} ${calm.ease.out}, visibility ${calm.time.long} linear;
			}

			:host([shown]) #drawer {
				transform: translateX(100%);
				visibility: visible;
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}

			:host([nodim]) #overlay { background: transparent; }
		</style>

		<div id="drawer"><content></content></div>
		<div id="overlay"></div>
	`),

	created() {
		this.shadowRoot.getElementById("overlay").addEventListener("click", () => this.hide());
	},
});
