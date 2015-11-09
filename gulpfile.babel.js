#!/usr/bin/env node

/* eslint-env node */
/* eslint no-console: 0 */

if (!process.argv[2]) {
	console.log("provide a destination argument");
	process.exit(1);
}

import gulp from "gulp";
import jspm from "jspm";

jspm.setPackagePath(".");

gulp.task("default", ["build"]);

gulp.task("build", () => {
	return jspm.bundleSFX("index.js", "calm-ui.min.js", {
		minify: true,
		mangle: true,
		sourceMaps: true,
	});
});

gulp.task("build-fast", () => {
	return jspm.bundleSFX("index.js", "calm-ui.js", {
		minify: false,
		sourceMaps: false,
	});
});
