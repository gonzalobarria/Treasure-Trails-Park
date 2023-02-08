const siteName = 'Treasure Trails Park';
const title = `${siteName} - Web3 Experiences`;
const description = 'An amazing experience in your favorite park';
const url = 'https://ttp.gonzalobarria.com/';
const twitterId = '@_dientelargo_';

const config = {
  title,
  description,
  defaultTitle: title,
  titleTemplate: title,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url,
    siteName,
    images: [
      {
        url: '/logo-gb.jpg',
        width: 800,
        height: 600,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: twitterId,
    site: twitterId,
    cardType: 'summary_large_image',
  },
};

export default config;
