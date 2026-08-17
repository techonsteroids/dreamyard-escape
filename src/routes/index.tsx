import { createFileRoute } from "@tanstack/react-router";
import { Nav, MobileStickyBar } from "@/components/site/Nav";
import { Hero, BookingWidget } from "@/components/site/Hero";
import { SocialProof, Intro, Experience, LakeFeature, Rooms } from "@/components/site/Story";
import { Packages } from "@/components/site/Packages";
import {
  Rooftop,
  Journey,
  Gallery,
  WhyDreamyard,
  Location,
  FAQ,
  BookingCTA,
  Footer,
} from "@/components/site/Closing";
import { business, faqs } from "@/data/dreamyard";

const title = "Dreamyard Udaipur | Backpacker Hostel in Old City Udaipur";
const description =
  "Stay at Dreamyard Udaipur in the heart of Old City. Discover a highly rated backpacker hostel with rooftop Lake Pichola views and a vibrant travel experience.";

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: business.name,
  description,
  telephone: business.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "IN",
  },
  checkinTime: "13:00",
  checkoutTime: "10:30",
  amenityFeature: business.amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviewCount,
    bestRating: 5,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Dreamyard Udaipur, backpacker hostel Udaipur, hostel in Old City Udaipur, hostel near Lake Pichola, Udaipur stay packages",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "geo.placename", content: "Udaipur, Rajasthan" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(hotelSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BookingWidget />
        <SocialProof />
        <Intro />
        <Experience />
        <LakeFeature />
        <Rooms />
        <Packages />
        <Rooftop />
        <Journey />
        <Gallery />
        <WhyDreamyard />
        <Location />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
