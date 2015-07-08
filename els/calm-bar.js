import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-bar", {
	properties: {
		sticky: { attr: true },
		flat: { attr: true },
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: flex;
				align-items: center;

				width: 100%;
				height: 56px;

				overflow: hidden;
				box-shadow: ${calm.shadow[1]};
			}

			::content > header {
				margin-left: 16px;

				font-size: 20px;
				line-height: 56px;
			}

			::content > calm-icon-btn {
				margin: 0 -4px;
			}

			:host([sticky]) {
				position: fixed;
				top: 0;
				left: 0;

				z-index: 97;
			}

			/* TODO: add auto-raising attribute */
			:host([flat]) {
				box-shadow: none;
				overflow: visible;
			}
		</style>

		<content></content>
	`),
});
