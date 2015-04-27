bundle:
	jspm bundle-sfx calm-ui bundle.js

bundle-min:
	jspm bundle-sfx --minify calm-ui bundle.js

bundle-dev:
	jspm bundle-sfx --skip-source-maps calm-ui bundle.js
