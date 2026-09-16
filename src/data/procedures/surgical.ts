import type { Treatment } from '../../client.config';

export const surgicalTreatments: Treatment[] = [
  {
    id: "rhinoplasty",
    slug: "rhinoplasty",
    title: "Rhinoplasty",
    subtitle: "Nose reshaping surgery",
    category: "surgical",
    description:
      "Surgery to refine the shape, size and profile of the nose while keeping your breathing and natural look intact.",
    longDescription:
      "Rhinoplasty reshapes the bone and cartilage of the nose to change how it looks and, when needed, how it works. The plan is drawn around your own facial proportions rather than a fixed template, so the result still looks like you. It is carried out under general anaesthesia in a hospital operating theatre. Every patient needs a full medical assessment, relevant imaging and a signed consent before surgery. Swelling settles slowly, so the final shape appears over months, not days.",
    duration: "2 - 4 hours",
    downtime: "1 - 2 weeks away from work and social plans",
    results:
      "Typically bruising and swelling settle within 2 - 3 weeks, with the final shape seen at 12 - 18 months.",
    priceGuide: "From AED 22,000",
    previewImage: "/images/procedures/rhinoplasty.jpg",
    features: [
      "Reshapes the bridge, tip and profile",
      "Can improve breathing at the same time",
      "Planned around your facial proportions",
      "Performed by a consultant surgeon",
    ],
    recommendedFor:
      "Adults with a fully developed facial skeleton who want a change in the shape or size of the nose, or who have breathing difficulty from a structural problem.",
    details: {
      tagline: "A nose that fits your face, not a template.",
      overview:
        "Rhinoplasty can reduce a bump, straighten a crooked bridge, refine a wide or droopy tip, or add support where the nose looks flat. Many patients also have a deviated septum corrected in the same operation to improve airflow. Your surgeon will explain what is realistic for your nose, including the limits set by your skin thickness and existing structure. Nothing is promised in advance: the aim is a balanced, natural result that suits your face.",
      suitableFor: [
        "Adults over 18 with a fully developed facial skeleton",
        "A bump, dip or asymmetry along the bridge",
        "A tip that feels too wide, bulbous or droopy",
        "Breathing difficulty caused by a deviated septum",
        "A nose shape changed by an earlier injury",
      ],
      process: [
        {
          title: "Consultation and facial assessment",
          description:
            "Your surgeon examines the nose inside and out, reviews your medical history and photographs your face from several angles.",
        },
        {
          title: "Surgical planning",
          description:
            "You agree on the changes you want, and the surgeon explains what the bone, cartilage and skin can realistically support. Imaging may be used to guide the plan.",
        },
        {
          title: "Pre-operative assessment and consent",
          description:
            "Blood tests, an anaesthetic review and, where relevant, an examination inside the nose. You sign consent only after a full discussion of the risks.",
        },
        {
          title: "Surgery under general anaesthesia",
          description:
            "The operation is performed in a hospital theatre, usually through incisions hidden inside the nose or a small incision at the base.",
        },
        {
          title: "Recovery and follow-up",
          description:
            "A splint is worn for about a week. You attend follow-up visits at set intervals so healing and breathing can be checked.",
        },
      ],
      benefits: [
        "A profile that looks balanced from the front and the side",
        "Better airflow when a blocked septum is corrected at the same time",
        "Changes measured in millimetres, so the result stays natural",
        "One operation with a clear plan for follow-up care",
      ],
      callouts: [
        {
          label: "Anaesthesia",
          value: "General",
          description:
            "Carried out in a hospital operating theatre with an anaesthetist present throughout.",
        },
        {
          label: "Time off work",
          value: "1 - 2 weeks",
          description:
            "Most patients rest at home for the first week while bruising and swelling settle.",
        },
      ],
      gallery: [
        { label: "Front view - planning photograph" },
        { label: "Side profile - planning photograph" },
        { label: "Base view - planning photograph" },
      ],
      beforeAfter: [
        {
          label: "Before surgery",
          caption: "Profile recorded at the consultation",
        },
        {
          label: "12 months after",
          caption: "Typical settled result at one year",
        },
      ],
      practitioner: {
        name: "Dr. Omar Haddad, FRCS (Plast), DHA",
        role: "Consultant Aesthetic Surgeon",
        note: "Dr. Haddad has performed nose surgery in Dubai for more than fifteen years and plans every case around the patient's breathing as well as appearance.",
      },
      faqs: [
        {
          question: "How soon can I go back to work?",
          answer:
            "Plan for one to two weeks off. The splint comes off after about seven days, and bruising around the eyes usually fades within two weeks.",
        },
        {
          question: "Will it hurt afterwards?",
          answer:
            "You feel nothing during the operation because it is done under general anaesthesia. Afterwards expect a blocked nose, aching and bruising for the first week, which is managed with prescribed pain relief. Most patients describe it as uncomfortable rather than severe.",
        },
        {
          question: "Will the change last?",
          answer:
            "The changes made to bone and cartilage are long-lasting. Your face continues to age afterwards, and no surgeon can promise the result will never change. If the nose is injured again, further surgery may be needed.",
        },
      ],
    },
  },
  {
    id: "facelift",
    slug: "facelift",
    title: "Facelift",
    subtitle: "Surgical facial rejuvenation",
    category: "surgical",
    description:
      "Surgery that lifts and tightens the deeper layers of the face and neck to soften sagging and redefine the jawline.",
    longDescription:
      "A facelift repositions the tissue that has dropped with age rather than only pulling the skin. The surgeon works on the deeper layers beneath the skin, removes a small amount of excess skin and closes the incisions with fine stitches placed in natural creases. It is performed under general anaesthesia in a hospital operating theatre and requires a full medical assessment and signed consent. Bruising and swelling are expected, and the result develops over months as healing completes.",
    duration: "3 - 5 hours",
    downtime: "2 - 3 weeks away from work; 6 weeks before strenuous exercise",
    results:
      "Typically bruising settles in 2 - 3 weeks, the settled result is seen at 3 - 6 months, and the improvement usually lasts several years.",
    priceGuide: "From AED 45,000",
    previewImage: "/images/procedures/facelift.jpg",
    features: [
      "Lifts the deeper layers, not just the skin",
      "Treats the cheeks, jawline and neck together",
      "Incisions placed in natural creases",
      "Performed by a consultant surgeon",
    ],
    recommendedFor:
      "Adults with visible sagging in the mid-face, jawline or neck who are in good general health and have realistic expectations about how much a facelift can change.",
    details: {
      tagline: "Lift the tissue that has dropped, not just the skin.",
      overview:
        "Loss of volume and elasticity means the cheeks, jawline and neck begin to descend. A facelift repositions that tissue and removes only the skin that is genuinely in excess, which is why the result looks rested rather than pulled. It does not stop ageing, and it will not change your skin quality or erase every line. Your surgeon will be clear with you about what this operation can and cannot do for your face.",
      suitableFor: [
        "Adults with loose skin along the jawline",
        "Descending cheeks or a flattened mid-face",
        "Loose skin and banding in the neck",
        "Good general health and a stable weight",
        "Non-smokers, or those willing to stop before surgery",
      ],
      process: [
        {
          title: "Consultation and facial assessment",
          description:
            "Your surgeon assesses skin quality, tissue descent and bone structure, and reviews your medical history and previous treatments.",
        },
        {
          title: "Surgical planning",
          description:
            "You agree on which areas will be treated and where the incisions will sit, and the surgeon explains the limits of what can be lifted.",
        },
        {
          title: "Pre-operative assessment and consent",
          description:
            "Blood tests, an anaesthetic review and a discussion of the real risks, including bleeding, infection, nerve injury and scarring. Consent is signed before surgery.",
        },
        {
          title: "Surgery under general anaesthesia",
          description:
            "The operation is performed in a hospital theatre. The deeper layers are repositioned, excess skin is removed, and the incisions are closed in stages.",
        },
        {
          title: "Recovery and follow-up",
          description:
            "Drains and dressings are usually removed within a day or two. Follow-up visits track swelling, healing and scar maturation over the first year.",
        },
      ],
      benefits: [
        "A jawline that reads as a line again",
        "Repositioned tissue instead of stretched skin",
        "Scar lines placed where hair and creases can hide them",
        "An improvement that typically holds for several years",
      ],
      callouts: [
        {
          label: "Anaesthesia",
          value: "General",
          description:
            "Performed in a hospital theatre with an anaesthetist and a full monitoring team.",
        },
        {
          label: "Time off work",
          value: "2 - 3 weeks",
          description:
            "Most patients stay home for the first two weeks while bruising and swelling settle.",
        },
      ],
      gallery: [
        { label: "Front view - planning photograph" },
        { label: "Side profile - planning photograph" },
        { label: "Neck and jawline - planning photograph" },
      ],
      beforeAfter: [
        {
          label: "Before surgery",
          caption: "Jawline recorded at the consultation",
        },
        {
          label: "6 months after",
          caption: "Typical settled result at six months",
        },
      ],
      practitioner: {
        name: "Dr. Omar Haddad, FRCS (Plast), DHA",
        role: "Consultant Aesthetic Surgeon",
        note: "Dr. Haddad has performed facelift surgery in Dubai for over fifteen years and works on the deeper tissue layers so results look rested rather than pulled.",
      },
      faqs: [
        {
          question: "How long will the result last?",
          answer:
            "No surgeon can promise the result will never change. Most patients see an improvement that typically lasts several years, after which the face continues to age from its new starting point.",
        },
        {
          question: "Will there be visible scars?",
          answer:
            "Yes, there are scars. They are placed in front of and behind the ear and within the hairline, and they fade over about twelve months. We show you exactly where they will sit before you decide.",
        },
        {
          question: "Is it painful?",
          answer:
            "The operation is done under general anaesthesia, so you feel nothing during surgery. Expect soreness, tightness and bruising for the first week or two, managed with prescribed pain relief.",
        },
      ],
    },
  },
  {
    id: "blepharoplasty",
    slug: "blepharoplasty",
    title: "Eyelid Surgery",
    subtitle: "Upper and lower eyelid surgery",
    category: "surgical",
    description:
      "Surgery to remove excess skin and puffiness around the eyes so the upper lids look lighter and the eyes look more open.",
    longDescription:
      "Eyelid surgery removes excess skin from the upper lids and, when needed, repositions the fat that causes puffiness under the eyes. The aim is to make the eyes look open and rested without changing their shape. It is usually performed under local anaesthesia with sedation, or under general anaesthesia when combined with other surgery. A full medical assessment and signed consent are required. Bruising and swelling are normal in the first two weeks.",
    duration: "1.5 - 3 hours",
    downtime: "7 - 10 days away from work and social plans",
    results:
      "Typically bruising settles within 2 weeks, the settled result is seen at 3 months, and scars soften over 6 - 12 months.",
    priceGuide: "From AED 18,000",
    previewImage: "",
    features: [
      "Removes heavy skin from the upper lids",
      "Softens puffiness under the eyes",
      "Upper and lower lids treated in one session",
      "Performed by a consultant surgeon",
    ],
    recommendedFor:
      "Adults whose upper lids feel heavy or whose under-eye bags persist despite rest, who are in good general health with no active eye disease.",
    details: {
      tagline: "Open up the eye without changing its shape.",
      overview:
        "Hooded upper lids can make you look tired even when you are not, and under-eye bags are usually inherited fat rather than a sign of poor sleep. Surgery removes the excess skin and repositions that fat so the eye area looks lighter. You will be asked about dry eyes, thyroid history and any eye medication before you are accepted for surgery, because these factors change what is safe for you.",
      suitableFor: [
        "Adults with heavy, hooded upper eyelids",
        "Under-eye bags caused by inherited fat",
        "Good general health with no active eye infection",
        "Non-smokers, or those willing to stop before surgery",
        "Realistic expectations about the lines that will remain",
      ],
      process: [
        {
          title: "Consultation and eye assessment",
          description:
            "Your surgeon examines lid skin, fat position and tear production, and reviews your medical and eye history in detail.",
        },
        {
          title: "Surgical planning",
          description:
            "The amount of skin and fat to be removed is marked with you awake, so the eyelids can be assessed in their natural position.",
        },
        {
          title: "Pre-operative assessment and consent",
          description:
            "Blood tests and an anaesthetic review, plus a discussion of the real risks, including bruising, dry eye, asymmetry and scarring. Consent is signed before surgery.",
        },
        {
          title: "Surgery under anaesthesia",
          description:
            "The operation is performed in a licensed facility under local anaesthesia with sedation, or general anaesthesia when other procedures are combined.",
        },
        {
          title: "Recovery and follow-up",
          description:
            "Stitches are removed after about five to seven days. Follow-up visits check eyelid closure, healing and how the scars are maturing.",
        },
      ],
      benefits: [
        "Upper lids that no longer sit on the lashes",
        "A lighter, more rested look in photographs",
        "Make-up that applies more evenly on the lid",
        "A short operation with a comparatively quick recovery",
      ],
      callouts: [
        {
          label: "Anaesthesia",
          value: "Local with sedation or general",
          description:
            "Most eyelid surgery is done awake with sedation; general anaesthesia is used when it is combined with other procedures.",
        },
        {
          label: "Time off work",
          value: "7 - 10 days",
          description:
            "Bruising and swelling are expected in the first week, so most patients plan time away from work and social events.",
        },
      ],
      gallery: [
        { label: "Front view - eyes open" },
        { label: "Front view - eyes closed" },
        { label: "Side profile - upper lid assessment" },
      ],
      beforeAfter: [
        {
          label: "Before surgery",
          caption: "Upper lid skin recorded at the consultation",
        },
        {
          label: "3 months after",
          caption: "Typical settled result at three months",
        },
      ],
      practitioner: {
        name: "Dr. Omar Haddad, FRCS (Plast), DHA",
        role: "Consultant Aesthetic Surgeon",
        note: "Dr. Haddad has performed eyelid surgery in Dubai for over fifteen years and assesses tear function and lid position before recommending any operation.",
      },
      faqs: [
        {
          question: "Will my eyes still close properly?",
          answer:
            "That is the main safety point we check. Removing too much skin can stop the lids closing fully, so your surgeon works conservatively and reviews lid closure at every follow-up visit. Temporary tightness in the first weeks is common.",
        },
        {
          question: "Can it be done without general anaesthesia?",
          answer:
            "Yes. Upper and lower eyelid surgery is often performed under local anaesthesia with sedation, which means you are awake but relaxed. General anaesthesia is used if you are having other procedures at the same time.",
        },
        {
          question: "Will it remove my wrinkles?",
          answer:
            "It removes excess skin and puffiness, not the fine lines caused by expression. Crow's feet and skin texture are usually treated with other options, and your surgeon will tell you honestly which part of the problem surgery can address.",
        },
      ],
    },
  },
  {
    id: "liposuction",
    slug: "liposuction",
    title: "Liposuction",
    subtitle: "Fat removal and body contouring",
    category: "surgical",
    description:
      "Surgery that removes stubborn fat from specific areas to reshape the body, used when diet and exercise have stopped helping.",
    longDescription:
      "Liposuction removes fat from specific areas such as the abdomen, flanks, thighs or arms to change the outline of the body. It is not a weight-loss treatment and it does not tighten loose skin. The procedure is performed under general or regional anaesthesia, and a full medical assessment and signed consent are required. A compression garment is worn afterwards to support healing. Results appear gradually as swelling settles and depend on keeping your weight stable.",
    duration: "2 - 4 hours",
    downtime: "1 - 2 weeks away from work; 4 - 6 weeks in a compression garment",
    results:
      "Typically most swelling settles by 6 - 8 weeks, with the final outline visible at 3 - 6 months.",
    priceGuide: "From AED 16,000",
    previewImage: "",
    features: [
      "Targets fat that diet and exercise resist",
      "Treats several areas in one session",
      "Planned around your natural body shape",
      "Performed by a consultant surgeon",
    ],
    recommendedFor:
      "Adults at or near a stable weight with firm skin and pockets of stubborn fat that have not responded to diet and exercise.",
    details: {
      tagline: "Remove the fat that training has not shifted.",
      overview:
        "Some fat pockets stay regardless of how consistently you train or how carefully you eat. Liposuction removes those cells so the area sits flatter against the body. It will not tighten skin, and it is not a substitute for weight loss; patients who are close to a stable weight get the most predictable outcome. Your surgeon will tell you honestly whether your skin quality is likely to give a smooth result.",
      suitableFor: [
        "Adults at or near a stable weight",
        "Stubborn fat on the abdomen or flanks",
        "Fat on the thighs, arms or under the chin",
        "Firm skin that will settle smoothly after surgery",
        "Non-smokers, or those willing to stop before surgery",
      ],
      process: [
        {
          title: "Consultation and body assessment",
          description:
            "Your surgeon assesses fat distribution, skin tone and muscle tone, and reviews your weight history, medical history and previous procedures.",
        },
        {
          title: "Surgical planning",
          description:
            "The areas to be treated are marked with you standing, and you discuss how much can be removed safely in one session.",
        },
        {
          title: "Pre-operative assessment and consent",
          description:
            "Blood tests and an anaesthetic review, plus a discussion of the real risks, including bruising, infection, fluid collection, numbness and contour irregularity. Consent is signed before surgery.",
        },
        {
          title: "Surgery under anaesthesia",
          description:
            "The operation is performed in a hospital theatre under general or regional anaesthesia, using small incisions and a thin cannula to remove the fat.",
        },
        {
          title: "Recovery and follow-up",
          description:
            "A compression garment is fitted immediately and worn as advised. Follow-up visits check swelling, healing and the developing outline.",
        },
      ],
      benefits: [
        "A flatter outline in areas that resisted training",
        "Several problem areas treated in a single operation",
        "Small incisions that usually fade over months",
        "A result that holds when your weight stays steady",
      ],
      callouts: [
        {
          label: "Anaesthesia",
          value: "General or regional",
          description:
            "Carried out in a hospital theatre with an anaesthetist present, because larger volumes take time and need close monitoring.",
        },
        {
          label: "Compression garment",
          value: "4 - 6 weeks",
          description:
            "Worn day and night at first to control swelling and help the skin settle against the new shape.",
        },
      ],
      gallery: [
        { label: "Front view - standing assessment" },
        { label: "Side profile - standing assessment" },
        { label: "Treatment area - marking photograph" },
      ],
      beforeAfter: [
        {
          label: "Before surgery",
          caption: "Treatment area recorded at the consultation",
        },
        {
          label: "6 months after",
          caption: "Typical settled result at six months",
        },
      ],
      practitioner: {
        name: "Dr. Omar Haddad, FRCS (Plast), DHA",
        role: "Consultant Aesthetic Surgeon",
        note: "Dr. Haddad has performed liposuction in Dubai for over fifteen years and advises patients honestly when skin quality means surgery alone will not give a smooth result.",
      },
      faqs: [
        {
          question: "Is this a weight-loss procedure?",
          answer:
            "No. Liposuction changes the shape of specific areas and is not a treatment for obesity or a substitute for diet and exercise. Patients near a stable weight get the most predictable outcome.",
        },
        {
          question: "Will the fat come back?",
          answer:
            "The fat cells removed from a treated area do not grow back, but the cells that remain can enlarge if you gain weight, so the area can change again. Keeping your weight steady protects the result.",
        },
        {
          question: "How soon will I see a difference?",
          answer:
            "There is swelling and bruising at first, so the shape looks worse before it looks better. Typically most swelling settles by six to eight weeks, and the final outline is visible at three to six months.",
        },
      ],
    },
  },
];
