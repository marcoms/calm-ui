import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-drawer", {
	created(el) {
		calm.init(el, `
			<style>
				:host(.drawer-open) #drawer {
					transform: none;
					visibility: visible;
				}

				:host(.drawer-open) #overlay {
					opacity: 0.4;
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
					left: 0;
					z-index: 99;

					height: inherit;
					width: inherit;

					transform: translateX(-100%);
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

				:host(.drawer-no-dim) #overlay {
					background: transparent;
				}
			</style>

			<div id="drawer"><content></content></div>
			<div id="overlay"></div>
		`);

		el.shadowRoot.querySelector("#overlay").addEventListener("click", () => {
			el.close();
		});
	},

	prototype: {
		open() {
			this.classList.add("drawer-open");
		},

		close() {
			this.classList.remove("drawer-open");
		},

		toggle() {
			this.classList.toggle("drawer-open");
		}
	}
});
