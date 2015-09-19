export default {
	shadowDom(html, cacheIds=true) {
		// regular function expr to use correct `this` value
		return function() {
			const root = this.createShadowRoot();
			root.innerHTML = html;

			if(cacheIds) {
				this.$ = {};
				const elsWithIds = Array.from(root.querySelectorAll("[id]"));
				for(const el of elsWithIds) {
					this.$[el.id] = el;
				}
			}
		};
	},

	ready(fn) {
		if(document.readyState === "interactive" || document.readyState === "complete") {
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	},

	emit(src, name, opts={}) {
		this.ready(() => src.dispatchEvent(new CustomEvent(name, opts)));
	},

	breakpoints: {
		xsmall: "0",
		small: "600px",
		medium: "1024px",
		large: "1440px",
		xlarge: "1920px",
	},

	easings: {
		out: "cubic-bezier(0.165, 0.84, 0.44, 1)",  // quart
		in: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",  // cubic
		inOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",  // cubic
	},

	// durations for transitions

	durations: {
		short: "160ms",
		medium: "320ms",
		long: "420ms",
		extreme: "920ms",
	},

	// box-shadow parameters for different elevation levels

	shadows: {
		1: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
		2: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
		3: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
		4: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
		5: "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
	},

	// TODO: implement as CSS custom properties when support is finalised
	increment: "56px",
	borderRadius: "3px",
	colors: {
		primary: ((window.calm || {}).colors || {}).primary || "#2196f3",
		primaryDark: ((window.calm || {}).colors || {}).primaryDark || "#1976d2",
		accent: ((window.calm || {}).colors || {}).accent || "#f44336",
		neutral: ((window.calm || {}).colors || {}).neutral || "#2196f3",
	},

	propType(type) {
		return (value) => {
			if(value === undefined || value === null) return value;
			return type(value);
		};
	},
};
