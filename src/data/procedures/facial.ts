import type { Treatment } from '../../client.config';

export const facialTreatments: Treatment[] = [
  {
    id: "anti-wrinkle-injections",
    slug: "anti-wrinkle-injections",
    title: "Anti-Wrinkle Injections",
    subtitle: "Soften expression lines on the forehead, frown and crow's feet",
    category: "facial",
    description: "Relax the muscles that crease your forehead, frown line and crow's feet for a smoother, more rested expression.",
    longDescription: "Anti-wrinkle injections use a small, precise dose of botulinum toxin to relax the specific muscles that pull your skin into lines. We treat the forehead, the frown line between the brows and crow's feet beside the eyes, and we can also lift a heavy brow or soften a gummy smile. Your face keeps its movement and its character, just with less creasing. Most patients are in and out of the clinic in under half an hour, with no real downtime and results that build over the following week.",
    duration: "20 - 30 mins",
    downtime: "None to minimal - most patients go straight back to work or normal plans the same day.",
    results: "Lines typically start to soften within 3 - 7 days, with many patients seeing the full effect at around 2 weeks.",
    priceGuide: "From AED 1,200 per area",
    previewImage: "",
    features: [
      "Softens forehead lines, frown lines and crow's feet",
      "Keeps natural expression and movement",
      "No downtime for most patients",
      "Takes 20 - 30 minutes in clinic"
    ],
    recommendedFor: "Adults with dynamic expression lines who want a fresher, less tired look without changing how their face moves.",
    details: {
      tagline: "Smoother expression lines, without losing your face",
      overview: "Anti-wrinkle injections temporarily relax the small muscles that crease your skin when you frown, squint or raise your brows. We map your face first, treat only the muscles that are causing the lines, and keep the dose conservative so your expression still looks like you. The appointment takes around 20 to 30 minutes, including consultation, and you can return to your day immediately afterwards.",
      suitableFor: [
        "Horizontal lines across the forehead",
        "The vertical frown line between the brows",
        "Crow's feet beside the eyes",
        "A heavy brow that makes the eyelids look hooded",
        "Early lines you want to stop from becoming deeper"
      ],
      process: [
        {
          title: "Consultation and facial mapping",
          description: "We look at how your face moves at rest and in expression, and agree which areas to treat and which to leave alone."
        },
        {
          title: "Medical review and consent",
          description: "Your practitioner reviews your history, medications and previous treatments, and explains what the product can and cannot do."
        },
        {
          title: "Precise injection",
          description: "A small dose is placed into the selected muscles using a very fine needle. Most patients describe the sensation as a light pinch."
        },
        {
          title: "Aftercare and pressure points",
          description: "We clean the area and give you simple aftercare: no rubbing the treated area, no strenuous exercise, no facials for 24 hours."
        },
        {
          title: "Two-week review",
          description: "We check your result at around two weeks and adjust only if something needs balancing. Top-ups are kept small and considered."
        }
      ],
      benefits: [
        "A softer, more rested look in photos",
        "Less creasing when you frown or squint",
        "Still able to raise your brows and show expression",
        "A quick appointment with no recovery time for most patients"
      ],
      callouts: [
        {
          label: "Appointment time",
          value: "20 - 30 mins",
          description: "Includes consultation, facial mapping and treatment."
        },
        {
          label: "When to book",
          value: "2 - 3 weeks before an event",
          description: "This gives the result time to settle and lets us review it with you."
        }
      ],
      gallery: [
        { label: "Forehead lines before treatment" },
        { label: "Frown line before treatment" },
        { label: "Crow's feet before treatment" }
      ],
      beforeAfter: [
        { label: "Forehead, before and after", caption: "Relaxed forehead with movement kept at the brows." },
        { label: "Frown line, before and after", caption: "Softer 11 lines between the brows after two weeks." }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "I keep anti-wrinkle doses conservative so you look rested rather than frozen, and I always review you at two weeks before considering any adjustment."
      },
      faqs: [
        {
          question: "Will I look frozen?",
          answer: "No. We treat only the muscles creating the lines and keep the dose measured, so you can still raise your brows and show expression. If you want a lighter effect, tell us at consultation and we will work to that."
        },
        {
          question: "How soon will I see a difference?",
          answer: "Change usually starts between day 3 and day 7, and the result settles by around two weeks. That is why we book your review at the two-week mark rather than judging it on day one."
        },
        {
          question: "How long does it last?",
          answer: "For most patients the effect fades gradually over three to four months. Movement returns slowly, so the lines come back over time rather than all at once. We will agree a sensible treatment interval with you."
        }
      ]
    }
  },
  {
    id: "lip-enhancement",
    slug: "lip-enhancement",
    title: "Lip Enhancement",
    subtitle: "Shape, balance and hydration for lips that suit your face",
    category: "facial",
    description: "Add subtle volume and definition to your lips so they sit in balance with the rest of your face.",
    longDescription: "Lip enhancement uses hyaluronic acid filler to restore volume, define the border and soften the fine lines that develop around the mouth. We work to your natural lip shape rather than a template, treating the upper lip, lower lip and border in proportions that suit your face. Treatment takes around 30 to 45 minutes including numbing, and most patients have mild swelling for a day or two. You will see the settled result at about two weeks.",
    duration: "30 - 45 mins",
    downtime: "Usually 1 - 3 days of mild swelling or tenderness; most patients work the next day.",
    results: "Fuller, better-defined lips typically settle within 2 weeks; many patients also notice softer lines around the mouth.",
    priceGuide: "From AED 1,800 per treatment",
    previewImage: "",
    features: [
      "Balanced volume rather than overfilled lips",
      "Sharper lip border and softer mouth lines",
      "Numbing cream used before treatment",
      "Results reviewed and refined at two weeks"
    ],
    recommendedFor: "Adults who want fuller or more defined lips, correction of asymmetry, or softening of lines around the mouth.",
    details: {
      tagline: "Lips in proportion, not lips in the spotlight",
      overview: "Lip enhancement with hyaluronic acid filler restores volume and definition where your lips have thinned or lost shape. We start with a proper assessment of your lip proportions, your bite and how your mouth moves when you speak and smile, then treat accordingly. Numbing cream is applied first, so most patients find the appointment comfortable. Swelling in the first day or two is normal and settles quickly.",
      suitableFor: [
        "Thin or ageing lips that have lost volume",
        "A lip border that has become less defined",
        "Mild asymmetry between the upper and lower lip",
        "Fine vertical lines around the mouth",
        "Lips that need balancing before a wedding or event"
      ],
      process: [
        {
          title: "Assessment and lip planning",
          description: "We measure your lip proportions in relation to your nose, chin and smile, and agree the shape and volume you want."
        },
        {
          title: "Medical review and consent",
          description: "Your practitioner checks your history, allergies and any previous filler, and confirms the product being used is a reversible hyaluronic acid filler."
        },
        {
          title: "Numbing and treatment",
          description: "Numbing cream is applied, then the filler is placed in small amounts through the border and body of the lip to build shape gradually."
        },
        {
          title: "Aftercare advice",
          description: "We cool the area and explain aftercare: avoid extreme heat, alcohol and strenuous exercise for 24 hours, and avoid dental work for two weeks."
        },
        {
          title: "Two-week review",
          description: "Once swelling has fully settled we review your result and refine the shape if you would like a small adjustment."
        }
      ],
      benefits: [
        "A more defined lip border that holds lipstick better",
        "Hydrated lips that look healthy rather than dry",
        "Balance between the upper and lower lip",
        "A result we can review and adjust at two weeks"
      ],
      callouts: [
        {
          label: "Product used",
          value: "Reversible hyaluronic acid filler",
          description: "If needed, this type of filler can be dissolved by a practitioner."
        },
        {
          label: "Best timing",
          value: "3 - 4 weeks before an event",
          description: "Allows swelling to settle fully and any refinement to be made in good time."
        }
      ],
      gallery: [
        { label: "Lip border before treatment" },
        { label: "Upper lip volume before treatment" },
        { label: "Lines above the lip before treatment" }
      ],
      beforeAfter: [
        { label: "Upper lip, before and after", caption: "Defined border with volume kept in proportion." },
        { label: "Lower lip, before and after", caption: "Restored hydration and shape at the two-week review." }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "I build lip volume in small stages and assess your lip proportions against your whole face, because a balanced lip looks better than a larger one."
      },
      faqs: [
        {
          question: "Will my lips look obviously done?",
          answer: "Our aim is balance rather than size. We place small amounts at a time and check the shape as we go, so your lips stay in proportion with your nose, chin and smile. You can also choose a lighter result and build over two appointments."
        },
        {
          question: "What does it feel like?",
          answer: "Numbing cream is applied beforehand and most patients describe pressure or a light sting rather than pain. Lips are sensitive, so you may feel some tenderness for a day or two afterwards, which usually settles on its own."
        },
        {
          question: "How long do results last?",
          answer: "Hyaluronic acid filler in the lips commonly lasts six to twelve months, depending on the product, how much is used and how your body breaks it down. We will assess your result at two weeks and plan any maintenance from there."
        }
      ]
    }
  },
  {
    id: "polynucleotide-eye-rejuvenation",
    slug: "polynucleotide-eye-rejuvenation",
    title: "Under-Eye Rejuvenation",
    subtitle: "Brighter, smoother skin in the under-eye area",
    category: "facial",
    description: "Improve crepiness, dryness and dullness under the eyes with a course of polynucleotide injections.",
    longDescription: "Under-eye rejuvenation uses polynucleotides, injected in tiny amounts into the thin skin beneath the eye, to support hydration, elasticity and skin quality. It is designed for crepiness, fine lines, dryness and a dull, tired look rather than for deep hollowing or dark circles caused by pigmentation. We usually recommend a course of two to three sessions spaced about four weeks apart. The area is numbed first, and most patients have mild pinpoint swelling for a day or so.",
    duration: "30 - 45 mins",
    downtime: "Mild pinpoint swelling or tenderness for up to 48 hours; makeup can usually resume after 24 hours.",
    results: "Many patients notice brighter, smoother under-eye skin after 2 - 3 sessions, reviewed at 4 weeks after each visit.",
    priceGuide: "From AED 1,900 per session",
    previewImage: "",
    features: [
      "Targets thin, crepey under-eye skin",
      "Improves hydration and skin quality",
      "Course of 2 - 3 sessions, four weeks apart",
      "No added volume or filler look"
    ],
    recommendedFor: "Adults with under-eye crepiness, fine lines or dryness who do not want added volume in the area.",
    details: {
      tagline: "Better skin quality under the eyes, not extra volume",
      overview: "The skin under the eye is the thinnest on the face, so it shows dryness, crepiness and fatigue early. Polynucleotides are injected in micro-droplets into that skin to support hydration, elasticity and a healthier surface. This is a skin-quality treatment rather than a volumising one, so it will not fill a deep hollow or lighten pigmentation. We map the area carefully and use a very fine needle to keep the procedure precise.",
      suitableFor: [
        "Fine lines and crepiness under the eyes",
        "Under-eye skin that looks dry or dull",
        "A tired appearance that makeup no longer hides",
        "Thinning skin caused by sun exposure or age",
        "Patients who want skin improvement without added volume"
      ],
      process: [
        {
          title: "Consultation and cause assessment",
          description: "We examine the under-eye area and discuss whether your concern comes from skin quality, hollowing, pigmentation or fluid, since each needs a different plan."
        },
        {
          title: "Medical review and consent",
          description: "Your practitioner reviews your history, allergies and eye health, and explains realistic outcomes and the number of sessions likely needed."
        },
        {
          title: "Numbing and micro-injections",
          description: "Numbing cream is applied, then small amounts of polynucleotide are placed just under the skin in a grid pattern across the treated area."
        },
        {
          title: "Cooling and aftercare",
          description: "We cool the area and give aftercare instructions: no rubbing, no strenuous exercise, and no eye makeup for the first 24 hours."
        },
        {
          title: "Four-week review",
          description: "We review progress four weeks after each session and confirm whether a further session is worthwhile before booking it."
        }
      ],
      benefits: [
        "Firmer, better-hydrated under-eye skin",
        "Softer fine lines and less crepiness",
        "A fresher look without adding volume",
        "A staged plan you can stop at any point"
      ],
      callouts: [
        {
          label: "Typical course",
          value: "2 - 3 sessions",
          description: "Spaced around four weeks apart, with the result reviewed after each one."
        },
        {
          label: "Not for",
          value: "Deep hollowing or pigmentation",
          description: "Those concerns need a different assessment, which we will discuss at consultation."
        }
      ],
      gallery: [
        { label: "Fine lines under the eye before treatment" },
        { label: "Crepey under-eye skin before treatment" },
        { label: "Dull under-eye area before treatment" }
      ],
      beforeAfter: [
        { label: "Under-eye crepiness, before and after", caption: "Smoother skin quality after a course of three sessions." },
        { label: "Fine lines, before and after", caption: "Softer lines, reviewed four weeks after the final session." }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Under-eye concerns have several different causes, so I assess the area carefully before treating and will tell you when polynucleotides are not the right answer for you."
      },
      faqs: [
        {
          question: "How many sessions will I need?",
          answer: "Most patients have two to three sessions spaced about four weeks apart. We review the area after each session and only continue if there is a clear improvement, so you are not committed to a full course up front."
        },
        {
          question: "Will this remove my dark circles?",
          answer: "It is not a treatment for pigmentation or for shadows caused by hollowing. It improves skin quality, hydration and crepiness. At consultation we will identify what is driving your dark circles and tell you honestly whether this treatment will help."
        },
        {
          question: "What does recovery look like?",
          answer: "Small raised bumps at the injection points usually settle within 24 to 48 hours, and some patients have mild tenderness or a little bruising. Most people return to work the next day and can wear eye makeup after 24 hours."
        }
      ]
    }
  },
  {
    id: "profhilo-skin-boosters",
    slug: "profhilo-skin-boosters",
    title: "Skin Boosters",
    subtitle: "Deep hydration that improves skin quality across the face",
    category: "facial",
    description: "Inject hydrating skin boosters to improve firmness, glow and fine lines across the face, neck and hands.",
    longDescription: "Skin boosters are injectable hyaluronic acid gels that spread beneath the skin to hold water and improve skin quality rather than add volume. They are used for dullness, fine lines, crepiness and loss of firmness on the face, neck, decolletage and hands. A typical plan is two sessions four weeks apart, followed by maintenance every six to nine months. There may be small bumps at the injection points for a day or two, and the effect builds gradually over the following weeks.",
    duration: "30 - 45 mins",
    downtime: "Small bumps at injection points for up to 48 hours; most patients return to normal activity the next day.",
    results: "Many patients notice a more hydrated, rested look after the second session, with skin quality continuing to improve over the following weeks.",
    priceGuide: "From AED 1,500 per session",
    previewImage: "/images/procedures/chemical-peeling.jpg",
    features: [
      "Hydrates skin from within rather than adding volume",
      "Improves fine lines, crepiness and dullness",
      "Two-session plan, four weeks apart",
      "Can treat face, neck, decolletage and hands"
    ],
    recommendedFor: "Adults with dull, dry or crepey skin who want better skin quality rather than a change in facial shape.",
    details: {
      tagline: "Skin quality first: hydration, firmness and glow",
      overview: "Skin boosters are runny hyaluronic acid gels injected just beneath the skin surface. Instead of filling a fold or adding volume, they spread through the skin and hold water, which improves firmness, smoothness and light reflection. The result is skin that looks better hydrated and less tired. We often combine them with other treatments, but they work well on their own as a straightforward way to improve skin quality without changing your features.",
      suitableFor: [
        "Dull, tired-looking skin that lacks glow",
        "Fine lines and crepiness on the cheeks",
        "Thinning or crepey skin on the neck",
        "Loss of firmness across the decolletage",
        "Dry skin on the backs of the hands"
      ],
      process: [
        {
          title: "Consultation and skin assessment",
          description: "We assess your skin quality, hydration, elasticity and areas of concern, and agree which zones to treat at this visit."
        },
        {
          title: "Medical review and consent",
          description: "Your practitioner reviews your history, allergies and any previous injectable treatments, and explains how the results build over time."
        },
        {
          title: "Numbing and injection",
          description: "Numbing cream is applied, then the product is placed at several points across the treatment area using a fine needle or cannula."
        },
        {
          title: "Aftercare instructions",
          description: "We cool the area and explain aftercare: no rubbing or massage, no strenuous exercise, saunas or facials for 24 hours."
        },
        {
          title: "Second session and review",
          description: "The second session is usually booked four weeks later, and we review your skin quality then and again a few weeks after that."
        }
      ],
      benefits: [
        "Skin that looks more hydrated and rested",
        "Softer fine lines and crepiness",
        "Better firmness without changing your facial shape",
        "Suitable for face, neck, decolletage and hands"
      ],
      callouts: [
        {
          label: "Typical plan",
          value: "2 sessions, 4 weeks apart",
          description: "Followed by maintenance every 6 - 9 months for many patients."
        },
        {
          label: "Works well with",
          value: "Laser, peels and skincare",
          description: "We will sequence treatments so your skin is not overloaded."
        }
      ],
      gallery: [
        { label: "Dull cheek skin before treatment" },
        { label: "Crepey neck skin before treatment" },
        { label: "Hand skin before treatment" }
      ],
      beforeAfter: [
        { label: "Cheek skin quality, before and after", caption: "More hydrated look after the second session." },
        { label: "Neck crepiness, before and after", caption: "Smoother neck skin reviewed six weeks after the course." }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Skin boosters work gradually, so I plan them as a short course and review your skin quality between sessions rather than promising an instant change."
      },
      faqs: [
        {
          question: "How is this different from filler?",
          answer: "Filler is placed to restore volume or reshape an area. Skin boosters are much runnier gels that spread through the skin to hold water and improve quality. Your facial shape stays the same; your skin simply looks better hydrated."
        },
        {
          question: "When will I see the result?",
          answer: "Hydration improves within days, but the fuller effect on firmness and fine lines usually builds over several weeks and is clearest after the second session. We review you after the course so you can judge the change properly."
        },
        {
          question: "How often will I need maintenance?",
          answer: "After the initial two sessions, many patients maintain with one session every six to nine months, often timed before a season or event. Your practitioner will recommend an interval based on how your skin responds."
        }
      ]
    }
  }
];
