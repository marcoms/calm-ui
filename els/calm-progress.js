import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-progress", {
	attributes: {
		value: {
			created(el, diff) {
				el.setValue(Number.parseFloat(diff.newValue, 10));
			},

			updated(el, diff) {
				el.setValue(Number.parseFloat(diff.newValue, 10));
			},
		},

		max: {},
		indeterminate: {},
	},

	prototype: {
		setValue(value) {
			let max = Number.parseFloat(this.max, 10);

			if(value < 0 || value > this.max) return;

			let progress = this.shadowRoot.getElementById("progress");
			progress.style.width = `${(value / max) * 100}%`;
		},
	},

	template: calm.shadowDOM(`
		<style>
			@-webkit-keyframes indeterminate {
				from {
					transform: translate3d(-100%, 0, 0);
				}

				to {
					transform: translate3d(200%, 0, 0);
				}
			}

			:host {
				position: relative;

				width: 256px;
				height: 2px;

				overflow: hidden;
				color: ${calm.color};
			}

			:host([indeterminate]) #progress {
				display: none;
			}

			#progress-indeterminate {
				display: none;
			}

			:host([indeterminate]) #progress-indeterminate {
				position: absolute;
				top: 0;
				left: 0;

				display: initial;
				width: 50%;
				height: 100%;

				background: currentColor;

				backface-visibility: hidden;
				animation: indeterminate ${calm.time.extreme} ${calm.ease.inOut} infinite;
			}

			#bar {
				position: absolute;
				top: 0;
				left: 0;

				width: 100%;
				height: 100%;

				background: currentColor;
				opacity: 0.25;
			}

			#progress {
				position: absolute;
				top: 0;
				left: 0;

				height: 100%;

				background: currentColor;

				transition: width ${calm.time.long} ${calm.ease.out};
			}
		</style>

		<div id="bar"></div>
		<div id="progress"></div>
		<div id="progress-indeterminate"></div>
	`),
});
