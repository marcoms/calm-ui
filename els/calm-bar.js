import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";

export default skate("calm-bar", {
	render: calm.shadowDom(`
		<style>
			:host {
				position: relative;

				display: flex;
				width: 100%;
				height: ${calm.sizes.increment};

				background: ${calm.colors.primary};
				align-items: center;
				-webkit-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				-ms-user-select: none;
			}

			::content > header {
				position: absolute;
				left: 72px;

				line-height: ${calm.sizes.increment};
			}
		</style>

		<content></content>
	`),
});
