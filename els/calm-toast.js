import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-toast", {
	properties: {
		shown: {
			attr: true,
			type: Boolean,
		},

		duration: {
			attr: true,
			type: calm.propType(Number),
			init: 3200,
		},

		_pendingHide: {},
	},

	prototype: {
		show() {
			this.shown = true;
			this._setPendingHide();
		},

		hide() {
			this.shown = undefined;
			this._clearPendingHide();
		},

		toggle() {
			(this.shown ? this.hide() : this.show());
		},

		_setPendingHide() {
			this._pendingHide = window.setTimeout(() => {
				this.hide();
			}, this.duration);
		},

		_clearPendingHide() {
			window.clearTimeout(this._pendingHide);
			this._pendingHide = undefined;
		},
	},

	template: calm.shadowDom(`
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
				transition: transform ${calm.durations.medium} ${calm.easings.out};
				touch-action: none;
			}

			#text {
				padding: 14px 24px;
			}

			#btns {
				display: flex;
				align-items: stretch;
			}

			::content calm-btn {
				border-radius: 0;
				color: #4dd0e1;
			}

			@media (min-width: ${calm.breakpoints.small}) {
				:host {
					justify-content: center;
				}

				#toast {
					width: auto;
					min-width: 280px;
					max-width: 640px;

					border-radius: ${calm.borderRadius} ${calm.borderRadius} 0 0;
				}
			}

			#spacer {
				flex: 1;
			}

			:host([shown]) #toast {
				transform: none;
			}
		</style>

		<div id="toast">
		` /* layout is reversed since an empty <content> will include <calm-btn> before anything afterwards */ + `
			<div id="btns"><content select="calm-btn"></content></div>
			<div id="spacer"></div>
			<div id="text"><content></content></div>
		</div>
	`),

	created() {
		this.addEventListener("click", (evt) => {
			if(evt.target.tagName === "CALM-BTN") this.hide();
		});
	},
});
