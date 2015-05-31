bundle-min:
	jspm bundle-sfx --minify --skip-source-maps calm-ui bundle.js.0
	cat bundle.js.0 | tr -d "\t" | tr -d "\\\\n" > bundle.js
	rm bundle.js.0

bundle-dev:
	jspm bundle-sfx calm-ui bundle.js

bundle-fast:
	jspm bundle-sfx --skip-source-maps calm-ui bundle-js

clean:
	rm -rf bundle.js{,.map}
