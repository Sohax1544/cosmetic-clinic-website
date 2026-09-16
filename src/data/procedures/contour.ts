import type { Treatment } from '../../client.config';

export const contourTreatments: Treatment[] = [
  {
    id: "dermal-fillers",
    slug: "dermal-fillers",
    title: "Dermal Fillers",
    subtitle: "Restore lost volume and soften lines without surgery",
    // Facial injectable, not a body-contouring treatment.
    category: "facial",
    description: "Dermal fillers restore lost volume and soften lines by adding gel-like filler beneath the skin in targeted areas.",
    longDescription: "Dermal fillers are injectable gels, most often hyaluronic acid, used to replace volume that fades with age. At our Dubai clinic we map your face first, then place small amounts in the cheeks, lips, jawline or under-eye area to lift and balance features. Results are visible straight away and typically settle over two weeks. How much you need, and how long it lasts, depends on the area treated, the product chosen and how your body responds. Suitability is confirmed in consultation with a DHA-licensed doctor.",
    duration: "30 - 45 mins",
    downtime: "Mild swelling or bruising for two to five days; many patients return to work the next day.",
    results: "Visible immediately and typically settled within two weeks; many patients see results last 6 to 18 months depending on the area and product.",
    priceGuide: "From AED 1,500 per syringe",
    previewImage: "",
    features: [
      "Visible change on the same day",
      "Natural-looking lift and balance",
      "Little disruption to your week",
      "Reversible hyaluronic acid options"
    ],
    recommendedFor: "Adults with flattened cheeks, thin lips, hollow temples or lines that have deepened with age.",
    details: {
      tagline: "Volume restored, features rebalanced",
      overview: "Filler treatment starts with an honest look at how your face has changed and what you want to look like afterwards. We mark the areas that need support, cleanse the skin, and use a fine needle or blunt cannula to place small amounts of gel at different depths. Most appointments take under an hour. You will see a change when you look in the mirror, and the settled result usually shows once any swelling has gone down. We record the product and the amount used so future sessions stay consistent.",
      suitableFor: [
        "Flattened or hollow cheeks",
        "Thin, uneven or ageing lips",
        "Nasolabial folds and marionette lines",
        "Hollow under-eyes and tear troughs",
        "A jawline that has lost definition"
      ],
      process: [
        {
          title: "Consultation and facial assessment",
          description: "A DHA-licensed doctor reviews your medical history, examines your face at rest and in movement, and agrees realistic goals with you."
        },
        {
          title: "Treatment plan and product choice",
          description: "We decide which areas to treat, how much product is needed and which filler suits the tissue, then confirm the cost before we begin."
        },
        {
          title: "Comfort measures and skin preparation",
          description: "The skin is cleansed and, where appropriate, numbing cream or local anaesthetic is used so the injections are manageable."
        },
        {
          title: "Injection",
          description: "Small amounts of filler are placed step by step with a needle or cannula, checking symmetry as we go rather than filling everything at once."
        },
        {
          title: "Review and aftercare",
          description: "You receive written aftercare, guidance on managing swelling, and a review appointment two to four weeks later to check the result."
        }
      ],
      benefits: [
        "Adds volume where the face has flattened with age",
        "Softens folds without changing who you look like",
        "Results you can see before you leave the clinic",
        "Treated in stages so the plan fits your budget"
      ],
      callouts: [
        {
          label: "Typical appointment",
          value: "30 - 45 mins",
          description: "Longer if several areas are treated in the same visit."
        },
        {
          label: "How long results last",
          value: "6 - 18 months",
          description: "Depends on the area, the product and how quickly your body breaks it down."
        }
      ],
      gallery: [
        { label: "Cheek and mid-face volume" },
        { label: "Lip shape and hydration" },
        { label: "Jawline definition" }
      ],
      beforeAfter: [
        {
          label: "Cheek volume, before and after",
          caption: "Two syringes to the mid-face, photographed at the four-week review."
        },
        {
          label: "Lip definition, before and after",
          caption: "One syringe, with the settled result assessed after two weeks."
        }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha places filler in small stages so your face still moves and still looks like you between appointments."
      },
      faqs: [
        {
          question: "Will people be able to tell I have had filler?",
          answer: "The aim is a rested, balanced version of your own face, not a different one. We treat gradually and check your expression as well as your resting face, so most patients are told they look well rather than treated."
        },
        {
          question: "Does it hurt?",
          answer: "Most patients describe pressure and a brief sting. Numbing cream or local anaesthetic is used where it helps. Areas such as the lips are more sensitive than the cheeks, and we work at a pace you are comfortable with."
        },
        {
          question: "What are the risks?",
          answer: "Common effects are swelling, redness and bruising for a few days. Less common risks include lumps, asymmetry, infection and, rarely, injury to blood vessels. Your doctor explains these fully and confirms whether treatment is suitable for you in consultation."
        }
      ]
    }
  },
  {
    id: "collagen-stimulation",
    slug: "collagen-stimulation",
    title: "Collagen Stimulation",
    subtitle: "Firmer skin built gradually by your own collagen",
    category: "contour",
    description: "Collagen stimulation uses injectable products that prompt your skin to build its own collagen, gradually improving firmness and thickness over months.",
    longDescription: "Collagen stimulators are injectables such as poly-L-lactic acid or calcium hydroxylapatite that trigger a controlled healing response in the skin. Rather than adding instant volume, they encourage your own collagen to thicken over the following weeks and months. This makes them a good option for faces that look tired or thin rather than for correcting one deep line. Improvement is gradual and builds with each session, and how much you gain varies between patients. Suitability is confirmed in consultation with a DHA-licensed doctor.",
    duration: "45 - 60 mins",
    downtime: "Swelling, tenderness or bruising for up to a week; some patients notice firm areas under the skin that settle with massage.",
    results: "Firming usually appears from six to twelve weeks and keeps building; many patients see results last up to two years and typically plan a top-up session.",
    priceGuide: "From AED 1,800 per vial",
    previewImage: "",
    features: [
      "Gradual, natural-looking firming",
      "Improves skin thickness over time",
      "Treats wider areas, not one line",
      "Change that builds across sessions"
    ],
    recommendedFor: "Adults with thinning or crepey skin, early sagging in the cheeks and jawline, or hollow temples who prefer gradual change.",
    details: {
      tagline: "Let your skin rebuild its own support",
      overview: "Collagen stimulation is a short course of appointments rather than a single treatment. We assess your skin quality, then place the product across the areas that need support, most often the cheeks, temples, jawline and sometimes the backs of the hands. A course of two to three sessions spaced four to six weeks apart is common. Your skin keeps responding between visits, which is why the change is gradual and why photographs taken over several months show the result better than a same-day mirror.",
      suitableFor: [
        "Thinning or crepey skin on the face",
        "Early sagging along the jawline",
        "Hollow temples and flattened cheeks",
        "Acne scarring and uneven surface texture",
        "Skin that has lost firmness after weight loss"
      ],
      process: [
        {
          title: "Skin assessment",
          description: "Your doctor examines skin thickness, elasticity and the areas of looseness, then discusses what collagen stimulation can and cannot change for you."
        },
        {
          title: "Course planning",
          description: "We agree how many sessions you need, how far apart they should be and the total cost, so there are no surprises partway through treatment."
        },
        {
          title: "Preparation and comfort",
          description: "The skin is cleansed and numbing cream or local anaesthetic is applied where needed before any injection begins."
        },
        {
          title: "Placement across the treatment area",
          description: "The product is placed evenly using a needle or cannula, covering the whole area rather than concentrating on one spot."
        },
        {
          title: "Massage, aftercare and review",
          description: "You are shown how to massage the area at home, given aftercare instructions, and photographed at each visit to track change over time."
        }
      ],
      benefits: [
        "Improves skin quality, not just volume",
        "Suits wide areas such as cheeks and jawline",
        "Change continues after each appointment",
        "Works well alongside other facial treatments"
      ],
      callouts: [
        {
          label: "Typical course",
          value: "2 - 3 sessions",
          description: "Spaced four to six weeks apart, depending on the area and your response."
        },
        {
          label: "When change shows",
          value: "6 - 12 weeks",
          description: "Firming builds gradually, so review photographs are taken months apart."
        }
      ],
      gallery: [
        { label: "Cheek and jawline firmness" },
        { label: "Skin texture across the cheeks" },
        { label: "Temple and mid-face support" }
      ],
      beforeAfter: [
        {
          label: "Cheek firmness, before and after",
          caption: "Photographed three months after the second session in the course."
        },
        {
          label: "Jawline and lower face, before and after",
          caption: "A full course of three sessions, reviewed at six months."
        }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha spaces collagen stimulation sessions weeks apart so the improvement builds slowly and stays natural."
      },
      faqs: [
        {
          question: "How soon will I see a difference?",
          answer: "Most patients notice firmer, thicker-feeling skin from six to twelve weeks after a session, and the change continues after that. Because it is gradual, you may notice it in photographs before you notice it in the mirror."
        },
        {
          question: "How many sessions will I need?",
          answer: "Two to three sessions are usual, spaced four to six weeks apart, but this depends on your skin, the area treated and how you respond. We confirm the plan and the cost at your consultation and review it as we go."
        },
        {
          question: "Is this the same as dermal filler?",
          answer: "No. Filler adds volume straight away using a gel that is gradually absorbed. Collagen stimulation prompts your own skin to thicken over months. Some patients have both, in different areas and at different times, and your doctor will explain which is right for you."
        }
      ]
    }
  },
  {
    id: "fat-dissolving-injections",
    slug: "fat-dissolving-injections",
    title: "Fat-Dissolving Injections",
    subtitle: "Treatment for small, stubborn pockets of fat",
    category: "contour",
    description: "Fat-dissolving injections use a synthetic bile acid to break down small pockets of fat under the chin and on the body.",
    longDescription: "Fat-dissolving injections contain deoxycholic acid, a substance that destroys fat cells where it is injected. They are used for small, stubborn pockets such as under the chin, on the upper arms, the abdomen or the flanks, and they are not a weight-loss treatment. Each session treats one area, and most patients need two to four sessions spaced four to six weeks apart. Swelling is expected and can last several days, and the final shape appears over a few months as the treated fat clears. Suitability is confirmed in consultation with a DHA-licensed doctor.",
    duration: "30 - 45 mins",
    downtime: "Swelling, redness, tenderness and possible bruising for several days; some patients prefer to keep the first week free of social plans.",
    results: "Many patients notice a change four to six weeks after each session, with the fuller result typically visible two to three months after the course is finished.",
    priceGuide: "From AED 1,200 per session",
    previewImage: "",
    features: [
      "Targets small, stubborn pockets",
      "No surgery and no general anaesthetic",
      "Sessions spaced a few weeks apart",
      "Works alongside diet and exercise"
    ],
    recommendedFor: "Adults with a small, firm pocket of fat under the chin or on the body who are already close to a stable weight.",
    details: {
      tagline: "Small pockets, treated one area at a time",
      overview: "This treatment suits a defined pocket of fat that has not responded to diet and exercise, most often the area under the chin. Your doctor examines the area, confirms that it is fat rather than loose skin or muscle, and explains how many sessions are likely. Each session involves a series of small injections across the marked area. Swelling is a normal part of the response and often makes the area look fuller for the first week or two, which is why we judge the result weeks later rather than the next day.",
      suitableFor: [
        "A small fat pocket under the chin",
        "Stubborn fat on the upper arms",
        "Lower abdomen fullness close to a stable weight",
        "Flanks that have not changed with exercise",
        "Small pockets above the knees"
      ],
      process: [
        {
          title: "Consultation and suitability check",
          description: "Your doctor reviews your weight history and medical background, examines the area and confirms whether injections are the right approach for you."
        },
        {
          title: "Marking and planning",
          description: "The treatment area is marked with a grid, and we agree how many sessions you will need and what each one costs before starting."
        },
        {
          title: "Cleansing and comfort measures",
          description: "The skin is cleaned and numbing cream or local anaesthetic is used so the injections are manageable."
        },
        {
          title: "Injection session",
          description: "Small, measured amounts are injected across the marked area. Most sessions take around half an hour, with a short observation period afterwards."
        },
        {
          title: "Aftercare and follow-up",
          description: "You are given clear aftercare advice, warned about expected swelling, and booked in four to six weeks later to assess the area and plan the next session."
        }
      ],
      benefits: [
        "Treats pockets that diet and exercise have not shifted",
        "No surgery, no stitches and no general anaesthetic",
        "Plan and cost agreed before treatment starts",
        "Results assessed over months, not days"
      ],
      callouts: [
        {
          label: "Typical course",
          value: "2 - 4 sessions",
          description: "Spaced four to six weeks apart, with each session treating one area."
        },
        {
          label: "When results show",
          value: "2 - 3 months",
          description: "After the course is complete, once swelling has settled and the body has cleared the treated fat."
        }
      ],
      gallery: [
        { label: "Under the chin" },
        { label: "Upper arms" },
        { label: "Flanks and lower abdomen" }
      ],
      beforeAfter: [
        {
          label: "Under the chin, before and after",
          caption: "Three sessions, with the final photographs taken three months after the last one."
        },
        {
          label: "Lower abdomen, before and after",
          caption: "Two sessions, reviewed twelve weeks after the second appointment."
        }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha checks that a stubborn pocket is fat rather than loose skin before recommending injections, because not every area responds to them."
      },
      faqs: [
        {
          question: "Is this a weight-loss treatment?",
          answer: "No. It is designed for small, defined pockets of fat in patients who are close to a stable weight. It will not replace diet, exercise or medical weight management, and your doctor will say so plainly if it is not the right option for you."
        },
        {
          question: "How many sessions will I need?",
          answer: "Most patients need two to four sessions, spaced four to six weeks apart, but it varies with the size and firmness of the area and how you respond. We assess the area at each visit and adjust the plan rather than promising a fixed number up front."
        },
        {
          question: "What is recovery like?",
          answer: "Swelling, redness, tenderness and sometimes bruising are expected for several days, and the area may look fuller before it looks smaller. Most patients return to work quickly, but some plan their session before a quiet week."
        }
      ]
    }
  },
  {
    id: "cryolipolysis",
    slug: "cryolipolysis",
    title: "Cryolipolysis",
    subtitle: "Controlled cooling for pinchable pockets of fat",
    category: "contour",
    description: "Cryolipolysis cools a pocket of fat so the fat cells break down and clear from the body over the following months.",
    longDescription: "Cryolipolysis, often called fat freezing, applies controlled cooling to a fold of fat held in a suction cup. The cold damages fat cells, which the body clears over the following weeks and months. It suits pinchable pockets on the abdomen, flanks, thighs, upper arms or under the chin rather than general weight loss. Each area needs its own session, usually 35 to 60 minutes, and many patients need more than one round. Numbness in the treated area is common for a few weeks. Suitability is confirmed in consultation.",
    duration: "35 - 60 mins per area",
    downtime: "Redness, tingling and numbness for days to a few weeks; most patients go straight back to their normal day after the appointment.",
    results: "Change typically becomes noticeable six to twelve weeks after treatment and continues for up to three months; many patients have more than one round on the same area.",
    priceGuide: "From AED 1,800 per area, per session",
    previewImage: "",
    features: [
      "No needles, no anaesthetic",
      "Suits pinchable pockets of fat",
      "Sessions you can read through",
      "Change that builds over months"
    ],
    recommendedFor: "Adults with a pinchable pocket of fat that has not shifted with diet and exercise, who are at or near a stable weight.",
    details: {
      tagline: "Cooling a pocket of fat so it clears naturally",
      overview: "Cryolipolysis works on fat that you can pinch between your fingers. During a session, the applicator draws the fold into a cup and cools it to a controlled temperature for around an hour. The first minutes feel intensely cold, then the area goes numb and the rest of the session is usually comfortable enough to read or work. There is no cut and no needle. Fat cells affected by the cold are cleared gradually by the body, so the change appears over two to three months, and stubborn areas often need more than one round.",
      suitableFor: [
        "Pinchable fat on the lower abdomen",
        "Flanks that resist exercise",
        "Inner or outer thighs",
        "Upper arms",
        "A small pocket under the chin"
      ],
      process: [
        {
          title: "Consultation and area assessment",
          description: "Your doctor or therapist checks that the area can be pinched and held by an applicator, and discusses what cooling can realistically change for you."
        },
        {
          title: "Treatment planning",
          description: "We agree which areas to treat, how many rounds are likely and what the course will cost, so you can decide before committing."
        },
        {
          title: "Applicator placement",
          description: "A protective pad is placed on the skin, the applicator is positioned over the marked area and the fold is drawn into the cup."
        },
        {
          title: "Cooling cycle",
          description: "The area is cooled for 35 to 60 minutes. You stay seated or lying down, and we check on you throughout the cycle."
        },
        {
          title: "Warm-up, aftercare and review",
          description: "The skin is warmed and massaged, you are given aftercare advice, and photographs are taken at a review appointment around twelve weeks later."
        }
      ],
      benefits: [
        "No injections, no incisions and no anaesthetic",
        "Fits into a lunch break or a free morning",
        "Treats one pocket at a time with a clear plan",
        "Results reviewed with photographs, not guesswork"
      ],
      callouts: [
        {
          label: "Session length",
          value: "35 - 60 mins",
          description: "Per area, with each area needing its own applicator session."
        },
        {
          label: "When results show",
          value: "6 - 12 weeks",
          description: "With continued change for up to three months, and more than one round often needed."
        }
      ],
      gallery: [
        { label: "Abdomen and flanks" },
        { label: "Outer thighs" },
        { label: "Upper arms" }
      ],
      beforeAfter: [
        {
          label: "Flanks, before and after",
          caption: "Two rounds on each side, photographed twelve weeks after the second round."
        },
        {
          label: "Lower abdomen, before and after",
          caption: "One round, reviewed at three months with the patient at a stable weight."
        }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha assesses whether a pocket can be held by the applicator before booking cryolipolysis, because loose skin and deep fat do not respond well to cooling."
      },
      faqs: [
        {
          question: "Does it hurt?",
          answer: "Most patients feel intense cold and a pulling sensation for the first five to ten minutes. After that the area goes numb and the remainder of the session is usually comfortable. Some people have tingling or tenderness for a few days afterwards."
        },
        {
          question: "What results can I expect?",
          answer: "Many patients see a visible reduction in the treated pocket, usually from six to twelve weeks onwards, but the amount varies between patients and no specific reduction can be promised. Suitability and likely response are discussed at your consultation."
        },
        {
          question: "How many sessions will I need?",
          answer: "It depends on the area, the thickness of the fat and how your body responds. Many patients have two rounds on the same area, spaced at least eight to twelve weeks apart, and we review progress with photographs before planning the next one."
        }
      ]
    }
  },
  {
    id: "thread-lift",
    slug: "thread-lift",
    title: "Thread Lift",
    subtitle: "A moderate lift using dissolvable threads",
    category: "contour",
    description: "A thread lift places dissolvable threads under the skin to lift sagging tissue and encourage collagen around them.",
    longDescription: "A thread lift uses fine, dissolvable threads inserted under the skin with a needle or cannula. Small barbs or cones grip the tissue, and when the thread is drawn back the skin above it lifts. The change is immediate but moderate, and it softens as the threads dissolve over the following months, leaving new collagen in their place. It suits mild to moderate looseness in the cheeks, jawline, brows or neck rather than significant sagging. Swelling and bruising are common for the first week. Suitability is confirmed in consultation.",
    duration: "45 - 90 mins",
    downtime: "Swelling, bruising and tenderness for five to ten days; some patients notice pulling or slight dimpling that settles within two weeks.",
    results: "The lift is visible straight away and typically settles within two weeks; many patients see the effect last 9 to 12 months as the threads dissolve.",
    priceGuide: "From AED 4,500 per area",
    previewImage: "",
    features: [
      "Immediate but moderate lift",
      "Dissolvable threads, no incisions",
      "Local anaesthetic only",
      "Collagen response after the lift"
    ],
    recommendedFor: "Adults with mild to moderate sagging who want a lift without surgery and understand results are softer than a facelift.",
    details: {
      tagline: "A moderate lift with threads that dissolve",
      overview: "A thread lift is a middle option between injectables and surgery. Your doctor assesses where the tissue has dropped and marks entry points, then places threads under the skin and draws them back to lift the cheek, jawline, brow or neck. You will see a change on the day, though swelling hides some of it for the first week. The lift softens as the threads dissolve over roughly nine to twelve months, while the collagen forming around them keeps the skin firmer. Not everyone is a candidate, and your doctor will say so at consultation.",
      suitableFor: [
        "Mild to moderate cheek descent",
        "An early jowl along the jawline",
        "A brow that has begun to drop",
        "Early looseness in the neck",
        "Patients who want a lift without surgery"
      ],
      process: [
        {
          title: "Consultation and candidacy check",
          description: "Your doctor reviews your medical history, assesses skin thickness, looseness and how much lift is achievable, and explains the limits of the treatment."
        },
        {
          title: "Planning thread number and placement",
          description: "We agree which areas to treat, how many threads are needed and the total cost, and you are told what results to expect realistically."
        },
        {
          title: "Local anaesthetic and marking",
          description: "Entry points are marked and local anaesthetic is injected so the threading itself is manageable."
        },
        {
          title: "Thread placement and lifting",
          description: "Threads are guided under the skin with a needle or cannula and drawn back to lift the tissue, adjusting each side for balance."
        },
        {
          title: "Aftercare and review",
          description: "You are given written aftercare, advised on sleeping position and facial movement, and reviewed at two weeks and again at three months."
        }
      ],
      benefits: [
        "A visible lift on the day of treatment",
        "No cuts, stitches or general anaesthetic",
        "Collagen forms around the threads as they dissolve",
        "A step between injectables and surgery"
      ],
      callouts: [
        {
          label: "Typical appointment",
          value: "45 - 90 mins",
          description: "Depends on how many areas and threads are treated in one visit."
        },
        {
          label: "How long results last",
          value: "9 - 12 months",
          description: "The lift softens as the threads dissolve, with some firmness continuing after that."
        }
      ],
      gallery: [
        { label: "Cheek and mid-face lift" },
        { label: "Jawline and jowl area" },
        { label: "Brow and upper face" }
      ],
      beforeAfter: [
        {
          label: "Jawline, before and after",
          caption: "Six threads per side, photographed at the three-month review."
        },
        {
          label: "Cheek and mid-face, before and after",
          caption: "Eight threads, with the final images taken two weeks after treatment."
        }
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha assesses how much lift your skin can actually hold before recommending threads, and will suggest surgery instead when that is the honest answer."
      },
      faqs: [
        {
          question: "How much lift will I get?",
          answer: "Threads give a moderate lift, most noticeable in the cheeks, jawline and brow. They will not reproduce the result of a surgical facelift, and if your looseness is more advanced your doctor will tell you at consultation rather than treat you anyway."
        },
        {
          question: "What is recovery like?",
          answer: "Swelling, bruising and tenderness for five to ten days are common, and some patients notice a pulling feeling or slight dimpling that settles within two weeks. We give you clear instructions on sleeping position, facial movement and when to return to exercise."
        },
        {
          question: "How long do the results last?",
          answer: "The threads dissolve over roughly nine to twelve months and the lift fades gradually with them, though many patients feel the skin stays firmer for a while afterwards. Top-up treatment can be discussed at your review appointment."
        }
      ]
    }
  }
];
