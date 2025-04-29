const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = {
    path: '/any',
    name: 'Any Website',
    example: '/any?url=https://example.com',
    parameters: {
        url: 'Target URL',
    },
    handler: async (ctx) => {
        const targetUrl = ctx.query.url;
        if (!targetUrl) {
            throw new Error('Missing `url` query parameter');
        }

        const response = await got(targetUrl);
        const html = response.body;

        return {
            title: `Snapshot of ${targetUrl}`,
            link: targetUrl,
            item: [
                {
                    title: `Content from ${targetUrl}`,
                    description: html.substring(0, 500),
                    pubDate: parseDate(new Date()),
                    link: targetUrl,
                },
            ],
        };
    },
};
