import type { Treatment } from '../../client.config';

export const longevityTreatments: Treatment[] = [
  {
    id: "iv-drip-therapy",
    slug: "iv-drip-therapy",
    title: "IV Drip Therapy",
    subtitle: "Hydration, vitamins and minerals delivered directly",
    category: "longevity",
    description:
      "A vitamin and mineral drip delivered into the bloodstream, used to support hydration, energy and recovery between busy weeks.",
    longDescription:
      "IV drip therapy delivers fluids, vitamins, minerals and antioxidants through a small cannula placed in your arm. Because the formula goes straight into the bloodstream, it does not depend on digestion or appetite. A DHA-licensed physician reviews your history, medications and recent blood results, then recommends a formula suited to your goal, whether that is rehydration after travel, support through a demanding work period, or recovery after exercise. The drip runs while you sit in a treatment chair, and you can leave as soon as it finishes.",
    duration: "45 - 60 mins",
    downtime: "None. You can return to work, driving or training straight afterwards.",
    results:
      "Many patients say they feel more refreshed within a day, and typically repeat sessions monthly.",
    priceGuide: "From AED 900 per session",
    previewImage: "",
    features: [
      "Hydration and electrolyte support",
      "Vitamins delivered straight into the bloodstream",
      "Formula confirmed by a physician",
      "Finished in under an hour",
    ],
    recommendedFor:
      "Adults who feel run down after travel, illness or a heavy work period and want hydration and nutrient support reviewed by a physician.",
    details: {
      tagline: "A physician-led drip, matched to how you actually feel.",
      overview:
        "Before your first session a physician takes a full history, checks what you are taking and looks at any recent blood results. They then choose the vitamins, minerals and fluids that fit your situation rather than handing you a fixed menu. A nurse places a small cannula in your arm, confirms you are comfortable, and the drip runs for around 45 minutes while you sit back in a treatment chair. You are monitored throughout, told what was given and why, and given clear guidance on how often to repeat and what to change in your day-to-day routine.",
      suitableFor: [
        "Frequent flyers who feel dehydrated and jet lagged",
        "Professionals working long hours on poor sleep",
        "People recovering from a cold, flu or stomach upset",
        "Gym-goers in a heavy training block",
        "Anyone whose blood tests show a vitamin or mineral shortfall",
      ],
      process: [
        {
          title: "Consultation and screening",
          description:
            "Your physician takes a medical history, checks current medications and reviews any recent blood tests.",
        },
        {
          title: "Formula selection",
          description:
            "The physician chooses the fluids, vitamins and minerals that match your needs and explains why each is included.",
        },
        {
          title: "Cannula placement",
          description:
            "A nurse places a small cannula in your arm and confirms you are comfortable before the drip begins.",
        },
        {
          title: "The infusion",
          description:
            "You rest in a treatment chair for around 45 minutes while the drip runs, with a nurse checking on you.",
        },
        {
          title: "Aftercare and plan",
          description:
            "Your physician advises how often to repeat, what to adjust in your diet, and when to re-test if needed.",
        },
      ],
      benefits: [
        "Rehydration that does not rely on drinking more water",
        "Vitamins and minerals absorbed without digestion",
        "A formula reviewed by a doctor rather than picked from a list",
        "Appointments that fit around a working day",
      ],
      callouts: [
        {
          label: "Session length",
          value: "45 - 60 mins",
          description: "Including screening on your first visit.",
        },
        {
          label: "Physician review",
          value: "Every session",
          description:
            "Your formula is confirmed by a DHA-licensed physician before it is prepared.",
        },
      ],
      gallery: [
        { label: "Treatment room" },
        { label: "Drip preparation area" },
        { label: "Post-session rest area" },
      ],
      beforeAfter: [
        {
          label: "Hydration and energy, week 1",
          caption: "What patients report after a first session",
        },
        {
          label: "Hydration and energy, week 4",
          caption: "What patients report after a monthly course",
        },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha reviews every IV formula against your blood results and medications before the nurse prepares it.",
      },
      faqs: [
        {
          question: "How quickly will I notice a difference?",
          answer:
            "Many patients notice better hydration and steadier energy within a day. Response varies, and your physician will not promise a specific outcome.",
        },
        {
          question: "Can I have a drip if I take medication?",
          answer:
            "Often the formula can be adjusted around your medication, but you must tell your physician about every prescription, supplement and other substance you use so they can assess whether this is suitable.",
        },
        {
          question: "Do I need a blood test first?",
          answer:
            "For a simple hydration drip, usually not. For vitamin or mineral formulas we normally ask for blood results taken in the last three months.",
        },
      ],
    },
  },
  {
    id: "exosome-therapy",
    slug: "exosome-therapy",
    title: "Regenerative Exosome Therapy",
    subtitle: "Regenerative support for skin and scalp",
    category: "longevity",
    description:
      "A regenerative treatment using exosomes from donated stem cell cultures, given by injection or microneedling to support skin and hair quality.",
    longDescription:
      "Exosome therapy uses a concentrated solution of exosomes produced from donated human stem cell cultures. The solution carries growth factors and signalling proteins, and it is placed into the skin with fine needle injections or microneedling, or into the scalp where hair thinning is the concern. No living cells are used, so no donor cells remain in your body. A physician reviews your history and goals first and explains plainly what the treatment can and cannot do. Your physician will assess whether this is suitable for you, and results vary between patients.",
    duration: "45 - 60 mins",
    downtime:
      "Mild redness and swelling for 12 - 24 hours. Most patients return to normal activity the same day.",
    results:
      "Many patients report firmer-looking skin and smoother texture over 4 to 8 weeks after a course, though response varies.",
    priceGuide: "From AED 2,800 per session",
    previewImage: "",
    features: [
      "Applied to skin or scalp",
      "Delivered by injection or microneedling",
      "No living cells in the product",
      "Plan set and supervised by a physician",
    ],
    recommendedFor:
      "Adults with fine lines, dull or crepey skin, acne scarring or early hair thinning who want a regenerative option reviewed by a physician.",
    details: {
      tagline: "Regenerative support for skin and hair, explained honestly.",
      overview:
        "Your first appointment is a consultation, not a treatment. The physician examines your skin or scalp, asks about past treatments, medications and medical conditions, and takes photographs so change can be tracked objectively. If exosome therapy is appropriate, a numbing cream is applied and the solution is placed with fine injections or a microneedling device. The appointment takes under an hour. Afterwards you may look flushed for a few hours. Your physician sets a realistic course, usually two to three sessions spaced four to six weeks apart, and reviews progress with you before continuing.",
      suitableFor: [
        "Adults with early fine lines and loss of firmness",
        "Patients with acne scarring or uneven skin texture",
        "People with thin or sun-damaged skin on the face or neck",
        "Men and women with early hair thinning",
        "Patients who want a regenerative option instead of filler",
      ],
      process: [
        {
          title: "Consultation and photographs",
          description:
            "The physician examines the area, reviews your history and takes standard photographs for comparison.",
        },
        {
          title: "Suitability assessment",
          description:
            "Your physician explains the expected benefit, the limits of the treatment and whether this is suitable for you.",
        },
        {
          title: "Numbing and preparation",
          description:
            "Numbing cream is applied for around 20 minutes, and the skin or scalp is cleansed and marked.",
        },
        {
          title: "Application",
          description:
            "The solution is delivered by fine needle injections or microneedling across the treated area.",
        },
        {
          title: "Review and course planning",
          description:
            "You are given aftercare instructions and a follow-up date, usually four to six weeks later.",
        },
      ],
      benefits: [
        "Targets skin texture as well as surface lines",
        "Can be used on the scalp as well as the face",
        "No living cells, so no donor cells remain",
        "Progress tracked with photographs, not memory",
      ],
      callouts: [
        {
          label: "Typical course",
          value: "2 - 3 sessions",
          description: "Spaced four to six weeks apart, reviewed as you go.",
        },
        {
          label: "Downtime",
          value: "12 - 24 hours",
          description: "Redness and mild swelling that settle on their own.",
        },
      ],
      gallery: [
        { label: "Consultation room" },
        { label: "Treatment in progress" },
        { label: "Aftercare area" },
      ],
      beforeAfter: [
        {
          label: "Skin texture, before treatment",
          caption: "Standard photograph taken at consultation",
        },
        {
          label: "Skin texture, 8 weeks after a course",
          caption: "Standard photograph taken at review",
        },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha assesses whether exosome therapy suits your skin or scalp, and tells you when a different treatment would work better.",
      },
      faqs: [
        {
          question: "Is this a stem cell treatment?",
          answer:
            "No. The product contains exosomes taken from donated stem cell cultures, not living cells. Nothing that grows or divides is injected, and no donor cells remain in your body.",
        },
        {
          question: "How many sessions will I need?",
          answer:
            "Most patients are advised two to three sessions spaced four to six weeks apart. Your physician decides the course after examining you and reviews it with you as you go.",
        },
        {
          question: "Who should not have this treatment?",
          answer:
            "It is not offered during pregnancy or breastfeeding, over active infection or skin cancer in the treatment area, or where your history suggests a risk. Your physician will assess whether this is suitable for you.",
        },
      ],
    },
  },
  {
    id: "hormone-optimisation",
    slug: "hormone-optimisation",
    title: "Hormone Optimisation",
    subtitle: "Testing and physician-led treatment for hormone balance",
    category: "longevity",
    description:
      "Blood testing and physician-led treatment to correct hormone levels causing fatigue, low mood, poor sleep or reduced drive.",
    longDescription:
      "Hormone optimisation begins with blood tests, usually taken in the morning, covering thyroid function, testosterone or oestrogen and progesterone, cortisol, vitamin D and other tests your physician selects. If a deficiency is confirmed and treatment is appropriate, your physician may prescribe replacement therapy alongside diet, sleep and training changes. Treatment is monitored with repeat blood tests and review appointments, and doses are adjusted to keep your levels inside a safe range. This is a medical treatment rather than a wellness package, and your physician will assess whether it is suitable for you.",
    duration: "45 - 60 mins",
    downtime: "None. Treatment is managed at home between review appointments.",
    results:
      "Many patients report better energy, sleep and mood after 6 to 12 weeks once levels are stable, though response varies.",
    priceGuide: "From AED 1,500 per consultation, excluding medication and laboratory tests",
    previewImage: "",
    features: [
      "Morning blood panel before any treatment",
      "Prescriptions only where tests show a deficiency",
      "Repeat blood tests to track your levels",
      "Consultant-led reviews at every stage",
    ],
    recommendedFor:
      "Adults with persistent fatigue, low mood, poor sleep, loss of drive or changes in body composition that blood tests may explain.",
    details: {
      tagline: "Test first, treat second, and keep checking.",
      overview:
        "Your first visit is a long consultation. The physician asks about sleep, stress, training, weight change, menstrual history where relevant, and any medication you take. Blood is usually drawn in the morning, when hormone readings are most useful, and results are explained to you line by line at a follow-up appointment. If replacement therapy is appropriate, your physician prescribes it, shows you how to use it, and books repeat blood tests to confirm your levels stay in range. If tests are normal, you are told so plainly and other causes of your symptoms are investigated instead.",
      suitableFor: [
        "Men with low energy, low drive or loss of muscle",
        "Women with symptoms around perimenopause or menopause",
        "Adults with persistent fatigue and disrupted sleep",
        "Patients whose previous blood tests were never explained",
        "People wanting thyroid and vitamin levels checked properly",
      ],
      process: [
        {
          title: "Initial consultation",
          description:
            "A physician takes a detailed history covering sleep, stress, training, mood and previous treatment.",
        },
        {
          title: "Blood testing",
          description:
            "Samples are usually taken in the morning, covering the hormones and vitamins your physician has selected.",
        },
        {
          title: "Results review",
          description:
            "Your physician explains each result, what is normal for you and whether treatment is warranted.",
        },
        {
          title: "Treatment if appropriate",
          description:
            "Where a deficiency is confirmed, replacement therapy is prescribed and you are shown exactly how to use it.",
        },
        {
          title: "Monitoring and adjustment",
          description:
            "Repeat blood tests and review appointments keep your levels in a safe range, with doses adjusted as needed.",
        },
      ],
      benefits: [
        "Symptoms investigated with tests rather than guesswork",
        "Doses based on your results, not a standard starting pack",
        "Regular monitoring to keep levels inside a safe range",
        "One physician following your case over time",
      ],
      callouts: [
        {
          label: "First review",
          value: "6 - 8 weeks",
          description: "Bloods are repeated to confirm levels are stable.",
        },
        {
          label: "Ongoing monitoring",
          value: "Every 3 - 6 months",
          description: "Long-term treatment is reviewed at least twice a year.",
        },
      ],
      gallery: [
        { label: "Consultation room" },
        { label: "Phlebotomy room" },
        { label: "Results review appointment" },
      ],
      beforeAfter: [
        {
          label: "Baseline blood panel",
          caption: "Taken before any treatment starts",
        },
        {
          label: "Follow-up blood panel",
          caption: "Taken 6 to 8 weeks after treatment begins",
        },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha explains your blood results in full and will decline treatment when your levels do not justify it.",
      },
      faqs: [
        {
          question: "Will I be prescribed testosterone or HRT on the first visit?",
          answer:
            "No. Nothing is prescribed before your blood results are back and reviewed. If your levels are normal, your physician will tell you and look for other causes of your symptoms.",
        },
        {
          question: "Is treatment permanent?",
          answer:
            "Replacement therapy is usually continued while it is helping and while monitoring stays normal. Your physician reviews the need for it at least every three to six months.",
        },
        {
          question: "Is this treatment safe long term?",
          answer:
            "Hormone treatment carries real risks and needs monitoring. Your physician will assess whether this is suitable for you, explain the risks, and check your blood regularly while you are on it.",
        },
      ],
    },
  },
  {
    id: "nad-therapy",
    slug: "nad-therapy",
    title: "NAD+ Therapy",
    subtitle: "Slow intravenous infusion of NAD+",
    category: "longevity",
    description:
      "An intravenous infusion of NAD+, a coenzyme your cells use to produce energy, given to support focus and recovery.",
    longDescription:
      "NAD+ is a coenzyme found in every cell and used in the reactions that turn food into energy. Levels are thought to fall with age and after illness. In this treatment NAD+ is given as a slow intravenous infusion, usually over one to three hours, because infusing it quickly can cause flushing, nausea or chest tightness. Your physician reviews your history first and sets the infusion rate for you. Some patients report better focus and steadier energy afterwards, but the evidence is still limited and your physician will not promise a specific outcome.",
    duration: "90 - 180 mins",
    downtime: "None. Most patients drive themselves home and return to work the same day.",
    results:
      "Many patients report clearer focus and steadier energy for several days after an infusion, though response varies.",
    priceGuide: "From AED 1,800 per infusion",
    previewImage: "",
    features: [
      "Slow infusion over one to three hours",
      "Rate set by your physician",
      "Nurse present for the whole session",
      "No sedation and no recovery time",
    ],
    recommendedFor:
      "Adults dealing with persistent fatigue, mental fog or slow recovery who want a physician-supervised infusion and a clear explanation of the evidence.",
    details: {
      tagline: "A slow infusion, run at a rate your body tolerates.",
      overview:
        "NAD+ therapy is given in a treatment room with a nurse present throughout. The infusion starts slowly and is increased only as you tolerate it, because rapid delivery commonly causes flushing, nausea or a tight feeling in the chest. Sessions last between one and three hours, so bring something to read or work on. Your physician screens you first for conditions and medications that would make the treatment unsuitable. Afterwards you are given water, observed briefly, and told what to expect over the next few days. How often to repeat is decided with your physician, not sold as a package.",
      suitableFor: [
        "Adults with ongoing fatigue that has been investigated",
        "People recovering from a period of illness or intense stress",
        "Patients reporting mental fog and poor concentration",
        "Athletes wanting support during heavy training",
        "Adults who want the evidence explained before starting",
      ],
      process: [
        {
          title: "Screening consultation",
          description:
            "A physician reviews your history, medications and any recent blood tests to confirm suitability.",
        },
        {
          title: "Rate planning",
          description:
            "Your physician sets the starting rate and the maximum rate for your infusion based on your history.",
        },
        {
          title: "Cannula and slow start",
          description:
            "A nurse places a cannula and begins the infusion slowly, checking your blood pressure and comfort.",
        },
        {
          title: "Supervised infusion",
          description:
            "The rate is increased only as you tolerate it, with a nurse in the room for the full session.",
        },
        {
          title: "Recovery and review",
          description:
            "You are observed briefly after the infusion and given advice on hydration and when to repeat.",
        },
      ],
      benefits: [
        "A slow rate that reduces flushing and nausea",
        "Nurse supervision for the entire infusion",
        "Honest discussion of what the evidence does and does not show",
        "No sedation and no downtime afterwards",
      ],
      callouts: [
        {
          label: "Infusion time",
          value: "90 - 180 mins",
          description: "Longer sessions mean a slower, better tolerated rate.",
        },
        {
          label: "Repeat interval",
          value: "Every 2 - 4 weeks",
          description: "Agreed with your physician after your first session.",
        },
      ],
      gallery: [
        { label: "Infusion suite" },
        { label: "Monitoring station" },
        { label: "Recovery lounge" },
      ],
      beforeAfter: [
        {
          label: "Energy diary, week before treatment",
          caption: "Recorded by the patient at home",
        },
        {
          label: "Energy diary, two weeks after treatment",
          caption: "Recorded by the patient at home",
        },
      ],
      practitioner: {
        name: "Dr. Aisha Al Mansoori, MD, DHA",
        role: "Aesthetic Physician",
        note: "Dr. Aisha sets the infusion rate for each patient and explains that reported benefits are not yet proven in large studies.",
      },
      faqs: [
        {
          question: "How will I feel during the infusion?",
          answer:
            "Some patients feel warm or flushed, mildly nauseated or aware of their chest when the rate is too fast. Your nurse slows the infusion and these feelings usually pass within minutes.",
        },
        {
          question: "Will NAD+ infusions slow down ageing or extend life?",
          answer:
            "We do not claim that. NAD+ is involved in energy production in your cells, and some patients report better focus and energy, but the evidence is limited. Your physician will explain this before you start.",
        },
        {
          question: "How many infusions will I need?",
          answer:
            "There is no fixed course. Most patients start with one session, review how they feel, and then agree an interval with their physician, often every two to four weeks.",
        },
      ],
    },
  },
];
