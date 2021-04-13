const markdownIt = require('markdown-it');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter('dateReadable', date => {
		return new Date(date).toLocaleDateString(
			'id-ID',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}
		)
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

	// Next Prev 
	eleventyConfig.addCollection("baca", function (collection) {
		const coll = collection.getFilteredByTag("baca");
		const post = collection.getFilteredByTag("jurnal");

		for (let i = 0; i < coll.length; i++) {
			const bacaSebelumnya = coll[i - 1];
			const bacaSelanjutnya = coll[i + 1];

			coll[i].data["bacaSebelumnya"] = bacaSebelumnya;
			coll[i].data["bacaSelanjutnya"] = bacaSelanjutnya;
		}

		for (let i = 0; i < post.length; i++) {
			const prevPost = post[i - 1];
			const nextPost = post[i + 1];

			post[i].data["prevPost"] = prevPost;
			post[i].data["nextPost"] = nextPost;
		}

		return (coll, post);
	});

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