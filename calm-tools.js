export default {
	handleActive(el) {
		function activate(e) {
			e.target.classList.add("active");
		}

		function deactivate(e) {
			e.target.classList.remove("active");
		}

		let targets = el.shadowRoot.querySelectorAll(".handle-active")
		Array.prototype.forEach.call(targets, function(target) {
			if("ontouchstart" in window) {
				target.addEventListener("touchstart", activate);
				target.addEventListener("touchend", deactivate);
				target.addEventListener("touchcancel", deactivate);
			}

			target.addEventListener("mousedown", activate);
			target.addEventListener("mouseup", deactivate);
			target.addEventListener("mouseleave", deactivate);
		});
	},

	init(el, tmpl) {
		el.createShadowRoot().innerHTML = tmpl;
	}
};
