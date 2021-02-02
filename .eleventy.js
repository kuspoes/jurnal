const moment = require('moment');
moment.locale('id');
const markdownIt = require('markdown-it');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

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
	
	eleventyConfig.addPlugin(lazyImagesPlugin);
	
	// syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// rss
	eleventyConfig.addPlugin(pluginRss);
};
