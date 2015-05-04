import calm from "calm-tools";
import skate from "skatejs";
import CalmIcon from "els/calm-icon";

export default skate("calm-icon-btn", {
	attributes: {
		icon: {
			updated(el, diff) {
				el.setIcon(diff.newValue);
			}
		}
	},

	prototype: {
		setIcon(icon) {
			this.shadowRoot.getElementById("icon").setIcon(icon);
		}
	},

	created(el) {
		calm.init(el, `
			<style>
				:host {
					align-self: center;
				}

				#btn {
					border: 0;
					outline: 0;
					cursor: pointer;
					background: transparent;
					box-shadow: none;
					border-radius: 50%;
					padding: 20px;
					margin: 0 -4px;
					transition: background ${calm.time.short} linear;
					-webkit-tap-highlight-color: transparent;
				}

				#btn.active {
					transition: none;
					background: rgba(255, 255, 255, 0.25);
				}

				:host(.icon-btn-light-bg) #btn.active {
					background: rgba(0, 0, 0, 0.1);
				}
			</style>

			<button class="handle-active" id="btn"><calm-icon id="icon"></calm-icon></btn>
		`);

		calm.handleActive(el);
		if(el.icon) el.setIcon(el.icon);
	}
})
