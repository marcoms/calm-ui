function handleActive(el) {
	function activate() {
		el.classList.add("active");
	}

	function deactivate() {
		el.classList.remove("active");
	}

	el.addEventListener("touchstart", activate);
	el.addEventListener("mousedown", activate);
	el.addEventListener("touchend", deactivate);
	el.addEventListener("mouseup", deactivate);
}
