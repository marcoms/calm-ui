import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-toast", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
			set(el, diff) {
				if (el.shown) {
					el.$["toast"].style.willChange = "transform";

					el._pendingHide = window.setTimeout(() => {
						el.hide();
					}, el.duration);
				} else {
					if (diff.oldValue) {
						el.$["toast"].addEventListener("transitionend", el._removeHint);
					}

					window.clearTimeout(el._pendingHide);
					el._pendingHide = undefined;
				}
			},
		}),

		duration: skate.properties.number({
			attribute: true,
			default: 3200,
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
			this.$["toast"].style.willChange = "";
			this.$["toast"].removeEventListener("transitionend", this._removeHint);
		},
	},

	render: calm.shadowDom(`
		<style>
			:host {
				position: fixed;
				bottom: 0;
				left: 0;
				z-index: 99;

				display: flex;
				flex-direction: row;
				width: 100%;
				height: 0;

				align-items: flex-end;
				justify-content: center;
				overflow: visible;
			}

			#toast {
				display: flex;
				flex-direction: row-reverse;
				align-items: stretch;
				box-sizing: border-box;
				width: 100%;
				min-height: calc((14px * 2) + 1em);

				color: #fff;
				background: #323232;

				transform: translateY(100%);
				transition: transform ${calm.durations.short} ${calm.easings.light.in};
				touch-action: none;
			}

			:host([shown]) #toast {
				transform: none;
				transition-duration: ${calm.durations.medium};
				transition-timing-function: ${calm.easings.out};
			}

			#text {
				padding: 14px 24px;

				-webkit-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				-ms-user-select: none;
			}

			#buttons {
				display: flex;
				align-items: stretch;
			}

			::content calm-button {
				border-radius: 0;
			}

			#spacer {
				flex: 1;
			}

			@media (min-width: ${calm.breakpoints.small}) {
				:host {
					justify-content: center;
				}

				#toast {
					width: auto;
					min-width: 280px;
					max-width: 640px;

					border-radius: ${calm.sizes.borderRadius} ${calm.sizes.borderRadius} 0 0;
				}
			}
		</style>

		<div id="toast">
			<div id="buttons"><content select="calm-button"></content></div>
			<div id="spacer"></div>
			<div id="text"><content></content></div>
		</div>
	`),

	created(el) {
		el._removeHint = el._removeHint.bind(el);
	},

	ready(el) {
		el.addEventListener("click", (evt) => {
			if (evt.target.tagName === "CALM-BUTTON") el.hide();
		});
	},
});
