export default {
	handleActive(el) {
		let handlee = el.shadowRoot.querySelector(".handle-active");

		function activate() {
			handlee.classList.add("active");
		}

		function deactivate() {
			handlee.classList.remove("active");
		}

		let hasTouch = "ontouchstart" in window;

		function addListeners(target) {
			target.addEventListener("mousedown", activate);
			target.addEventListener("mouseup", deactivate);
			target.addEventListener("mouseleave", deactivate);

			if(!hasTouch) return;
			target.addEventListener("touchstart", activate);
			target.addEventListener("touchend", deactivate);
			target.addEventListener("touchcancel", deactivate);
		}

		let insertions = handlee.querySelectorAll("content");
		if(insertions) {
			let distributedNodes;

			Array.prototype.forEach.call(insertions, (insertion) => {
				distributedNodes = insertion.getDistributedNodes();
				Array.prototype.forEach.call(distributedNodes, (distributedNode) => {
					addListeners(distributedNode);
				});
			});
		}

		addListeners(handlee);
	},

	init(el, tmpl) {
		el.createShadowRoot().innerHTML = tmpl;
	},

	// -quart easings

	ease: {
		out: "cubic-bezier(0.165, 0.84, 0.44, 1)",
		in: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
		inOut: "cubic-bezier(0.77, 0, 0.175, 1)"
	},

	// durations for transitions

	time: {
		short: "160ms",
		med: "320ms",
		long: "420ms"
	},

	// box-shadow parameters for different elevation levels

	shadow: {
		1: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
		2: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
		3: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
		4: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
		5: "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)"
	}
};
