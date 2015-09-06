import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-spinner", {
	properties: {
		small: {
			attr: true,
			type: Boolean,
		},
	},

	// the following template is adapted from throbber.svg (BSD licensed) by the Chromium project
	template: calm.shadowDom(`
		<style>
			@keyframes fill-unfill {
				0% {
					stroke-dashoffset: 58.8;
				}

				50% {
					stroke-dashoffset: 0;
				}

				100% {
					stroke-dashoffset: -58.4;
				}
			}

			@keyframes rotate {
				0% {
					transform: none;
				}

				100% {
					transform: rotate(360deg);
				}
			}

			:host {
				display: block;
			}

			svg, svg * {
				transform-origin: 50% 50%;
			}

			#wrapper {
				animation: rotate 1411.767ms infinite linear;
			}

			#spinner {
				stroke: ${calm.color};
				stroke-dasharray: 58.9;
				stroke-dashoffset: 58.9;
				stroke-width: 2.5;
				stroke-linecap: round;

				animation-name: fill-unfill, rotate;
				animation-duration: 1199.7ms, 4798.8ms;
				animation-iteration-count: infinite;
				animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1), steps(4);
				animation-direction: normal, reverse;
			}
		</style>

		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 28 28">
		  <g id="wrapper">
		    <path id="spinner" fill="none" d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14"></path>
		  </g>
		</svg>
	`),
});
