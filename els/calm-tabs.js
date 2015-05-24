import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-tabs", {
	attributes: {
		tabs: {
			created(el, diff) {
				el.setTabs(diff.newValue);
			},

			updated(el, diff) {
				el.setTabs(diff.newValue);
			},
		},

		selected: {
			created(el, diff) {
				el.setSelected(diff.newValue);
			},

			updated(el, diff) {
				el.setSelected(diff.newValue);
			},
		},
	},

	prototype: {
		setTabs(labels) {
			let labelsList = labels.split(",");
			if(!labelsList[0]) return;

			let tabs = this.shadowRoot.getElementById("tabs");
			while(tabs.firstChild) tabs.removeChild(tabs.firstChild);
			let tab;
			for(var label of labelsList) {
				label = label.trim();

				tab = document.createElement("div");
				tab.classList.add("tab");
				tab.dataset.handleActive = "";
				tab.textContent = label;
				tabs.appendChild(tab);
			}

			calm.handleActive(tabs);
		},

		setSelected(selected) {
			let targetTab;
			let tabs = Array.prototype.slice.call(this.shadowRoot.getElementById("tabs").children);
			for(let tab of tabs) {
				if(tab.textContent === selected) {
					targetTab = tab;
					break;
				}
			}

			if(!targetTab) return;

			let indicator = this.shadowRoot.getElementById("indicator");
			indicator.style.width = `${targetTab.offsetWidth}px`;
			indicator.style.transform = `translate3d(${targetTab.offsetLeft}px, 0, 0)`;
		},
	},

	template: calm.shadowDOM(`
		<style>
			:host {
				position: relative;

				display: block;
				height: 56px;

				overflow-x: auto;
				overflow-y: hidden;
			}

			:host(.tabs-fixed) > #tabs {
				width: inherit;
			}

			:host(.tabs-fixed) > #tabs > .tab {
				flex: 1;
				justify-content: center;
			}

			#tabs {
				display: inline-flex;
				flex-direction: row;
				height: inherit;
			}

			.tab {
				display: flex;
				align-items: center;
				padding: 0 16px;

				text-transform: uppercase;
				white-space: nowrap;

				cursor: pointer;

				transition: background ${calm.time.short} linear;
				-webkit-tap-highlight-color: transparent;
			}

			.tab.active {
				background: rgba(0, 0, 0, 0.1);

				transition: none;
			}

			#indicator {
				position: absolute;
				bottom: 0;
				left: 0;

				height: 2px;

				background: currentColor;

				transition-property: transform width;
				transition-duration: ${calm.time.med};
				transition-timing-function: ${calm.ease.out};
				will-change: transform width;
			}
		</style>

		<div id="tabs"></div>
		<div id="indicator"></div>
	`),

	created(el) {
		el.shadowRoot.getElementById("tabs").addEventListener("click", (evt) => {
			let targetTab = el.shadowRoot.elementFromPoint(evt.clientX, evt.clientY);
			el.setSelected(targetTab.textContent);
		});
	},
});
