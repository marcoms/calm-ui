import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-progress", {
	properties: {
		value: skate.properties.number({
			attribute: true,
			set(el, {newValue: value}) {
				if (el.indeterminate) return;

				const max = el.max;
				if (value < 0 || value > max) return;

				el.$["progress"].style.width = `${(value / max) * 100}%`;
			},
		}),

		max: skate.properties.number({
			attribute: true,
			default: "100",
		}),

		indeterminate: skate.properties.boolean({
			attribute: true,
		}),
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
				height: 2px;

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
