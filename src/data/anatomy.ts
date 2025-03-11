import { Question } from './types';

export const anatomyQuestions: Question[] = [
  {
    id: "anatomy-1",
    question: "Which of the following is NOT a component of the brachial plexus?",
    hint: "Think about the nerve roots that form the brachial plexus",
    options: [
      {
        id: "a1",
        text: "C4",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "C5",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "C6",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "T1",
        isCorrect: false,
      },
    ],
    answerDescription: "The brachial plexus is formed by the ventral rami of spinal nerves C5-T1. C4 may contribute to the brachial plexus in some cases (prefixed brachial plexus), but it is not a standard component.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "upper limb",
    subtopic: "brachial plexus",
    tags: ["nerves", "upper limb"],
    explanation: "The brachial plexus is a network of nerves that supplies the upper limb. It is formed by the ventral rami of spinal nerves C5, C6, C7, C8, and T1. In some individuals, C4 may contribute (prefixed brachial plexus), and in others, T2 may contribute (postfixed brachial plexus), but these are variations and not part of the standard anatomy."
  },
  {
    id: "anatomy-2",
    question: "Which of the following muscles is NOT part of the rotator cuff?",
    hint: "Think about the muscles that attach to the humerus",
    options: [
      {
        id: "a1",
        text: "Supraspinatus",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Infraspinatus",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Deltoid",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Teres minor",
        isCorrect: false,
      },
    ],
    answerDescription: "The rotator cuff consists of four muscles: supraspinatus, infraspinatus, teres minor, and subscapularis (SITS). The deltoid is not part of the rotator cuff.",
    difficulty: "easy",
    subject: "anatomy",
    topic: "upper limb",
    subtopic: "shoulder joint",
    tags: ["muscles", "shoulder"]
  },
  {
    id: "anatomy-3",
    question: "Which structure passes through the foramen magnum?",
    hint: "Think about the connection between the brain and spinal cord",
    options: [
      {
        id: "a1",
        text: "Medulla oblongata",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Pons",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Midbrain",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Cerebellum",
        isCorrect: false,
      },
    ],
    answerDescription: "The medulla oblongata passes through the foramen magnum, connecting the brain to the spinal cord.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "head and neck",
    subtopic: "cranial cavity",
    tags: ["nervous system", "brain", "skull"]
  },
  {
    id: "anatomy-4",
    question: "Which cranial nerve is responsible for taste sensation in the anterior two-thirds of the tongue?",
    hint: "Think about the facial nerve's functions",
    options: [
      {
        id: "a1",
        text: "Trigeminal nerve (CN V)",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Facial nerve (CN VII)",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Glossopharyngeal nerve (CN IX)",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Hypoglossal nerve (CN XII)",
        isCorrect: false,
      },
    ],
    answerDescription: "The facial nerve (CN VII) is responsible for taste sensation in the anterior two-thirds of the tongue via the chorda tympani branch.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "head and neck",
    subtopic: "cranial nerves",
    tags: ["nervous system", "sensation", "tongue"]
  },
  {
    id: "anatomy-5",
    question: "Which of the following is NOT a branch of the external carotid artery?",
    hint: "Think about the major vessels supplying the head and neck",
    options: [
      {
        id: "a1",
        text: "Superior thyroid artery",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Facial artery",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Maxillary artery",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Ophthalmic artery",
        isCorrect: true,
      },
    ],
    answerDescription: "The ophthalmic artery is a branch of the internal carotid artery, not the external carotid artery.",
    difficulty: "hard",
    subject: "anatomy",
    topic: "head and neck",
    subtopic: "blood vessels",
    tags: ["arteries", "circulation"]
  },
  {
    id: "anatomy-6",
    question: "Which of the following heart valves is NOT an atrioventricular valve?",
    hint: "Think about the valves between the heart chambers and great vessels",
    options: [
      {
        id: "a1",
        text: "Tricuspid valve",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Mitral valve",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Aortic valve",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Both A and B are atrioventricular valves",
        isCorrect: false,
      },
    ],
    answerDescription: "The aortic valve is a semilunar valve between the left ventricle and the aorta, not between an atrium and ventricle.",
    difficulty: "easy",
    subject: "anatomy",
    topic: "thorax",
    subtopic: "heart",
    tags: ["cardiovascular", "valves"]
  },
  {
    id: "anatomy-7",
    question: "Which structure is part of the mediastinum but NOT part of the respiratory system?",
    hint: "Think about the structures located in the mediastinum",
    options: [
      {
        id: "a1",
        text: "Trachea",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Main bronchi",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Thymus",
        isCorrect: true,
      },
      {
        id: "a4",
        text: "Lungs",
        isCorrect: false,
      },
    ],
    answerDescription: "The thymus is an immune organ located in the anterior mediastinum and is not part of the respiratory system.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "thorax",
    subtopic: "mediastinum",
    tags: ["respiratory", "immune system"]
  },
  {
    id: "anatomy-8",
    question: "Which of the following is NOT a boundary of the femoral triangle?",
    hint: "Think about the anatomical structures forming the femoral triangle",
    options: [
      {
        id: "a1",
        text: "Inguinal ligament",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Sartorius muscle",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Adductor longus muscle",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Rectus femoris muscle",
        isCorrect: true,
      },
    ],
    answerDescription: "The boundaries of the femoral triangle are the inguinal ligament superiorly, the sartorius muscle laterally, and the adductor longus muscle medially. The rectus femoris is not a boundary of the femoral triangle.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "lower limb",
    subtopic: "femoral triangle",
    tags: ["muscles", "vascular"]
  },
  {
    id: "anatomy-9",
    question: "The portal vein is formed by the union of which two veins?",
    hint: "Think about the venous drainage of the digestive organs",
    options: [
      {
        id: "a1",
        text: "Superior mesenteric and splenic veins",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Inferior mesenteric and splenic veins",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Superior and inferior mesenteric veins",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Gastric and splenic veins",
        isCorrect: false,
      },
    ],
    answerDescription: "The portal vein is formed by the union of the superior mesenteric vein and the splenic vein behind the neck of the pancreas.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "abdomen",
    subtopic: "portal system",
    tags: ["veins", "liver", "digestive system"]
  },
  {
    id: "anatomy-10",
    question: "Which of the following is NOT a part of the renal corpuscle?",
    hint: "Think about the microscopic structure of the nephron",
    options: [
      {
        id: "a1",
        text: "Glomerulus",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Bowman's capsule",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Podocytes",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Loop of Henle",
        isCorrect: true,
      },
    ],
    answerDescription: "The renal corpuscle consists of the glomerulus (a tuft of capillaries) and Bowman's capsule. The loop of Henle is part of the renal tubule, not the renal corpuscle.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "abdomen",
    subtopic: "kidney",
    tags: ["urinary system", "nephron", "histology"]
  },
  {
    id: "anatomy-11",
    question: "In which part of the male urethra is the external urethral sphincter located?",
    hint: "Think about the divisions of the male urethra",
    options: [
      {
        id: "a1",
        text: "Prostatic urethra",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Membranous urethra",
        isCorrect: true,
      },
      {
        id: "a3",
        text: "Penile (spongy) urethra",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Navicular fossa",
        isCorrect: false,
      },
    ],
    answerDescription: "The external urethral sphincter is a voluntary muscle that surrounds the membranous part of the male urethra as it passes through the urogenital diaphragm.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "pelvis",
    subtopic: "urinary system",
    tags: ["male reproductive system", "urinary system", "sphincters"]
  },
  {
    id: "anatomy-12",
    question: "Which of the following is NOT a component of the limbic system?",
    hint: "Think about the parts of the brain involved in emotion and memory",
    options: [
      {
        id: "a1",
        text: "Amygdala",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Hippocampus",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Cingulate gyrus",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Basal ganglia",
        isCorrect: true,
      },
    ],
    answerDescription: "The limbic system includes the amygdala, hippocampus, cingulate gyrus, fornix, mammillary bodies, and parts of the thalamus. The basal ganglia are not considered part of the limbic system but are involved in motor control.",
    difficulty: "hard",
    subject: "anatomy",
    topic: "neuroanatomy",
    subtopic: "limbic system",
    tags: ["brain", "emotions", "memory"]
  },
  {
    id: "anatomy-13",
    question: "Which of the following muscles is involved in vocal cord abduction?",
    hint: "Think about the intrinsic muscles of the larynx",
    options: [
      {
        id: "a1",
        text: "Posterior cricoarytenoid",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Lateral cricoarytenoid",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Thyroarytenoid",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Cricothyroid",
        isCorrect: false,
      },
    ],
    answerDescription: "The posterior cricoarytenoid muscle is the only muscle that abducts the vocal cords, opening the glottis during breathing.",
    difficulty: "hard",
    subject: "anatomy",
    topic: "head and neck",
    subtopic: "larynx",
    tags: ["muscles", "respiration", "voice"]
  },
  {
    id: "anatomy-14",
    question: "Which of the following is the correct sequence of structures in the seminiferous tubules, from the periphery to the lumen?",
    hint: "Think about spermatogenesis stages",
    options: [
      {
        id: "a1",
        text: "Spermatogonia → Spermatocytes → Spermatids → Spermatozoa",
        isCorrect: true,
      },
      {
        id: "a2",
        text: "Spermatocytes → Spermatogonia → Spermatids → Spermatozoa",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Spermatids → Spermatocytes → Spermatogonia → Spermatozoa",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Spermatozoa → Spermatids → Spermatocytes → Spermatogonia",
        isCorrect: false,
      },
    ],
    answerDescription: "In the seminiferous tubules, spermatogonia are located at the periphery (basement membrane), followed by spermatocytes, then spermatids, and finally spermatozoa are released into the lumen.",
    difficulty: "medium",
    subject: "anatomy",
    topic: "pelvis",
    subtopic: "male reproductive system",
    tags: ["testis", "spermatogenesis", "histology"]
  },
  {
    id: "anatomy-15",
    question: "Which of the following is NOT a normal anatomical variant of the Circle of Willis?",
    hint: "Think about common variations in the cerebral arterial circle",
    options: [
      {
        id: "a1",
        text: "Absence of the anterior communicating artery",
        isCorrect: false,
      },
      {
        id: "a2",
        text: "Hypoplastic posterior communicating artery",
        isCorrect: false,
      },
      {
        id: "a3",
        text: "Duplication of the anterior cerebral artery",
        isCorrect: false,
      },
      {
        id: "a4",
        text: "Absence of the basilar artery",
        isCorrect: true,
      },
    ],
    answerDescription: "While the Circle of Willis shows significant anatomical variation, absence of the basilar artery is not a normal variant as it is critical for brainstem blood supply. The other options are common variations.",
    difficulty: "hard",
    subject: "anatomy",
    topic: "neuroanatomy",
    subtopic: "cerebral circulation",
    tags: ["arteries", "brain", "variants"]
  }
];