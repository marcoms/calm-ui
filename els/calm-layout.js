import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-layout", {
	properties: {
		fixed: skate.properties.boolean({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
				width: 100vw;
				height: 100vh;
			}

			:host([fixed]) #bar-wrapper {
				position: fixed;
				top: 0;

				width: 100%;
			}

			:host([fixed]) #content {
				padding-top: ${calm.increment};
			}

			#content {
				/* keep height constant when padding is applied */
				box-sizing: border-box;
				min-height: 100vh;
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				#main {
					width: calc(100% - 320px);
					margin-left: 320px;
				}

				::content [data-drawerctrl] {
					display: none;
				}
			}
		</style>

		<content select="calm-drawer"></content>

		<div id="main">
			<calm-card fullwidth z="1" id="bar-wrapper">
				<content select="calm-bar"></content>
			</calm-card>

			<div id="content">
				<content></content>
			</div>
		</div>
	`),
});
