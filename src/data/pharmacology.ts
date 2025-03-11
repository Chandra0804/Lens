import { Question } from './types';

export const pharmacologyQuestions: Question[] = [
  {
    id: "pharma-1",
    question: "Which of the following anti-hypertensive drugs acts by blocking calcium channels?",
    hint: "Think about drug classes that affect calcium movement in vascular smooth muscle",
    options: [
      {
        id: "a1",
        text: "Enalapril",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Hydrochlorothiazide",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Amlodipine",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Propranolol",
        isCorrect: false,
      },
    ],
    answerDescription: "Amlodipine is a calcium channel blocker that dilates blood vessels by preventing calcium from entering vascular smooth muscle cells, thereby reducing blood pressure.",
    difficulty: "easy",
    subject: "pharmacology",
    topic: "cardiovascular pharmacology",
    subtopic: "antihypertensives",
    tags: ["calcium channel blockers", "anti-hypertensives"]
  },
  {
    id: "pharma-2",
    question: "Which of the following is NOT a side effect of corticosteroids?",
    hint: "Think about the physiological effects of steroids and their adverse effects",
    options: [
      {
        id: "a1",
        text: "Osteoporosis",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Hyperglycemia",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Cushing's syndrome",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Hypotension",
        isCorrect: true,
      },
    ],
    answerDescription: "Corticosteroids typically cause hypertension, not hypotension. The other options (osteoporosis, hyperglycemia, and Cushing's syndrome) are common side effects of long-term corticosteroid therapy.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "endocrine pharmacology",
    subtopic: "corticosteroids",
    tags: ["adverse effects", "steroids"]
  },
  {
    id: "pharma-3",
    question: "Which mechanism of action is associated with metformin in the treatment of type 2 diabetes?",
    hint: "Think about how metformin affects glucose production and utilization",
    options: [
      {
        id: "a1",
        text: "Increases insulin secretion from pancreatic beta cells",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Decreases hepatic glucose production and increases peripheral glucose utilization",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Inhibits alpha-glucosidase in the intestinal brush border",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Increases renal glucose excretion",
        isCorrect: false,
      },
    ],
    answerDescription: "Metformin primarily works by decreasing hepatic glucose production and increasing peripheral glucose utilization. It does not significantly increase insulin secretion or inhibit carbohydrate absorption.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "endocrine pharmacology",
    subtopic: "antidiabetic drugs",
    tags: ["diabetes", "biguanides"]
  },
  {
    id: "pharma-4",
    question: "Which of the following antibiotics inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit?",
    hint: "Think about different classes of antibiotics and their mechanisms",
    options: [
      {
        id: "a1",
        text: "Ciprofloxacin",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Azithromycin",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Ampicillin",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Gentamicin",
        isCorrect: false,
      },
    ],
    answerDescription: "Azithromycin, a macrolide antibiotic, inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit. Ciprofloxacin inhibits DNA gyrase, ampicillin inhibits cell wall synthesis, and gentamicin binds to the 30S ribosomal subunit.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "antimicrobial drugs",
    subtopic: "macrolides",
    tags: ["antibiotics", "protein synthesis inhibitors"]
  },
  {
    id: "pharma-5",
    question: "Which of the following opioid antagonists is used to treat opioid overdose?",
    hint: "Think about drugs used in emergency settings for opioid overdose",
    options: [
      {
        id: "a1",
        text: "Naloxone",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Methadone",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Buprenorphine",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Fentanyl",
        isCorrect: false,
      },
    ],
    answerDescription: "Naloxone is a pure opioid antagonist used to rapidly reverse opioid overdose by competitively binding to opioid receptors. Methadone is an opioid agonist, buprenorphine is a partial agonist, and fentanyl is a potent opioid agonist.",
    difficulty: "easy",
    subject: "pharmacology",
    topic: "CNS pharmacology",
    subtopic: "opioids",
    tags: ["antagonists", "overdose", "emergency medicine"]
  },
  {
    id: "pharma-6",
    question: "Which drug would be CONTRAINDICATED in a patient with angle-closure glaucoma?",
    hint: "Think about drugs that can dilate the pupil or have anticholinergic effects",
    options: [
      {
        id: "a1",
        text: "Atenolol",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Atropine",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Aspirin",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Albuterol",
        isCorrect: false,
      },
    ],
    answerDescription: "Atropine, an anticholinergic drug, causes mydriasis (pupil dilation) which can precipitate an acute attack in patients with angle-closure glaucoma by blocking the drainage of aqueous humor through the already narrow angle.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "autonomic pharmacology",
    subtopic: "anticholinergics",
    tags: ["contraindications", "glaucoma", "mydriatics"]
  },
  {
    id: "pharma-7",
    question: "Which of the following is a selective serotonin reuptake inhibitor (SSRI) used for depression?",
    hint: "Think about commonly prescribed antidepressants",
    options: [
      {
        id: "a1",
        text: "Amitriptyline",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Bupropion",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Fluoxetine",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Venlafaxine",
        isCorrect: false,
      },
    ],
    answerDescription: "Fluoxetine (Prozac) is a selective serotonin reuptake inhibitor (SSRI). Amitriptyline is a tricyclic antidepressant, bupropion is an atypical antidepressant (NDRI), and venlafaxine is an SNRI (serotonin-norepinephrine reuptake inhibitor).",
    difficulty: "easy",
    subject: "pharmacology",
    topic: "CNS pharmacology",
    subtopic: "antidepressants",
    tags: ["SSRIs", "psychiatry", "mood disorders"]
  },
  {
    id: "pharma-8",
    question: "Warfarin exerts its anticoagulant effect through which mechanism?",
    hint: "Think about the clotting cascade and vitamin K",
    options: [
      {
        id: "a1",
        text: "Direct inhibition of thrombin",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Inhibition of vitamin K-dependent clotting factor synthesis",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Inhibition of platelet aggregation",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Inhibition of fibrinogen conversion to fibrin",
        isCorrect: false,
      },
    ],
    answerDescription: "Warfarin inhibits the enzyme vitamin K epoxide reductase, preventing the regeneration of reduced vitamin K, which is necessary for the gamma-carboxylation and activation of clotting factors II, VII, IX, and X.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "cardiovascular pharmacology",
    subtopic: "anticoagulants",
    tags: ["coagulation", "vitamin K antagonists"]
  },
  {
    id: "pharma-9",
    question: "Which of the following is the mechanism of action of sildenafil (Viagra)?",
    hint: "Think about cGMP and phosphodiesterase enzymes",
    options: [
      {
        id: "a1",
        text: "Inhibition of phosphodiesterase type 5 (PDE5)",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Alpha-adrenergic receptor blockade",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Stimulation of testosterone production",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Inhibition of prostaglandin breakdown",
        isCorrect: false,
      },
    ],
    answerDescription: "Sildenafil inhibits phosphodiesterase type 5 (PDE5), which normally breaks down cGMP. This leads to increased cGMP levels, causing smooth muscle relaxation in the corpus cavernosum and increased blood flow to the penis.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "reproductive pharmacology",
    subtopic: "erectile dysfunction",
    tags: ["PDE5 inhibitors", "vasodilators"]
  },
  {
    id: "pharma-10",
    question: "Which of the following is the first-line treatment for acute migraine attacks?",
    hint: "Think about the most commonly prescribed medications for acute migraine",
    options: [
      {
        id: "a1",
        text: "Propranolol",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Sumatriptan",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Topiramate",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Amitriptyline",
        isCorrect: false,
      },
    ],
    answerDescription: "Sumatriptan, a selective 5-HT1B/1D receptor agonist (triptan), is a first-line treatment for acute migraine attacks. Propranolol, topiramate, and amitriptyline are used for migraine prophylaxis, not acute treatment.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "CNS pharmacology",
    subtopic: "antimigraine drugs",
    tags: ["triptans", "headache", "serotonin agonists"]
  },
  {
    id: "pharma-11",
    question: "Which of the following is NOT a mechanism of action of aspirin?",
    hint: "Think about the various pharmacological effects of aspirin",
    options: [
      {
        id: "a1",
        text: "Inhibition of cyclooxygenase (COX) enzymes",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Antipyretic effect via the hypothalamus",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Anti-inflammatory effect via decreased prostaglandin synthesis",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Bronchodilation via beta-2 adrenergic receptor activation",
        isCorrect: true,
      },
    ],
    answerDescription: "Aspirin does not cause bronchodilation via beta-2 adrenergic receptor activation. In fact, aspirin can trigger bronchoconstriction in some patients with asthma. Its primary mechanisms include COX inhibition, antipyretic effects, and anti-inflammatory effects.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "NSAIDs",
    subtopic: "aspirin",
    tags: ["COX inhibitors", "platelets", "antipyretics"]
  },
  {
    id: "pharma-12",
    question: "Which of the following antiepileptic drugs works primarily by blocking sodium channels?",
    hint: "Think about the mechanisms of different antiepileptic medications",
    options: [
      {
        id: "a1",
        text: "Ethosuximide",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Phenytoin",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Vigabatrin",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Diazepam",
        isCorrect: false,
      },
    ],
    answerDescription: "Phenytoin works primarily by blocking voltage-gated sodium channels in neurons, stabilizing the inactive state. Ethosuximide blocks T-type calcium channels, vigabatrin inhibits GABA transaminase, and diazepam potentiates GABA-A receptors.",
    difficulty: "hard",
    subject: "pharmacology",
    topic: "CNS pharmacology",
    subtopic: "antiepileptics",
    tags: ["sodium channel blockers", "seizures"]
  },
  {
    id: "pharma-13",
    question: "Which of the following is the most common serious adverse effect of aminoglycoside antibiotics?",
    hint: "Think about the organs that can be damaged by aminoglycosides",
    options: [
      {
        id: "a1",
        text: "Hepatotoxicity",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Cardiotoxicity",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Nephrotoxicity",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Pulmonary fibrosis",
        isCorrect: false,
      },
    ],
    answerDescription: "Nephrotoxicity (kidney damage) is the most common serious adverse effect of aminoglycosides. Ototoxicity (hearing loss) is another important toxicity. These antibiotics are not commonly associated with hepatotoxicity, cardiotoxicity, or pulmonary fibrosis.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "antimicrobial drugs",
    subtopic: "aminoglycosides",
    tags: ["adverse effects", "toxicity", "kidneys"]
  },
  {
    id: "pharma-14",
    question: "Which statement about proton pump inhibitors (PPIs) is correct?",
    hint: "Think about the mechanism and effects of PPIs",
    options: [
      {
        id: "a1",
        text: "They reversibly compete with histamine at H2 receptors",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "They irreversibly inhibit the H+/K+-ATPase",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "They neutralize gastric acid directly",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "They stimulate prostaglandin synthesis in the gastric mucosa",
        isCorrect: false,
      },
    ],
    answerDescription: "Proton pump inhibitors (PPIs) such as omeprazole irreversibly inhibit the hydrogen-potassium ATPase (H+/K+-ATPase) pump in gastric parietal cells, blocking the final step in acid production.",
    difficulty: "medium",
    subject: "pharmacology",
    topic: "GI pharmacology",
    subtopic: "anti-ulcer drugs",
    tags: ["acid suppression", "gastric acid"]
  },
  {
    id: "pharma-15",
    question: "Which cytotoxic anticancer drug is classified as an alkylating agent?",
    hint: "Think about the mechanisms of different chemotherapeutic agents",
    options: [
      {
        id: "a1",
        text: "Cyclophosphamide",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Methotrexate",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Vincristine",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Doxorubicin",
        isCorrect: false,
      },
    ],
    answerDescription: "Cyclophosphamide is an alkylating agent that works by crosslinking DNA strands. Methotrexate is an antimetabolite (folate antagonist), vincristine is a vinca alkaloid (microtubule inhibitor), and doxorubicin is an anthracycline (topoisomerase II inhibitor).",
    difficulty: "hard",
    subject: "pharmacology",
    topic: "chemotherapy",
    subtopic: "alkylating agents",
    tags: ["cancer", "DNA damage", "cytotoxic drugs"]
  }
];