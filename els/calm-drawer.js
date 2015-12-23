import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";

export default skate("calm-drawer", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
		}),

		right: skate.properties.boolean({
			attribute: true,
		}),

		wideLayout: skate.properties.boolean({
			attribute: false,
			set(el, {newValue: wideLayout}) {
				calm.emit(el, "layoutchange", {detail: {
					wideLayout,
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
	},

	render: calm.shadowDom(`
		<style>
			#drawer {
				position: fixed;
				top: 0;
				right: 100%;
				z-index: 99;

				height: 100%;
				width: 320px;

				visibility: hidden;
				overflow: auto;
				border-radius: 0;
				transform: translateX(0);

				transition-property: transform, visibility;
				transition-duration: ${calm.durations.long};
				transition-timing-function: ${calm.easings.out};
			}

			:host([shown]) #drawer {
				transform: translateX(100%);
				visibility: visible;
			}

			:host([right]) #drawer {
				left: 100%;
				right: auto;

				transition-timing-function: ${calm.easings.in};
			}

			:host([shown][right]) #drawer {
				transform: translateX(-100%);
				transition-timing-function: ${calm.easings.out};
			}

			::content calm-menu {
				font-family: roboto;
				font-weight: 500;
			}

			#scrim {
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
				transition-duration: ${calm.durations.long};
				transition-timing-function: linear;
			}

			:host([shown]) #scrim {
				opacity: 0.25;
				visibility: visible;
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				:host(:not([right])) #drawer {
					transform: translateX(100%);

					visibility: visible;
				}

				:host(:not([right])) #scrim {
					display: none;
				}
			}
		</style>

		<calm-card z="2" id="drawer">
			<content></content>
		</calm-card>

		<div id="scrim"></div>
	`),

	ready(el) {
		el.$["scrim"].addEventListener("click", () => {
			el.hide();
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
