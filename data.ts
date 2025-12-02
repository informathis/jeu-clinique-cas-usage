import { Case } from './types';

export const CASES: Case[] = [
  // --- NIVEAU 1 : Eaux Calmes ---
  {
    id: 'c1',
    title: 'Tri des emails entrants',
    difficulty: 1,
    agentName: 'Sophie',
    agentRole: 'Service Relation Usagers',
    context: "Nous recevons 500 emails par jour via le formulaire de contact. Mon équipe passe 2h chaque matin à les ouvrir juste pour les transférer au bon service (Urbanisme, État Civil, Scolaire...). On n'en peut plus, il nous faut une IA pour répondre à tout ça !",
    questions: [
      { id: 'q1', text: "Quel est le volume exact et les catégories cibles ?", answer: "Environ 500/jour. Il y a 5 catégories principales très distinctes.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Voulez-vous que l'IA réponde automatiquement ?", answer: "Idéalement oui, mais surtout qu'elle trie pour commencer.", isKey: true, relevance: 8 },
      { id: 'q3', text: "Avez-vous des exemples d'emails passés ?", answer: "Oui, nous avons 3 ans d'historique bien classés.", isKey: true, relevance: 9 },
      { id: 'q4', text: "Quel est le budget ?", answer: "Très limité, on veut une solution rapide.", isKey: false, relevance: 5 },
    ],
    expectedDiagnosis: 'AI_STANDARD', // Classification is a standard NLP task
    expectedRisk: 'LOW',
    recommendedStakeholder: 'LAB_IA',
    prescriptionOptions: {
      reformulation: [
        "Automatiser le tri et l'aiguillage des emails entrants.", // Correct
        "Générer des réponses automatiques à tous les usagers."
      ],
      vigilance: [
        "Attention à la confidentialité des données personnelles dans les emails.", // Correct
        "L'IA va remplacer les agents d'accueil."
      ],
      nextSteps: [
        "Tester un classifieur standard (type Albert ou solution NLP simple) sur un échantillon.", // Correct
        "Développer un réseau de neurones complexe en interne."
      ]
    },
    feedback: {
      success: "Excellent cap ! C'est un cas d'école pour l'IA (classification de texte).",
      partial: "Bonne direction, mais attention à ne pas promettre la réponse automatique tout de suite.",
      failure: "Vous faites fausse route. Ce n'est pas un projet 'Pas d'IA', ni un projet complexe.",
      expertNote: "Le tri d'emails (classification) est un cas d'usage mature. Des solutions souveraines ou open-source existent. La vigilance porte sur le RGPD (données dans les mails)."
    }
  },
  {
    id: 'c2',
    title: 'Compte-rendu de réunion',
    difficulty: 1,
    agentName: 'Marc',
    agentRole: 'Direction Générale',
    context: "Je passe ma vie en réunion. Je veux que mon téléphone m'écoute et rédige le compte-rendu officiel à envoyer aux élus tout seul.",
    questions: [
      { id: 'q1', text: "De quel type de réunions s'agit-il ?", answer: "Comités de direction, négociations stratégiques, parfois confidentielles.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Quel outil de visio utilisez-vous ?", answer: "Ce sont souvent des réunions physiques.", isKey: false, relevance: 5 },
      { id: 'q3', text: "Est-ce que l'audio est enregistré ?", answer: "Non, je veux que ça se fasse en direct.", isKey: true, relevance: 8 },
    ],
    expectedDiagnosis: 'AI_STANDARD', // Transcription + Summarization
    expectedRisk: 'HIGH', // Confidentiality is the killer here
    recommendedStakeholder: 'DPO_RSSI', // Priority due to confidentiality
    prescriptionOptions: {
      reformulation: [
        "Retranscrire et résumer des échanges oraux sensibles.", // Correct
        "Remplacer la secrétaire de direction."
      ],
      vigilance: [
        "Risque critique de fuite de données confidentielles vers des serveurs tiers.", // Correct
        "L'IA ne comprend pas les accents."
      ],
      nextSteps: [
        "Utiliser uniquement un outil validé/sécurisé (pas d'app grand public) et couper pour le 'Secret'.", // Correct
        "Installer n'importe quelle app gratuite du store."
      ]
    },
    feedback: {
      success: "Bien vu. La technologie existe, mais le risque de confidentialité est majeur.",
      partial: "Vous avez identifié l'outil, mais sous-estimé le risque de sécurité.",
      failure: "Attention ! Envoyer des CODIR sur un cloud public est une faute grave.",
      expertNote: "L'IA générative excelle ici, mais pour la Direction Générale, la souveraineté des données est non-négociable. Validation RSSI impérative."
    }
  },
  {
    id: 'c3',
    title: 'Tableaux Excel complexes',
    difficulty: 1,
    agentName: 'Julie',
    agentRole: 'Contrôle de Gestion',
    context: "J'ai des tableaux Excel énormes pour le budget. Je veux une IA qui vérifie si les totaux sont justes et si les formules ne sont pas cassées.",
    questions: [
      { id: 'q1', text: "Les règles de calcul sont-elles fixes ?", answer: "Oui, c'est purement mathématique.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Voulez-vous prédire le budget futur ?", answer: "Non, juste vérifier la cohérence actuelle.", isKey: true, relevance: 9 },
    ],
    expectedDiagnosis: 'NO_IA', // Deterministic logic needed
    expectedRisk: 'LOW',
    recommendedStakeholder: 'MANAGER', // Or IT support
    prescriptionOptions: {
      reformulation: [
        "Fiabiliser des calculs budgétaires complexes.", // Correct
        "Inventer de nouvelles lignes budgétaires."
      ],
      vigilance: [
        "L'IA générative est mauvaise en calcul pur (hallucinations).", // Correct
        "L'IA va voler le travail des comptables."
      ],
      nextSteps: [
        "Utiliser des macros, des scripts Python ou des outils de BI classiques.", // Correct
        "Demander à ChatGPT de vérifier les formules."
      ]
    },
    feedback: {
      success: "Bravo. C'est de l'automatisation (RPA/Scripts), pas de l'IA.",
      partial: "Attention, l'IA probabiliste n'est pas fiable pour de l'arithmétique stricte.",
      failure: "Non, n'utilisez pas d'IA pour vérifier des sommes ! C'est déterministe.",
      expertNote: "Ne pas confondre IA et informatique classique. Pour des règles strictes (A+B=C), un script est 100% fiable, une IA ne l'est pas."
    }
  },

  // --- NIVEAU 2 : Haute Mer ---
  {
    id: 'c4',
    title: 'Assistant FAQ RH',
    difficulty: 2,
    agentName: 'Karim',
    agentRole: 'DRH',
    context: "Les agents posent toujours les mêmes questions sur les congés, les primes... On voudrait un chatbot pour répondre à leur place sur l'intranet.",
    questions: [
      { id: 'q1', text: "La base de connaissance (fiches RH) est-elle à jour ?", answer: "Euh... pas vraiment, il y a de vieux PDF qui traînent.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Quel est le risque si la réponse est fausse ?", answer: "L'agent peut mal poser ses congés ou perdre une prime. C'est gênant.", isKey: true, relevance: 8 },
    ],
    expectedDiagnosis: 'NO_IA', // Pre-requisite not met (Clean Data)
    expectedRisk: 'MODERATE',
    recommendedStakeholder: 'BUSINESS', // Fix data first
    prescriptionOptions: {
      reformulation: [
        "Accéder facilement à l'information RH réglementaire.", // Correct
        "Avoir un ami virtuel pour les RH."
      ],
      vigilance: [
        "Une IA entraînée sur des documents obsolètes donnera des réponses fausses (GIGO).", // Correct
        "Le chatbot va devenir sentient."
      ],
      nextSteps: [
        "D'abord : nettoyer et structurer la base de connaissance RH. Ensuite : envisager un RAG.", // Correct
        "Lancer le développement du chatbot tout de suite."
      ]
    },
    feedback: {
      success: "Exactement. Pas d'IA sans données propres (Garbage In, Garbage Out).",
      partial: "L'idée est bonne, mais le pré-requis n'est pas vu : la base documentaire.",
      failure: "Lancer ce projet maintenant serait un échec garanti à cause des données source.",
      expertNote: "Un projet IA commence souvent par un projet de 'Knowledge Management'. Conseillez de mettre à jour les fiches avant de brancher une IA."
    }
  },
  {
    id: 'c5',
    title: 'Détection de piscines non déclarées',
    difficulty: 2,
    agentName: 'Alice',
    agentRole: 'Service Urbanisme',
    context: "On veut utiliser les images satellites Google Maps pour trouver les piscines non déclarées et redresser les impôts fonciers automatiquement.",
    questions: [
      { id: 'q1', text: "Avez-vous le droit d'utiliser ces images ?", answer: "Je ne sais pas.", isKey: true, relevance: 9 },
      { id: 'q2', text: "Voulez-vous automatiser l'envoi de l'amende ?", answer: "Oui, pour gagner du temps.", isKey: true, relevance: 10 },
    ],
    expectedDiagnosis: 'AI_PROJECT', // Needs structured project
    expectedRisk: 'HIGH', // Legal + Automated decision
    recommendedStakeholder: 'DPO_RSSI',
    prescriptionOptions: {
      reformulation: [
        "Aide à la détection de fraude par imagerie aérienne.", // Correct
        "Flicage automatique de la population."
      ],
      vigilance: [
        "Interdiction de décision administrative automatisée défavorable sans validation humaine (RGPD art 22).", // Correct
        "Les nuages cachent les piscines."
      ],
      nextSteps: [
        "Lancer un projet 'Foncier Innovant' avec validation CNIL et vérification humaine systématique.", // Correct
        "Envoyer les amendes directement."
      ]
    },
    feedback: {
      success: "Bien navigué. Projet IA pertinent mais cadre légal très strict (Article 22 RGPD).",
      partial: "Vous avez vu l'intérêt technique, mais zappé l'aspect légal de la décision automatisée.",
      failure: "Alerte rouge ! On ne peut pas automatiser une sanction sans humain.",
      expertNote: "L'IA peut servir d'outil de pré-détection, mais l'agent doit valider chaque cas. Le projet 'Foncier Innovant' de la DGFiP est l'exemple à suivre."
    }
  },
  {
    id: 'c6',
    title: 'Résumé de dossiers sociaux',
    difficulty: 2,
    agentName: 'Lucas',
    agentRole: 'Aide Sociale',
    context: "Les travailleurs sociaux doivent lire des historiques de 50 pages avant chaque rdv. Une IA pourrait-elle faire une synthèse des points clés (dettes, situation familiale) ?",
    questions: [
      { id: 'q1', text: "Les données sont-elles sensibles ?", answer: "Extrêmement. Données de santé, mineurs, précarité.", isKey: true, relevance: 10 },
      { id: 'q2', text: "L'IA peut-elle se tromper ?", answer: "Si elle rate une info critique (violence conjugale), c'est grave.", isKey: true, relevance: 9 },
    ],
    expectedDiagnosis: 'AI_PROJECT', // High risk, needs specific implementation
    expectedRisk: 'HIGH',
    recommendedStakeholder: 'DPO_RSSI',
    prescriptionOptions: {
      reformulation: [
        "Aide à la lecture rapide de dossiers complexes.", // Correct
        "Laisser l'IA décider des aides."
      ],
      vigilance: [
        "Biais, hallucination (inventer des faits), et très haute sensibilité des données.", // Correct
        "L'IA lit trop lentement."
      ],
      nextSteps: [
        "POC très encadré avec IA souveraine, anonymisation préalable, et l'IA ne fait que surligner, pas décider.", // Correct
        "Mettre les dossiers dans ChatGPT."
      ]
    },
    feedback: {
      success: "Très bien. Usage à fort impact positif, mais contraintes de sécurité maximales.",
      partial: "Attention à l'hallucination : l'IA ne doit pas inventer de dettes.",
      failure: "Trop dangereux sans précautions extrêmes.",
      expertNote: "Cas d'usage 'gagner du temps pour le passer avec l'humain'. Pertinent, mais nécessite un modèle hébergé en interne (SecNumCloud) impérativement."
    }
  },

  // --- NIVEAU 3 : Tempête ---
  {
    id: 'c7',
    title: 'Prédiction du chômage longue durée',
    difficulty: 3,
    agentName: 'Paul',
    agentRole: 'Emploi / Insertion',
    context: "On a plein de données sur les demandeurs d'emploi. On voudrait une IA qui prédit qui va rester au chômage longtemps pour ne pas leur proposer de formation coûteuse (perdue d'avance) et se concentrer sur les autres.",
    questions: [
      { id: 'q1', text: "Quelles données utiliseriez-vous ?", answer: "Âge, quartier, origine, historique...", isKey: true, relevance: 10 },
      { id: 'q2', text: "Quel est le but final ?", answer: "Optimiser le budget formation en écartant les cas désespérés.", isKey: true, relevance: 10 },
    ],
    expectedDiagnosis: 'NO_IA', // Unethical / Illegal
    expectedRisk: 'HIGH',
    recommendedStakeholder: 'DPO_RSSI', // To stop it immediately
    prescriptionOptions: {
      reformulation: [
        "Ce projet ne doit pas se faire.", // Correct
        "Optimisation financière des formations."
      ],
      vigilance: [
        "Risque majeur de discrimination, biais algorithmique et rupture d'égalité devant le service public.", // Correct
        "L'algorithme sera difficile à coder."
      ],
      nextSteps: [
        "Abandonner cette approche 'scoring social'. Orienter vers une aide personnalisée pour tous.", // Correct
        "Lancer le projet discrètement."
      ]
    },
    feedback: {
      success: "Bravo ! Vous avez évité un naufrage éthique. C'est de la discrimination automatisée.",
      partial: "Vous avez vu le risque technique, mais c'est le problème éthique qui prime ici.",
      failure: "Naufrage. Vous venez de valider une discrimination algorithmique illégale.",
      expertNote: "L'IA ne doit pas servir à exclure des usagers sur des critères statistiques (biais de prophétie autoréalisatrice). C'est contraire aux valeurs du service public."
    }
  },
  {
    id: 'c8',
    title: 'Caméras "émotion" à l\'accueil',
    difficulty: 3,
    agentName: 'Sarah',
    agentRole: 'Sécurité / Accueil',
    context: "Pour prévenir les incivilités, on voudrait des caméras qui analysent les visages des usagers dans la file d'attente et alertent la sécu si quelqu'un a l'air 'agressif' ou 'nerveux'.",
    questions: [
      { id: 'q1', text: "Sur quoi se base la détection ?", answer: "Les micro-expressions du visage, la biométrie.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Est-ce fiable ?", answer: "Les vendeurs disent que oui.", isKey: false, relevance: 7 },
    ],
    expectedDiagnosis: 'NO_IA', // Illegal (Remote Biometric Identification rules in AI Act)
    expectedRisk: 'HIGH',
    recommendedStakeholder: 'DPO_RSSI',
    prescriptionOptions: {
      reformulation: [
        "Ce projet est illégal (reconnaissance des émotions/biométrie).", // Correct
        "Sécurisation de l'accueil par vidéo."
      ],
      vigilance: [
        "L'IA Act et la CNIL interdisent ou encadrent très strictement l'analyse biométrique émotionnelle.", // Correct
        "Les caméras coûtent cher."
      ],
      nextSteps: [
        "Abandonner. Renforcer plutôt la présence humaine ou la médiation.", // Correct
        "Demander le consentement de chaque usager à l'entrée."
      ]
    },
    feedback: {
      success: "Excellent réflexe. La reconnaissance des émotions est scientifiquement contestée et juridiquement bloquée.",
      partial: "Douteux. Vous n'avez pas été assez ferme sur l'interdiction.",
      failure: "Interdit ! C'est une surveillance biométrique disproportionnée.",
      expertNote: "L'analyse des émotions est considérée comme 'Haut Risque' voire interdite (AI Act). De plus, elle est souvent biaisée culturellement."
    }
  },
  {
    id: 'c9',
    title: 'Traduction du site web de la ville',
    difficulty: 3,
    agentName: 'Elodie',
    agentRole: 'Communication',
    context: "On veut traduire tout le site web de la mairie en 10 langues (Anglais, Arabe, Chinois...) pour les touristes et résidents étrangers. On n'a pas le budget pour des traducteurs humains.",
    questions: [
      { id: 'q1', text: "Y a-t-il des informations légales engageantes ?", answer: "Oui, état civil, démarches administratives.", isKey: true, relevance: 10 },
      { id: 'q2', text: "Quel outil comptez-vous utiliser ?", answer: "Google Translate ou DeepL intégré au CMS.", isKey: true, relevance: 8 },
    ],
    expectedDiagnosis: 'AI_STANDARD', // Doable but with disclaimer
    expectedRisk: 'MODERATE',
    recommendedStakeholder: 'BUSINESS',
    prescriptionOptions: {
      reformulation: [
        "Accessibilité linguistique du site web.", // Correct
        "Remplacement des traducteurs jurés."
      ],
      vigilance: [
        "Erreurs de traduction possibles sur des termes juridiques. La version française doit faire foi.", // Correct
        "Les serveurs vont surchauffer."
      ],
      nextSteps: [
        "Mettre un bandeau 'Traduction automatique indicative'. Faire relire les pages clés (état civil) par un humain.", // Correct
        "Tout traduire automatiquement sans prévenir."
      ]
    },
    feedback: {
      success: "Bonne approche. L'IA permet l'accessibilité là où l'humain est trop cher, mais avec transparence.",
      partial: "Attention, si la traduction induit l'usager en erreur sur une démarche, la responsabilité de la mairie est engagée.",
      failure: "Refuser priverait des usagers d'info, accepter sans réserve est risqué.",
      expertNote: "C'est un bon usage 'frugal' de l'IA. L'important est la mention légale : 'La version française fait foi' et de cibler la relecture humaine sur les procédures critiques."
    }
  }
];