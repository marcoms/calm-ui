import skate from "skatejs";

export default {
	shadowDom(html, cacheIds=true) {
		return function shadowRender(el) {
			const root = el.shadowRoot || el.createShadowRoot();
			root.innerHTML = html;

			if (cacheIds) {
				el.$ = {};
				const elsWithIds = [...root.querySelectorAll("[id]")];
				for (const elWithId of elsWithIds) {
					el.$[elWithId.id] = elWithId;
				}
			}
		};
	},

	ready(fn) {
		if (document.readyState === "interactive" || document.readyState === "complete") {
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	},

	emit(src, name, opts={}) {
		this.ready(() => src.dispatchEvent(new CustomEvent(name, opts)));
	},

	// TODO: implement as CSS custom properties when support is finalised... Come on https://codereview.chromium.org/1192983003/!

	breakpoints: {
		xsmall: "0",
		small: "600px",
		medium: "960px",
		large: "1280px",
		xlarge: "1920px",
	},

	easings: {
		// quart
		out: "cubic-bezier(0.165, 0.84, 0.44, 1)",

		// cubic
		in: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",

		// cubic
		inOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",

		light: {
			out: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
			in: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
			inOut: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
		},
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
		1: "0 1px 4px rgba(0, 0, 0, 0.3)",
		2: "0 2px 8px rgba(0, 0, 0, 0.35)",
		3: "0 4px 16px rgba(0, 0, 0, 0.4)",
		4: "0 8px 24px rgba(0, 0, 0, 0.45)",
		5: "0 16px 42px rgba(0, 0, 0, 0.5)",
	},

	sizes: {
		increment: "56px",
		borderRadius: "3px",
		touchTarget: "48px",
	},

	colors: {
		primary: ((window.calm || {}).colors || {}).primary || "#2196f3",
		primaryDark: ((window.calm || {}).colors || {}).primaryDark || "#1976d2",
		accent: ((window.calm || {}).colors || {}).accent || "#f44336",
		neutral: ((window.calm || {}).colors || {}).neutral || "#2196f3",
	},
};
