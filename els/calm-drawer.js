import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";

export default skate("calm-drawer", {
	properties: {
		shown: {
			attr: true,
			type: Boolean,
		},

		bottom: {
			attr: true,
			type: Boolean,
		},

		right: {
			attr: true,
			type: Boolean,
		},

		wideLayout: {
			type: Boolean,
			set(value) {
				calm.emit(this, "layoutchange", { detail: {
					wideLayout: value,
				}});
			}
		},
	},

	prototype: {
		show() {
			if(!this.wideLayout) this.shown = true;
		},

		hide() {
			if(!this.wideLayout) this.shown = false;
		},

		toggle() {
			if(!this.wideLayout) this.shown = !this.shown;
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				height: 100%;
			}

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

			:host([bottom]) #drawer {
				top: 100%;
				right: auto;

				width: 100%;
				height: auto;

				transition-timing-function: ${calm.easings.in};
			}

			:host([shown][bottom]) #drawer {
				transform: translateY(-100%);
				transition-timing-function: ${calm.easings.out};
			}

			:host([bottom]) ::content header {
				margin: 16px 0 8px 16px;
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
				:host(:not([right]):not([bottom])) #drawer {
					position: initial;

					visibility: visible;
				}

				:host(:not([right]):not([bottom])) #scrim {
					display: none;
				}

				:host(:not([right]):not([bottom])[shown]) #drawer {
					transform: none;
				}

				:host([bottom]) #drawer {
					left: 0;
					right: 0;

					width: calc(${calm.increment} * 6);
					margin: 0 auto;

					border-radius: ${calm.borderRadius};
				}
			}

			@media (min-width: ${calm.breakpoints.large}) {
				:host([bottom]) #drawer {
					width: calc(${calm.increment} * 8);
				}
			}
		</style>

		<calm-card z="2" id="drawer">
			<content></content>
		</calm-card>

		<div id="scrim"></div>
	`),

	created() {{}
		this.$["scrim"].addEventListener("click", () => {
			this.hide();
		});

		const mq = window.matchMedia(`(min-width: ${calm.breakpoints.medium})`);
		this.wideLayout = mq.matches && !this.right && !this.bottom;
		mq.addListener((mq) => {
			this.wideLayout = mq.matches && !this.right && !this.bottom;
			if(this.wideLayout && this.shown) {
				this.shown = false;
			}
		});
	},
});
