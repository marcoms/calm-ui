import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-progress", {
	properties: {
		value: {
			attr: true,
			set(value) {
				if(this.indeterminate === "") return;

				value = Number.parseFloat(value, 10);
				let max = Number.parseFloat(this.max, 10);
				if(value < 0 || value > max) return;

				this._progress.style.width = `${(value / max) * 100}%`;
			},
		},

		max: {
			attr: true,
			init: 100,
		},

		indeterminate: {
			attr: true,
		},

		_progress: {},
	},

	template: calm.shadowDom(`
		<style>
			@keyframes indeterminate {
				from {
					transform: translate3d(-100%, 0, 0);
				}

				to {
					transform: translate3d(100%, 0, 0);
				}
			}

			:host {
				position: relative;

				display: block;
				width: 256px;
				height: 2px;

				overflow: hidden;
				color: ${calm.color};
			}

			:host([indeterminate]) #progress {
				width: 100%;

				animation: indeterminate ${calm.time.extreme} ${calm.ease.inOut} infinite;
			}

			#bar {
				width: 100%;
				height: 100%;

				background: currentColor;
				opacity: 0.25;
			}

			#progress {
				position: absolute;
				top: 0;

				height: 100%;

				background: currentColor;

				transition: width ${calm.time.long} ${calm.ease.out};
			}
		</style>

		<div id="bar"></div>
		<div id="progress"></div>
	`),

	created() {
		this._progress = this.shadowRoot.getElementById("progress");
	}
});
