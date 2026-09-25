import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
	return rss({
		title: 'Santiago Becerra Arias | Blog',
		description: 'Un blog de Astro escrito con sueño y sarcasmo',
		site: context.site,
		items: await pagesGlobToRssItems(import.meta.glob('./posts/*.md')),
		customData: '<language>es-mx</language>',
	});
}
