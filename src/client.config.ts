import { facialTreatments } from './data/procedures/facial';
import { longevityTreatments } from './data/procedures/longevity';
import { laserTreatments } from './data/procedures/laser';
import { contourTreatments } from './data/procedures/contour';
import { surgicalTreatments } from './data/procedures/surgical';

export interface StatItem {
  number: string;
  label: string;
  description: string;
}

export interface TreatmentProcessStep {
  title: string;
  description: string;
  /**
   * Optional image override for this one step. When absent, the step falls back to
   * `processPhaseImages` by position. Set it only when a procedure has its own
   * photography for a specific step.
   */
  image?: string;
}

export interface TreatmentCallout {
  label: string;
  value: string;
  description?: string;
}

export interface TreatmentPractitioner {
  name: string;
  role: string;
  note: string;
  avatar?: string;
}

export interface TreatmentGalleryItem {
  label: string;
  src?: string;
}

export interface TreatmentBeforeAfterCase {
  label: string;
  caption?: string;
  before?: string;
  after?: string;
}

export interface TreatmentFaq {
  question: string;
  answer: string;
}

export interface TreatmentDetails {
  tagline: string;
  overview: string;
  suitableFor: string[];
  process: TreatmentProcessStep[];
  benefits: string[];
  callouts?: TreatmentCallout[];
  gallery?: TreatmentGalleryItem[];
  beforeAfter?: TreatmentBeforeAfterCase[];
  practitioner?: TreatmentPractitioner;
  faqs?: TreatmentFaq[];
}

export interface Treatment {
  id: string;
  /** URL slug for this procedure's own page at /procedures/:slug. Must be unique. */
  slug: string;
  title: string;
  subtitle: string;
  category: 'facial' | 'longevity' | 'laser' | 'contour' | 'surgical';
  description: string;
  longDescription: string;
  duration: string;
  downtime: string;
  results: string;
  priceGuide: string;
  previewImage: string;
  hoverFramesFolder?: string;
  features: string[];
  recommendedFor: string;
  details?: TreatmentDetails;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialization: string;
  bio: string;
  image: string;
  /** Regulator licence number. Dubai clinics are licensed by the DHA, not the UK GMC. */
  licenseNumber: string;
  availableDays: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  verified?: boolean;
  avatar?: string;
}

export interface TestimonialMarqueeColumn {
  pixelsPerSecond: number;
  testimonialIds: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MethodStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  image: string;
  statValue: string;
  statCaption: string;
  dataPoints: { x: number; y: number }[];
}

export interface DiagnosticTickerConfig {
  tag: string;
  title: string;
  subtitle: string;
  badges: string[];
  backgroundImage: string;
  rows: string[][];
}

export const clientConfig = {
  // Brand & Clinic Metadata
  clinic: {
    name: "MAISON ÉTÉ CLINIQUE",
    locality: "Jumeirah · Dubai",
    tagline: "Aesthetic Medicine & Skin Longevity in Dubai",
    subtitle: "Doctor-led injectables, laser and skin treatments delivered by DHA-licensed physicians in Jumeirah.",
    // PLACEHOLDER CONTACT DETAILS — replace all four with the clinic's real details.
    // Zeros are used deliberately so nothing here can be mistaken for a real listing.
    address: "Villa 12, Jumeirah Beach Road, Jumeirah 1, Dubai, UAE",
    phone: "+971 4 000 0000",
    email: "hello@maisonete.ae",
    whatsappNumber: "971500000000", // formatted without '+' for WhatsApp API
    whatsappDisplay: "+971 50 000 0000",
    whatsappDefaultMessage: "Hello Maison Été Clinique, I would like to book an aesthetic consultation in Dubai.",
    hours: "Monday – Saturday: 10:00 – 20:00 | Sunday: 12:00 – 18:00",
    // PLACEHOLDER LICENCE — replace DHA-000000 with the clinic's real DHA licence number.
    accreditations: [
      "Dubai Health Authority (DHA) Licensed Facility",
      "DHA Licence No. DHA-000000",
      "MOHAP-Registered Medical Staff",
    ],
  },

  // Visual Theme Tokens
  theme: {
    colors: {
      background: "#F7F5F1", // Warm Ivory
      backgroundSubtle: "#EFECE6", // Neutral soft surface
      backgroundElevated: "#FAF8F5", // Pristine card surface
      ink: "#0A0A0A", // Near-black ink
      inkMuted: "#525252",
      inkSubtle: "#666666",
      accentGold: "#C9A876", // Muted bronze/gold
      accentGoldHover: "#B89660",
      accentGoldLight: "#E0C89E",
      borderLight: "#E6E2DA",
      borderSubtle: "#D6CFC3",
    },
    fonts: {
      headlineSerif: 'Switzer, ui-sans-serif, system-ui, sans-serif',
      bodySans: 'Switzer, ui-sans-serif, system-ui, sans-serif',
      statDisplay: 'Switzer, ui-sans-serif, system-ui, sans-serif',
    },
  },

  // Hero.
  // One clinic / treatment-room photograph. Drop the file into public/images and set
  // `image` below — that is the only change needed. Left empty, the hero renders the
  // exact same layout on a tonal background, with no missing-image affordance.
  hero: {
    sectionAriaLabel: "Aesthetic medicine and skin clinic in Jumeirah, Dubai",
    badgeText: "DUBAI · PHYSICIAN-LED · DHA-LICENSED",
    headlineMain: "Aesthetic medicine in",
    headlineEmphasis: "Jumeirah, Dubai.",
    subheadline: "Injectables, laser and skin treatments planned and performed by DHA-licensed physicians. Natural results, no guesswork.",
    ctaWhatsAppText: "Book a consultation",
    ctaWhatsAppMessage: "Hello Maison Été Clinique, I would like to book a consultation at your Jumeirah clinic.",
    ctaWhatsAppAriaLabel: "Book a consultation via WhatsApp",
    phoneCtaText: "Call the clinic",
    phoneCtaAriaLabel: "Call the clinic by phone",
    // Trust row under the hero CTA — the above-the-fold signals every Dubai
    // competitor leads with (rating, licence, location). PLACEHOLDER rating.
    trustItems: [
      { value: "4.9★", label: "Google rating" },
      { value: "DHA", label: "Licensed facility" },
      { value: "Jumeirah", label: "Dubai" },
    ],
    scrollHintLabel: "SCROLL",
    scrollHintAriaLabel: "Scroll to clinic introduction",
    // Hero photograph, e.g. "/images/hero/clinic-reception.jpg".
    // Recommended: a real clinic interior or treatment room. Avoid stock faces.
    image: "",
    imageAlt: "Our treatment room in Jumeirah, Dubai",
    // CSS object-position — frame a portrait shot without re-cropping the file.
    imagePosition: "center",
  },

  // Manifesto & Key Clinic Metrics (plain, patient-facing)
  manifesto: {
    tag: "OUR APPROACH",
    title: "We treat the concern, not the trend.",
    body: "Every plan starts with an assessment and an honest conversation. We recommend what your skin actually needs, and we will tell you when the answer is nothing at all.",
    pullQuote: "Good aesthetic work is work nobody can point at. People notice that you look well — not what you had done.",
    pullQuoteAttribution: "— Clinical Board, Maison Été Clinique Dubai",
    highlights: ["Assessment Before Treatment", "No Upselling"],
    // PLACEHOLDER FIGURES — replace with the clinic's real audited numbers.
    stats: [
      {
        number: "4.9★",
        label: "GOOGLE RATING",
        description: "Rated by patients treated at our Jumeirah clinic.",
      },
      {
        number: "12+",
        label: "YEARS OF CLINICAL PRACTICE",
        description: "DHA-licensed physicians with surgical and dermatology training.",
      },
      {
        number: "9,000+",
        label: "TREATMENTS PERFORMED",
        description: "Injectables, laser and skin treatments delivered in Dubai.",
      },
    ] as StatItem[],
  },

  // The Method: Assess / Treat / Review (plain-language process)
  method: {
    tag: "HOW WE WORK",
    title: "Assess. Treat. Review.",
    subtitle: "Three simple steps, so you always know what is happening, what it costs and why.",
    stepPrefix: "STEP",
    stepWord: "Step",
    steps: [
      {
        step: "01",
        phase: "Assess",
        title: "Consultation & Skin Assessment",
        description: "A DHA-licensed physician examines your skin, listens to your goals and tells you what is realistic.",
        image: "/images/method-steps/phase-01-measure.jpg",
        statValue: "45 min",
        statCaption: "INITIAL CONSULTATION",
        dataPoints: [
          { x: 18, y: 22 },
          { x: 78, y: 28 },
          { x: 42, y: 76 },
          { x: 82, y: 68 },
          { x: 28, y: 62 },
        ],
      },
      {
        step: "02",
        phase: "Treat",
        title: "A Plan Built Around Your Face",
        description: "We treat in small, staged sessions, starting conservatively so you stay in control of the result.",
        image: "/images/method-steps/phase-02-intervene.jpg",
        statValue: "1:1",
        statCaption: "WITH YOUR PHYSICIAN",
        dataPoints: [
          { x: 22, y: 30 },
          { x: 65, y: 18 },
          { x: 80, y: 60 },
          { x: 38, y: 78 },
          { x: 70, y: 82 },
        ],
      },
      {
        step: "03",
        phase: "Review",
        title: "Review & Maintenance",
        description: "A follow-up review to see how your skin responded, with further treatment only when it is genuinely needed.",
        image: "/images/method-steps/phase-03-extend.jpg",
        statValue: "4–6 wks",
        statCaption: "FOLLOW-UP REVIEW",
        dataPoints: [
          { x: 20, y: 24 },
          { x: 72, y: 26 },
          { x: 50, y: 74 },
          { x: 86, y: 58 },
          { x: 32, y: 65 },
        ],
      },
    ] as MethodStep[],
  },

  // Infinite Auto-Scrolling Treatments & Standards Marquee Ticker
  diagnosticTicker: {
    tag: "TREATMENTS & STANDARDS",
    title: "What We Offer, and What You Can Expect",
    subtitle: "The treatments available at our Jumeirah clinic, and the standards we hold ourselves to.",
    badges: ["DHA-Licensed Physicians", "Consultation Before Treatment"],
    backgroundImage: "/assets/cosmeticv3/hero/hero-4/honeycomb_012.jpg",
    rows: [
      [
        "Botox & Anti-Wrinkle",
        "Dermal Fillers",
        "Lip Enhancement",
        "Skin Boosters",
        "Under-Eye Rejuvenation",
        "Profhilo",
        "Thread Lift",
        "Chemical Peels",
      ],
      [
        "DHA-Licensed Physicians",
        "Patch Test Before Laser",
        "Consultation First",
        "No Upselling",
        "Written Aftercare Plans",
        "Staged Treatment Plans",
        "Single-Use Needles",
        "Transparent Pricing",
      ],
      [
        "Laser Hair Removal",
        "Fractional Laser",
        "Pigmentation Laser",
        "RF Microneedling",
        "HydraFacial",
        "IV Drip Therapy",
        "Exosome Therapy",
        "Body Contouring",
      ],
    ],
  } as DiagnosticTickerConfig,

  // Treatments & Services (3-column layout)
    treatments: [
      {
        id: "chemical-peeling",
        slug: "chemical-peeling",
        title: "Chemical Peeling",
        subtitle: "Reveal Fresher, Brighter Skin",
        category: "facial",
        description: "Multi-depth exfoliation treatment that removes damaged outer layers to reveal smoother, more even-toned skin.",
        longDescription: "Our chemical peel treatments use medical-grade acids (glycolic, salicylic, or TCA depending on your skin's needs) to accelerate cell turnover and clear away dull, damaged surface layers. This stimulates collagen production underneath, fading pigmentation, softening fine lines, and refining texture and pore appearance. Sessions are customized in depth and strength to match your skin type and concerns, from light lunchtime peels to deeper resurfacing treatments.",
        duration: "30 - 45 mins",
        downtime: "3 - 7 days (varies by peel depth)",
        results: "Visible improvement in 1 - 2 weeks, full results after peeling completes",
        priceGuide: "From AED 700",
        previewImage: "/images/procedures/chemical-peeling.jpg",
        features: ["Reduces pigmentation & sun damage", "Softens fine lines", "Refines texture & pores", "Customizable intensity"],
        recommendedFor: "Dull skin, uneven tone, mild acne scarring, sun damage",
        details: {
          tagline: "Medical-grade resurfacing, calibrated to your skin.",
          overview: "A physician-controlled peel that removes damaged surface layers at a precise depth to trigger a controlled renewal response. Rather than a fixed salon peel, the acid, strength and layering are chosen around your skin type, barrier health and goals — from a light lunchtime glow to deeper resurfacing that softens pigmentation and fine lines across a short course.",
          suitableFor: [
            "Dull, uneven or congested skin",
            "Sun damage and surface pigmentation",
            "Fine lines and early texture changes",
            "Mild acne scarring and enlarged pores",
            "Skin that has plateaued on topical routines",
          ],
          process: [
            { title: "Consultation & skin mapping", description: "We assess barrier health, pigmentation and sensitivity to select the correct acid and depth." },
            { title: "Cleanse & prep", description: "The skin is degreased and primed so the peel acts evenly across the treatment area." },
            { title: "Layered application", description: "The physician applies the solution in controlled layers, monitoring for the desired clinical endpoint." },
            { title: "Neutralise & calm", description: "The peel is neutralised, then a barrier-repair mask and SPF are applied." },
            { title: "Aftercare review", description: "You leave with a written recovery plan and a concierge follow-up." },
          ],
          benefits: [
            "Stimulates fresh collagen",
            "No needles or anaesthesia",
            "Customisable depth and strength",
            "Progressive, natural-looking renewal",
          ],
          callouts: [
            { label: "Downtime", value: "3 – 7 days", description: "Mild redness followed by light peeling, depending on depth." },
            { label: "Aftercare", value: "Barrier & SPF", description: "Gentle cleansers, barrier cream and daily SPF; pause active ingredients for one week." },
          ],
          gallery: [
            { label: "Treatment suite" },
            { label: "Pre-peel assessment" },
            { label: "Immediately post-peel" },
          ],
          beforeAfter: [
            { label: "Case 01", caption: "Pigmentation & tone — after 2 sessions" },
            { label: "Case 02", caption: "Texture & pores — after 3 sessions" },
          ],
          practitioner: {
            name: "Dr. Layla Rahman, MBBS, MSc (Derm)",
            role: "Dermatologist & Laser Physician",
            note: "I keep peels conservative and layered. Depth is earned across sessions rather than forced in one — it protects the barrier and gives a far more natural, lasting result.",
          },
          faqs: [
            { question: "Does a chemical peel hurt?", answer: "Most patients feel a warm tingling for a few minutes. We monitor continuously and can neutralise at any point." },
            { question: "How many sessions will I need?", answer: "Many see a visible change after one session, but a course of two to four is typical for pigmentation and texture." },
            { question: "Can I wear makeup afterwards?", answer: "We recommend waiting 24–48 hours, depending on peel depth, to let the barrier settle." },
          ],
        },    
      },
      {
        id: "hydrafacial",
        slug: "hydrafacial",
        title: "HydraFacial",
        subtitle: "Cleanse, Extract, Hydrate — In One Session",
        category: "facial",
        description: "A gentle, non-invasive treatment that cleanses, exfoliates, extracts impurities, and infuses skin with hydrating serums.",
        longDescription: "HydraFacial uses patented vortex-suction technology to simultaneously cleanse, exfoliate, and extract debris from pores while delivering nourishing antioxidants, peptides, and hyaluronic acid deep into the skin. Unlike traditional facials, there's no discomfort or irritation, making it suitable for virtually all skin types, including sensitive skin. The result is an immediate glow with no downtime, making it a popular pre-event treatment.",
        duration: "45 - 60 mins",
        downtime: "None — return to daily activities immediately",
        results: "Instant glow, visible immediately after treatment",
        priceGuide: "From AED 750",
        previewImage: "/images/procedures/hydrafacial.jpg",
        features: ["Deep pore cleansing", "Instant hydration boost", "No downtime", "Suitable for sensitive skin"],
        recommendedFor: "All skin types, congested pores, dehydrated or dull skin, pre-event prep",
        details: {
          tagline: "A deep clean and hydration reset in a single session.",
          overview: "HydraFacial pairs vortex-suction cleansing with simultaneous infusion of antioxidants, peptides and hyaluronic acid. It clears congestion while replenishing moisture, so skin looks refined and rested immediately. With no discomfort and no downtime, it works equally well as ongoing maintenance or a pre-event reset for any skin type.",
          suitableFor: [
            "Congested or enlarged pores",
            "Dehydrated, dull or tired-looking skin",
            "Sensitive skin that dislikes manual extractions",
            "Pre-event or pre-photography prep",
            "Ongoing monthly skin maintenance",
          ],
          process: [
            { title: "Cleanse & exfoliate", description: "A gentle vortex tip lifts dead surface cells without abrasion." },
            { title: "Acid peel infusion", description: "A mild blend loosens debris and softens the pore lining." },
            { title: "Extraction", description: "Suction clears congestion without squeezing or picking." },
            { title: "Serum infusion", description: "Antioxidants, peptides and hyaluronic acid are delivered into the skin." },
            { title: "LED & SPF", description: "A calming LED pass and SPF finish the session." },
          ],
          benefits: [
            "Immediate visible glow",
            "Gentle deep cleansing",
            "No downtime",
            "Customisable booster serums",
          ],
          callouts: [
            { label: "Downtime", value: "None", description: "Return to daily activities, including makeup, immediately." },
            { label: "Aftercare", value: "Hydrate & protect", description: "Keep skin hydrated and wear daily SPF; avoid active ingredients for 24 hours." },
          ],
          gallery: [
            { label: "Treatment suite" },
            { label: "Vortex handpiece detail" },
            { label: "Post-treatment glow" },
          ],
          beforeAfter: [
            { label: "Case 01", caption: "Congestion & texture — single session" },
            { label: "Case 02", caption: "Hydration & clarity — course of 3" },
          ],
          practitioner: {
            name: "Dr. Aisha Al Mansoori, MD",
            role: "Aesthetic Physician",
            note: "HydraFacial is my first recommendation for anyone new to clinical skin treatments. It is genuinely comfortable, and the immediate clarity makes it easy to build a longer-term plan from there.",
          },
          faqs: [
            { question: "Is there any downtime?", answer: "None. Skin may look faintly flushed for 15–30 minutes, then settles with a visible glow." },
            { question: "How often should I have one?", answer: "Every four weeks maintains clarity; some patients prefer it before events only." },
            { question: "Is it safe for sensitive skin?", answer: "Yes. Serums and suction strength are adjusted to your skin's tolerance." },
          ],
        },
      
      },
      {
        id: "laser-skin-rejuvenation",
        slug: "laser-skin-rejuvenation",
        title: "Laser Skin Rejuvenation",
    subtitle: "Turn Back the Clock on Your Skin",
    category: "laser",
    description: "Advanced laser technology that targets fine lines, sun damage, and uneven texture to restore a youthful glow.",
    longDescription: "Laser skin rejuvenation uses focused light energy to stimulate deep collagen remodeling while resurfacing the skin's surface. It effectively treats sun damage, age spots, fine lines, enlarged pores, and uneven texture without invasive surgery. Treatment intensity is tailored to your skin type and goals, ranging from gentle non-ablative sessions with minimal downtime to more intensive fractional resurfacing for dramatic results.",
    duration: "30 - 60 mins",
    downtime: "1 - 5 days (redness, mild peeling)",
    results: "Progressive improvement over 4 - 6 weeks; full results after full course",
    priceGuide: "From AED 1,400",
    previewImage: "/images/procedures/laser-skin-rejuvenation.jpg",
    features: ["Stimulates collagen", "Reduces sun damage & age spots", "Improves skin texture", "Minimally invasive"],
    recommendedFor: "Sun damage, fine lines, uneven texture, enlarged pores, early signs of aging",
    details: {
      tagline: "Collagen remodelling with a tailored light protocol.",
      overview: "Focused light energy resurfaces the skin's surface while stimulating deeper collagen remodelling. Intensity is matched to your skin type and goals, from gentle non-ablative passes with minimal downtime to more intensive fractional resurfacing. Over the following weeks, tone, texture and fine lines continue to improve as new collagen matures.",
      suitableFor: [
        "Sun damage and age spots",
        "Fine lines and early laxity",
        "Uneven texture and enlarged pores",
        "Mild acne scarring",
        "Skin wanting collagen stimulation without surgery",
      ],
      process: [
        { title: "Consultation & test patch", description: "We assess skin type and perform a test patch to calibrate the setting." },
        { title: "Prep & comfort", description: "The area is cleansed and cooled, with topical comfort measures where needed." },
        { title: "Laser pass", description: "The physician delivers controlled light passes, mapping the face precisely." },
        { title: "Cooling & recovery mask", description: "The skin is cooled and a restorative mask is applied." },
        { title: "Progressive review", description: "We review at two and six weeks as collagen continues to develop." },
      ],
      benefits: [
        "Stimulates new collagen",
        "Evens overall tone",
        "Progressive results over weeks",
        "Tailored, well-tolerated downtime",
      ],
      callouts: [
        { label: "Downtime", value: "1 – 5 days", description: "Redness and mild peeling depending on intensity." },
        { label: "Aftercare", value: "SPF & barrier care", description: "Strict daily SPF and gentle barrier care; avoid heat and actives for a week." },
      ],
      gallery: [
        { label: "Laser suite" },
        { label: "Treatment mapping" },
        { label: "Day 3 recovery" },
      ],
      beforeAfter: [
        { label: "Case 01", caption: "Sun damage — after 2 sessions" },
        { label: "Case 02", caption: "Texture & fine lines — after 3 sessions" },
      ],
      practitioner: {
        name: "Dr. Layla Rahman, MBBS, MSc (Derm)",
        role: "Dermatologist & Laser Physician",
        note: "Laser is a tool of precision, not power. I would rather deliver a well-tolerated series that respects your skin than a single aggressive pass you spend weeks recovering from.",
      },
      faqs: [
        { question: "Does it hurt?", answer: "Most describe a warm prickling sensation. Comfort measures and cooling are used throughout." },
        { question: "When will I see results?", answer: "Surface clarity appears within days; collagen-driven improvements build over four to six weeks." },
        { question: "How many sessions do I need?", answer: "A course of two to three sessions is typical, spaced four weeks apart." },
      ],
    },

      },

      // Generated category catalogues (src/data/procedures)
      ...facialTreatments,
      ...longevityTreatments,
      ...laserTreatments,
      ...contourTreatments,
      ...surgicalTreatments,
    ] as Treatment[],

  // Team Grid (DHA-licensed physicians practising in Dubai)
  // PLACEHOLDER licence numbers — replace each DHA-000000 with the physician's real DHA number.
  team: [
    {
      id: "dr-aisha-al-mansoori",
      name: "Dr. Aisha Al Mansoori, MD",
      title: "Medical Director & Aesthetic Physician",
      credentials: "DHA-000000 · Aesthetic Medicine",
      specialization: "Anti-wrinkle injections, dermal fillers, facial assessment",
      bio: "A DHA-licensed aesthetic physician with 12 years treating patients in Dubai. Dr. Al Mansoori is known for conservative, natural-looking work and for telling patients when a treatment is not right for them.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
      licenseNumber: "000000",
      availableDays: "Mon, Tue, Wed, Sat",
    },
    {
      id: "dr-omar-haddad",
      name: "Dr. Omar Haddad, FRCS (Plast)",
      title: "Consultant Aesthetic Surgeon",
      credentials: "DHA-000000 · Plastic Surgery",
      specialization: "Rhinoplasty, facelift, eyelid surgery, liposuction",
      bio: "A consultant plastic surgeon practising in Dubai for over a decade. Dr. Haddad takes a conservative approach to surgical planning and is clear about recovery, risk and what surgery can realistically change.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
      licenseNumber: "000000",
      availableDays: "Mon, Wed, Fri",
    },
    {
      id: "dr-layla-rahman",
      name: "Dr. Layla Rahman, MBBS, MSc (Derm)",
      title: "Dermatologist & Laser Physician",
      credentials: "DHA-000000 · Dermatology",
      specialization: "Laser treatments, pigmentation, acne scarring, skin cancer screening",
      bio: "A dermatologist specialising in laser and pigment correction across all skin tones. Dr. Rahman runs patch testing before every laser course and adjusts settings for darker skin types rather than using one default.",
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
      licenseNumber: "000000",
      availableDays: "Mon, Tue, Thu, Fri",
    },
  ] as Doctor[],

  // Patient Testimonials (Dubai patients, plain language)
  // PLACEHOLDER REVIEWS — replace with real, consented patient reviews before launch.
  testimonials: [
    {
      id: "t1",
      name: "Fatima A.",
      treatment: "Anti-Wrinkle Injections",
      location: "Jumeirah, Dubai",
      quote: "My forehead still moves, which is exactly what I asked for. Dr. Al Mansoori talked me out of the extra areas I came in wanting, and I am glad she did.",
      rating: 5,
      date: "August 2024",
    },
    {
      id: "t2",
      name: "James K.",
      treatment: "Laser Hair Removal",
      location: "Dubai Marina",
      quote: "They did a patch test first and explained that my skin needed different settings to what I had been given elsewhere. Six sessions in and it has actually worked this time.",
      rating: 5,
      date: "September 2024",
    },
    {
      id: "t3",
      name: "Noura S.",
      treatment: "Under-Eye Rejuvenation",
      location: "Business Bay",
      quote: "I had dark circles that no concealer was hiding. Two sessions and the skin under my eyes looks rested rather than filled. Nobody has guessed I had anything done.",
      rating: 5,
      date: "October 2024",
    },
    {
      id: "t4",
      name: "Priya M.",
      treatment: "HydraFacial",
      location: "Arabian Ranches",
      quote: "Booked it before a wedding with two days' notice. No downtime at all, and my skin looked clear for the photos. The clinic ran exactly to time, which I appreciated.",
      rating: 5,
      date: "November 2024",
    },
    {
      id: "t5",
      name: "Hessa K.",
      treatment: "Chemical Peeling",
      location: "Downtown Dubai",
      quote: "I was nervous about pigmentation getting worse. They explained the peeling days honestly up front, gave me a written aftercare plan and followed up to check on me.",
      rating: 5,
      date: "December 2024",
    },
    {
      id: "t6",
      name: "Daniel R.",
      treatment: "Dermal Fillers",
      location: "Dubai Hills",
      quote: "Conservative, staged, and no pressure to add more. I went back three weeks later once the first result had settled, which felt like the right way to do it.",
      rating: 5,
      date: "January 2025",
    },
  ] as Testimonial[],

  // Vertically-scrolling testimonial marquee: column assignment + speed (px/sec) per column
  testimonialMarquee: {
    columns: [
      { pixelsPerSecond: 26, testimonialIds: ["t1", "t4", "t2", "t5", "t3", "t6"] },
      { pixelsPerSecond: 34, testimonialIds: ["t2", "t5", "t1", "t6", "t4", "t3"] },
      { pixelsPerSecond: 20, testimonialIds: ["t3", "t6", "t4", "t1", "t5", "t2"] },
    ],
  } as { columns: TestimonialMarqueeColumn[] },

  // FAQs
  faqs: [
    {
      question: "How do I book an appointment?",
      answer: "Message us on WhatsApp or call the clinic on the number at the top of this page. Our front desk will confirm the treatment, the physician and the price with you before the appointment — not afterwards.",
    },
    {
      question: "Are treatments performed by licensed doctors?",
      answer: "Yes. Every injectable, laser and skin treatment at our Jumeirah clinic is planned and performed by a physician licensed by the Dubai Health Authority. We do not delegate injectables to beauticians or unlicensed staff.",
    },
    {
      question: "What happens at the first consultation?",
      answer: "The physician examines the area you are concerned about, asks what you want to change, and explains which treatments would help and which would not. You leave with a written plan and prices. There is no obligation to book treatment on the day.",
    },
    {
      question: "I don't know which treatment I need. Can you advise?",
      answer: "That is the normal starting point. Most patients arrive with a concern rather than a treatment name. Tell us what bothers you and the physician will recommend the least invasive option that is likely to work.",
    },
    {
      question: "Do you treat darker skin tones and melasma?",
      answer: "Yes. Laser and peel settings are adjusted for darker skin types rather than using one default, and we run a patch test before starting any laser course. Pigmentation and melasma are assessed individually because they can worsen with the wrong settings.",
    },
    {
      question: "How much do treatments cost?",
      answer: "Indicative starting prices are listed on each treatment page. Your exact price is confirmed in writing after the consultation, once the physician has decided what is clinically appropriate. We do not use pressure pricing or same-day-only discounts.",
    },
  ] as FaqItem[],

  // Closing CTA Section
  closingCta: {
    tag: "BOOK A CONSULTATION",
    headline: "Not sure what you need? Start with a consultation.",
    subheadline: "Book an assessment at our Jumeirah clinic. A DHA-licensed physician will tell you what is worth doing, what to skip, and what it costs — before you commit to anything.",
    whatsAppButtonText: "Book on WhatsApp",
    secondaryButtonText: "Call the clinic",
    guaranteeText: "Consultation fees are confirmed before your appointment. No packages pushed on the day.",
    whatsappMessage: "Hello Maison Été Clinique, I would like to book a consultation at your Jumeirah clinic.",
    whatsappAriaLabel: "Book a consultation via WhatsApp",
    trustNote: "Typical WhatsApp reply within 15 minutes during clinic hours",
  },

  // Default document title / description for the home route
  siteMeta: {
    homeTitle: "Aesthetic Clinic in Jumeirah, Dubai | Maison Été Clinique",
    homeDescription:
      "Physician-led aesthetic medicine in Jumeirah, Dubai. Injectables, laser, skin and surgical treatments planned and performed by DHA-licensed doctors.",
  },

  // Navigation & shared UI copy
  // Hrefs are router paths. "#section" refers to the home page, so from a procedure
  // page they are written as "/#section" and resolve correctly from anywhere.
  navigation: {
    items: [
      { name: "Procedures", href: "/procedures" },
      { name: "Doctors", href: "/#team" },
      { name: "Packages", href: "/#packages" },
      { name: "About", href: "/#about" },
      { name: "Contact", href: "/#contact" },
    ],
    ctaLabel: "Book on WhatsApp",
    ctaAriaLabel: "Book a consultation via WhatsApp",
    whatsappMessage: "Hello Maison Été Clinique, I would like to book a consultation at your Jumeirah clinic.",
    mobileWhatsappMessage: "Hello Maison Été Clinique, I would like to book a consultation at your Jumeirah clinic.",
    mobileMenuLabel: "Menu",
    mobileMenuAriaLabel: "Toggle mobile menu",
    mobileWhatsappAriaLabel: "WhatsApp",
    brandAriaLabel: "Maison Été Clinique home",
    // Phone is shown in the header — every Dubai competitor puts a number above the fold.
    phoneAriaLabel: "Call the clinic",
    phoneLabel: "Call",
  },

  // Treatments directory copy (home section + /procedures index page)
  treatmentsSection: {
    tag: "PHYSICIAN-LED",
    title: "Procedures We Offer",
    whatsappCtaLabel: "Book on WhatsApp",
    detailsLabel: "View full details",
    quickViewLabel: "Quick view",
    emptyMessage: "No procedures match this filter yet — try another category.",
    prevAriaLabel: "Previous page of procedures",
    nextAriaLabel: "Next page of procedures",
    viewAllLabel: "View all procedures",
    categories: [
      { id: "all", label: "All Procedures" },
      { id: "facial", label: "Injectables & Face" },
      { id: "longevity", label: "Wellness & Longevity" },
      { id: "laser", label: "Laser & Skin" },
      { id: "contour", label: "Contour & Body" },
      { id: "surgical", label: "Surgical" },
    ],
  },

  // Press / media strip.
  // Deliberately EMPTY. This section renders nothing at all until you add real,
  // checkable coverage — inventing press mentions would be a false claim about the
  // clinic, so none are shipped by default. Adding an entry makes the strip appear.
  // Example: { name: "Gulf News", note: "Feature, March 2025", href: "https://..." }
  press: {
    tag: "IN THE PRESS",
    title: "As featured in",
    items: [] as { name: string; note?: string; href?: string }[],
  },

  // Courses & packages for the multi-session treatments patients ask about most.
  // PLACEHOLDER PRICES — replace with the clinic's real package pricing.
  packages: {
    tag: "COURSES & PACKAGES",
    title: "Multi-Session Courses",
    subtitle:
      "Most laser and skin treatments work as a course rather than a single session. These are the packages patients ask for most.",
    note: "Package prices are indicative and confirmed after consultation. A course is only recommended once a physician has assessed your skin.",
    ctaLabel: "Ask about a course",
    items: [
      {
        id: "laser-hair-removal-course",
        name: "Laser Hair Removal — 6 Sessions",
        summary: "A full course on one small area, spaced four to six weeks apart.",
        priceGuide: "From AED 1,200",
        savingNote: "Six sessions booked together",
        treatmentIds: ["laser-hair-removal"],
        includes: [
          "Patch test before the first session",
          "Six sessions on one area",
          "Review after session three",
        ],
      },
      {
        id: "skin-resurfacing-course",
        name: "Skin Resurfacing — 3 Sessions",
        summary: "Fractional laser or RF microneedling, spaced four weeks apart.",
        priceGuide: "From AED 3,600",
        savingNote: "Three sessions booked together",
        treatmentIds: ["fractional-laser-resurfacing", "rf-microneedling"],
        includes: [
          "Consultation and skin assessment",
          "Three resurfacing sessions",
          "Aftercare plan and review",
        ],
      },
      {
        id: "facial-refresh-course",
        name: "Facial Refresh — 3 Sessions",
        summary: "HydraFacial or a light peel, for an event run-up or a seasonal reset.",
        priceGuide: "From AED 1,800",
        savingNote: "Three sessions booked together",
        treatmentIds: ["hydrafacial", "chemical-peeling"],
        includes: [
          "Three sessions",
          "Skin assessment at the first visit",
          "Product advice for home",
        ],
      },
    ],
  },

  // Home results strip. Renders ONLY when at least one procedure carries real
  // before/after images (TreatmentDetails.beforeAfter[].before and .after). It is
  // hidden by default because no consented patient photography exists yet — a strip
  // of empty sliders would read as broken images.
  resultsSection: {
    tag: "BEFORE & AFTER",
    title: "Real Patient Results",
    subtitle: "Photos are shown with written patient consent. Individual results vary.",
    ctaLabel: "See before and after by treatment",
    emptyNote: "Patient photos pending written consent.",
  },

  // /procedures index page
  proceduresIndexPage: {
    metaTitle: "All Procedures | Aesthetic Clinic in Jumeirah, Dubai",
    metaDescription:
      "Browse every treatment offered at our Jumeirah clinic — injectables, laser, skin, body contouring and surgery, with starting prices and downtime.",
    tag: "INJECTABLES · LASER · SKIN · CONTOUR · SURGERY",
    title: "All Procedures",
    subtitle: "Every treatment available at our Jumeirah clinic, with starting prices, downtime and what to expect. Prices are indicative and confirmed after consultation.",
    resultsLabel: "procedures",
    noResults: "No procedures match that filter.",
  },

  // /procedures/:slug detail page labels
  procedurePage: {
    breadcrumbLabel: "Procedures",
    bookLabel: "Book a consultation",
    durationLabel: "Duration",
    downtimeLabel: "Downtime",
    priceLabel: "Price",
    resultsLabel: "Results",
    overviewLabel: "Overview",
    suitableForLabel: "Suitable for",
    recommendedForLabel: "Commonly treated",
    processLabel: "What happens",
    benefitsLabel: "What it helps with",
    beforeAfterLabel: "Before & After",
    beforeAfterNote:
      "Results vary between patients. Images are shown with patient consent and are not a guarantee of outcome.",
    galleryLabel: "Clinic & Treatment",
    practitionerLabel: "Your Physician",
    faqLabel: "Common Questions",
    ctaTitle: "Ready to book?",
    ctaBody: "Send us a message and our front desk will confirm the physician, the price and a time that suits you.",
    relatedLabel: "Related Procedures",
    backToAllLabel: "All procedures",
  },

  // Phase imagery for the "What happens" process steps.
  //
  // Every procedure's five steps follow the same arc — assessment, planning and consent,
  // the treatment itself, aftercare, then review — so this is a five-image system, not
  // 120 unique photographs. Steps are matched to these entries by position, and a single
  // procedure can override any one step by adding `image` to that step in its data file.
  //
  // An empty path renders a tonal plate naming the step, so a missing photograph never
  // produces a broken frame or authoring copy in the UI.
  processPhaseImages: [
    { phase: "Assessment", src: "" },
    { phase: "Planning & consent", src: "" },
    { phase: "Treatment", src: "" },
    { phase: "Aftercare", src: "" },
    { phase: "Review", src: "" },
  ],

  // Demo before/after imagery — LAYOUT REVIEW ONLY.
  //
  // No consented patient photography exists, so every procedure's `beforeAfter` case
  // carries empty image paths and the comparison slider renders nowhere. While this
  // block is enabled, a procedure with no real images shows a clearly-labelled SAMPLE
  // comparison instead, so the slider's drag and keyboard interaction can be reviewed.
  //
  // Real photography always wins: add `before`/`after` paths to a procedure's
  // beforeAfter case and that procedure switches to the real comparison automatically.
  // BEFORE LAUNCH: set `enabled: false`, or replace with real consented photography.
  beforeAfterDemo: {
    enabled: true,
    before: "/images/demo/before-sample.svg",
    after: "/images/demo/after-sample.svg",
    label: "Sample comparison",
    note: "SAMPLE IMAGES — layout review only. Not patient results. Replaced automatically once real consented photography is added to this procedure.",
  },

  // Team / medical faculty copy
  teamSection: {
    tag: "OUR MEDICAL TEAM",
    title: "The Physicians Who Treat You",
    description: "Every treatment at our Jumeirah clinic is planned and performed by a DHA-licensed physician — no beauticians and no delegated injectables.",
    licensePrefix: "DHA ",
    focusLabel: "Treats",
    profileLabel: "Profile",
    bookPrefix: "Book with",
    specialistLabel: "Specialist In:",
    clinicDaysLabel: "Clinic days:",
    reserveLabel: "Book on WhatsApp",
    closeAriaLabel: "Close doctor details",
    bookAriaLabelPrefix: "Book consultation with",
  },

  // Testimonials section copy (in addition to the testimonials array)
  testimonialsSection: {
    tag: "PATIENT REVIEWS",
    title: "What Patients Say",
    subtitle: "Reviews from patients treated at our Jumeirah clinic in Dubai.",
    auditNote: "Reviews are from real patients. Individual results vary.",
    verifiedLabel: "Verified Patient",
  },

  // FAQ section copy (in addition to the faqs array)
  faqSection: {
    tag: "COMMON QUESTIONS",
    title: "Questions Patients Ask Us",
    subtitle: "Booking, pricing, safety and what to expect at your first visit.",
  },

  // Footer copy
  footer: {
    whatsappLabel: "WhatsApp",
    exploreLabel: "Explore",
    exploreLinks: [
      { label: "All Procedures", href: "/procedures" },
      { label: "Medical Team", href: "/#team" },
      { label: "Patient Reviews", href: "/#testimonials" },
      { label: "Contact", href: "/#contact" },
    ],
    protocolsLabel: "Popular Procedures",
    // Real per-procedure URLs. Previously all six of these pointed at the same
    // "#treatments" anchor, so none of them was crawlable or shareable.
    protocolsLinks: [
      { label: "Anti-Wrinkle Injections", href: "/procedures/anti-wrinkle-injections" },
      { label: "Dermal Fillers", href: "/procedures/dermal-fillers" },
      { label: "Lip Enhancement", href: "/procedures/lip-enhancement" },
      { label: "Laser Hair Removal", href: "/procedures/laser-hair-removal" },
      { label: "HydraFacial", href: "/procedures/hydrafacial" },
      { label: "Rhinoplasty", href: "/procedures/rhinoplasty" },
    ],
    suiteLabel: "Jumeirah Clinic",
    accreditationLabel: "Licensed by:",
    note: "A consultation is required before treatment. Suitability is confirmed by a DHA-licensed physician.",
    copyrightSuffix: "All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Medical Terms", href: "#" },
      { label: "Patient Safeguarding", href: "#" },
    ],
  },

  // Helper WhatsApp Link Generator
  getWhatsAppUrl: (customMessage?: string) => {
    const number = clientConfig.clinic.whatsappNumber;
    const msg = encodeURIComponent(customMessage || clientConfig.clinic.whatsappDefaultMessage);
    return `https://wa.me/${number}?text=${msg}`;
  },
};
