bundle-min:
	jspm bundle-sfx --minify --skip-source-maps calm-ui bundle.js
	sed -i "s/\t//g" bundle.js
	sed -i "s/\\\\n//g" bundle.js

bundle-dev:
	jspm bundle-sfx calm-ui bundle.js

bundle-fast:
	jspm bundle-sfx --skip-source-maps calm-ui bundle.js

clean:
	rm -rf bundle.js{,.map}
