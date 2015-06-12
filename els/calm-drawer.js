import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-drawer", {
	attributes: {
		nodim: {},
		shown: {},
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
			:host([shown]) #drawer {
				transform: translateX(100%);
				visibility: visible;
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}

			:host {
				height: 100%;
				width: 320px;
				display: block;
			}

			#drawer {
				position: fixed;
				top: 0;
				right: 100%;
				z-index: 99;

				height: inherit;
				width: inherit;

				transform: none;
				visibility: hidden;
				background: #fff;
				box-shadow: ${calm.shadow[2]};

				transition: transform ${calm.time.long} ${calm.ease.out}, visibility ${calm.time.long} linear;
				will-change: transform, visibility;
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

				transition: opacity ${calm.time.long} ${calm.ease.out}, visibility ${calm.time.long} linear;
			}

			:host([nodim]) #overlay {
				background: transparent;
			}
		</style>

		<div id="drawer"><content></content></div>
		<div id="overlay"></div>
	`),

	created(el) {
		el.shadowRoot.querySelector("#overlay").addEventListener("click", () => el.hide());
	},
});

skate("data-drawer-hide", {
	type: skate.type.ATTRIBUTE,
	created(el) {
		let parent = el.parentElement;
		let drawerParent;
		while(parent) {
			if(parent.tagName === "CALM-DRAWER") {
				drawerParent = parent;
				break;
			}

			parent = parent.parentElement;
		}

		el.addEventListener("click", () => { if(drawerParent) drawerParent.hide(); });
	}
})
