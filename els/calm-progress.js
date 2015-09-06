import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-progress", {
	properties: {
		value: {
			attr: true,
			type: calm.propType(Number),
			set(value) {
				if(this.indeterminate) return;

				value = value;
				let max = this.max;
				if(value < 0 || value > max) return;

				this.$["progress"].style.width = `${(value / max) * 100}%`;
			},
		},

		max: {
			attr: true,
			type: calm.propType(Number),
			init: 100,
		},

		indeterminate: {
			attr: true,
			type: Boolean,
		},
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

				animation: indeterminate ${calm.durations.extreme} ${calm.easings.inOut} infinite;
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

				transition: width ${calm.durations.long} ${calm.easings.out};
			}
		</style>

		<div id="bar"></div>
		<div id="progress"></div>
	`),
});
