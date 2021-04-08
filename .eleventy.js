const moment = require('moment'); // berat, ganti ke luxon atau pakai vanilla js
moment.locale('id');
const markdownIt = require('markdown-it');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
	// tanggal & waktu
	eleventyConfig.addFilter('dateIso', date => {
		return moment(date).toISOString();
	});

	eleventyConfig.addFilter('dateReadable', date => {
		return moment(date).utc().format('LL');
	});

	// statik
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	// markdownIt
	let markdownLibrary = markdownIt({
		html: true,
		breaks: false,
		linkify: true
	});

	eleventyConfig.setLibrary("md", markdownLibrary);
	eleventyConfig.addFilter('mdParse', function(resensi) {
		let mdp = new markdownIt({
			html: true
		});
		return mdp.render(resensi)
	})

	// lazy images
	eleventyConfig.addPlugin(lazyImagesPlugin);
	
	// syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);

	// syntax highlighting
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// rss
	eleventyConfig.addPlugin(pluginRss);

	// compress html output
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		if (outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}
		return content;
    });

};
