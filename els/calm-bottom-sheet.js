import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";

export default skate("calm-bottom-sheet", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
			set(el, diff) {
				if (el.shown) {
					el.$["card"].style.willChange = "transform";
				} else if (diff.oldValue) {
					el.$["card"].addEventListener("transitionend", el._removeHint);
				}
			},
		}),
	},

	prototype: {
		show() {
			this.shown = true;
		},

		hide() {
			this.shown = false;
		},

		toggle() {
			this.shown = !this.shown;
		},

		_removeHint() {
			this.$["card"].style.willChange = "";
			this.$["card"].removeEventListener("transitionend", this._removeHint);
		},
	},

	render: calm.shadowDom(`
		<style>
			:host {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 101;

				display: flex;
				justify-content: center;
				align-items: flex-end;

				width: 100%;
				height: 100%;

				background: transparent;
				visibility: hidden;

				cursor: pointer;
				-webkit-tap-highlight-color: transparent;
				transition-property: background, visibility;
				transition-duration: ${calm.durations.short};
				transition-timing-function: ${calm.easings.light.in};
			}

			:host([shown]) {
				background: rgba(0, 0, 0, 0.25);
				visibility: visible;

				transition-duration: ${calm.durations.medium};
				transition-timing-function: ${calm.easings.out};
			}

			#card {
				width: 100%;

				border-radius: 0;
				transform: translateY(100%);

				cursor: default;
				transition: transform ${calm.durations.short} ${calm.easings.light.in};
			}

			:host([shown]) #card {
				transform: none;

				transition-timing-function: ${calm.easings.out};
				transition-duration: ${calm.durations.medium};
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				#card {
					width: calc(${calm.sizes.increment} * 6);

					border-radius: ${calm.sizes.borderRadius} ${calm.sizes.borderRadius} 0 0;
				}
			}

			@media (min-width: ${calm.breakpoints.large}) {
				#card {
					width: calc(${calm.sizes.increment} * 8);
				}
			}
		</style>

		<calm-card z="2" id="card">
			<content></content>
		</calm-card>
	`),

	created(el) {
		el._removeHint = el._removeHint.bind(el);
	},

	ready(el) {
		el.addEventListener("click", (evt) => {
			el.hide();
		});

		el.$["card"].addEventListener("click", (evt) => {
			evt.stopPropagation();
		});
	},
});
