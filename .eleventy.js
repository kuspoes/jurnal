const markdownIt = require('markdown-it');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require('html-minifier');
const readerBar = require('eleventy-plugin-reader-bar');
const fetch = require('node-fetch');

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

	eleventyConfig.addLiquidShortcode("related", async function (judul) {
		try {
			const response = await fetch('https://kusaeni.com/baca/data.json', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			const relasih = function (buku, judul) {
				const index = buku.findIndex(function (novel, index) {
					return novel.title.toLowerCase() === judul.toLowerCase()
				})
			return buku[index]
		};
			const hasilData = await relasih(data, judul);
			var rese = hasilData.resensi.substr(0, 200)
			return `<div class="flex flex-row border-2 rounded-xl w-99 mx-auto mb-6 p-6 font-sans">
						<img class="shadow-md" src="${hasilData.coverImg}" width="110" height="130" >
						<div class="flex-1 w-1/2 pl-8 text-lg text-gray-700"> 
							<b><a href="${hasilData.url}" title="${hasilData.title}">${hasilData.title}</a> </b>
							<dl>
								<dt>${hasilData.penulis} </d> 
								<dd>${rese} ...</dd>
							</dl>
						</div>
					</div>`;
		} catch (err) {
			console.log(err)
		}
		const print = async () => {
			const p = await hasilData;
			console.log(p)
		};
		print()
	});

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

    // reader bar
    eleventyConfig.addPlugin(readerBar)

    // Next Prev 
	eleventyConfig.addCollection("baca", function (collection) {
		const coll = collection.getFilteredByTag("baca");

		for (let i = 0; i < coll.length; i++) {
			const bacaSebelumnya = coll[i - 1];
			const bacaSelanjutnya = coll[i + 1];

			coll[i].data["bacaSebelumnya"] = bacaSebelumnya;
			coll[i].data["bacaSelanjutnya"] = bacaSelanjutnya;
		}
		return coll;
	});

	// Next Prev 
	eleventyConfig.addCollection("jurnal", function (collection) {
		const post = collection.getFilteredByTag("jurnal");

		for (let i = 0; i < post.length; i++) {
			const prevPost = post[i - 1];
			const nextPost = post[i + 1];

			post[i].data["prevPost"] = prevPost;
			post[i].data["nextPost"] = nextPost;
		}
		return post;
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
