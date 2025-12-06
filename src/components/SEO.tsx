import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    // Optional image for social sharing
    image?: string;
    // Optional canonical URL if different from current
    url?: string;
    // Optional type ('article' vs 'website')
    type?: string;
}

export default function SEO({ title, description, image, url, type = 'website' }: SEOProps) {
    const siteTitle = 'Tech.Mag';
    const fullTitle = `${title} | ${siteTitle}`;
    const currentUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
