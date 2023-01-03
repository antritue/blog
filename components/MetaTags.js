import Head from 'next/head';

const MetaTags = ({ title, description, keywords, thumbnail, url }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {keywords} ?? <meta name='keywords' content={keywords} />
            {thumbnail} ?? <meta property="og:image" content={thumbnail} />
            {url} ?? <meta property="og:url" content={url} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Kim Ngân" />
            <meta property='og:locale' content='vi_VN' />
        </Head>
    );
};

export default MetaTags;
