import React, { useState, useEffect, useMemo } from "react";

// ─── BRAND TOKENS ─────────────────────────────────────────────────────────────
const COLORS = {
  blue:   "#0057FF",
  navy:   "#0A1F44",
  green:  "#2ECC71",
  gray:   "#F5F7FA",
  white:  "#FFFFFF",
  text:   "#1A1F36",
  muted:  "#6B7280",
  border: "#E5E7EB",
  warn:   "#F59E0B",
  red:    "#EF4444",
  purple: "#8B5CF6",
};
const FONT_HEAD = "'Montserrat', sans-serif";
const FONT_BODY = "'Open Sans', sans-serif";

// ─── SEO CONFIG ───────────────────────────────────────────────────────────────
const SEO = {
  businessName: "R3VIV3 Cleaning Service",
  domain: "https://r3viv3cleaning.com",  // REPLACE with your real domain
  phone: "",  // Add your real number when ready
  email: "hellor3vclean@outlook.com",
  serviceAreas: [
    "Minneapolis", "St. Paul", "Edina", "Bloomington", "Maple Grove",
    "Plymouth", "Minnetonka", "St. Louis Park", "Eden Prairie", "Richfield",
    "Roseville", "Eagan", "Burnsville", "Apple Valley", "Woodbury",
    "Brooklyn Park", "Brooklyn Center", "Fridley", "Coon Rapids", "Blaine",
    "Golden Valley", "New Hope", "Crystal", "Robbinsdale", "Columbia Heights",
    "Hopkins", "Wayzata", "Excelsior", "Chanhassen",
  ],
  neighborhoods: [
    "Uptown Minneapolis", "Northeast Minneapolis", "Downtown Minneapolis",
    "North Loop", "Linden Hills", "Lake Harriet", "Lake Calhoun (Bde Maka Ska)",
    "Kingfield", "Whittier", "Powderhorn", "Longfellow", "Como",
    "Highland Park St. Paul", "Cathedral Hill", "Mac-Groveland",
  ],
};

// SEO data per page — title, description, H1, schema
const PAGE_SEO = {
  home: {
    title: "House Cleaning Services Minneapolis & Twin Cities | R3VIV3 Cleaning",
    description: "Reliable house cleaning, deep cleaning, Airbnb turnover, and move-out cleaning in Minneapolis, St. Paul, and the Twin Cities. Book online with photo confirmation on every job.",
    keywords: "house cleaning Minneapolis, cleaning service Minneapolis, maid service Twin Cities, Airbnb cleaning Minneapolis, deep cleaning Minneapolis, move out cleaning Minneapolis",
    h1: "Reliable Cleaning Without the Stress",
    canonical: "/",
  },
  services: {
    title: "Cleaning Services Minneapolis | Standard, Deep, Airbnb, Move-Out | R3VIV3",
    description: "Professional cleaning services in Minneapolis and the Twin Cities. Standard cleaning from $120, deep cleaning, Airbnb turnover, move-in/move-out cleaning. Book online today.",
    keywords: "cleaning services Minneapolis, house cleaners Minneapolis, deep cleaning service, residential cleaning Twin Cities, professional cleaners Minneapolis",
    h1: "Cleaning packages for every space",
    canonical: "/services",
  },
  airbnb: {
    title: "Airbnb Cleaning Minneapolis | Vacation Rental Turnover | R3VIV3",
    description: "Airbnb and vacation rental cleaning in Minneapolis & St. Paul. Same-day turnovers, photo confirmation, linen reset, and restocking. Trusted by Twin Cities Airbnb hosts.",
    keywords: "Airbnb cleaning Minneapolis, vacation rental cleaning Minneapolis, Airbnb turnover Twin Cities, short term rental cleaning Minneapolis, VRBO cleaning St Paul",
    h1: "Airbnb Cleaning & Turnover Service in Minneapolis",
    canonical: "/airbnb-cleaning-minneapolis",
  },
  "deep-cleaning": {
    title: "Deep Cleaning Minneapolis | Top to Bottom Home Cleaning | R3VIV3",
    description: "Deep cleaning services in Minneapolis and Twin Cities. Detailed top-to-bottom cleaning including baseboards, behind appliances, inside windows. From $180.",
    keywords: "deep cleaning Minneapolis, deep house cleaning Twin Cities, detailed cleaning Minneapolis, spring cleaning Minneapolis",
    h1: "Deep Cleaning Service in Minneapolis",
    canonical: "/deep-cleaning-minneapolis",
  },
  "move-out": {
    title: "Move Out Cleaning Minneapolis | Move-In/Move-Out Service | R3VIV3",
    description: "Move-out and move-in cleaning in Minneapolis. Get your full deposit back with our deep move-out cleaning. Inside cabinets, fridge, oven, all baseboards. From $200.",
    keywords: "move out cleaning Minneapolis, move in cleaning Minneapolis, end of lease cleaning Minneapolis, move out cleaners Twin Cities, deposit back cleaning",
    h1: "Move-In / Move-Out Cleaning Minneapolis",
    canonical: "/move-out-cleaning-minneapolis",
  },
  book: {
    title: "Book Cleaning Online Minneapolis | Instant Quote | R3VIV3",
    description: "Book your Minneapolis cleaning online in under 2 minutes. Instant pricing, secure payment, photo-confirmed jobs. Standard, deep, Airbnb, and move-out cleaning available.",
    keywords: "book cleaning Minneapolis, online cleaning quote, instant cleaning quote Minneapolis",
    h1: "Get Your Instant Quote",
    canonical: "/book",
  },
  "become-cleaner": {
    title: "Cleaning Jobs Minneapolis | Become a Cleaner | R3VIV3",
    description: "Cleaning jobs in Minneapolis and Twin Cities. Apply to clean with R3VIV3 — set your own schedule, steady jobs, fast pay. Independent contractor opportunities.",
    keywords: "cleaning jobs Minneapolis, house cleaner jobs Twin Cities, independent cleaner Minneapolis, cleaning contractor jobs",
    h1: "Earn cleaning with R3VIV3",
    canonical: "/cleaning-jobs-minneapolis",
  },
  contact: {
    title: "Contact R3VIV3 Cleaning | Minneapolis Cleaning Service",
    description: "Contact R3VIV3 Cleaning Service in Minneapolis. Email hellor3vclean@outlook.com for custom cleaning quotes and questions about our Twin Cities services.",
    keywords: "contact cleaning service Minneapolis, cleaning quote Minneapolis",
    h1: "Get in touch",
    canonical: "/contact",
  },
};

// ─── SEO HEAD MANAGER ─────────────────────────────────────────────────────────
// Updates document.title, meta tags, and JSON-LD structured data on page change
function useSEO(pageKey) {
  useEffect(() => {
    const seo = PAGE_SEO[pageKey] || PAGE_SEO.home;
    document.title = seo.title;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", seo.description);
    setMeta("keywords", seo.keywords);
    setMeta("robots", "index, follow");
    setMeta("og:title", seo.title, "property");
    setMeta("og:description", seo.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", SEO.domain + seo.canonical, "property");
    setMeta("og:site_name", SEO.businessName, "property");
    setMeta("og:locale", "en_US", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("geo.region", "US-MN");
    setMeta("geo.placename", "Minneapolis");
    setMeta("geo.position", "44.9778;-93.2650");
    setMeta("ICBM", "44.9778, -93.2650");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SEO.domain + seo.canonical);

    // JSON-LD LocalBusiness Schema (always present)
    let jsonLd = document.getElementById("ld-localbusiness");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.id = "ld-localbusiness";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HouseCleaningService",
      "name": SEO.businessName,
      "image": SEO.domain + "/og-image.jpg",
      "url": SEO.domain,
      "email": SEO.email,
      "priceRange": "$120-$280",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Minneapolis",
        "addressRegion": "MN",
        "addressCountry": "US",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 44.9778, "longitude": -93.2650 },
      "areaServed": SEO.serviceAreas.map((city) => ({ "@type": "City", "name": city })),
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00", "closes": "18:00",
      },
      "sameAs": [
        "https://www.facebook.com/r3viv3cleaning",
        "https://www.instagram.com/r3viv3cleaning",
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cleaning Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard House Cleaning Minneapolis" }, "price": "120", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deep Cleaning Minneapolis" },          "price": "180", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airbnb Turnover Cleaning Minneapolis" }, "price": "150", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Move-Out Cleaning Minneapolis" },     "price": "200", "priceCurrency": "USD" },
        ],
      },
    });
  }, [pageKey]);
}

// ─── PRICING ENGINE ───────────────────────────────────────────────────────────
function calculatePrice({ cleaningType, bedrooms, bathrooms, addons }) {
  let base = 0;
  const beds = parseInt(bedrooms) || 1;
  const baths = parseInt(bathrooms) || 1;
  if (cleaningType === "standard") {
    if (beds === 1) base = 120;
    else if (beds === 2) base = 140;
    else if (beds === 3) base = 170;
    else base = 170 + (beds - 3) * 25;
    if (baths > 2) base += (baths - 2) * 15;
  } else if (cleaningType === "deep") base = 120 + beds * 30 + 80;
  else if (cleaningType === "airbnb") { base = 150 + beds * 25; if (base > 250) base = 250; }
  else if (cleaningType === "moveout") base = 200 + beds * 35 + baths * 15;
  let addonTotal = 0;
  if (addons.fridge)   addonTotal += 35;
  if (addons.oven)     addonTotal += 35;
  if (addons.cabinets) addonTotal += 40;
  if (addons.laundry)  addonTotal += 25;
  return { base, addons: addonTotal, total: base + addonTotal };
}

// ─── LOCAL STORAGE HOOK ───────────────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  const setValue = (value) => {
    try {
      const toStore = typeof value === "function" ? value(stored) : value;
      setStored(toStore);
      window.localStorage.setItem(key, JSON.stringify(toStore));
    } catch (e) { console.error("localStorage error:", e); }
  };
  return [stored, setValue];
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
function useAnalytics() {
  const [events, setEvents] = useLocalStorage("r3_analytics", []);
  const track = (eventName, data = {}) => {
    const event = { id: Date.now() + Math.random(), name: eventName, data, timestamp: new Date().toISOString() };
    setEvents((prev) => [event, ...prev].slice(0, 1000));
  };
  return { events, track, clearEvents: () => setEvents([]) };
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Button = ({ children, onClick, variant = "primary", size = "md", style = {}, disabled, type = "button" }) => {
  const base = { fontFamily: FONT_HEAD, fontWeight: 700, borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", border: "none", transition: "all 0.2s", letterSpacing: "0.01em", opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 };
  const sizes = { sm: { padding: "8px 14px", fontSize: 13 }, md: { padding: "12px 22px", fontSize: 14 }, lg: { padding: "16px 32px", fontSize: 16 } };
  const variants = {
    primary:   { background: COLORS.blue,  color: COLORS.white, boxShadow: "0 4px 14px rgba(0,87,255,0.35)" },
    secondary: { background: COLORS.green, color: COLORS.white, boxShadow: "0 4px 14px rgba(46,204,113,0.35)" },
    outline:   { background: "transparent", color: COLORS.blue, border: "2px solid " + COLORS.blue },
    ghost:     { background: "transparent", color: COLORS.navy },
    dark:      { background: COLORS.navy,  color: COLORS.white },
    danger:    { background: COLORS.red,   color: COLORS.white },
  };
  return <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>{children}</button>;
};
const Input = ({ label, required, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>{label} {required && <span style={{ color: COLORS.red }}>*</span>}</label>}
    <input {...props} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid " + COLORS.border, borderRadius: 10, fontSize: 14, fontFamily: FONT_BODY, outline: "none", boxSizing: "border-box", ...(props.style || {}) }} />
  </div>
);
const Select = ({ label, required, children, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>{label} {required && <span style={{ color: COLORS.red }}>*</span>}</label>}
    <select {...props} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid " + COLORS.border, borderRadius: 10, fontSize: 14, fontFamily: FONT_BODY, outline: "none", background: COLORS.white, boxSizing: "border-box", appearance: "none", cursor: "pointer" }}>{children}</select>
  </div>
);
const Textarea = ({ label, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>{label}</label>}
    <textarea {...props} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid " + COLORS.border, borderRadius: 10, fontSize: 14, fontFamily: FONT_BODY, outline: "none", resize: "vertical", boxSizing: "border-box", minHeight: 90 }} />
  </div>
);
const Badge = ({ children, color = COLORS.blue }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", background: color + "1A", color, fontSize: 11, fontWeight: 700, borderRadius: 20, fontFamily: FONT_HEAD, letterSpacing: "0.04em", textTransform: "uppercase" }}>{children}</span>
);
const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, border: "1px solid " + COLORS.border, boxShadow: "0 2px 12px rgba(10,31,68,0.04)", ...style }}>{children}</div>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ page, setPage, track }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    ["home","Home"],
    ["services","Services"],
    ["airbnb","Airbnb Cleaning"],
    ["deep-cleaning","Deep Cleaning"],
    ["move-out","Move-Out"],
    ["become-cleaner","Cleaning Jobs"],
    ["contact","Contact"],
  ];
  const go = (id) => { track("nav_click", { to: id }); setPage(id); setMobileOpen(false); window.scrollTo(0, 0); };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.white, borderBottom: "1px solid " + COLORS.border }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, " + COLORS.blue + ", " + COLORS.navy + ")", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontWeight: 800, fontSize: 16, fontFamily: FONT_HEAD }}>R3</div>
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 17, color: COLORS.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>R3VIV3</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: COLORS.muted, marginTop: 2, letterSpacing: "0.05em" }}>MINNEAPOLIS · TWIN CITIES</div>
          </div>
        </div>
        <nav className="desktop-nav" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {navItems.map(([id, label]) => (
            <a key={id} onClick={() => go(id)} style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: page === id ? 700 : 500, color: page === id ? COLORS.blue : COLORS.text, cursor: "pointer" }}>{label}</a>
          ))}
          <Button onClick={() => go("book")} variant="primary" size="md">Book Cleaning</Button>
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-only" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 8 }}>
          <div style={{ width: 24, height: 2, background: COLORS.navy, marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: COLORS.navy, marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: COLORS.navy }} />
        </button>
      </div>
      {mobileOpen && (
        <div style={{ borderTop: "1px solid " + COLORS.border, padding: 20, background: COLORS.white }}>
          {navItems.map(([id, label]) => (
            <div key={id} onClick={() => go(id)} style={{ padding: "12px 0", fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, color: page === id ? COLORS.blue : COLORS.text, borderBottom: "1px solid " + COLORS.gray, cursor: "pointer" }}>{label}</div>
          ))}
          <Button onClick={() => go("book")} variant="primary" size="lg" style={{ width: "100%", marginTop: 16 }}>Book Cleaning</Button>
        </div>
      )}
    </header>
  );
}

// ─── SERVICE AREAS BLOCK (used on multiple pages for SEO) ─────────────────────
function ServiceAreasBlock() {
  return (
    <section style={{ padding: "60px 20px", background: COLORS.white, borderTop: "1px solid " + COLORS.border }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Badge>Service Areas</Badge>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 800, color: COLORS.navy, margin: "12px 0 8px", letterSpacing: "-0.01em" }}>Cleaning Services Across the Twin Cities</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: COLORS.muted, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>R3VIV3 Cleaning Service proudly serves Minneapolis, St. Paul, and surrounding suburbs. Same-day availability in many neighborhoods.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 6, maxWidth: 1000, margin: "0 auto" }}>
          {SEO.serviceAreas.map((city) => (
            <div key={city} style={{ padding: "8px 12px", fontFamily: FONT_BODY, fontSize: 13, color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.green }}>✓</span> {city}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24, fontFamily: FONT_BODY, fontSize: 13, color: COLORS.muted }}>
          Don't see your area? <a style={{ color: COLORS.blue, fontWeight: 600 }}>Contact us</a> — we may still be able to help.
        </div>
      </div>
    </section>
  );
}

// ─── FAQ BLOCK (great for SEO + FAQ schema) ────────────────────────────────────
function FAQBlock({ faqs }) {
  const [openIdx, setOpenIdx] = useState(null);
  // Add FAQ schema
  useEffect(() => {
    let el = document.getElementById("ld-faq");
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "ld-faq";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    });
    return () => {
      const e = document.getElementById("ld-faq");
      if (e) e.remove();
    };
  }, [faqs]);
  return (
    <section style={{ padding: "60px 20px", background: COLORS.gray }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Badge>FAQ</Badge>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: "12px 0 8px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ background: COLORS.white, borderRadius: 12, padding: 18, marginBottom: 10, border: "1px solid " + COLORS.border, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{f.q}</div>
              <div style={{ fontSize: 20, color: COLORS.blue, fontWeight: 700 }}>{openIdx === i ? "−" : "+"}</div>
            </div>
            {openIdx === i && (
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLORS.text, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: "1px solid " + COLORS.border }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF BLOCK ───────────────────────────────────────────────────────
function SocialProofBlock() {
  const reviews = [
    {
      name: "Sarah K.",
      location: "Uptown Minneapolis",
      service: "Standard Cleaning",
      rating: 5,
      text: "R3VIV3 made my move-in so much easier. The cleaner was professional, on time, and my apartment looked spotless. The photo confirmation gave me total peace of mind.",
      initial: "S",
      color: COLORS.blue,
    },
    {
      name: "Marcus T.",
      location: "St. Paul",
      service: "Airbnb Turnover",
      rating: 5,
      text: "I've tried 3 cleaning services for my Airbnb and R3VIV3 is the only one I trust now. Same-day turnovers, photo proof every time, and my guests have left 5-star cleanliness reviews consistently.",
      initial: "M",
      color: COLORS.green,
    },
    {
      name: "Jennifer L.",
      location: "Edina",
      service: "Deep Cleaning",
      rating: 5,
      text: "Best deep clean I've ever had. They got into spots I didn't even think about — baseboards, behind the fridge, light fixtures. Worth every penny.",
      initial: "J",
      color: COLORS.purple,
    },
    {
      name: "David R.",
      location: "Maple Grove",
      service: "Move-Out Cleaning",
      rating: 5,
      text: "Got my full deposit back thanks to R3VIV3. My landlord even commented on how clean the apartment was. Booked online in 2 minutes, paid securely, and the team handled everything.",
      initial: "D",
      color: COLORS.warn,
    },
  ];

  return (
    <section style={{ padding: "80px 20px", background: COLORS.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Badge color={COLORS.green}>5-Star Reviews</Badge>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 32, fontWeight: 800, color: COLORS.navy, margin: "12px 0 12px", letterSpacing: "-0.02em" }}>What Twin Cities clients say</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: "#FBBF24", fontSize: 22 }}>★</span>)}</div>
            <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.navy, marginLeft: 6 }}>4.9</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLORS.muted, marginLeft: 4 }}>· based on 127+ cleanings</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <Card key={i}>
              <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: r.color, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 18 }}>{r.initial}</div>
                <div>
                  <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{r.name}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.muted }}>{r.location}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 1, marginBottom: 10 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#FBBF24", fontSize: 14 }}>★</span>)}</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLORS.text, lineHeight: 1.7, margin: "0 0 12px" }}>"{r.text}"</p>
              <Badge color={r.color}>{r.service}</Badge>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, paddingTop: 40, borderTop: "1px solid " + COLORS.border }}>
          {[
            { icon: "🛡️", n: "100%", l: "Background Checked" },
            { icon: "📸", n: "127+", l: "Photo-Confirmed Cleans" },
            { icon: "⭐", n: "4.9/5", l: "Average Client Rating" },
            { icon: "📍", n: "28+", l: "Twin Cities Areas Served" },
          ].map((t) => (
            <div key={t.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 800, color: COLORS.navy, lineHeight: 1 }}>{t.n}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage, track }) {
  useSEO("home");
  const homeFAQs = [
    { q: "How much does house cleaning cost in Minneapolis?", a: "Standard house cleaning in Minneapolis with R3VIV3 starts at $120 for 1-bedroom homes, $140 for 2-bedrooms, and $170 for 3-bedrooms. Deep cleaning starts at $180. Airbnb turnovers from $150. Move-out cleaning from $200. Get an instant quote on our booking page." },
    { q: "What areas of the Twin Cities do you serve?", a: "We serve Minneapolis, St. Paul, Edina, Bloomington, Maple Grove, Plymouth, Minnetonka, St. Louis Park, Eden Prairie, Brooklyn Park, Fridley, Roseville, Eagan, Burnsville, and many more Twin Cities suburbs." },
    { q: "Do you do Airbnb turnover cleaning?", a: "Yes — Airbnb cleaning is one of our specialties. We offer same-day turnovers between guests, linen reset, restocking, photo confirmation, and damage reporting. Built specifically for Twin Cities Airbnb hosts." },
    { q: "Are your cleaners background-checked?", a: "Yes. Every cleaner working through R3VIV3 goes through application review, experience verification, and background screening before being assigned to any job." },
    { q: "How quickly can I book a cleaning?", a: "Most bookings can be scheduled within 24-48 hours in the Minneapolis area. Same-day cleaning is sometimes available. Book online for instant pricing and the fastest scheduling." },
    { q: "Do I need to provide cleaning supplies?", a: "No — our cleaners bring their own professional cleaning supplies and equipment. If you have specific products you'd prefer they use (allergies, eco-preferences), just note it in your booking instructions." },
  ];
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, " + COLORS.navy + " 0%, " + COLORS.blue + " 100%)", color: COLORS.white, padding: "80px 20px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(46,204,113,0.2), transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -150, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(0,87,255,0.3), transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(46,204,113,0.2)", border: "1px solid rgba(46,204,113,0.4)", borderRadius: 99, fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 600, color: COLORS.green, marginBottom: 22, letterSpacing: "0.04em" }}>
            <span>📍</span> NOW SERVING MINNEAPOLIS &amp; ST. PAUL
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
            House Cleaning in Minneapolis<br /><span style={{ color: COLORS.green }}>Without the Stress</span>
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.9)", maxWidth: 580, margin: "0 0 32px" }}>
            R3VIV3 Cleaning Service helps Minneapolis homeowners, renters, and Airbnb hosts book fast, reliable cleanings with photo confirmation on every job. Standard, deep, Airbnb turnover, and move-out cleaning across the Twin Cities.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button onClick={() => { track("cta_click", { cta: "hero_book" }); setPage("book"); window.scrollTo(0,0); }} size="lg" variant="secondary">Book Cleaning →</Button>
            <Button onClick={() => { track("cta_click", { cta: "hero_cleaner" }); setPage("become-cleaner"); window.scrollTo(0,0); }} size="lg" variant="outline" style={{ background: "rgba(255,255,255,0.1)", color: COLORS.white, borderColor: "rgba(255,255,255,0.4)" }}>Become a Cleaner</Button>
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 40, flexWrap: "wrap" }}>
            {[["⭐ 4.9","Average Rating"],["📸 100%","Photo Confirmed"],["⚡ 24hr","Quick Booking"],["📍 28+","Cities Served"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 800 }}>{n}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services with SEO-friendly H2s and links */}
      <section style={{ padding: "80px 20px", background: COLORS.gray }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 700, margin: "0 auto 40px" }}>
            <Badge>Our Services</Badge>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: "12px 0 14px", letterSpacing: "-0.02em" }}>Minneapolis Cleaning Services</h2>
            <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.6, margin: 0 }}>From routine house cleaning to Airbnb turnovers, we cover every cleaning need across the Twin Cities.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {[
              { icon: "🏡", title: "Standard House Cleaning", desc: "Routine cleaning for Minneapolis homes", price: "From $120", page: "services" },
              { icon: "✨", title: "Deep Cleaning Minneapolis", desc: "Detailed top-to-bottom service", price: "From $180", page: "deep-cleaning" },
              { icon: "🔑", title: "Airbnb Cleaning Minneapolis", desc: "Same-day turnovers for hosts", price: "From $150", page: "airbnb" },
              { icon: "📦", title: "Move-Out Cleaning Minneapolis", desc: "Get your deposit back", price: "From $200", page: "move-out" },
            ].map(s => (
              <Card key={s.title} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { setPage(s.page); window.scrollTo(0,0); }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLORS.muted, lineHeight: 1.5, margin: "0 0 14px" }}>{s.desc}</p>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, color: COLORS.blue, fontSize: 15 }}>{s.price}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Minneapolis Trusts Us */}
      <section style={{ padding: "80px 20px", background: COLORS.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Badge>Trust & Quality</Badge>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 32, fontWeight: 800, color: COLORS.navy, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>Why Twin Cities homeowners trust R3VIV3</h2>
            <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>Reliable cleaners. Photo-confirmed jobs. Quality-checked every time.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { i: "📷", t: "Photo Confirmation", d: "Every job includes before & after photos." },
              { i: "🛡️", t: "Vetted Local Cleaners", d: "Background-checked Minnesota cleaners." },
              { i: "⚡", t: "Fast Twin Cities Booking", d: "Same-day or next-day availability." },
              { i: "✅", t: "Quality Checks", d: "Manual review on every completed clean." },
            ].map(t => (
              <Card key={t.t}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{t.i}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 6 }}>{t.t}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.muted, lineHeight: 1.5, margin: 0 }}>{t.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SocialProofBlock />
      <FAQBlock faqs={homeFAQs} />
      <ServiceAreasBlock />

      <section style={{ padding: "80px 20px", background: "linear-gradient(135deg, " + COLORS.navy + ", " + COLORS.blue + ")", color: COLORS.white, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px" }}>Ready for a cleaner space in Minneapolis?</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.9)", margin: "0 0 30px" }}>Book online in under 2 minutes. Instant pricing, secure payment, photo confirmation.</p>
          <Button onClick={() => { track("cta_click", { cta: "footer_book" }); setPage("book"); window.scrollTo(0,0); }} size="lg" variant="secondary">Book Your Cleaning →</Button>
        </div>
      </section>
    </>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  useSEO("services");
  const services = [
    { icon:"🏡", title:"Standard House Cleaning Minneapolis", price:"$120 – $180", desc:"Routine maintenance cleaning for Minneapolis and Twin Cities homes that just need consistent care.", includes:["Dust all surfaces","Vacuum and mop","Kitchen wipe-down","Bathroom sanitization","Trash removal","Bed making"], page: "book" },
    { icon:"✨", title:"Deep Cleaning Minneapolis", price:"$180 – $280", desc:"Top-to-bottom service for Minneapolis homes that need extra attention. Perfect for spring cleaning or seasonal resets.", includes:["Everything in standard","Baseboards","Inside windows","Behind appliances","Fan blades","Detailed kitchen"], page: "deep-cleaning" },
    { icon:"🔑", title:"Airbnb Turnover Cleaning Minneapolis", price:"$150 – $250", desc:"Photo-confirmed Airbnb turnovers for Twin Cities hosts. Fast, reliable, with linen reset and restocking.", includes:["Full clean and reset","Linen change","Restock supplies","Photo report","Inventory check","Damage notes"], page: "airbnb" },
    { icon:"📦", title:"Move-In / Move-Out Cleaning Minneapolis", price:"From $200", desc:"End-of-lease cleaning to get your full deposit back, or move-in cleaning to start fresh in your new Twin Cities home.", includes:["Empty home detailed clean","Inside all cabinets","Inside fridge and oven","Inside windows","All baseboards","Final walk-through"], page: "move-out" },
  ];
  return (
    <div style={{ background: COLORS.gray, padding: "50px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Badge>Cleaning Services Minneapolis</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 38, fontWeight: 800, color: COLORS.navy, margin: "14px 0 12px", letterSpacing: "-0.02em" }}>Cleaning packages for every space in the Twin Cities</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: COLORS.muted, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>Whether you need standard house cleaning, deep cleaning, Airbnb turnovers, or move-out cleaning in Minneapolis or any Twin Cities suburb — we have a package that fits.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {services.map(s => (
            <Card key={s.title}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
              <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 20, color: COLORS.navy, margin: "0 0 8px" }}>{s.title}</h2>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, color: COLORS.blue, fontSize: 15, marginBottom: 12 }}>{s.price}</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 18 }}>{s.desc}</p>
              <div style={{ borderTop: "1px solid " + COLORS.border, paddingTop: 14, marginBottom: 18 }}>
                {s.includes.map(i => <div key={i} style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.text, padding: "5px 0", display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: COLORS.green, fontWeight: 700 }}>✓</span> {i}</div>)}
              </div>
              <Button onClick={() => { setPage(s.page); window.scrollTo(0,0); }} variant="primary" style={{ width: "100%" }}>Learn More</Button>
            </Card>
          ))}
        </div>
      </div>
      <ServiceAreasBlock />
    </div>
  );
}

// ─── AIRBNB DEDICATED LANDING PAGE ────────────────────────────────────────────
function AirbnbPage({ setPage }) {
  useSEO("airbnb");
  const airbnbFAQs = [
    { q: "How fast can you turn over my Airbnb in Minneapolis?", a: "We specialize in same-day Airbnb turnovers in Minneapolis and St. Paul. Most check-out to check-in windows of 4+ hours can be accommodated. We coordinate directly with your booking calendar." },
    { q: "Do you provide linens and supplies for Airbnb cleaning?", a: "We don't provide the linens themselves, but we handle the full reset — stripping, washing (if onsite), making beds with your supplies, and restocking your provided amenities like toilet paper, soap, and paper goods." },
    { q: "What's included in an Airbnb turnover clean?", a: "Full clean of all rooms, linen change, restock, photo report sent to host after every turnover, inventory check, and damage notes flagged immediately. Built specifically for short-term rental hosts." },
    { q: "How much does Airbnb cleaning cost in Minneapolis?", a: "Airbnb turnovers in Minneapolis start at $150 and cap at $250 depending on size. Hosts can pass this fee through to guests as a cleaning fee in their listing." },
  ];
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, " + COLORS.navy + ", " + COLORS.blue + ")", color: COLORS.white, padding: "70px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Badge color={COLORS.green}>For Airbnb Hosts in Minneapolis</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "16px 0 18px" }}>Airbnb Cleaning &amp; Turnover Service in Minneapolis</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: "0 0 28px" }}>Same-day Airbnb turnovers across Minneapolis, St. Paul, and the Twin Cities. Photo confirmation, linen reset, restocking, and damage reporting on every turnover.</p>
          <Button onClick={() => { setPage("book"); window.scrollTo(0,0); }} variant="secondary" size="lg">Book a Turnover →</Button>
        </div>
      </section>
      <section style={{ padding: "70px 20px", background: COLORS.gray }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, fontWeight: 800, color: COLORS.navy, margin: "0 0 12px" }}>Everything covered between guest stays</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: COLORS.muted, maxWidth: 600, margin: "0 auto" }}>Built specifically for Twin Cities Airbnb hosts. Trusted by hosts in Uptown, North Loop, Northeast, and across Minneapolis.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[{ i:"🧽", t:"Full Clean", d:"Bathrooms, kitchen, every surface." },{ i:"🛏️", t:"Linen Reset", d:"Strip, wash if onsite, fresh make-up." },{ i:"🧴", t:"Restocking", d:"Toilet paper, soap, paper goods, amenities." },{ i:"📷", t:"Photo Report", d:"Visual confirmation on every turnover." },{ i:"📋", t:"Damage Notes", d:"We flag issues immediately to protect your listing." },{ i:"⚡", t:"Same-Day", d:"Tight check-in to check-out windows." }].map(s => (
              <Card key={s.t}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.i}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 16, color: COLORS.navy, margin: "0 0 6px" }}>{s.t}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.muted, lineHeight: 1.5, margin: 0 }}>{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FAQBlock faqs={airbnbFAQs} />
      <ServiceAreasBlock />
    </div>
  );
}

// ─── DEEP CLEANING DEDICATED LANDING PAGE ─────────────────────────────────────
function DeepCleaningPage({ setPage }) {
  useSEO("deep-cleaning");
  const deepFAQs = [
    { q: "What's the difference between standard and deep cleaning in Minneapolis?", a: "Standard cleaning covers visible surfaces and routine maintenance. Deep cleaning adds baseboards, behind appliances, inside windows, fan blades, detailed kitchen and bathroom scrubbing, and other often-missed areas. Recommended every 3-6 months or when first hiring a cleaner." },
    { q: "How long does a deep clean take in a typical Minneapolis home?", a: "A 2-bedroom Minneapolis home typically takes 4-6 hours for a deep clean. Larger 3+ bedroom homes can take 6-8 hours. Our pricing reflects the time and detail involved." },
    { q: "How much does deep cleaning cost in Minneapolis?", a: "Deep cleaning in Minneapolis starts at $180 for 1-bedroom and scales based on bedrooms and bathrooms. Get an instant quote on the booking page." },
  ];
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, " + COLORS.navy + ", " + COLORS.blue + ")", color: COLORS.white, padding: "70px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Badge color={COLORS.green}>Top-to-Bottom Service</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "16px 0 18px" }}>Deep Cleaning Service in Minneapolis</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: "0 0 28px" }}>Detailed top-to-bottom deep cleaning in Minneapolis and the Twin Cities. Baseboards, inside windows, behind appliances, and every detail commonly missed by routine cleans.</p>
          <Button onClick={() => { setPage("book"); window.scrollTo(0,0); }} variant="secondary" size="lg">Get Your Quote →</Button>
        </div>
      </section>
      <section style={{ padding: "70px 20px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: 0 }}>What's included in a Minneapolis deep clean</h2>
          </div>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {["All standard cleaning tasks","Baseboards detailed","Inside all windows","Behind and under appliances","Ceiling fans and light fixtures","Detailed kitchen scrub","Detailed bathroom scrub","Inside microwave","Cabinet fronts","Door frames and switch plates","Air vents dusted","Detailed dust on shelves"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: COLORS.green, fontWeight: 700, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <FAQBlock faqs={deepFAQs} />
      <ServiceAreasBlock />
    </div>
  );
}

// ─── MOVE-OUT DEDICATED LANDING PAGE ──────────────────────────────────────────
function MoveOutPage({ setPage }) {
  useSEO("move-out");
  const moveOutFAQs = [
    { q: "Will move-out cleaning get my full deposit back in Minneapolis?", a: "Our move-out cleaning is designed to meet typical Minneapolis and Twin Cities lease requirements for full deposit return. We handle inside cabinets, fridge, oven, baseboards, and every common deduction area. Final approval depends on your specific lease and landlord." },
    { q: "How long before my move-out date should I book?", a: "We recommend booking your Minneapolis move-out clean for the day after you move out (empty home) and at least 1-2 weeks in advance for best availability. Same-week booking is sometimes possible." },
    { q: "Do you do move-in cleaning too?", a: "Yes — move-in cleaning is just as common. Many Twin Cities renters book move-in cleaning before unpacking to start fresh in their new place. Same pricing structure applies." },
    { q: "How much does move-out cleaning cost in Minneapolis?", a: "Move-out cleaning starts at $200 for 1-bedroom apartments. Pricing scales with bedrooms and bathrooms. Get an instant quote on the booking page." },
  ];
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, " + COLORS.navy + ", " + COLORS.blue + ")", color: COLORS.white, padding: "70px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Badge color={COLORS.green}>Get Your Deposit Back</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "16px 0 18px" }}>Move-In / Move-Out Cleaning Minneapolis</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: "0 0 28px" }}>End-of-lease move-out cleaning to maximize your deposit return, or move-in cleaning to start fresh. Trusted across Minneapolis, St. Paul, and the Twin Cities.</p>
          <Button onClick={() => { setPage("book"); window.scrollTo(0,0); }} variant="secondary" size="lg">Book Move-Out Cleaning →</Button>
        </div>
      </section>
      <section style={{ padding: "70px 20px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: 0 }}>What's included in Minneapolis move-out cleaning</h2>
          </div>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {["Empty home detailed clean","Inside all cabinets and drawers","Inside fridge","Inside oven","Inside microwave","Inside dishwasher","Inside windows and tracks","All baseboards","Closet shelves","Doors and frames","Light fixtures and fans","Final walk-through"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: COLORS.green, fontWeight: 700, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <FAQBlock faqs={moveOutFAQs} />
      <ServiceAreasBlock />
    </div>
  );
}

// ─── BOOKING ──────────────────────────────────────────────────────────────────
function BookingPage({ addBooking, navigateToCheckout, track }) {
  useSEO("book");
  const [form, setForm] = useState({ name:"", phone:"", email:"", address:"", cleaningType:"standard", bedrooms:"1", bathrooms:"1", sqft:"", pets:"no", date:"", time:"", instructions:"", addons: { fridge:false, oven:false, cabinets:false, laundry:false } });
  const [errors, setErrors] = useState({});
  const setField = (k, v) => setForm({ ...form, [k]: v });
  const setAddon = (k) => setForm({ ...form, addons: { ...form.addons, [k]: !form.addons[k] } });
  const pricing = useMemo(() => calculatePrice(form), [form]);
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim()) e.email = "Required"; else if (!form.email.includes("@")) e.email = "Invalid email";
    if (!form.address.trim()) e.address = "Required";
    if (!form.date) e.date = "Required";
    if (!form.time) e.time = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = () => {
    if (!validate()) return;
    track("booking_form_submitted", { service: form.cleaningType, price: pricing.total });
    const booking = { id: "BK-" + Date.now(), ...form, price: pricing.total, status: "Awaiting Payment", createdAt: new Date().toISOString(), assignedCleaner: null, beforePhotos: [], afterPhotos: [], cleanerNotes: "", cleanerPay: Math.round(pricing.total * 0.65) };
    addBooking(booking);
    navigateToCheckout(booking);
  };
  return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "50px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Badge>Book Your Minneapolis Cleaning</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: "14px 0 8px", letterSpacing: "-0.02em" }}>Get Your Instant Quote</h1>
          <p style={{ fontFamily: FONT_BODY, color: COLORS.muted, fontSize: 16, margin: 0 }}>Fill out the form, get your price, and confirm with payment.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 30 }} className="booking-grid">
          <Card>
            <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginTop: 0, marginBottom: 20 }}>📋 Your Information</h2>
            <Input label="Full Name" required placeholder="Jane Smith" value={form.name} onChange={(e) => setField("name", e.target.value)} />
            {errors.name && <div style={{ color: COLORS.red, fontSize: 12, marginTop: -10, marginBottom: 10 }}>{errors.name}</div>}
            <Input label="Phone Number" required placeholder="Your phone number" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            {errors.phone && <div style={{ color: COLORS.red, fontSize: 12, marginTop: -10, marginBottom: 10 }}>{errors.phone}</div>}
            <Input label="Email" required type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => setField("email", e.target.value)} />
            {errors.email && <div style={{ color: COLORS.red, fontSize: 12, marginTop: -10, marginBottom: 10 }}>{errors.email}</div>}
            <Input label="Property Address" required placeholder="123 Lake St, Minneapolis MN" value={form.address} onChange={(e) => setField("address", e.target.value)} />
            {errors.address && <div style={{ color: COLORS.red, fontSize: 12, marginTop: -10, marginBottom: 10 }}>{errors.address}</div>}
            <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginTop: 28, marginBottom: 20 }}>🏠 Cleaning Details</h2>
            <Select label="Cleaning Type" required value={form.cleaningType} onChange={(e) => setField("cleaningType", e.target.value)}>
              <option value="standard">Standard House Cleaning</option>
              <option value="deep">Deep Cleaning</option>
              <option value="airbnb">Airbnb Turnover</option>
              <option value="moveout">Move-In / Move-Out</option>
            </Select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Select label="Bedrooms" required value={form.bedrooms} onChange={(e) => setField("bedrooms", e.target.value)}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} bedroom{n > 1 ? "s" : ""}</option>)}</Select>
              <Select label="Bathrooms" required value={form.bathrooms} onChange={(e) => setField("bathrooms", e.target.value)}>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} bathroom{n > 1 ? "s" : ""}</option>)}</Select>
            </div>
            <Input label="Square Footage (optional)" type="number" placeholder="e.g. 1500" value={form.sqft} onChange={(e) => setField("sqft", e.target.value)} />
            <Select label="Pets in Home?" value={form.pets} onChange={(e) => setField("pets", e.target.value)}><option value="no">No pets</option><option value="yes">Yes, pets in home</option></Select>
            <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginTop: 28, marginBottom: 20 }}>📅 Schedule</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Preferred Date" required type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
              <Select label="Time Window" required value={form.time} onChange={(e) => setField("time", e.target.value)}>
                <option value="">Select time</option>
                <option value="8-10am">8 AM – 10 AM</option>
                <option value="10-12pm">10 AM – 12 PM</option>
                <option value="12-2pm">12 PM – 2 PM</option>
                <option value="2-4pm">2 PM – 4 PM</option>
                <option value="4-6pm">4 PM – 6 PM</option>
              </Select>
            </div>
            <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginTop: 28, marginBottom: 20 }}>✨ Add-Ons</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["fridge","Inside Fridge","+$35"],["oven","Inside Oven","+$35"],["cabinets","Inside Cabinets","+$40"],["laundry","Laundry / Linen","+$25"]].map(([key, label, price]) => (
                <div key={key} onClick={() => setAddon(key)} style={{ padding: "12px 14px", border: "1.5px solid " + (form.addons[key] ? COLORS.blue : COLORS.border), borderRadius: 10, cursor: "pointer", background: form.addons[key] ? COLORS.blue + "0F" : COLORS.white }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: form.addons[key] ? COLORS.blue : COLORS.text }}>{label}</span>
                    <span style={{ fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700, color: form.addons[key] ? COLORS.blue : COLORS.muted }}>{price}</span>
                  </div>
                </div>
              ))}
            </div>
            <Textarea label="Special Instructions" placeholder="Gate code, parking notes, cleaner preferences..." value={form.instructions} onChange={(e) => setField("instructions", e.target.value)} style={{ marginTop: 14 }} />
          </Card>
          <Card style={{ position: "sticky", top: 100, alignSelf: "start", height: "fit-content" }}>
            <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 18, color: COLORS.navy, marginTop: 0, marginBottom: 20 }}>Your Quote</h2>
            <div style={{ background: COLORS.gray, padding: 18, borderRadius: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: FONT_BODY, fontSize: 14 }}><span style={{ color: COLORS.muted }}>Base service</span><span style={{ fontWeight: 600 }}>${pricing.base}</span></div>
              {pricing.addons > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: FONT_BODY, fontSize: 14 }}><span style={{ color: COLORS.muted }}>Add-ons</span><span style={{ fontWeight: 600 }}>+${pricing.addons}</span></div>}
              <div style={{ borderTop: "1px solid " + COLORS.border, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 16, color: COLORS.navy }}>Total</span>
                <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 26, color: COLORS.blue }}>${pricing.total}</span>
              </div>
            </div>
            <div style={{ background: COLORS.green + "1A", border: "1px solid " + COLORS.green + "55", borderRadius: 10, padding: 12, marginBottom: 16, fontFamily: FONT_BODY, fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>💡 <strong>Booking is confirmed only after successful payment.</strong></div>
            <Button onClick={handleSubmit} variant="primary" size="lg" style={{ width: "100%" }}>Continue to Payment →</Button>
            <div style={{ textAlign: "center", marginTop: 12, fontFamily: FONT_BODY, fontSize: 12, color: COLORS.muted }}>🔒 Secure payment via Stripe</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT / SUCCESS ───────────────────────────────────────────────────────
function CheckoutPage({ booking, onPaymentSuccess, setPage, track }) {
  const [processing, setProcessing] = useState(false);
  if (!booking) return <div style={{ padding: 60, textAlign: "center", fontFamily: FONT_BODY }}><p>No booking selected.</p><Button onClick={() => setPage("book")} variant="primary">Start Booking →</Button></div>;
  const handlePayment = () => {
    setProcessing(true);
    track("payment_initiated", { booking_id: booking.id, amount: booking.price });
    setTimeout(() => { onPaymentSuccess(booking.id); setProcessing(false); }, 1800);
  };
  return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "50px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Card>
          <Badge color={COLORS.warn}>Awaiting Payment</Badge>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 800, color: COLORS.navy, marginTop: 14, marginBottom: 20 }}>Confirm Your Booking</h2>
          <div style={{ background: COLORS.gray, padding: 18, borderRadius: 12, marginBottom: 22 }}>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Booking Summary</div>
            {[["Name", booking.name],["Service", { standard:"Standard Cleaning", deep:"Deep Cleaning", airbnb:"Airbnb Turnover", moveout:"Move In/Out" }[booking.cleaningType]],["Property", booking.bedrooms + " bed · " + booking.bathrooms + " bath"],["Address", booking.address],["Date", booking.date + " · " + booking.time]].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: FONT_BODY, fontSize: 14 }}><span style={{ color: COLORS.muted }}>{label}</span><span style={{ fontWeight: 600, color: COLORS.text, textAlign: "right" }}>{value}</span></div>
            ))}
            <div style={{ borderTop: "1px solid " + COLORS.border, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 17, color: COLORS.navy }}>Total Due</span>
              <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 28, color: COLORS.blue }}>${booking.price}</span>
            </div>
          </div>
          <div style={{ background: COLORS.blue + "0F", border: "1px solid " + COLORS.blue + "33", borderRadius: 10, padding: 14, marginBottom: 22, fontFamily: FONT_BODY, fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>🔒 Your booking will be confirmed once payment succeeds.</div>
          {processing ? (
            <div style={{ textAlign: "center", padding: 30 }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>⏳</div>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 16, color: COLORS.navy }}>Processing payment...</div>
            </div>
          ) : (
            <>
              <Button onClick={handlePayment} variant="primary" size="lg" style={{ width: "100%" }}>Pay ${booking.price} Securely →</Button>
              <Button onClick={() => setPage("book")} variant="ghost" size="md" style={{ width: "100%", marginTop: 10 }}>← Back to Booking</Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function PaymentSuccessPage({ booking, setPage }) {
  if (!booking) return null;
  return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "60px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ width: 80, height: 80, background: COLORS.green, borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: COLORS.white }}>✓</div>
          <Badge color={COLORS.green}>Payment Successful</Badge>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, marginTop: 14, marginBottom: 12 }}>Booking Confirmed!</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: COLORS.muted, lineHeight: 1.6, margin: "0 0 24px" }}>Booking <strong style={{ color: COLORS.text }}>{booking.id}</strong> is paid and ready to be assigned.</p>
          <Button onClick={() => { setPage("home"); window.scrollTo(0,0); }} variant="primary" size="lg" style={{ width: "100%" }}>Back to Home</Button>
        </Card>
      </div>
    </div>
  );
}

// ─── BECOME CLEANER ───────────────────────────────────────────────────────────
function BecomeCleanerPage({ addCleanerApp, track }) {
  useSEO("become-cleaner");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", area:"", experience:"", supplies:"no", transport:"no", availability:"", airbnb:"no", photos:"", agree:false });
  const [errors, setErrors] = useState({});
  const setField = (k, v) => setForm({ ...form, [k]: v });
  const submit = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.phone) e.phone = "Required";
    if (!form.email) e.email = "Required";
    if (!form.area) e.area = "Required";
    if (!form.experience) e.experience = "Required";
    if (!form.availability) e.availability = "Required";
    if (!form.agree) e.agree = "Required";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    track("cleaner_application_submitted", { area: form.area });
    addCleanerApp({ id: "APP-" + Date.now(), ...form, status: "Pending Review", submittedAt: new Date().toISOString() });
    setSubmitted(true);
  };
  if (submitted) return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "60px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: "0 0 12px" }}>Application Received!</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: COLORS.muted, lineHeight: 1.6 }}>We will review your application within 24-48 hours.</p>
        </Card>
      </div>
    </div>
  );
  return (
    <div style={{ background: COLORS.gray, padding: "50px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Badge color={COLORS.green}>Cleaning Jobs in Minneapolis</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>Earn cleaning with R3VIV3 in the Twin Cities</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: COLORS.muted, lineHeight: 1.6 }}>Set your own schedule. Steady jobs. Paid quickly. Independent contractor opportunities across Minneapolis and St. Paul.</p>
        </div>
        <Card>
          <Input label="Full Name" required value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Maria Lopez" />
          {errors.name && <div style={{ color: COLORS.red, fontSize: 12, marginTop: -10, marginBottom: 10 }}>{errors.name}</div>}
          <Input label="Phone Number" required value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Your phone number" />
          <Input label="Email" required type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="maria@email.com" />
          <Input label="City / Area Served" required value={form.area} onChange={(e) => setField("area", e.target.value)} placeholder="e.g. Minneapolis, St Paul" />
          <Select label="Cleaning Experience" required value={form.experience} onChange={(e) => setField("experience", e.target.value)}>
            <option value="">Select experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </Select>
          <Select label="Do you have your own cleaning supplies?" value={form.supplies} onChange={(e) => setField("supplies", e.target.value)}><option value="yes">Yes</option><option value="no">No</option></Select>
          <Select label="Do you have reliable transportation?" value={form.transport} onChange={(e) => setField("transport", e.target.value)}><option value="yes">Yes</option><option value="no">No</option></Select>
          <Input label="Availability" required value={form.availability} onChange={(e) => setField("availability", e.target.value)} placeholder="e.g. Weekends, weekdays after 3pm" />
          <Select label="Can you complete Airbnb turnovers?" value={form.airbnb} onChange={(e) => setField("airbnb", e.target.value)}><option value="yes">Yes</option><option value="no">No</option></Select>
          <Textarea label="Photos of past work (paste links)" value={form.photos} onChange={(e) => setField("photos", e.target.value)} placeholder="Optional - paste portfolio link" />
          <div onClick={() => setField("agree", !form.agree)} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: form.agree ? COLORS.green + "1A" : COLORS.gray, border: "1.5px solid " + (form.agree ? COLORS.green : COLORS.border), borderRadius: 10, cursor: "pointer", marginTop: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, border: "2px solid " + (form.agree ? COLORS.green : COLORS.border), background: form.agree ? COLORS.green : COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, color: COLORS.white, fontWeight: 800, fontSize: 12 }}>{form.agree ? "✓" : ""}</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>I confirm I am applying as an independent contractor and am responsible for my own taxes and supplies.</div>
          </div>
          {errors.agree && <div style={{ color: COLORS.red, fontSize: 12, marginTop: 6 }}>You must agree to continue</div>}
          <Button onClick={submit} variant="secondary" size="lg" style={{ width: "100%", marginTop: 22 }}>Submit Application →</Button>
        </Card>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactPage({ addLead, track }) {
  useSEO("contact");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    track("lead_form_submitted", {});
    addLead({ id: "LD-" + Date.now(), ...form, type: "contact", createdAt: new Date().toISOString() });
    setSubmitted(true);
  };
  return (
    <div style={{ background: COLORS.gray, padding: "50px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Badge>Contact</Badge>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: "14px 0 8px", letterSpacing: "-0.02em" }}>Contact R3VIV3 Cleaning Minneapolis</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: COLORS.muted }}>Questions? Custom job? We are here to help across the Twin Cities.</p>
        </div>
        <Card>
          {submitted ? (
            <div style={{ textAlign: "center", padding: 30 }}>
              <div style={{ fontSize: 50, marginBottom: 14 }}>✅</div>
              <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.navy, margin: "0 0 10px" }}>Message Received!</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: COLORS.muted, lineHeight: 1.6 }}>We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input label="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Textarea label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." />
              <Button onClick={submit} variant="primary" size="lg" style={{ width: "100%" }}>Send Message →</Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── ANALYTICS DASHBOARD (admin only) ─────────────────────────────────────────
function AnalyticsDashboard({ bookings, leads, cleanerApps, events, clearEvents }) {
  const [range, setRange] = useState("30d");
  const filteredEvents = useMemo(() => {
    const now = Date.now();
    const cutoff = range === "24h" ? now - 86400000 : range === "7d" ? now - 7 * 86400000 : range === "30d" ? now - 30 * 86400000 : 0;
    return events.filter((e) => new Date(e.timestamp).getTime() >= cutoff);
  }, [events, range]);
  const filteredBookings = useMemo(() => {
    const now = Date.now();
    const cutoff = range === "24h" ? now - 86400000 : range === "7d" ? now - 7 * 86400000 : range === "30d" ? now - 30 * 86400000 : 0;
    return bookings.filter((b) => new Date(b.createdAt).getTime() >= cutoff);
  }, [bookings, range]);
  const pageViews = filteredEvents.filter((e) => e.name === "page_view").length;
  const paid = filteredBookings.filter((b) => b.status !== "Awaiting Payment").length;
  const conversionRate = pageViews > 0 ? ((paid / pageViews) * 100).toFixed(1) : "0.0";
  const paidBookings = filteredBookings.filter((b) => b.status !== "Awaiting Payment");
  const revenue = paidBookings.reduce((s, b) => s + b.price, 0);
  const payouts = paidBookings.reduce((s, b) => s + (b.cleanerPay || 0), 0);
  const profit = revenue - payouts;
  const StatCard = ({ label, value, color = COLORS.navy }) => (
    <Card style={{ padding: 18 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 800, color }}>{value}</div>
    </Card>
  );
  return (
    <div>
      <Card style={{ marginBottom: 20, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["24h","24h"],["7d","7d"],["30d","30d"],["all","All time"]].map(([id, label]) => (
            <button key={id} onClick={() => setRange(id)} style={{ padding: "8px 14px", border: "none", borderRadius: 8, background: range === id ? COLORS.navy : COLORS.gray, color: range === id ? COLORS.white : COLORS.text, fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{label}</button>
          ))}
        </div>
        <Button onClick={() => { if (window.confirm("Clear all events?")) clearEvents(); }} variant="ghost" size="sm">Clear Events</Button>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard label="Page Views" value={pageViews} color={COLORS.blue} />
        <StatCard label="Conversions" value={paid + " (" + conversionRate + "%)"} color={COLORS.green} />
        <StatCard label="Revenue" value={"$" + revenue} />
        <StatCard label="Profit" value={"$" + profit} color={COLORS.green} />
      </div>
      <Card>
        <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 16, color: COLORS.navy, margin: "0 0 14px" }}>Recent Activity</h3>
        {filteredEvents.length === 0 ? <div style={{ color: COLORS.muted, fontFamily: FONT_BODY, fontSize: 14, padding: 20, textAlign: "center" }}>No activity in this range.</div> : (
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {filteredEvents.slice(0, 50).map((e) => (
              <div key={e.id} style={{ padding: "10px 0", borderBottom: "1px solid " + COLORS.border, display: "flex", justifyContent: "space-between", fontFamily: FONT_BODY, fontSize: 13 }}>
                <div><span style={{ fontWeight: 600, color: COLORS.text }}>{e.name}</span></div>
                <span style={{ color: COLORS.muted, fontSize: 11 }}>{new Date(e.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminDashboard({ bookings, leads, cleanerApps, cleaners, assignCleaner, updateAppStatus, updateBookingStatus, events, clearEvents }) {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [tab, setTab] = useState("analytics");
  if (!authed) return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "60px 20px" }}>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <Card>
          <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.navy, marginTop: 0, marginBottom: 16 }}>Admin Login</h2>
          <Input type="password" placeholder="Enter admin password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <Button onClick={() => { if (pwd === "admin") setAuthed(true); else alert("Use 'admin' for demo"); }} variant="primary" size="lg" style={{ width: "100%" }}>Sign In</Button>
        </Card>
      </div>
    </div>
  );
  return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "30px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: 0 }}>Admin Dashboard</h1>
          <Button onClick={() => setAuthed(false)} variant="ghost" size="sm">Sign Out</Button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 18, overflowX: "auto" }}>
          {[["analytics","📊 Analytics"],["bookings","Bookings (" + bookings.length + ")"],["leads","Leads (" + leads.length + ")"],["apps","Apps (" + cleanerApps.length + ")"],["cleaners","Cleaners (" + cleaners.length + ")"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "9px 16px", border: "none", borderRadius: 8, background: tab === id ? COLORS.navy : COLORS.white, color: tab === id ? COLORS.white : COLORS.text, fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>{label}</button>
          ))}
        </div>
        {tab === "analytics" && <AnalyticsDashboard bookings={bookings} leads={leads} cleanerApps={cleanerApps} events={events} clearEvents={clearEvents} />}
        {tab === "bookings" && <Card>{bookings.length === 0 ? <div style={{ padding: 20, textAlign: "center", color: COLORS.muted }}>No bookings yet.</div> : bookings.map(b => <div key={b.id} style={{ padding: 14, borderBottom: "1px solid " + COLORS.border }}><strong>{b.id}</strong> · {b.name} · {b.cleaningType} · ${b.price} · <Badge color={b.status === "Paid" ? COLORS.green : COLORS.warn}>{b.status}</Badge>{b.status === "Paid" && cleaners.length > 0 && <select onChange={(e) => assignCleaner(b.id, e.target.value)} defaultValue="" style={{ marginLeft: 10, padding: 4 }}><option value="">Assign…</option>{cleaners.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>}</div>)}</Card>}
        {tab === "leads" && <Card>{leads.length === 0 ? <div style={{ padding: 20, textAlign: "center", color: COLORS.muted }}>No leads yet.</div> : leads.map(l => <div key={l.id} style={{ padding: 14, borderBottom: "1px solid " + COLORS.border }}><strong>{l.name}</strong> · {l.email} · {l.message}</div>)}</Card>}
        {tab === "apps" && <Card>{cleanerApps.length === 0 ? <div style={{ padding: 20, textAlign: "center", color: COLORS.muted }}>No applications yet.</div> : cleanerApps.map(a => <div key={a.id} style={{ padding: 14, borderBottom: "1px solid " + COLORS.border, display: "flex", justifyContent: "space-between" }}><div><strong>{a.name}</strong> · {a.area} · {a.experience}</div>{a.status === "Pending Review" && <div style={{ display: "flex", gap: 6 }}><Button onClick={() => updateAppStatus(a.id, "Approved")} size="sm" variant="secondary">Approve</Button><Button onClick={() => updateAppStatus(a.id, "Denied")} size="sm" variant="danger">Deny</Button></div>}</div>)}</Card>}
        {tab === "cleaners" && <Card>{cleaners.length === 0 ? <div style={{ padding: 20, textAlign: "center", color: COLORS.muted }}>No active cleaners.</div> : cleaners.map(c => <div key={c.id} style={{ padding: 14, borderBottom: "1px solid " + COLORS.border }}><strong>{c.name}</strong> · {c.phone} · {c.area}</div>)}</Card>}
      </div>
    </div>
  );
}

function CleanerDashboard({ bookings, cleaners, updateBookingStatus }) {
  const [selected, setSelected] = useState("");
  if (!selected) return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "60px 20px" }}>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <Card>
          <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.navy, marginTop: 0, marginBottom: 16 }}>Cleaner Login</h2>
          <Select value={selected} onChange={(e) => setSelected(e.target.value)}><option value="">Select your name…</option>{cleaners.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</Select>
        </Card>
      </div>
    </div>
  );
  const myJobs = bookings.filter(b => b.assignedCleaner === selected);
  return (
    <div style={{ background: COLORS.gray, minHeight: "calc(100vh - 80px)", padding: "30px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 800, color: COLORS.navy, margin: 0 }}>Hi, {selected.split(" ")[0]}</h1>
          <Button onClick={() => setSelected("")} variant="ghost" size="sm">Sign Out</Button>
        </div>
        {myJobs.length === 0 ? <Card style={{ textAlign: "center", padding: 50 }}>No jobs yet.</Card> : myJobs.map(job => (
          <Card key={job.id} style={{ marginBottom: 14 }}>
            <Badge color={COLORS.blue}>{job.status}</Badge>
            <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 18, color: COLORS.navy, margin: "8px 0 4px" }}>{job.cleaningType.toUpperCase()} · ${job.cleanerPay}</h3>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.muted }}>{job.address} · {job.date}</div>
            {job.status !== "Completed" && <div style={{ display: "flex", gap: 10, marginTop: 12 }}><Button onClick={() => updateBookingStatus(job.id, "In Progress")} variant="primary" size="sm">Start</Button><Button onClick={() => updateBookingStatus(job.id, "Completed")} variant="secondary" size="sm">Complete</Button></div>}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── FOOTER (with SEO link structure) ─────────────────────────────────────────
function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo(0,0); };
  return (
    <footer style={{ background: COLORS.navy, color: COLORS.white, padding: "60px 20px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, " + COLORS.blue + ", " + COLORS.green + ")", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontWeight: 800, fontSize: 14, fontFamily: FONT_HEAD }}>R3</div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 18 }}>R3VIV3</div>
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>Reviving spaces. Restoring peace. Trusted house cleaning across Minneapolis, St. Paul &amp; the Twin Cities.</p>
        </div>
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</div>
          {[["services","Standard House Cleaning Minneapolis"],["deep-cleaning","Deep Cleaning Minneapolis"],["airbnb","Airbnb Cleaning Minneapolis"],["move-out","Move-Out Cleaning Minneapolis"]].map(([id, l]) => <div key={id} onClick={() => go(id)} style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
        </div>
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Service Areas</div>
          {["Minneapolis","St. Paul","Edina","Bloomington","Maple Grove","Plymouth","Minnetonka"].map(c => <div key={c} style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>{c}, MN</div>)}
        </div>
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>📍 Minneapolis, MN</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>✉️ hellor3vclean@outlook.com</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>🕐 Mon–Sat · 8 AM – 6 PM</div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
        © 2025 R3VIV3 Cleaning Service · House Cleaning Minneapolis &amp; Twin Cities
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function R3VIV3App() {
  const [page, setPage] = useState("home");
  const [bookings, setBookings]       = useLocalStorage("r3_bookings", []);
  const [leads, setLeads]             = useLocalStorage("r3_leads", []);
  const [cleanerApps, setCleanerApps] = useLocalStorage("r3_apps", []);
  const [cleaners, setCleaners]       = useLocalStorage("r3_cleaners", []);
  const [activeBooking, setActiveBooking] = useState(null);
  const { events, track, clearEvents } = useAnalytics();

  useEffect(() => { track("page_view", { page }); }, [page]);

  const addBooking    = (b) => setBookings([...bookings, b]);
  const addLead       = (l) => setLeads([...leads, l]);
  const addCleanerApp = (a) => setCleanerApps([...cleanerApps, a]);

  const navigateToCheckout = (b) => { setActiveBooking(b); setPage("checkout"); window.scrollTo(0,0); };
  const onPaymentSuccess = (bookingId) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: "Paid" } : b));
    track("payment_completed", { booking_id: bookingId });
    console.log("[ADMIN ALERT] New paid booking:", bookingId);
    console.log("[CLEANER BROADCAST] New job available.");
    setActiveBooking({ ...activeBooking, status: "Paid" });
    setPage("payment-success");
    window.scrollTo(0,0);
  };
  const assignCleaner = (bookingId, cleanerName) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, assignedCleaner: cleanerName, status: "Assigned" } : b));
    track("cleaner_assigned", { booking_id: bookingId, cleaner: cleanerName });
  };
  const updateBookingStatus = (bookingId, status) => setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
  const updateAppStatus = (appId, status) => {
    setCleanerApps(cleanerApps.map(a => a.id === appId ? { ...a, status } : a));
    if (status === "Approved") {
      const app = cleanerApps.find(a => a.id === appId);
      if (app && !cleaners.find(c => c.email === app.email)) setCleaners([...cleaners, { id: "CL-" + Date.now(), name: app.name, phone: app.phone, email: app.email, area: app.area }]);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: ${FONT_BODY}; background: ${COLORS.white}; color: ${COLORS.text}; }
        a { text-decoration: none; }
        input:focus, textarea:focus, select:focus { border-color: ${COLORS.blue} !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
          .booking-grid { grid-template-columns: 1.5fr 1fr !important; }
        }
      `}</style>

      {!["admin","cleaner","payment-success","checkout"].includes(page) && <Header page={page} setPage={setPage} track={track} />}

      {page === "home"            && <HomePage setPage={setPage} track={track} />}
      {page === "services"        && <ServicesPage setPage={setPage} />}
      {page === "airbnb"          && <AirbnbPage setPage={setPage} />}
      {page === "deep-cleaning"   && <DeepCleaningPage setPage={setPage} />}
      {page === "move-out"        && <MoveOutPage setPage={setPage} />}
      {page === "book"            && <BookingPage addBooking={addBooking} navigateToCheckout={navigateToCheckout} track={track} />}
      {page === "checkout"        && <CheckoutPage booking={activeBooking} onPaymentSuccess={onPaymentSuccess} setPage={setPage} track={track} />}
      {page === "payment-success" && <PaymentSuccessPage booking={activeBooking} setPage={setPage} />}
      {page === "become-cleaner"  && <BecomeCleanerPage addCleanerApp={addCleanerApp} track={track} />}
      {page === "contact"         && <ContactPage addLead={addLead} track={track} />}
      {page === "admin"           && <AdminDashboard bookings={bookings} leads={leads} cleanerApps={cleanerApps} cleaners={cleaners} assignCleaner={assignCleaner} updateAppStatus={updateAppStatus} updateBookingStatus={updateBookingStatus} events={events} clearEvents={clearEvents} />}
      {page === "cleaner"         && <CleanerDashboard bookings={bookings} cleaners={cleaners} updateBookingStatus={updateBookingStatus} />}

      {!["admin","cleaner"].includes(page) && <Footer setPage={setPage} />}
    </>
  );
}
