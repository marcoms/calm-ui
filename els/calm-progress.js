import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-progress", {
	properties: {
		value: skate.properties.number({
			attribute: true,
			set(el) {
				el._calculateWidth();
			},
		}),

		max: skate.properties.number({
			attribute: true,
			default: "100",
			set(el) {
				el._calculateWidth();
			},
		}),

		indeterminate: skate.properties.boolean({
			attribute: true,
		}),
	},

	prototype: {
		_calculateWidth() {
			if (this.indeterminate) return;

			const value = this.value;
			const max = this.max;

			if (value < 0 || value > max) return;

			this.$["progress"].style.width = `${(value / max) * 100}%`;
		},
	},

	render: calm.shadowDom(`
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
				height: 3px;

				overflow: hidden;
				color: ${calm.colors.neutral};
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
