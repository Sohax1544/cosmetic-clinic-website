import type { Treatment } from '../../client.config';

export const laserTreatments: Treatment[] = [
  {
    id: "laser-hair-removal",
    slug: "laser-hair-removal",
    title: "Laser Hair Removal",
    subtitle: "Less shaving, fewer ingrown hairs",
    category: "laser",
    description:
      "Laser hair removal reduces unwanted hair on the face and body, with sessions spaced weeks apart for a gradual, lasting reduction.",
    longDescription:
      "Laser hair removal uses a focused beam of light to heat the hair follicle and slow regrowth. Most patients need six to eight sessions spaced four to six weeks apart, because hair grows in cycles and only active follicles respond. You will feel a warm snap against the skin, and some areas are more sensitive than others. Every course starts with a patch test and skin assessment so we can choose settings that suit your skin tone and hair colour.",
    duration: "15 - 45 mins",
    downtime: "None - you can go straight back to your day",
    results:
      "Many patients notice finer, slower regrowth after three or four sessions, with the full course typically running six to eight sessions.",
    priceGuide: "From AED 250 per session",
    previewImage: "/images/procedures/laser-hair-removal.jpg",
    features: [
      "Works on most skin tones",
      "Patch test before your first session",
      "Face, underarms, legs and bikini",
      "No downtime afterwards",
    ],
    recommendedFor: "Unwanted hair on the face and body",
    details: {
      tagline: "Smoother skin, without the daily razor",
      overview:
        "Laser hair removal sends a short pulse of light into the follicle, where the pigment absorbs it as heat and the follicle is slowed. Because hair grows in cycles, only the follicles in an active growth phase respond to each session, which is why a course is spread over several months. Your first visit includes a patch test and skin assessment: we check your skin tone and hair colour, then choose the wavelength and settings that are appropriate for you. Deeper skin tones need different settings from fair skin, and the whole plan is built around that.",
      suitableFor: [
        "Underarms, legs, bikini line and back",
        "Upper lip, chin and jawline",
        "Ingrown hairs and shaving rash",
        "Facial hair linked to PCOS, alongside your medical care",
        "Men's chest, back and neck",
      ],
      process: [
        {
          title: "Skin assessment and patch test",
          description:
            "We review your medical history and medication, look at your skin tone and hair colour, then treat a small test area so we can check how your skin reacts before a full session.",
        },
        {
          title: "Settings chosen for your skin",
          description:
            "The wavelength and energy are set for you. Darker skin tones are treated with a longer wavelength and lower energy so the surrounding skin is protected.",
        },
        {
          title: "The session",
          description:
            "You wear protective eye shields. The handpiece delivers quick pulses that feel like a warm snap against the skin. Most people find it uncomfortable but manageable, and small areas take only a few minutes.",
        },
        {
          title: "Cooling and aftercare",
          description:
            "The area is cooled and you are given simple aftercare: no hot baths, saunas, waxing or plucking for a few days, and no direct sun on the treated area.",
        },
        {
          title: "Review and next session",
          description:
            "We check how the hair has shed, compare photos and book the next session four to six weeks later, when the next growth cycle is active.",
        },
      ],
      benefits: [
        "Noticeably less hair and slower regrowth after each session",
        "Fewer ingrown hairs, razor bumps and shaving irritation",
        "No recovery time, so you can return to work the same day",
        "Quick appointments, from 15 minutes for small areas",
      ],
      callouts: [
        {
          label: "Course length",
          value: "6 - 8 sessions",
          description: "Spaced four to six weeks apart, because hair grows in cycles.",
        },
        {
          label: "Sun care",
          value: "SPF 50 daily",
          description: "Avoid direct sun and tanning for two weeks before and after each session.",
        },
      ],
      gallery: [
        { label: "Underarms" },
        { label: "Full legs" },
        { label: "Upper lip and chin" },
      ],
      beforeAfter: [
        { label: "Underarms", caption: "After four sessions of laser hair removal." },
        { label: "Full legs", caption: "After six sessions, with regrowth softer and slower." },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Al Mansoori carries out every patch test and sets the wavelength for each skin tone herself.",
      },
      faqs: [
        {
          question: "Is laser hair removal permanent?",
          answer:
            "No treatment can promise permanent hair removal. Laser gives a long-lasting reduction: most patients keep far less hair, and some areas need one or two top-up sessions a year.",
        },
        {
          question: "Does it hurt?",
          answer:
            "It feels like a warm snap or a light rubber band flick against the skin. Small areas take a few minutes and most patients manage without numbing cream; we can apply it for larger or more sensitive areas.",
        },
        {
          question: "Can I have it if my skin is darker?",
          answer:
            "Yes. Darker skin tones are treated with a longer wavelength and lower energy to protect the pigment in your skin, and a patch test is always done first. If your hair is very light, grey or white there may not be enough pigment in the hair for the laser to target, and we will tell you honestly if the treatment is unlikely to work.",
        },
      ],
    },
  },
  {
    id: "fractional-laser-resurfacing",
    slug: "fractional-laser-resurfacing",
    title: "Fractional Laser Resurfacing",
    subtitle: "Smoother texture, softer scars",
    category: "laser",
    description:
      "Fractional laser resurfacing treats texture, fine lines and acne scarring by creating tiny columns of controlled heat in the skin.",
    longDescription:
      "Fractional laser resurfacing creates thousands of tiny, controlled heat columns in the skin, leaving the surrounding skin untouched so it heals faster. Over the following weeks the skin rebuilds collagen and the surface looks smoother and firmer. It is used most often on the face and on acne scarring. You will feel warmth and prickling during the session, so we apply numbing cream first, and you should expect three to five days of redness and flaking afterwards. Most patients need a course rather than a single treatment.",
    duration: "45 - 90 mins",
    downtime: "3 - 5 days of redness and light flaking",
    results:
      "Texture and scarring typically improve gradually over two to three months as new collagen forms, and many patients see the clearest change after a course of three to four sessions.",
    priceGuide: "From AED 1,800 per session",
    previewImage: "",
    features: [
      "Softens acne scars and enlarged pores",
      "Smooths fine lines and crepey texture",
      "Numbing cream before treatment",
      "Planned as a course, not a one-off",
    ],
    recommendedFor: "Acne scarring, rough texture and fine lines",
    details: {
      tagline: "Rebuild the skin surface, one column at a time",
      overview:
        "The laser makes tiny channels in the skin rather than removing the whole surface, so healing is quicker than with older resurfacing methods. Each channel triggers a repair response and fresh collagen, which is what softens depressed acne scars and refines rough texture over the following months. We start with a skin assessment and a patch test, because darker skin tones carry a higher risk of dark marks after laser and need lower settings, sometimes across more sessions. You will be numbed for around 45 minutes before treatment, and the treated area will look red and feel warm, like sunburn, for a few days.",
      suitableFor: [
        "Depressed acne scars on the cheeks",
        "Rough, uneven texture and enlarged pores",
        "Fine lines around the eyes and mouth",
        "Crepey skin on the face and neck",
        "Sun-damaged skin with a dull surface",
      ],
      process: [
        {
          title: "Skin assessment and patch test",
          description:
            "We review your skin, scarring and history of cold sores or dark marks after injury, then patch test a small area to check how your skin heals.",
        },
        {
          title: "Numbing cream",
          description:
            "A numbing cream is applied about 45 minutes before your session. It takes the edge off the heat, but you should still expect warmth and prickling.",
        },
        {
          title: "The treatment",
          description:
            "The handpiece passes over the skin in a set pattern, creating tiny columns of heat. A full face takes 45 to 90 minutes depending on the depth and area treated.",
        },
        {
          title: "The first few days",
          description:
            "Expect redness and light flaking for three to five days. We give you a simple barrier cream and ask you to keep the area out of direct sun while it settles.",
        },
        {
          title: "Review and repeat",
          description:
            "We see you at two weeks and again at three months, when the collagen change is easier to judge, and plan the next session four to six weeks apart if needed.",
        },
      ],
      benefits: [
        "Acne scars look softer and less shadowed",
        "Skin feels firmer and smoother in texture",
        "Pores and fine lines are less obvious",
        "Only a few days of visible downtime",
      ],
      callouts: [
        {
          label: "Typical course",
          value: "3 - 4 sessions",
          description: "Spaced four to six weeks apart, with results building over three months.",
        },
        {
          label: "Time off",
          value: "3 - 5 days",
          description: "Redness and flaking settle within a week for most patients.",
        },
      ],
      gallery: [
        { label: "Full face resurfacing" },
        { label: "Cheek acne scarring" },
        { label: "Perioral fine lines" },
      ],
      beforeAfter: [
        { label: "Cheek scarring", caption: "After three sessions, with scars softer and less shadowed." },
        { label: "Overall texture", caption: "After four sessions, with a smoother surface and refined pores." },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Al Mansoori sets the depth and density of each resurfacing pass according to how your skin tone heals.",
      },
      faqs: [
        {
          question: "How much downtime should I plan for?",
          answer:
            "Most patients take three to five days of redness and light flaking, and can cover it with a tinted barrier cream. Plan it around a quiet weekend or a few days away from meetings rather than a big event.",
        },
        {
          question: "Will one session fix my acne scars?",
          answer:
            "No. A single session usually gives a modest improvement. Scars respond gradually, and many patients need three to four sessions before the change is obvious in photos.",
        },
        {
          question: "Is it safe on darker skin?",
          answer:
            "It can be, but darker skin tones have a higher chance of dark marks appearing after laser, so we use lower settings, patch test first, and sometimes recommend a different treatment if the risk is not worth it for you. You will also need daily SPF 50 and no direct sun for two weeks after each session.",
        },
      ],
    },
  },
  {
    id: "pigmentation-laser",
    slug: "pigmentation-laser",
    title: "Pigmentation Laser",
    subtitle: "Even out sun spots and uneven tone",
    category: "laser",
    description:
      "Pigmentation laser targets sun spots, freckles and uneven tone by delivering short bursts of light that break up excess pigment.",
    longDescription:
      "Pigmentation laser uses short, precise bursts of light to break up excess melanin in sun spots, freckles and some types of melasma. The pigment darkens slightly and then flakes or fades over the following week. Melasma is more stubborn than sun damage and often needs a gentler setting, more sessions, and ongoing sun protection to stay under control. Discomfort is brief and feels like a light sting. Every plan starts with a skin assessment and patch test, because darker skin tones need lower settings to avoid making pigmentation worse.",
    duration: "20 - 40 mins",
    downtime: "1 - 3 days of mild redness; spots may darken before fading",
    results:
      "Sun spots typically fade over one to three sessions, while melasma usually needs a longer plan and maintenance sessions, and many patients need daily SPF 50 to hold the result.",
    priceGuide: "From AED 900 per session",
    previewImage: "",
    features: [
      "Targets sun spots and freckles",
      "Gentler settings for melasma",
      "Patch test before treatment",
      "Sun protection plan included",
    ],
    recommendedFor: "Sun spots, freckles and patchy pigmentation",
    details: {
      tagline: "Clearer, more even tone without bleaching creams",
      overview:
        "Sun spots and freckles sit in the upper layer of the skin and usually respond well to a short burst of laser light, darkening for a few days before they flake away. Melasma behaves differently: it is driven by hormones and heat as well as sun, sits deeper, and often returns if unprotected skin is exposed again. For that reason we treat melasma gently, with lower settings and more sessions, and we are honest that it is managed rather than cured. Every course starts with a skin assessment and patch test so we can set the right energy for your skin tone and avoid darkening the area.",
      suitableFor: [
        "Sun spots and age spots on the face",
        "Freckles and scattered pigment",
        "Melasma and hormone-related patches",
        "Pigmentation left after acne or injury",
        "Uneven tone on the face, neck and hands",
      ],
      process: [
        {
          title: "Skin assessment and patch test",
          description:
            "We look at the type and depth of your pigmentation, ask about pregnancy, hormones and any creams you use, then patch test a small area and check it two weeks later.",
        },
        {
          title: "Settings for your pigment and skin tone",
          description:
            "Darker skin tones need lower energy and longer intervals between sessions. Melasma is treated more gently than sun spots so the pigment is not provoked.",
        },
        {
          title: "The session",
          description:
            "You wear protective eye shields and feel a brief sting, like a light flick, with each pass. A full face usually takes 20 to 40 minutes including cooling.",
        },
        {
          title: "The week afterwards",
          description:
            "Treated spots may look darker for a few days, then flake or fade. Redness settles within one to three days. Direct sun and heat are avoided while the skin settles.",
        },
        {
          title: "Review and maintenance",
          description:
            "We compare photos at four to six weeks, decide whether another session is useful, and set up a sun protection routine that keeps the result stable.",
        },
      ],
      benefits: [
        "Sun spots and freckles fade or clear",
        "Overall tone looks more even and brighter",
        "Short sessions with minimal downtime",
        "A clear plan for keeping pigment from returning",
      ],
      callouts: [
        {
          label: "Sessions needed",
          value: "1 - 3 for sun spots",
          description: "Melasma usually needs more sessions and ongoing maintenance.",
        },
        {
          label: "Sun care",
          value: "SPF 50 every day",
          description: "Without daily protection, treated pigment often comes back.",
        },
      ],
      gallery: [
        { label: "Sun spots on the cheeks" },
        { label: "Melasma on the upper lip" },
        { label: "Pigmentation on the hands" },
      ],
      beforeAfter: [
        { label: "Sun spots", caption: "After two sessions, with spots faded and tone more even." },
        { label: "Melasma", caption: "After a gentle course, with patches lighter and better controlled." },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Al Mansoori separates sun damage from melasma before treating, because the two need very different laser settings.",
      },
      faqs: [
        {
          question: "Will the laser clear my pigmentation completely?",
          answer:
            "Sun spots often fade a great deal or clear. Melasma is different: it can be improved but it is managed rather than cured, and it may return with sun exposure, heat or hormonal change. We will tell you what is realistic for your skin before you commit to a course.",
        },
        {
          question: "Does the treated area look worse first?",
          answer:
            "Often yes. Spots usually darken for a few days and then flake or fade, and there may be mild redness for one to three days. Plan treatment at least two weeks before a wedding or event.",
        },
        {
          question: "Can I have laser on darker skin?",
          answer:
            "Yes, with the right settings. Darker skin tones are treated at lower energy after a patch test, because too much heat can cause new dark marks. A patch test is done first in every case, and daily SPF 50 plus avoiding strong sun for two weeks around each session is part of the treatment, not optional.",
        },
      ],
    },
  },
  {
    id: "rf-microneedling",
    slug: "rf-microneedling",
    title: "RF Microneedling",
    subtitle: "Firmer skin, softer scars, little downtime",
    category: "laser",
    description:
      "RF microneedling uses fine needles and radiofrequency energy to firm skin, soften scars and improve texture with little downtime.",
    longDescription:
      "RF microneedling passes very fine needles into the skin and releases radiofrequency energy. The tiny wounds trigger the skin's own repair response and new collagen, which firms loose skin, softens acne scars and refines large pores. Numbing cream is applied 30 minutes first, and most patients describe it as a warm scratching sensation rather than sharp pain. Expect one to three days of redness, like mild sunburn, and no direct sun for two weeks. Two to four sessions spaced four to six weeks apart are typical.",
    duration: "45 - 75 mins",
    downtime: "1 - 3 days of redness, like mild sunburn",
    results:
      "Skin typically feels firmer and smoother around six to eight weeks after a session as new collagen builds, and many patients see the best change after two to four sessions.",
    priceGuide: "From AED 1,500 per session",
    previewImage: "",
    features: [
      "Firms early skin laxity",
      "Softens acne scars",
      "Numbing cream included",
      "Little downtime",
    ],
    recommendedFor: "Early skin laxity, acne scars and large pores",
    details: {
      tagline: "Tightening that works with your own collagen",
      overview:
        "RF microneedling delivers heat at a controlled depth in the skin, which tightens the tissue immediately and then stimulates new collagen over the following two to three months. Because the surface is only punctured with very fine needles, healing is quicker than with resurfacing lasers, which is why it suits patients who cannot take a week off. It is a good option for early looseness along the jawline, acne scars on the cheeks, and enlarged pores. You will be numbed first, and we always patch test and assess your skin, with lower settings for darker skin tones.",
      suitableFor: [
        "Early laxity along the jawline and cheeks",
        "Rolling and boxcar acne scars",
        "Enlarged pores and oily, uneven texture",
        "Fine lines on the forehead and around the mouth",
        "Loose skin on the neck and under the chin",
      ],
      process: [
        {
          title: "Skin assessment and patch test",
          description:
            "We check your skin tone, scarring and any history of dark marks or cold sores, then patch test so we know how your skin responds before a full treatment.",
        },
        {
          title: "Numbing cream",
          description:
            "Numbing cream is applied for about 30 minutes. It makes the treatment manageable, though you will still feel warmth and a scratching sensation as the needles pass.",
        },
        {
          title: "The treatment",
          description:
            "The handpiece moves over the area in sections, releasing energy at a set depth. A full face and neck takes 45 to 75 minutes.",
        },
        {
          title: "The first few days",
          description:
            "Expect redness and warmth like mild sunburn for one to three days, with possible tiny pinpoint marks. Keep the area clean, avoid make-up for 24 hours and stay out of direct sun.",
        },
        {
          title: "Review and repeat",
          description:
            "We review at four to six weeks, compare photos, and plan the next session. Collagen keeps changing for up to three months after each treatment.",
        },
      ],
      benefits: [
        "Skin feels firmer and looks tighter along the jawline",
        "Acne scars look softer and less indented",
        "Pores look smaller and texture more even",
        "Back to normal activity within a day or two",
      ],
      callouts: [
        {
          label: "Typical course",
          value: "2 - 4 sessions",
          description: "Spaced four to six weeks apart, with collagen building over three months.",
        },
        {
          label: "Comfort",
          value: "Numbing cream first",
          description: "Most patients describe a warm scratching sensation, not sharp pain.",
        },
      ],
      gallery: [
        { label: "Full face and neck" },
        { label: "Cheek acne scars" },
        { label: "Jawline and under-chin firming" },
      ],
      beforeAfter: [
        { label: "Jawline firming", caption: "After three sessions, with a firmer, more defined jawline." },
        { label: "Acne scarring", caption: "After four sessions, with scars softer and texture smoother." },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Al Mansoori adjusts the needle depth for each area, using shallower passes where the skin is thinner and more sensitive.",
      },
      faqs: [
        {
          question: "How sore is it, and how long is the downtime?",
          answer:
            "With numbing cream, most patients rate it as uncomfortable rather than painful: a warm scratching feeling over the skin. Redness like mild sunburn lasts one to three days, and most people are back to work the next day with a little tinted moisturiser.",
        },
        {
          question: "When will I see a difference?",
          answer:
            "There is a slight tightening straight away, but the real change comes from new collagen over six to twelve weeks. Many patients see the clearest result after two to four sessions rather than one.",
        },
        {
          question: "Can I have RF microneedling on darker skin or in summer?",
          answer:
            "Yes on both counts, with care. Darker skin tones are treated at lower energy after a patch test to reduce the risk of dark marks. In Dubai we ask you to avoid direct sun and use SPF 50 for two weeks before and after each session, and to skip active tanning and saunas around your appointment.",
        },
      ],
    },
  },
];
