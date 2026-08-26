export interface HeroClip {
  id: string;
  name: string;
  tagline: string;
  folder: string;
  prefix: string;
  frameCount: number;
  extension: string;
  fps: number;
  durationSeconds: number;
  // Generated frame path helper
  getFrameUrl: (index: number) => string;
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
}

export interface Treatment {
  id: string;
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
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialization: string;
  bio: string;
  image: string;
  gmcNumber: string;
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
  backgroundImage: string;
  rows: string[][];
}

export const clientConfig = {
  // Brand & Clinic Metadata
  clinic: {
    name: "MAISON ÉTÉ CLINIQUE",
    tagline: "Private Aesthetic Medicine & Cellular Longevity",
    subtitle: "Doctor-led facial harmonization, regenerative dermatology, and discreet architectural aesthetics.",
    address: "18 Harley Street, Marylebone, London W1G 9PH",
    phone: "+44 (0) 20 7946 0988",
    email: "concierge@maisonete-clinique.com",
    whatsappNumber: "447700900188", // formatted without '+' for WhatsApp API
    whatsappDisplay: "+44 7700 900188",
    whatsappDefaultMessage: "Hello Maison Été Concierge, I would like to inquire about booking a private aesthetic consultation.",
    hours: "Monday – Saturday: 09:00 – 19:30 | Private Sunday Appointments by Referral",
    accreditations: ["Care Quality Commission (CQC) Registered", "British College of Aesthetic Medicine (BCAM)", "General Medical Council (GMC) Certified"],
  },

  // Visual Theme Tokens
  theme: {
    colors: {
      background: "#F7F5F1", // Warm Ivory
      backgroundSubtle: "#EFECE6", // Neutral soft surface
      backgroundElevated: "#FAF8F5", // Pristine card surface
      ink: "#0A0A0A", // Near-black ink
      inkMuted: "#525252",
      inkSubtle: "#737373",
      accentGold: "#C9A876", // Muted bronze/gold
      accentGoldHover: "#B89660",
      accentGoldLight: "#E0C89E",
      borderLight: "#E6E2DA",
      borderSubtle: "#D6CFC3",
    },
    fonts: {
      headlineSerif: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      bodySans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },

  // Hero Image Sequences Configuration (Exactly 2 clips: Honeycomb & Amber, ultra high-fps smooth playback)
  hero: {
    cycleIntervalMs: 2800,
    transitionDurationMs: 300,
    badgeText: "PRIVATE MEDICAL PRACTICE · MAYFAIR & HARLEY ST",
    headlineMain: "The Architecture of",
    headlineEmphasis: "Invisible Artistry.",
    subheadline: "Doctor-led facial harmonization and cellular longevity. Restoring architectural balance with undetectable precision.",
    ctaWhatsAppText: "Book Private Consultation via WhatsApp",
    ctaSecondaryText: "Explore Bespoke Protocols",
    clips: [
      {
        id: "honeycomb",
        name: "Structural Harmonization",
        tagline: "Subcutaneous architectural balance",
        folder: "/assets/cosmeticv3/hero/hero-4",
        prefix: "honeycomb_",
        frameCount: 60,
        extension: "jpg",
        fps: 30, // Ultra-smooth 30+ fps playback
        durationSeconds: 2.0,
        getFrameUrl: (i: number) => `/assets/cosmeticv3/hero/hero-4/honeycomb_${String(i).padStart(3, '0')}.jpg`,
      },
      {
        id: "amber",
        name: "Cellular Regeneration",
        tagline: "Active bio-matrix remodeling",
        folder: "/assets/cosmeticv3/hero/hero-1",
        prefix: "amber_",
        frameCount: 60,
        extension: "jpg",
        fps: 30,
        durationSeconds: 2.0,
        getFrameUrl: (i: number) => `/assets/cosmeticv3/hero/hero-1/amber_${String(i).padStart(3, '0')}.jpg`,
      },
    ] as HeroClip[],
  },

  // Manifesto & Key Clinical Metrics (Concise Editorial)
  manifesto: {
    tag: "OUR CLINICAL PHILOSOPHY",
    title: "We reject the artificial. We celebrate the nuanced.",
    body: "Maison Été champions an exacting, medical-first ethos. We combine micro-anatomical precision with facial balance to restore natural vitality.",
    stats: [
      {
        number: "99.4%",
        label: "PATIENT SATISFACTION INDEX",
        description: "Verified bespoke outcome satisfaction across audited private cases.",
      },
      {
        number: "15+",
        label: "YEARS OF CLINICAL RIGOR",
        description: "Exclusively GMC-registered doctors with advanced surgical pedigree.",
      },
      {
        number: "12,000+",
        label: "BESPOKE PROTOCOLS DELIVERED",
        description: "Individualized treatment architectures curated without templates.",
      },
    ] as StatItem[],
  },

  // The Method: Measure / Intervene / Extend (Minimal, punchy copy)
  method: {
    tag: "THE CLINICAL METHOD",
    title: "Measure. Intervene. Extend.",
    subtitle: "A quantitative biometric loop replacing subjective guesswork with clinical data.",
    steps: [
      {
        step: "01",
        phase: "Measure",
        title: "Multi-Spectral Biometric Profiling",
        description: "3D volumetric mapping, ultrasound dermal thickness, and cellular biomarker profiling.",
        image: "/images/method-steps/phase-01-measure.jpg",
        statValue: "1,000s",
        statCaption: "MARKERS WE CAN MEASURE",
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
        phase: "Intervene",
        title: "Micro-Precision Targeted Therapy",
        description: "Regenerative micro-dosing and energy vectors calibrated to your cellular baseline.",
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
        phase: "Extend",
        title: "Longitudinal Longevity Optimization",
        description: "Iterative annual re-mapping to sustain biological age deceleration across decades.",
        image: "/images/method-steps/phase-03-extend.jpg",
        statValue: "∞",
        statCaption: "RE-MEASURED OVER TIME",
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

  // Infinite Auto-Scrolling Diagnostic & Differentiator Marquee Ticker
  diagnosticTicker: {
    tag: "DIAGNOSTIC SURVEILLANCE & STANDARDS",
    title: "Precision Differentiators & Clinical Markers",
    subtitle: "Continuously monitored biometrics and non-negotiable surgical standards powering every protocol.",
    backgroundImage: "/assets/cosmeticv3/hero/hero-4/honeycomb_012.jpg",
    rows: [
      [
        "Multi-Spectral 3D Topology Scan",
        "Dermal Thickness Ultrasound",
        "Cellular Exosome Profiling",
        "Dynamic Mimetic Mapping",
        "Telomere Length Biomarkers",
        "Collagen Type-I/III Synthesis",
        "Autologous Polynucleotides",
        "Micro-Vascular Angiogenesis",
      ],
      [
        "Zero Trend-Chasing",
        "Exclusively Harley St GMC Faculty",
        "Hospital-Grade Cleanroom Sterility",
        "Cannula Sub-SMAS Micro-Delivery",
        "Full Facial Vector Equilibrium",
        "Sub-Millimeter Dosing Accuracy",
        "CQC Outstanding Standard",
        "Discreet VIP Private Entrance",
      ],
      [
        "Subcutaneous Volume Restoration",
        "Epidermal Barrier Re-Lipidation",
        "High-Viscosity HA Rheology",
        "Pigment Chromophore Targeting",
        "Longitudinal Age Deceleration",
        "Cryo-Exosome Nano-Delivery",
        "Biological Matrix Harmonization",
        "Non-Surgical Profile Architecture",
      ],
    ],
  } as DiagnosticTickerConfig,

  // Treatments & Services (3-column layout)
    treatments: [
      {
        id: "facial-harmonization",
        title: "Chemical Peeling",
        subtitle: "Reveal Fresher, Brighter Skin",
        category: "facial",
        description: "Multi-depth exfoliation treatment that removes damaged outer layers to reveal smoother, more even-toned skin.",
        longDescription: "Our chemical peel treatments use medical-grade acids (glycolic, salicylic, or TCA depending on your skin's needs) to accelerate cell turnover and clear away dull, damaged surface layers. This stimulates collagen production underneath, fading pigmentation, softening fine lines, and refining texture and pore appearance. Sessions are customized in depth and strength to match your skin type and concerns, from light lunchtime peels to deeper resurfacing treatments.",
        duration: "30 - 45 mins",
        downtime: "3 - 7 days (varies by peel depth)",
        results: "Visible improvement in 1 - 2 weeks, full results after peeling completes",
        priceGuide: "From $120",
        previewImage: "/images/procedures/chemical-peeling.jpg",
        features: ["Reduces pigmentation & sun damage", "Softens fine lines", "Refines texture & pores", "Customizable intensity"],
        recommendedFor: "Dull skin, uneven tone, mild acne scarring, sun damage"    
      },
      {
        id: "polynucleotide-matrix",
        title: "HydraFacial",
        subtitle: "Cleanse, Extract, Hydrate — In One Session",
        category: "facial",
        description: "A gentle, non-invasive treatment that cleanses, exfoliates, extracts impurities, and infuses skin with hydrating serums.",
        longDescription: "HydraFacial uses patented vortex-suction technology to simultaneously cleanse, exfoliate, and extract debris from pores while delivering nourishing antioxidants, peptides, and hyaluronic acid deep into the skin. Unlike traditional facials, there's no discomfort or irritation, making it suitable for virtually all skin types, including sensitive skin. The result is an immediate glow with no downtime, making it a popular pre-event treatment.",
        duration: "45 - 60 mins",
        downtime: "None — return to daily activities immediately",
        results: "Instant glow, visible immediately after treatment",
        priceGuide: "From $180",
        previewImage: "/images/procedures/hydrafacial.jpg",
        features: ["Deep pore cleansing", "Instant hydration boost", "No downtime", "Suitable for sensitive skin"],
        recommendedFor: "All skin types, congested pores, dehydrated or dull skin, pre-event prep"
      
      },
      {
        id: "hybrid-laser-resurfacing",
        title: "Laser Skin Rejuvenation",
    subtitle: "Turn Back the Clock on Your Skin",
    category: "laser",
    description: "Advanced laser technology that targets fine lines, sun damage, and uneven texture to restore a youthful glow.",
    longDescription: "Laser skin rejuvenation uses focused light energy to stimulate deep collagen remodeling while resurfacing the skin's surface. It effectively treats sun damage, age spots, fine lines, enlarged pores, and uneven texture without invasive surgery. Treatment intensity is tailored to your skin type and goals, ranging from gentle non-ablative sessions with minimal downtime to more intensive fractional resurfacing for dramatic results.",
    duration: "30 - 60 mins",
    downtime: "1 - 5 days (redness, mild peeling)",
    results: "Progressive improvement over 4 - 6 weeks; full results after full course",
    priceGuide: "From $250",
    previewImage: "/images/procedures/laser-skin-rejuvenation.jpg",
    features: ["Stimulates collagen", "Reduces sun damage & age spots", "Improves skin texture", "Minimally invasive"],
    recommendedFor: "Sun damage, fine lines, uneven texture, enlarged pores, early signs of aging"

      },
      {
        id: "botulinum-micro-tox",
        title: "Facelift",
        subtitle: "Restore a Naturally Youthful Contour",
        category: "surgical",
        description: "Surgical procedure that lifts and tightens sagging facial skin and underlying tissue for a refreshed, natural appearance.",
        longDescription: "A facelift addresses the visible signs of aging by repositioning underlying facial tissue, removing excess skin, and smoothing deep folds and jowls. Performed under anesthesia by our board-certified surgeons, the procedure is tailored to each patient's facial structure to deliver natural-looking, long-lasting results rather than an overly tightened appearance. Recovery is supported with a personalized aftercare plan to ensure comfort and optimal healing.",
        duration: "2 - 4 hours",
        downtime: "10 - 14 days before returning to work",
        results: "Final results visible after 2 - 3 months as swelling resolves",
        priceGuide: "From $6,500",
        previewImage: "/images/procedures/facelift.jpg",
        features: ["Board-certified surgeons", "Natural-looking results", "Long-lasting outcome", "Personalized aftercare"],
        recommendedFor: "Moderate to severe facial sagging, jowls, deep nasolabial folds"
      
      },
      {
        id: "exosome-growth-therapy",
        title: "Laser Hair Removal",
        subtitle: "Smooth Skin, Permanently",
        category: "laser",
        description: "Long-lasting hair reduction using targeted laser energy that disables hair follicles at the root.",
        longDescription: "Laser hair removal delivers concentrated light energy into hair follicles, disabling their ability to regrow hair while leaving surrounding skin unaffected. Because hair grows in cycles, a series of sessions is needed to catch follicles at their most responsive growth phase. Suitable for most areas of the body, this treatment offers a long-term alternative to shaving and waxing with progressively smoother results after each session.",
        duration: "15 - 60 mins (area dependent)",
        downtime: "None — mild redness may occur for a few hours",
        results: "Visible hair reduction after 2 - 3 sessions, optimal results after 6 - 8",
        priceGuide: "From $90 per session",
        previewImage: "/images/procedures/laser-hair-removal.jpg",
        features: ["Long-term hair reduction", "Suitable for most body areas", "No downtime", "Precise & fast treatment"],
        recommendedFor: "Unwanted body or facial hair, ingrown hairs, sensitive skin prone to razor irritation"
      
      },
      {
        id: "sculptra-collagen-induction",
        title: "Rhinoplasty",
        subtitle: "Refine Your Profile with Precision",
        category: "surgical",
        description: "Surgical reshaping of the nose to improve facial balance and, when needed, breathing function.",
        longDescription: "Rhinoplasty reshapes the bone and cartilage of the nose to achieve better facial harmony, correcting concerns such as a dorsal hump, wide or drooping tip, or asymmetry. It can also resolve functional issues like a deviated septum affecting breathing. Our surgeons use advanced imaging to plan results that complement your unique facial structure, aiming for outcomes that look natural and proportionate rather than overly altered.",
        duration: "1.5 - 3 hours",
        downtime: "7 - 10 days before returning to work",
        results: "Initial results visible after 2 - 3 weeks; final shape after 6 - 12 months",
        priceGuide: "From $5,800",
        previewImage: "/images/procedures/rhinoplasty.jpg",
        features: ["Advanced 3D imaging planning", "Corrects functional & aesthetic concerns", "Board-certified surgeons", "Natural, proportionate results"],
        recommendedFor: "Nasal hump, tip asymmetry, breathing difficulty, disproportionate nose shape"    
      
      },
    ] as Treatment[],

  // Team Grid (Board-Certified Aesthetic Physicians)
  team: [
    {
      id: "dr-elena-vance",
      name: "Dr. Elena Vance, MBChB, MRCP",
      title: "Medical Director & Lead Aesthetic Physician",
      credentials: "GMC 7482910 · Harley Street Clinical Lead",
      specialization: "Full Facial Harmonization, Cannula Vector Lift, Poly-L-Lactic Acid",
      bio: "Trained at Imperial College London with 14 years of aesthetic dermatology experience. Dr. Vance is internationally recognized for her undetectable micro-structural restorations.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
      gmcNumber: "7482910",
      availableDays: "Tue, Wed, Thu, Sat",
    },
    {
      id: "dr-marcus-sterling",
      name: "Dr. Marcus Sterling, FRCS (Plast)",
      title: "Consultant Aesthetic Surgeon",
      credentials: "GMC 6918234 · British Association of Plastic Surgeons",
      specialization: "Periorbital Rejuvenation, Deep-Plane Vector Analysis, Precision Laser",
      bio: "Specializing in minimal-intervention longevity medicine and high-precision laser therapeutics, Dr. Sterling bridges surgical anatomy with non-invasive finesse.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
      gmcNumber: "6918234",
      availableDays: "Mon, Wed, Fri",
    },
    {
      id: "dr-sophia-chen",
      name: "Dr. Sophia Chen, MBBS, MSc (Derm)",
      title: "Senior Regenerative Dermatologist",
      credentials: "GMC 8129034 · European Academy of Dermatology",
      specialization: "Polynucleotide Bio-Matrix, Exosome Protocols, Melasma & Texture",
      bio: "Pioneer in biological skin matrix renewal and pigment correction. Dr. Chen designs proprietary combination protocols combining light physics with cellular exosomes.",
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
      gmcNumber: "8129034",
      availableDays: "Mon, Tue, Thu, Fri",
    },
  ] as Doctor[],

  // Patient Testimonials
  testimonials: [
    {
      id: "t1",
      name: "Victoria H.",
      treatment: "Architectural Facial Harmonization",
      location: "Mayfair, London",
      quote: "The result is so natural that my closest friends simply asked if I had returned from a month-long retreat in Switzerland. Dr. Vance has a gifted eye for subtle architecture without adding unnatural fullness.",
      rating: 5,
      date: "August 2024",
    },
    {
      id: "t2",
      name: "Alexander M.",
      treatment: "Sciton Halo™ & Exosome Infusion",
      location: "Kensington, London",
      quote: "As someone in finance with zero tolerance for social downtime, the Sciton Halo protocol completely restored my sun-damaged skin texture in just 4 days. Unmatched professionalism and clinical discretion.",
      rating: 5,
      date: "September 2024",
    },
    {
      id: "t3",
      name: "Camilla R.",
      treatment: "Polynucleotide Eye Rejuvenation",
      location: "Chelsea, London",
      quote: "I had persistent under-eye hollowness and dark circles that conventional concealers couldn't mask. After two sessions of polynucleotides, the skin feels dense, rested, and luminous. An absolute masterclass.",
      rating: 5,
      date: "October 2024",
    },
  ] as Testimonial[],

  // FAQs
  faqs: [
    {
      question: "How do I book a private consultation via WhatsApp?",
      answer: "Click any WhatsApp booking button on our site. You will be connected directly with our Private Patient Concierge who will assist you in selecting your preferred medical doctor, discussing treatment goals, and securing your confidential consultation slot.",
    },
    {
      question: "Are all treatments performed by GMC-registered medical doctors?",
      answer: "Yes, without exception. At Maison Été, we believe aesthetic medicine is a rigorous clinical discipline. All injectable, laser, and regenerative therapies are exclusively planned and executed by our senior board-certified doctors.",
    },
    {
      question: "What should I expect during my initial assessment?",
      answer: "Your initial 45-minute consultation includes high-resolution 3D facial imaging, skin barrier biometrics, dynamic muscle analysis, and a comprehensive discussion of your longevity objectives. You will receive a bespoke Treatment Blueprint tailored to your facial anatomy.",
    },
    {
      question: "What is your approach to natural-looking outcomes?",
      answer: "Our guiding philosophy is 'The Architecture of Invisible Artistry'. We prioritize micro-dosing, anatomical layering, and bio-regenerative stimulation to enhance your individual proportions rather than conforming to fleeting aesthetic trends.",
    },
  ] as FaqItem[],

  // Closing CTA Section
  closingCta: {
    tag: "CONFIDENTIAL CONSULTATION",
    headline: "Begin Your Bespoke Journey.",
    subheadline: "Schedule a private consultation with our Harley Street medical directors. Inquire directly via our dedicated WhatsApp concierge for priority calendar reservations.",
    whatsAppButtonText: "Inquire on WhatsApp Now",
    secondaryButtonText: "View Consultation Fees & Protocols",
    guaranteeText: "Private entrance & non-disclosure protocol available upon request.",
  },

  // Helper WhatsApp Link Generator
  getWhatsAppUrl: (customMessage?: string) => {
    const number = clientConfig.clinic.whatsappNumber;
    const msg = encodeURIComponent(customMessage || clientConfig.clinic.whatsappDefaultMessage);
    return `https://wa.me/${number}?text=${msg}`;
  },
};
