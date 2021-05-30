const markdownIt        = require('markdown-it');
const mdatrs            = require('markdown-it-attrs');
//const lazyImagesPlugin  = require('eleventy-plugin-lazyimages');
const syntaxHighlight   = require("@11ty/eleventy-plugin-syntaxhighlight");
//const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
//const Cache             = require('@11ty/eleventy-cache-assets');
const pluginRss         = require("@11ty/eleventy-plugin-rss");
const htmlmin           = require('html-minifier');
const readerBar         = require('eleventy-plugin-reader-bar');
const fetch             = require('node-fetch');
const _                 = require('lodash');
const embedTwitter      = require("eleventy-plugin-embed-twitter");
//const CleanCSS          = require("clean-css")
//const generateSocialImages = require("@manustays/eleventy-plugin-generate-social-images");

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
	eleventyConfig.addPassthroughCopy("robots.txt");


    eleventyConfig.addLiquidShortcode("related", async function (judul) {
    try {
            const response = await fetch('https://kusaeni.com/baca/data.json');
            const data     = await response.json();
            const hasilData= data.find(function(caridata) {
                return caridata.title.toLowerCase() === judul.toLowerCase()
            }); 
 
            var rese = await hasilData.resensi.substr(0, 200)
            return `<div class="flex flex-row border border-gray-400 rounded-xl w-99 mx-auto mb-6 p-6 font-sans">
                <img class="shadow-md" src="${hasilData.coverImg}" width="110" height="130" >
                <div class="flex-1 w-1/2 pl-8 text-lg text-gray-700"> 
                <b><a href="${hasilData.url}" title="${hasilData.title}">${hasilData.title}</a> </b>
                <dl><dt>${hasilData.penulis}</dt><dd>${rese} ...</dd>
                </dl></div></div>`;
            } catch (err) {
                console.log(err)
        }
        const print = async () => {
         const p = await hasilData;
        };
        print()
    });


    eleventyConfig.addPairedShortcode("relatedpair", function(resensi, coverImg, judul, url){
        let coverUrl = "https://ik.imagekit.io/hjse9uhdjqd/tr:n-cover/buku/"
        return `<div class="flex flex-row border border-gray-400 rounded-xl w-99 mx-auto mb-6 p-6 font-sans">
        <img class="shadow-md" src="${coverUrl}${coverImg}" width="110" height="130" >
        <div class="flex-1 w-1/2 pl-8 text-lg text-gray-700"> 
        <b><a href="${url}" title="${judul}">${judul}</a></b>
        <dd>${resensi} ...</dd>
        </dl></div></div>`;
    });

    // post-related article
    eleventyConfig.addPairedShortcode("prelated", function(desk, judul, url){
        return `<div class="w-99 mx-auto my-8 border border-gray-400 py-2 px-3 rounded-md">
            <h4 class="mt-0 text-sm font-sans font-bold text-gray-500 tracking-tighter uppercase mb-2">Artikel terkait</h4>
            <a class="text-2xl font-bold text-gray-900" href="${url}" title="${judul}">${judul}</a>
            <p class="font-sans text-gray-600 text-base mb-1">${desk}</p>
        </div>`;
    });

    // markdownIt
    let markdownLibrary = markdownIt({
        html: true,
        breaks: false,
        linkify: true,
        typographer: true
    });
    eleventyConfig.setLibrary("md", markdownLibrary.use(mdatrs, {
        allowedAttributes: ['id', 'class']
    }));
    eleventyConfig.addFilter('mdParse', function(resensi) {
        let mdp = new markdownIt({html: true, typographer: true });
        return mdp.render(resensi)
    })

    // syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    // rss
    eleventyConfig.addPlugin(pluginRss);

    // reader bar
    eleventyConfig.addPlugin(readerBar)

    // embed twitter
    eleventyConfig.addPlugin(embedTwitter);

    // Next Prev 
    eleventyConfig.addCollection("baca", function (collection) {
        const coll = collection.getFilteredByTag("baca");
        for (let i = 0; i < coll.length; i++) {
            const bacaSebelumnya = coll[i - 1];
            const bacaSelanjutnya = coll[i + 1];

            coll[i].data["bacaSebelumnya"] = bacaSebelumnya;
            coll[i].data["bacaSelanjutnya"] = bacaSelanjutnya;}
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

    eleventyConfig.addCollection("postByYear", (collection) => {
        return _.chain(collection.getFilteredByTag("jurnal"))
            .groupBy((artikel) => artikel.date.getFullYear())
            .toPairs()
            .reverse()
            .value()
    });

    // Biar mudah dicomment
    // lazy images
    //eleventyConfig.addPlugin(lazyImagesPlugin);

    // compress html output
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, { useShortDoctype: true, removeComments: true, collapseWhitespace: true });
        return minified;}
        return content;
    });
};
