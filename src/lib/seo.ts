import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { aggregateRating } from "@/content/reviews";
import { mainAuthor } from "@/content/authors";

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean === "/" ? "" : clean}`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  datePublished?: string;
  dateModified?: string;
}

function truncateDesc(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max - 1);
  return (cut > 100 ? text.slice(0, cut) : text.slice(0, max)).trimEnd() + "…";
}

function truncateTitle(text: string, max = 60): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max - 1);
  return (cut > 30 ? text.slice(0, cut) : text.slice(0, max)).trimEnd() + "…";
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  datePublished,
  dateModified,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? `${siteConfig.url}/og-default.png`;
  const seoTitle = truncateTitle(title);
  const seoDesc = truncateDesc(description);

  return {
    // `absolute` prevents the root layout's "%s | TSE Vending" template from
    // appending the brand a second time (page metaTitles already include it).
    title: { absolute: seoTitle },
    description: seoDesc,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(type === "article" && datePublished
        ? { publishedTime: datePublished, modifiedTime: dateModified ?? datePublished }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [ogImage],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "vi",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tin-tuc?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg"),
      width: 200,
      height: 60,
    },
    description: siteConfig.description,
    foundingDate: "2014",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    areaServed: siteConfig.areasServed.map((area) => ({
      "@type": "State",
      name: area,
    })),
    knowsAbout: [
      "Máy bán hàng tự động",
      "Tủ locker thông minh",
      "Vending machine",
      "Smart locker",
      "IoT thiết bị bán lẻ",
      "Thanh toán không tiền mặt",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sản phẩm & Dịch vụ TSE Vending",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Máy bán hàng tự động" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tủ locker thông minh" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lắp đặt và bảo trì" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
      ratingCount: aggregateRating.ratingCount,
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.facebookAlt],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: absoluteUrl("/logo.svg"),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: "VND",
    paymentAccepted: "Cash, Credit Card, QR Code",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.867,
      longitude: 106.629,
    },
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address.street + ", " + siteConfig.address.city)}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    areaServed: siteConfig.areasServed,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
      ratingCount: aggregateRating.ratingCount,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export interface ServiceJsonLdInput {
  name: string;
  description: string;
  path: string;
}

export function serviceJsonLd({ name, description, path }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.areasServed,
  };
}

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
}

export function articleJsonLd({
  title, description, path, datePublished, dateModified, image, keywords, articleSection,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "vi",
    ...(image ? { image: { "@type": "ImageObject", url: image, width: 1200, height: 630 } } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    ...(articleSection ? { articleSection } : {}),
    author: {
      "@type": "Person",
      name: mainAuthor.name,
      url: mainAuthor.url,
      jobTitle: mainAuthor.jobTitle,
      worksFor: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      knowsAbout: mainAuthor.expertise,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg"), width: 200, height: 60 },
    },
    isPartOf: { "@type": "Blog", name: `Blog ${siteConfig.name}`, url: absoluteUrl("/tin-tuc") },
    about: { "@type": "Thing", name: "Máy bán hàng tự động và tủ locker thông minh" },
  };
}

export interface ProductJsonLdInput {
  name: string;
  description: string;
  path: string;
  image?: string;
  /** Low/high price in VND. When set, emits an AggregateOffer (price rich-result eligible). */
  lowPrice?: number;
  highPrice?: number;
}

// Product schema for product/category pages. Emitting a valid AggregateOffer
// (priceCurrency + lowPrice) is what makes the page eligible for Google's
// product/merchant rich results — the "snippet not eligible" warning in GSC.
export function productJsonLd({ name, description, path, image, lowPrice, highPrice }: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ?? absoluteUrl("/og-default.png"),
    url: absoluteUrl(path),
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(lowPrice
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "VND",
            lowPrice,
            ...(highPrice ? { highPrice } : {}),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          },
        }
      : {}),
  };
}

export interface ItemListJsonLdInput {
  name: string;
  description: string;
  path: string;
  items: { name: string; url: string; description?: string; position: number }[];
}

export function itemListJsonLd({ name, description, path, items }: ItemListJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export interface HowToJsonLdInput {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}

export interface VideoObjectJsonLdInput {
  /** YouTube video id */
  id: string;
  name: string;
  description: string;
  /** ISO date, e.g. "2026-07-01" */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT2M30S" (optional) */
  duration?: string;
}

// VideoObject schema — eligible for Google's video rich result / video tab.
// Only call with a real YouTube id (see content/videos.ts), never placeholders.
export function videoObjectJsonLd({ id, name, description, uploadDate, duration }: VideoObjectJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    uploadDate,
    ...(duration ? { duration } : {}),
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg"), width: 200, height: 60 },
    },
  };
}

// HowTo schema — eligible for Google's HowTo rich result. Use for genuine
// step-by-step procedures (e.g. how a smart locker drop-off/pick-up works).
export function howToJsonLd({ name, description, steps }: HowToJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
