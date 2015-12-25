import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";

export default skate("calm-bottom-sheet", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
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
	},

	render: calm.shadowDom(`
		<style>
			#fixture {
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

			:host([shown]) #fixture {
				background: rgba(0, 0, 0, 0.25);
				visibility: visible;

				transition-duration: ${calm.durations.medium};
				transition-timing-function: ${calm.easings.out};
			}

			#content {
				width: 100%;

				border-radius: 0;
				transform: translateY(100%);

				cursor: default;
				transition: transform ${calm.durations.short} ${calm.easings.light.in};
			}

			:host([shown]) #content {
				transform: none;

				transition-timing-function: ${calm.easings.out};
				transition-duration: ${calm.durations.medium};
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				#content {
					width: calc(${calm.sizes.increment} * 6);

					border-radius: ${calm.sizes.borderRadius} ${calm.sizes.borderRadius} 0 0;
				}
			}

			@media (min-width: ${calm.breakpoints.large}) {
				#content {
					width: calc(${calm.sizes.increment} * 8);
				}
			}
		</style>

		<div id="fixture">
			<calm-card z="2" id="content">
				<content></content>
			</calm-card>
		</div>
	`),

	ready(el) {
		el.$["fixture"].addEventListener("click", (evt) => {
			el.hide();
		});

		el.$["content"].addEventListener("click", (evt) => {
			evt.stopPropagation();
		});
	},
});
