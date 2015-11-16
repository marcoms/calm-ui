import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-card", {
	properties: {
		z: skate.properties.number({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;

				background: #fff;
				border-radius: ${calm.borderRadius};
				overflow: auto;

				transition: box-shadow ${calm.durations.short} linear;
			}

			:host([z="1"]) {
				box-shadow: ${calm.shadows[1]};
			}

			:host([z="2"]) {
				box-shadow: ${calm.shadows[2]};
			}

			:host([z="3"]) {
				box-shadow: ${calm.shadows[3]};
			}

			:host([z="4"]) {
				box-shadow: ${calm.shadows[4]};
			}

			:host([z="5"]) {
				box-shadow: ${calm.shadows[5]};
			}
		</style>

		<content></content>
	`),
});
