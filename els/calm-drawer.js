import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";

export default skate("calm-drawer", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
			set(el, diff) {
				if (el.shown) {
					el.$["drawer"].style.willChange = "transform";
				} else if (diff.oldValue) {
					el.$["drawer"].addEventListener("transitionend", el._removeHint);
				}
			},
		}),

		right: skate.properties.boolean({
			attribute: true,
		}),

		wideLayout: skate.properties.boolean({
			attribute: false,
			set(el) {
				calm.emit(el, "layoutchange", {detail: {
					wideLayout: el.wideLayout,
				}});
			},
		}),
	},

	prototype: {
		show() {
			if (!this.wideLayout) this.shown = true;
		},

		hide() {
			if (!this.wideLayout) this.shown = false;
		},

		toggle() {
			if (!this.wideLayout) this.shown = !this.shown;
		},

		_removeHint() {
			this.$["drawer"].style.willChange = "";
			this.$["drawer"].removeEventListener("transitionend", this._removeHint);
		},
	},

	render: calm.shadowDom(`
		<style>
			:host {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 99;

				display: flex;
				justify-content: flex-start;
				align-items: stretch;
				width: 100%;
				height: 100%;

				background: transparent;
				visibility: hidden;
				cursor: pointer;

				transition-property: background, visibility;
				transition-duration: ${calm.durations.long};
				transition-timing-function: ${calm.easings.out};

				-webkit-tap-highlight-color: transparent;
			}

			:host([right]) {
				justify-content: flex-end;
			}

			:host([shown]) {
				background: rgba(0, 0, 0, 0.25);
				visibility: visible;
			}

			#drawer {
				width: 320px;

				overflow: auto;
				border-radius: 0;
				transform: translateX(-100%);
				cursor: auto;

				transition-property: transform;
				transition-duration: ${calm.durations.long};
				transition-timing-function: ${calm.easings.out};
			}

			:host([right]) #drawer {
				transform: translateX(100%);
			}

			:host([shown]) #drawer {
				transform: translateX(0);
			}

			::content calm-menu {
				font-family: roboto;
				font-weight: 500;
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				:host(:not([right])) {
					visibility: visible;

					pointer-events: none;
				}

				:host(:not([right])) #drawer {
					transform: translateX(0);

					pointer-events: auto;
				}
			}
		</style>

		<calm-card z="2" id="drawer">
			<content></content>
		</calm-card>
	`),

	created(el) {
		el._removeHint = el._removeHint.bind(el);
	},

	ready(el) {
		el.addEventListener("click", () => {
			el.hide();
		});

		el.$["drawer"].addEventListener("click", (evt) => {
			evt.stopPropagation();
		});

		const mq = window.matchMedia(`(min-width: ${calm.breakpoints.medium})`);
		el.wideLayout = mq.matches && !el.right;
		mq.addListener(() => {
			el.wideLayout = mq.matches && !el.right;
			if (el.wideLayout && el.shown) {
				el.shown = false;
			}
		});
	},
});
