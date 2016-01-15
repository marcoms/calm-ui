import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-icons";

export default skate("calm-icon", {
	properties: {
		icon: skate.properties.string({
			attribute: true,
			set(el, diff) {
				if (!el.icon) return;

				if (!window.calmIcons) window.calmIcons = document.createElement("calm-icons");

				const iconNode = window.calmIcons.getIcon(el.icon);
				if (!iconNode) return;

				const frame = el.shadowRoot.querySelector("#frame");

				// no need to animate nothing to something
				if (el.animated && diff.oldValue && diff.oldValue !== el.icon) {
					const mediumDuration = Number.parseInt(calm.durations.medium.slice(0, -2), 10);
					const longDuration = Number.parseInt(calm.durations.long.slice(0, -2), 10);
					const successor = frame.cloneNode(false);

					successor.appendChild(iconNode);
					el.shadowRoot.appendChild(successor);

					successor.classList.add("entering");
					frame.classList.add("exiting");

					successor.addEventListener("animationend", () => {
						successor.classList.remove("entering");
						frame.remove();

						successor.id = "frame";
					});
				} else if (frame.children[0]) {
					frame.replaceChild(iconNode, frame.children[0]);
				} else {
					frame.appendChild(iconNode);
				}
			},
		}),

		animated: skate.properties.boolean({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			@keyframes entering-fade {
				from {
					opacity: 0;
				}
			}

			@keyframes entering-rotate {
				from {
					transform: rotate(360deg);
				}

				to {
					transform: rotate(720deg);
				}
			}

			@keyframes exiting-fade {
				to {
					opacity: 0;
				}
			}

			@keyframes exiting-rotate {
				to {
					transform: rotate(360deg);
				}
			}

			:host {
				position: relative;

				display: inline-block;
				width: 24px;
				height: 24px;
			}

			svg {
				position: absolute;
				top: 0;
				left: 0;

				vertical-align: middle;
				transform-origin: center center;
			}

			.entering {
				animation-name: entering-fade, entering-rotate;
				animation-duration: ${calm.durations.medium}, ${calm.durations.long};
				animation-timing-function: linear, ${calm.easings.out};
			}

			.exiting {
				animation-name: exiting-fade, exiting-rotate;
				animation-duration: ${calm.durations.medium}, ${calm.durations.long};
				animation-timing-function: linear, ${calm.easings.out};
			}
		</style>

		<svg id="frame" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g></g>
		</svg>
	`, false),
});
