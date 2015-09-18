import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";

export default skate("calm-drawer", {
	properties: {
		shown: {
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
				width: 320px;
				height: 100%;
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
				transition-duration: ${calm.durations.long};
				transition-timing-function: ${calm.easings.out};
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
				transition-duration: ${calm.durations.long};
				transition-timing-function: ${calm.easings.out};
			}

			:host([shown]) #drawer {
				transform: translateX(100%);
				visibility: visible;
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				#drawer {
					position: initial;

					visibility: visible;
				}

				#overlay {
					display: none;
				}

				:host([shown]) #drawer {
					transform: none;
				}
			}
		</style>

		<calm-card z="2" id="drawer">
			<content></content>
		</calm-card>

		<div id="overlay"></div>
	`),

	created() {{}
		this.$["overlay"].addEventListener("click", () => {
			this.hide();
		});

		const mq = window.matchMedia(`(min-width: ${calm.breakpoints.medium})`);
		this.wideLayout = mq.matches;
		mq.addListener((mq) => {
			this.wideLayout = mq.matches;
			if(this.wideLayout && this.shown) {
				this.shown = false;
			}
		});
	},
});
