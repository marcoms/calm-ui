import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-card", {
	properties: {
		z: {
			attr: true,
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;

				background: #fff;
				border-radius: ${calm.borderRadius};
				overflow: auto;

				transition: box-shadow ${calm.time.short} linear;
			}

			:host([z="1"]) { box-shadow: ${calm.shadow[1]}; }
			:host([z="2"]) { box-shadow: ${calm.shadow[2]}; }
			:host([z="3"]) { box-shadow: ${calm.shadow[3]}; }
			:host([z="4"]) { box-shadow: ${calm.shadow[4]}; }
			:host([z="5"]) { box-shadow: ${calm.shadow[5]}; }
		</style>

		<content></content>
	`),
});
