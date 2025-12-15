import express from 'express';

const router = express.Router();

// Comprehensive medical information database
const medicalDatabase = {
  conditions: [
    // Existing conditions
    {
      id: 'flu',
      name: 'Influenza (Flu)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A contagious respiratory illness caused by influenza viruses',
      symptoms: ['fever', 'chills', 'cough', 'congestion', 'fatigue', 'body aches', 'headache'],
      causes: ['Influenza A, B, or C viruses', 'Person-to-person transmission through respiratory droplets'],
      treatment: 'Rest, fluids, antiviral medications if prescribed (oseltamivir, zanamivir)',
      prevention: 'Annual flu vaccination, hand hygiene, avoid close contact with sick people',
      when_to_see_doctor: 'If symptoms worsen or persist beyond 7 days, high fever, difficulty breathing'
    },
    {
      id: 'cold',
      name: 'Common Cold',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection of the upper respiratory tract',
      symptoms: ['runny nose', 'sneezing', 'sore throat', 'mild cough', 'congestion'],
      causes: ['Rhinoviruses and other viruses', 'Person-to-person transmission'],
      treatment: 'Rest, fluids, over-the-counter pain relievers, saline nasal sprays',
      prevention: 'Hand hygiene, avoid close contact with sick people',
      when_to_see_doctor: 'Usually resolves on its own, see doctor if severe or persistent symptoms'
    },
    {
      id: 'headache',
      name: 'Headache',
      category: 'Neurological Diseases',
      subcategory: 'Primary Headaches',
      definition: 'Pain in the head or upper neck region',
      symptoms: ['pain in head', 'sensitivity to light', 'nausea', 'throbbing pain'],
      causes: ['Tension, migraine, cluster headaches, stress, dehydration'],
      treatment: 'Rest, pain relievers (ibuprofen, acetaminophen), stress management',
      prevention: 'Stay hydrated, manage stress, maintain good sleep, regular exercise',
      when_to_see_doctor: 'If severe, persistent, or accompanied by neurological symptoms'
    },

    // 1. Infectious (Communicable) Diseases
    // Bacterial Diseases
    {
      id: 'tuberculosis',
      name: 'Tuberculosis (TB)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'Tuberculosis is a potentially serious infectious disease that mainly affects the lungs. It is caused by the bacterium Mycobacterium tuberculosis and spreads through the air when people with active TB cough, sneeze, or spit.',
      symptoms: ['persistent cough lasting 3 weeks or more', 'coughing up blood or sputum', 'chest pain', 'fatigue', 'weight loss', 'loss of appetite', 'night sweats', 'fever', 'chills'],
      causes: ['Mycobacterium tuberculosis bacteria', 'Airborne transmission from infected person', 'Weakened immune system', 'Close contact with TB patients', 'Overcrowding, poor ventilation'],
      treatment: ['Combination antibiotic therapy for 6-9 months (isoniazid, rifampin, ethambutol, pyrazinamide)', 'Directly observed therapy (DOT) to ensure compliance', 'Treatment of latent TB with isoniazid for 9 months'],
      prevention: ['BCG vaccination in high-risk areas', 'Early detection and treatment of active cases', 'Good ventilation, avoid overcrowding', 'TB screening for high-risk groups', 'Infection control measures in healthcare settings'],
      when_to_see_doctor: 'Persistent cough lasting more than 3 weeks, unexplained weight loss, night sweats, fever, chest pain, coughing up blood'
    },
    {
      id: 'cholera',
      name: 'Cholera',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'An acute diarrheal illness caused by Vibrio cholerae bacteria',
      symptoms: ['severe watery diarrhea', 'vomiting', 'rapid dehydration', 'muscle cramps'],
      causes: ['Vibrio cholerae bacteria', 'Contaminated water and food'],
      treatment: 'Oral rehydration solution, intravenous fluids, antibiotics (doxycycline, azithromycin)',
      prevention: 'Safe water supply, proper sanitation, cholera vaccine',
      when_to_see_doctor: 'Severe diarrhea and vomiting, signs of dehydration'
    },
    {
      id: 'typhoid',
      name: 'Typhoid Fever',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A bacterial infection caused by Salmonella typhi',
      symptoms: ['high fever', 'headache', 'abdominal pain', 'weakness', 'loss of appetite', 'rash'],
      causes: ['Salmonella typhi bacteria', 'Contaminated food and water'],
      treatment: 'Antibiotics (cefixime, azithromycin, ciprofloxacin), supportive care',
      prevention: 'Typhoid vaccine, safe food and water practices',
      when_to_see_doctor: 'High fever with abdominal symptoms, especially if traveling to endemic areas'
    },
    {
      id: 'pneumonia',
      name: 'Pneumonia',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'Inflammation of the lung alveoli usually caused by infection',
      symptoms: ['cough', 'fever', 'chills', 'shortness of breath', 'chest pain', 'fatigue'],
      causes: ['Streptococcus pneumoniae, Haemophilus influenzae, viruses, fungi'],
      treatment: 'Antibiotics (amoxicillin, azithromycin), oxygen therapy, rest',
      prevention: 'Pneumococcal vaccine, influenza vaccine, good hygiene',
      when_to_see_doctor: 'Difficulty breathing, high fever, chest pain'
    },
    {
      id: 'diphtheria',
      name: 'Diphtheria',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A serious bacterial infection caused by Corynebacterium diphtheriae',
      symptoms: ['sore throat', 'fever', 'swollen glands', 'difficulty breathing', 'nasal discharge'],
      causes: ['Corynebacterium diphtheriae bacteria', 'Person-to-person transmission'],
      treatment: 'Antitoxin, antibiotics (penicillin, erythromycin)',
      prevention: 'Diphtheria vaccine (DTaP), booster shots',
      when_to_see_doctor: 'Severe sore throat with difficulty breathing'
    },
    {
      id: 'tetanus',
      name: 'Tetanus',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A serious bacterial infection caused by Clostridium tetani',
      symptoms: ['muscle stiffness', 'spasms', 'lockjaw', 'difficulty swallowing', 'fever'],
      causes: ['Clostridium tetani bacteria', 'Wound contamination'],
      treatment: 'Tetanus antitoxin, antibiotics, muscle relaxants, wound care',
      prevention: 'Tetanus vaccine (DTaP), booster every 10 years',
      when_to_see_doctor: 'Wound with signs of infection, muscle stiffness'
    },
    {
      id: 'leprosy',
      name: 'Leprosy (Hansen\'s Disease)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A chronic infectious disease caused by Mycobacterium leprae',
      symptoms: ['skin lesions', 'numbness', 'muscle weakness', 'eye problems'],
      causes: ['Mycobacterium leprae bacteria', 'Prolonged close contact with infected person'],
      treatment: 'Multidrug therapy (dapsone, rifampicin, clofazimine) for 6-12 months',
      prevention: 'Early diagnosis and treatment, contact tracing',
      when_to_see_doctor: 'Skin lesions that don\'t heal, numbness in hands/feet'
    },
    {
      id: 'plague',
      name: 'Plague',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A serious bacterial infection caused by Yersinia pestis',
      symptoms: ['fever', 'chills', 'weakness', 'swollen lymph nodes', 'cough', 'shortness of breath'],
      causes: ['Yersinia pestis bacteria', 'Flea bites, contact with infected animals'],
      treatment: 'Antibiotics (streptomycin, gentamicin, doxycycline)',
      prevention: 'Flea control, avoid contact with wild rodents',
      when_to_see_doctor: 'High fever with swollen lymph nodes'
    },
    {
      id: 'pertussis',
      name: 'Whooping Cough (Pertussis)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A highly contagious respiratory infection caused by Bordetella pertussis',
      symptoms: ['severe coughing fits', 'whooping sound', 'vomiting', 'exhaustion'],
      causes: ['Bordetella pertussis bacteria', 'Person-to-person transmission'],
      treatment: 'Antibiotics (azithromycin, erythromycin), supportive care',
      prevention: 'Pertussis vaccine (DTaP), booster shots',
      when_to_see_doctor: 'Severe coughing spells, especially in infants'
    },
    {
      id: 'gonorrhea',
      name: 'Gonorrhea',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A sexually transmitted bacterial infection caused by Neisseria gonorrhoeae',
      symptoms: ['painful urination', 'discharge', 'pelvic pain', 'testicular pain'],
      causes: ['Neisseria gonorrhoeae bacteria', 'Sexual contact'],
      treatment: 'Antibiotics (ceftriaxone plus azithromycin)',
      prevention: 'Safe sex practices, condom use',
      when_to_see_doctor: 'Painful urination, abnormal discharge'
    },
    {
      id: 'syphilis',
      name: 'Syphilis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Bacterial Diseases',
      definition: 'A sexually transmitted infection caused by Treponema pallidum',
      symptoms: ['chancre sore', 'rash', 'fever', 'fatigue', 'hair loss'],
      causes: ['Treponema pallidum bacteria', 'Sexual contact'],
      treatment: 'Penicillin injections',
      prevention: 'Safe sex practices, condom use',
      when_to_see_doctor: 'Genital sores, unexplained rash'
    },

    // Viral Diseases
    {
      id: 'covid19',
      name: 'COVID-19',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A respiratory illness caused by SARS-CoV-2 virus',
      symptoms: ['fever', 'cough', 'fatigue', 'loss of taste/smell', 'shortness of breath'],
      causes: ['SARS-CoV-2 virus', 'Person-to-person transmission'],
      treatment: 'Supportive care, antiviral medications, oxygen therapy',
      prevention: 'COVID-19 vaccination, masks, social distancing',
      when_to_see_doctor: 'Difficulty breathing, persistent chest pain'
    },
    {
      id: 'hepatitis_a',
      name: 'Hepatitis A',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that affects the liver',
      symptoms: ['fatigue', 'nausea', 'abdominal pain', 'jaundice', 'dark urine'],
      causes: ['Hepatitis A virus', 'Contaminated food/water, person-to-person contact'],
      treatment: 'Supportive care, rest, adequate nutrition',
      prevention: 'Hepatitis A vaccine, good hygiene',
      when_to_see_doctor: 'Jaundice, severe abdominal pain'
    },
    {
      id: 'hepatitis_b',
      name: 'Hepatitis B',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that can cause chronic liver disease',
      symptoms: ['fatigue', 'jaundice', 'abdominal pain', 'loss of appetite', 'joint pain'],
      causes: ['Hepatitis B virus', 'Blood contact, sexual contact, mother-to-child'],
      treatment: 'Antiviral medications (tenofovir, entecavir), interferon',
      prevention: 'Hepatitis B vaccine, safe sex practices',
      when_to_see_doctor: 'Jaundice, unexplained fatigue'
    },
    {
      id: 'hepatitis_c',
      name: 'Hepatitis C',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that can lead to chronic liver disease',
      symptoms: ['fatigue', 'jaundice', 'abdominal pain', 'nausea'],
      causes: ['Hepatitis C virus', 'Blood contact, shared needles'],
      treatment: 'Direct-acting antiviral medications',
      prevention: 'Avoid sharing needles, safe sex practices',
      when_to_see_doctor: 'Jaundice, abnormal liver function tests'
    },
    {
      id: 'dengue',
      name: 'Dengue',
      category: 'Infectious',
      subcategory: 'Viral Disease',
      definition: 'Dengue is a viral infection transmitted by Aedes mosquitoes.',
      symptoms: ['high fever', 'severe headache', 'joint pain', 'rash', 'bleeding'],
      causes: ['Dengue virus'],
      treatment: 'Supportive care, pain relievers, fluid replacement',
      prevention: 'Avoid mosquito bites, use repellents, eliminate stagnant water',
      when_to_see_doctor: 'Severe symptoms, signs of bleeding'
    },
    {
      id: 'zika',
      name: 'Zika Virus',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A mosquito-borne viral infection',
      symptoms: ['fever', 'rash', 'joint pain', 'conjunctivitis', 'headache'],
      causes: ['Zika virus', 'Aedes mosquito bites'],
      treatment: 'Supportive care, rest, fluids',
      prevention: 'Mosquito control, insect repellent',
      when_to_see_doctor: 'Severe symptoms, especially during pregnancy'
    },
    {
      id: 'ebola',
      name: 'Ebola Virus Disease',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A severe viral hemorrhagic fever',
      symptoms: ['fever', 'severe headache', 'muscle pain', 'weakness', 'bleeding'],
      causes: ['Ebola virus', 'Contact with infected body fluids'],
      treatment: 'Supportive care, experimental treatments',
      prevention: 'Avoid contact with infected persons/animals',
      when_to_see_doctor: 'High fever with bleeding symptoms'
    },
    {
      id: 'rabies',
      name: 'Rabies',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that affects the central nervous system',
      symptoms: ['fever', 'headache', 'confusion', 'agitation', 'hydrophobia'],
      causes: ['Rabies virus', 'Animal bites, scratches'],
      treatment: 'Rabies vaccine, rabies immunoglobulin',
      prevention: 'Rabies vaccination for pets, post-exposure prophylaxis',
      when_to_see_doctor: 'Animal bite, especially from wild animals'
    },
    {
      id: 'measles',
      name: 'Measles',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A highly contagious viral infection',
      symptoms: ['fever', 'cough', 'runny nose', 'rash', 'red eyes'],
      causes: ['Measles virus', 'Person-to-person transmission'],
      treatment: 'Supportive care, vitamin A supplementation',
      prevention: 'Measles vaccine (MMR)',
      when_to_see_doctor: 'High fever with rash'
    },
    {
      id: 'mumps',
      name: 'Mumps',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that causes swelling of salivary glands',
      symptoms: ['swollen salivary glands', 'fever', 'headache', 'muscle pain'],
      causes: ['Mumps virus', 'Person-to-person transmission'],
      treatment: 'Supportive care, pain relievers',
      prevention: 'Mumps vaccine (MMR)',
      when_to_see_doctor: 'Severe swelling, testicular pain'
    },
    {
      id: 'chickenpox',
      name: 'Chickenpox (Varicella)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection causing itchy rash',
      symptoms: ['itchy rash', 'fever', 'fatigue', 'loss of appetite'],
      causes: ['Varicella-zoster virus', 'Person-to-person transmission'],
      treatment: 'Antiviral medications (acyclovir), antihistamines for itching',
      prevention: 'Varicella vaccine',
      when_to_see_doctor: 'High fever, signs of complications'
    },
    {
      id: 'polio',
      name: 'Poliomyelitis (Polio)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Viral Diseases',
      definition: 'A viral infection that can cause paralysis',
      symptoms: ['fever', 'fatigue', 'headache', 'stiff neck', 'muscle weakness'],
      causes: ['Poliovirus', 'Person-to-person transmission'],
      treatment: 'Supportive care, physical therapy',
      prevention: 'Polio vaccine (OPV/IPV)',
      when_to_see_doctor: 'Muscle weakness, paralysis'
    },

    // Fungal Diseases
    {
      id: 'ringworm',
      name: 'Ringworm (Tinea)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Fungal Diseases',
      definition: 'A fungal infection of the skin, hair, or nails',
      symptoms: ['itchy circular rash', 'scaly skin', 'hair loss'],
      causes: ['Dermatophyte fungi', 'Person-to-person contact, contaminated objects'],
      treatment: 'Antifungal creams (terbinafine, clotrimazole), oral antifungals',
      prevention: 'Good hygiene, avoid sharing personal items',
      when_to_see_doctor: 'Widespread infection, no improvement with OTC treatments'
    },
    {
      id: 'athletes_foot',
      name: 'Athlete\'s Foot (Tinea Pedis)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Fungal Diseases',
      definition: 'A fungal infection of the feet',
      symptoms: ['itching', 'burning', 'cracked skin', 'blisters'],
      causes: ['Trichophyton fungi', 'Warm, moist environments'],
      treatment: 'Antifungal creams, powders, keeping feet dry',
      prevention: 'Wear sandals in public showers, keep feet dry',
      when_to_see_doctor: 'Severe infection, diabetes present'
    },
    {
      id: 'candidiasis',
      name: 'Candidiasis (Yeast Infection)',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Fungal Diseases',
      definition: 'A fungal infection caused by Candida species',
      symptoms: ['itching', 'redness', 'white discharge', 'burning'],
      causes: ['Candida albicans', 'Imbalance in normal flora'],
      treatment: 'Antifungal medications (fluconazole, nystatin)',
      prevention: 'Good hygiene, avoid irritants',
      when_to_see_doctor: 'Recurrent infections, severe symptoms'
    },
    {
      id: 'aspergillosis',
      name: 'Aspergillosis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Fungal Diseases',
      definition: 'A fungal infection caused by Aspergillus species',
      symptoms: ['cough', 'fever', 'chest pain', 'shortness of breath'],
      causes: ['Aspergillus fungi', 'Inhaled spores'],
      treatment: 'Antifungal medications (voriconazole, itraconazole)',
      prevention: 'Avoid moldy environments, good ventilation',
      when_to_see_doctor: 'Respiratory symptoms in immunocompromised patients'
    },
    {
      id: 'histoplasmosis',
      name: 'Histoplasmosis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Fungal Diseases',
      definition: 'A fungal infection caused by Histoplasma capsulatum',
      symptoms: ['fever', 'cough', 'fatigue', 'chest pain'],
      causes: ['Histoplasma capsulatum', 'Inhaled spores from bird/bat droppings'],
      treatment: 'Antifungal medications (itraconazole)',
      prevention: 'Avoid areas with bird/bat droppings',
      when_to_see_doctor: 'Respiratory symptoms after exposure to bird droppings'
    },

    // Parasitic Diseases
    {
      id: 'malaria',
      name: 'Malaria',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'A mosquito-borne parasitic infection',
      symptoms: ['fever', 'chills', 'headache', 'muscle pain', 'fatigue'],
      causes: ['Plasmodium parasites', 'Anopheles mosquito bites'],
      treatment: 'Antimalarial drugs (artemisinin-based combinations)',
      prevention: 'Mosquito nets, insect repellent, prophylactic medications',
      when_to_see_doctor: 'Fever after travel to endemic areas'
    },
    {
      id: 'amoebiasis',
      name: 'Amoebiasis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'An intestinal infection caused by Entamoeba histolytica',
      symptoms: ['diarrhea', 'abdominal pain', 'bloody stools', 'fever'],
      causes: ['Entamoeba histolytica parasite', 'Contaminated food/water'],
      treatment: 'Antiparasitic medications (metronidazole, paromomycin)',
      prevention: 'Safe water and food practices',
      when_to_see_doctor: 'Bloody diarrhea, severe abdominal pain'
    },
    {
      id: 'giardiasis',
      name: 'Giardiasis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'An intestinal infection caused by Giardia lamblia',
      symptoms: ['diarrhea', 'abdominal cramps', 'nausea', 'weight loss'],
      causes: ['Giardia lamblia parasite', 'Contaminated water'],
      treatment: 'Antiparasitic medications (metronidazole, tinidazole)',
      prevention: 'Safe water practices, good hygiene',
      when_to_see_doctor: 'Persistent diarrhea, dehydration'
    },
    {
      id: 'filariasis',
      name: 'Filariasis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'A parasitic infection caused by filarial worms',
      symptoms: ['swelling of limbs', 'fever', 'skin problems'],
      causes: ['Wuchereria bancrofti, Brugia malayi', 'Mosquito bites'],
      treatment: 'Antiparasitic drugs (diethylcarbamazine, albendazole)',
      prevention: 'Mosquito control, insect repellent',
      when_to_see_doctor: 'Limb swelling, fever'
    },
    {
      id: 'ascariasis',
      name: 'Ascariasis',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'An intestinal infection caused by Ascaris lumbricoides',
      symptoms: ['abdominal pain', 'nausea', 'vomiting', 'weight loss'],
      causes: ['Ascaris lumbricoides worms', 'Contaminated soil/food'],
      treatment: 'Antiparasitic medications (albendazole, mebendazole)',
      prevention: 'Good hygiene, proper sanitation',
      when_to_see_doctor: 'Severe abdominal pain, intestinal blockage'
    },
    {
      id: 'tapeworm',
      name: 'Tapeworm Infection',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'An intestinal infection caused by tapeworm parasites',
      symptoms: ['abdominal pain', 'nausea', 'weight loss', 'fatigue'],
      causes: ['Taenia species', 'Undercooked meat, contaminated food'],
      treatment: 'Antiparasitic medications (praziquantel, niclosamide)',
      prevention: 'Cook meat thoroughly, good hygiene',
      when_to_see_doctor: 'Persistent symptoms, visible worms in stool'
    },
    {
      id: 'sleeping_sickness',
      name: 'African Sleeping Sickness',
      category: 'Infectious (Communicable) Diseases',
      subcategory: 'Parasitic Diseases',
      definition: 'A parasitic infection affecting the central nervous system',
      symptoms: ['fever', 'headache', 'joint pain', 'confusion', 'sleep disturbances'],
      causes: ['Trypanosoma parasites', 'Tsetse fly bites'],
      treatment: 'Antiparasitic drugs (pentamidine, melarsoprol)',
      prevention: 'Avoid tsetse fly areas, insect repellent',
      when_to_see_doctor: 'Fever after travel to endemic areas'
    },

    // 2. Non-Communicable Diseases
    // Metabolic & Endocrine Diseases
    {
      id: 'diabetes_mellitus',
      name: 'Diabetes Mellitus',
      category: 'Non-Communicable Diseases',
      subcategory: 'Metabolic & Endocrine Diseases',
      definition: 'Diabetes mellitus is a chronic metabolic disorder characterized by elevated blood glucose levels due to insufficient insulin production, ineffective insulin utilization, or both.',
      symptoms: ['frequent urination', 'increased thirst', 'increased hunger', 'fatigue', 'slow-healing sores', 'frequent infections', 'blurred vision', 'tingling or numbness in hands or feet', 'unexplained weight loss'],
      causes: ['Type 1: Autoimmune destruction of pancreatic beta cells', 'Type 2: Insulin resistance and relative insulin deficiency', 'Genetic predisposition', 'Obesity', 'Sedentary lifestyle', 'Poor diet'],
      treatment: ['Type 1: Insulin therapy, blood glucose monitoring, healthy diet, regular exercise', 'Type 2: Oral medications, insulin if needed, lifestyle modifications, blood glucose monitoring'],
      prevention: 'Maintain healthy weight, regular physical activity, balanced diet, avoid smoking, regular health screenings',
      when_to_see_doctor: 'Persistent thirst and frequent urination, unexplained weight loss, fatigue, slow-healing wounds, blurred vision'
    },
    {
      id: 'thyroid_disorders',
      name: 'Thyroid Disorders',
      category: 'Non-Communicable Diseases',
      subcategory: 'Metabolic & Endocrine Diseases',
      definition: 'Disorders affecting thyroid gland function',
      symptoms: ['weight changes', 'fatigue', 'mood changes', 'temperature sensitivity'],
      causes: ['Autoimmune disorders, iodine deficiency, genetic factors'],
      treatment: 'Thyroid hormone replacement, antithyroid drugs',
      prevention: 'Iodine supplementation, regular check-ups',
      when_to_see_doctor: 'Unexplained weight changes, fatigue'
    },
    {
      id: 'obesity',
      name: 'Obesity',
      category: 'Non-Communicable Diseases',
      subcategory: 'Metabolic & Endocrine Diseases',
      definition: 'Excessive body fat accumulation that may impair health',
      symptoms: ['excessive weight', 'shortness of breath', 'joint pain'],
      causes: ['Poor diet, sedentary lifestyle, genetic factors'],
      treatment: 'Diet modification, exercise, behavioral therapy',
      prevention: 'Healthy eating, regular physical activity',
      when_to_see_doctor: 'BMI over 30, related health complications'
    },
    {
      id: 'gout',
      name: 'Gout',
      category: 'Non-Communicable Diseases',
      subcategory: 'Metabolic & Endocrine Diseases',
      definition: 'A form of arthritis caused by excess uric acid',
      symptoms: ['severe joint pain', 'swelling', 'redness', 'sudden attacks'],
      causes: ['High uric acid levels', 'Diet, genetics, medications'],
      treatment: 'NSAIDs, colchicine, uric acid-lowering drugs',
      prevention: 'Low-purine diet, maintain healthy weight',
      when_to_see_doctor: 'Sudden severe joint pain'
    },
    {
      id: 'metabolic_syndrome',
      name: 'Metabolic Syndrome',
      category: 'Non-Communicable Diseases',
      subcategory: 'Metabolic & Endocrine Diseases',
      definition: 'A cluster of conditions that increase cardiovascular risk',
      symptoms: ['abdominal obesity', 'high blood pressure', 'high blood sugar'],
      causes: ['Insulin resistance, obesity, sedentary lifestyle'],
      treatment: 'Lifestyle changes, medications for individual components',
      prevention: 'Healthy diet, regular exercise, weight management',
      when_to_see_doctor: 'Multiple risk factors present'
    },

    // Cardiovascular Diseases
    {
      id: 'hypertension',
      name: 'Hypertension (High Blood Pressure)',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Persistently elevated blood pressure',
      symptoms: ['usually asymptomatic', 'headache', 'dizziness'],
      causes: ['Genetics, poor diet, lack of exercise, stress'],
      treatment: 'Lifestyle changes, antihypertensive medications',
      prevention: 'Healthy diet, exercise, stress management, limit salt',
      when_to_see_doctor: 'Blood pressure readings consistently above 140/90'
    },
    {
      id: 'coronary_artery_disease',
      name: 'Coronary Artery Disease',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Narrowing of coronary arteries due to plaque buildup',
      symptoms: ['chest pain', 'shortness of breath', 'fatigue'],
      causes: ['Atherosclerosis, high cholesterol, hypertension'],
      treatment: 'Medications, angioplasty, coronary bypass surgery',
      prevention: 'Healthy diet, exercise, smoking cessation',
      when_to_see_doctor: 'Chest pain, especially during exertion'
    },
    {
      id: 'heart_attack',
      name: 'Heart Attack (Myocardial Infarction)',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Death of heart muscle due to blocked blood flow',
      symptoms: ['chest pain', 'shortness of breath', 'nausea', 'sweating'],
      causes: ['Coronary artery blockage', 'Blood clot'],
      treatment: 'Emergency angioplasty, thrombolytics, medications',
      prevention: 'Healthy lifestyle, manage risk factors',
      when_to_see_doctor: 'Chest pain lasting more than a few minutes'
    },
    {
      id: 'stroke',
      name: 'Stroke',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Interruption of blood flow to the brain',
      symptoms: ['sudden weakness', 'confusion', 'trouble speaking', 'dizziness'],
      causes: ['Blood clot, bleeding in brain, narrowed arteries'],
      treatment: 'Thrombolytics, blood pressure management, rehabilitation',
      prevention: 'Control hypertension, healthy diet, exercise',
      when_to_see_doctor: 'Sudden neurological symptoms'
    },
    {
      id: 'atherosclerosis',
      name: 'Atherosclerosis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Buildup of plaque in artery walls',
      symptoms: ['usually asymptomatic until advanced', 'chest pain', 'leg pain'],
      causes: ['High cholesterol, hypertension, smoking, diabetes'],
      treatment: 'Statins, lifestyle changes, angioplasty',
      prevention: 'Healthy diet, exercise, smoking cessation',
      when_to_see_doctor: 'Symptoms of cardiovascular disease'
    },
    {
      id: 'heart_failure',
      name: 'Heart Failure',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Heart\'s inability to pump blood effectively',
      symptoms: ['shortness of breath', 'fatigue', 'swelling', 'rapid heartbeat'],
      causes: ['Coronary artery disease, hypertension, valve problems'],
      treatment: 'Medications, lifestyle changes, devices',
      prevention: 'Manage underlying conditions, healthy lifestyle',
      when_to_see_doctor: 'Shortness of breath, swelling'
    },
    {
      id: 'arrhythmia',
      name: 'Arrhythmia',
      category: 'Non-Communicable Diseases',
      subcategory: 'Cardiovascular Diseases',
      definition: 'Irregular heartbeat rhythm',
      symptoms: ['palpitations', 'dizziness', 'fainting', 'chest pain'],
      causes: ['Heart disease, electrolyte imbalance, medications'],
      treatment: 'Medications, cardioversion, pacemaker',
      prevention: 'Healthy lifestyle, manage underlying conditions',
      when_to_see_doctor: 'Irregular heartbeat, dizziness'
    },

    // Respiratory Diseases
    {
      id: 'asthma',
      name: 'Asthma',
      category: 'Non-Communicable Diseases',
      subcategory: 'Respiratory Diseases',
      definition: 'Chronic inflammatory disease of the airways',
      symptoms: ['wheezing', 'coughing', 'shortness of breath', 'chest tightness'],
      causes: ['Genetic factors, environmental triggers, allergies'],
      treatment: 'Inhaled corticosteroids, bronchodilators, avoid triggers',
      prevention: 'Avoid triggers, take medications as prescribed',
      when_to_see_doctor: 'Difficulty breathing, frequent symptoms'
    },
    {
      id: 'chronic_bronchitis',
      name: 'Chronic Bronchitis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Respiratory Diseases',
      definition: 'Long-term inflammation of the bronchi',
      symptoms: ['chronic cough', 'mucus production', 'shortness of breath'],
      causes: ['Smoking, air pollution, repeated infections'],
      treatment: 'Smoking cessation, bronchodilators, oxygen therapy',
      prevention: 'Avoid smoking, reduce air pollution exposure',
      when_to_see_doctor: 'Persistent cough, shortness of breath'
    },
    {
      id: 'emphysema',
      name: 'Emphysema',
      category: 'Non-Communicable Diseases',
      subcategory: 'Respiratory Diseases',
      definition: 'Damage to air sacs in lungs, part of COPD',
      symptoms: ['shortness of breath', 'chronic cough', 'wheezing'],
      causes: ['Smoking, air pollution, alpha-1 antitrypsin deficiency'],
      treatment: 'Smoking cessation, bronchodilators, oxygen therapy',
      prevention: 'Avoid smoking, reduce air pollution exposure',
      when_to_see_doctor: 'Progressive shortness of breath'
    },
    {
      id: 'copd',
      name: 'Chronic Obstructive Pulmonary Disease (COPD)',
      category: 'Non-Communicable Diseases',
      subcategory: 'Respiratory Diseases',
      definition: 'Progressive lung disease with airflow limitation',
      symptoms: ['chronic cough', 'shortness of breath', 'wheezing', 'chest tightness'],
      causes: ['Smoking, air pollution, occupational exposures'],
      treatment: 'Bronchodilators, corticosteroids, oxygen therapy, pulmonary rehabilitation',
      prevention: 'Smoking cessation, avoid pollutants',
      when_to_see_doctor: 'Chronic respiratory symptoms'
    },
    {
      id: 'lung_fibrosis',
      name: 'Idiopathic Pulmonary Fibrosis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Respiratory Diseases',
      definition: 'Scarring of lung tissue with unknown cause',
      symptoms: ['shortness of breath', 'dry cough', 'fatigue', 'weight loss'],
      causes: ['Unknown, possibly autoimmune or environmental factors'],
      treatment: 'Antifibrotic medications, oxygen therapy, lung transplant',
      prevention: 'Avoid environmental toxins, regular medical check-ups',
      when_to_see_doctor: 'Progressive shortness of breath'
    },

    // Digestive System Diseases
    {
      id: 'gastritis',
      name: 'Gastritis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'Inflammation of the stomach lining',
      symptoms: ['abdominal pain', 'nausea', 'vomiting', 'loss of appetite'],
      causes: ['H. pylori infection, NSAIDs, alcohol, stress'],
      treatment: 'Antacids, proton pump inhibitors, H. pylori eradication',
      prevention: 'Avoid irritants, manage stress',
      when_to_see_doctor: 'Persistent abdominal pain, vomiting blood'
    },
    {
      id: 'peptic_ulcer',
      name: 'Peptic Ulcer Disease',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'Sores in the lining of stomach or duodenum',
      symptoms: ['abdominal pain', 'bloating', 'nausea', 'vomiting'],
      causes: ['H. pylori infection, NSAIDs, acid excess'],
      treatment: 'Proton pump inhibitors, antibiotics for H. pylori',
      prevention: 'Avoid NSAIDs, treat H. pylori infection',
      when_to_see_doctor: 'Severe abdominal pain, vomiting blood'
    },
    {
      id: 'gerd',
      name: 'GERD (Gastroesophageal Reflux Disease)',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'A digestive disorder that occurs when acidic stomach juices or food and fluids back up from the stomach into the esophagus',
      symptoms: ['heartburn', 'regurgitation', 'chest pain', 'difficulty swallowing', 'chronic cough'],
      causes: ['Weak lower esophageal sphincter', 'Hiatal hernia', 'Obesity', 'Pregnancy'],
      treatment: 'Antacids, proton pump inhibitors, H2 blockers, lifestyle changes',
      prevention: 'Avoid trigger foods, eat smaller meals, don\'t lie down after eating',
      when_to_see_doctor: 'Frequent heartburn, difficulty swallowing, unexplained weight loss'
    },
    {
      id: 'ibs',
      name: 'Irritable Bowel Syndrome (IBS)',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'A common disorder that affects the large intestine, causing abdominal pain, bloating, and changes in bowel habits',
      symptoms: ['abdominal pain', 'bloating', 'gas', 'diarrhea', 'constipation'],
      causes: ['Abnormal muscle contractions in intestine', 'Nervous system issues', 'Infection', 'Stress'],
      treatment: 'Dietary changes, fiber supplements, antispasmodics, stress management',
      prevention: 'High-fiber diet, regular exercise, stress reduction',
      when_to_see_doctor: 'Severe abdominal pain, blood in stool, unexplained weight loss'
    },
    {
      id: 'crohns_disease',
      name: 'Crohn\'s Disease',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'A chronic inflammatory bowel disease that affects the lining of the digestive tract',
      symptoms: ['abdominal pain', 'diarrhea', 'fatigue', 'weight loss', 'fever'],
      causes: ['Autoimmune disorder', 'Genetic factors', 'Environmental factors'],
      treatment: 'Anti-inflammatory drugs, immunosuppressants, surgery',
      prevention: 'No known prevention, early diagnosis important',
      when_to_see_doctor: 'Persistent diarrhea, abdominal pain, blood in stool'
    },
    {
      id: 'ulcerative_colitis',
      name: 'Ulcerative Colitis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'A chronic inflammatory bowel disease that causes inflammation and ulcers in the colon and rectum',
      symptoms: ['diarrhea', 'abdominal pain', 'rectal bleeding', 'weight loss', 'fatigue'],
      causes: ['Autoimmune disorder', 'Genetic factors', 'Environmental triggers'],
      treatment: 'Anti-inflammatory drugs, immunosuppressants, surgery',
      prevention: 'No known prevention, manage triggers',
      when_to_see_doctor: 'Bloody diarrhea, severe abdominal pain'
    },
    {
      id: 'liver_cirrhosis',
      name: 'Liver Cirrhosis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'Late stage of scarring (fibrosis) of the liver caused by many forms of liver diseases and conditions',
      symptoms: ['fatigue', 'easy bruising', 'yellow skin', 'swelling', 'loss of appetite'],
      causes: ['Chronic alcohol abuse', 'Hepatitis B/C', 'Fatty liver disease', 'Autoimmune diseases'],
      treatment: 'Treat underlying cause, medications, liver transplant',
      prevention: 'Vaccination for hepatitis, limit alcohol, healthy diet',
      when_to_see_doctor: 'Jaundice, swelling, confusion'
    },
    {
      id: 'gallstones',
      name: 'Gallstones',
      category: 'Non-Communicable Diseases',
      subcategory: 'Digestive System Diseases',
      definition: 'Hardened deposits of digestive fluid that can form in the gallbladder',
      symptoms: ['sudden pain in upper right abdomen', 'back pain', 'nausea', 'vomiting'],
      causes: ['Cholesterol imbalance', 'Bilirubin excess', 'Gallbladder not emptying properly'],
      treatment: 'Pain medication, increased fluid intake, surgery to remove gallbladder',
      prevention: 'Healthy diet, maintain healthy weight',
      when_to_see_doctor: 'Severe abdominal pain, fever, jaundice'
    },
    {
      id: 'alzheimers_disease',
      name: 'Alzheimer\'s Disease',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'A progressive neurodegenerative disease that causes problems with memory, thinking and behavior',
      symptoms: ['memory loss', 'confusion', 'difficulty with familiar tasks', 'mood changes', 'difficulty communicating'],
      causes: ['Abnormal protein deposits in brain', 'Genetic factors', 'Age-related changes'],
      treatment: 'Medications to manage symptoms, supportive care',
      prevention: 'Healthy diet, regular exercise, mental stimulation',
      when_to_see_doctor: 'Progressive memory loss, confusion'
    },
    {
      id: 'parkinsons_disease',
      name: 'Parkinson\'s Disease',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'A progressive nervous system disorder that affects movement',
      symptoms: ['tremor', 'slowed movement', 'rigid muscles', 'impaired posture and balance', 'speech changes'],
      causes: ['Loss of dopamine-producing brain cells', 'Genetic factors', 'Environmental factors'],
      treatment: 'Medications, physical therapy, surgery',
      prevention: 'No known prevention, early diagnosis important',
      when_to_see_doctor: 'Tremor, difficulty with movement'
    },
    {
      id: 'epilepsy',
      name: 'Epilepsy',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'A neurological disorder marked by sudden recurrent episodes of sensory disturbance, loss of consciousness, or convulsions',
      symptoms: ['seizures', 'temporary confusion', 'staring spells', 'uncontrollable jerking movements'],
      causes: ['Abnormal brain activity', 'Brain injury', 'Genetic factors'],
      treatment: 'Antiseizure medications, surgery, lifestyle changes',
      prevention: 'Avoid triggers, take medications as prescribed',
      when_to_see_doctor: 'First seizure or recurrent seizures'
    },
    {
      id: 'migraine',
      name: 'Migraine',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'A neurological condition that can cause multiple symptoms',
      symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light and sound', 'aura'],
      causes: ['Genetic factors', 'Environmental triggers', 'Hormonal changes'],
      treatment: 'Pain relievers, triptans, preventive medications',
      prevention: 'Avoid triggers, stress management, regular sleep',
      when_to_see_doctor: 'Severe or frequent headaches'
    },
    {
      id: 'multiple_sclerosis',
      name: 'Multiple Sclerosis',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'An autoimmune disease that affects the central nervous system',
      symptoms: ['fatigue', 'difficulty walking', 'numbness', 'weakness', 'vision problems'],
      causes: ['Autoimmune attack on myelin', 'Genetic factors', 'Environmental factors'],
      treatment: 'Disease-modifying therapies, symptom management',
      prevention: 'No known prevention',
      when_to_see_doctor: 'Numbness, weakness, vision changes'
    },
    {
      id: 'brain_tumor',
      name: 'Brain Tumor',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neurological Diseases',
      definition: 'An abnormal growth of cells in the brain',
      symptoms: ['headaches', 'seizures', 'nausea', 'cognitive changes', 'personality changes'],
      causes: ['Genetic factors', 'Radiation exposure', 'Unknown causes'],
      treatment: 'Surgery, radiation therapy, chemotherapy',
      prevention: 'Avoid radiation exposure',
      when_to_see_doctor: 'Persistent headaches, seizures'
    },
    {
      id: 'cancer',
      name: 'Cancer',
      category: 'Non-Communicable Diseases',
      subcategory: 'Neoplasms',
      definition: 'Cancer is a group of diseases characterized by uncontrolled cell growth and spread. It can affect any part of the body and is caused by genetic mutations that allow cells to divide and grow uncontrollably.',
      symptoms: ['unexplained weight loss', 'fatigue', 'pain', 'lumps or thickening', 'changes in skin', 'changes in bowel or bladder habits', 'persistent cough', 'difficulty swallowing', 'unusual bleeding', 'fever'],
      causes: ['Genetic mutations', 'Environmental factors (radiation, chemicals)', 'Lifestyle factors (smoking, poor diet)', 'Infections (HPV, hepatitis)', 'Age-related changes'],
      treatment: ['Surgery to remove tumors', 'Chemotherapy to kill cancer cells', 'Radiation therapy to destroy cancer cells', 'Immunotherapy to boost immune response', 'Targeted therapy for specific mutations', 'Hormone therapy for hormone-sensitive cancers'],
      prevention: ['Avoid tobacco use', 'Maintain healthy weight', 'Regular physical activity', 'Healthy diet', 'Limit alcohol consumption', 'Protect skin from sun', 'Get vaccinated (HPV, hepatitis B)', 'Regular cancer screenings'],
      when_to_see_doctor: 'Unexplained symptoms persisting more than 2 weeks, unusual lumps, persistent pain, unexplained weight loss, changes in skin or moles'
    }
  ],
  medications: [
    {
      id: 'ibuprofen',
      name: 'Ibuprofen',
      purpose: 'Pain relief and fever reduction',
      dosage: '200-400mg every 4-6 hours (not to exceed 1200mg per day)',
      sideEffects: ['stomach upset', 'heartburn', 'dizziness'],
      interactions: 'May interact with blood thinners and certain other medications'
    },
    {
      id: 'acetaminophen',
      name: 'Acetaminophen',
      purpose: 'Pain relief and fever reduction',
      dosage: '500-1000mg every 4-6 hours (not to exceed 3000mg per day)',
      sideEffects: ['nausea', 'dizziness'],
      interactions: 'Avoid with other acetaminophen-containing products'
    }
  ],
  labTests: [
    {
      id: 'cbc',
      name: 'Complete Blood Count (CBC)',
      description: 'Measures red blood cells, white blood cells, and platelets',
      normal_range: 'Varies by test component',
      what_it_measures: 'Overall blood health'
    },
    {
      id: 'glucose',
      name: 'Glucose Test',
      description: 'Measures blood sugar levels',
      normal_range: 'Fasting: 70-100 mg/dL, Random: < 200 mg/dL',
      what_it_measures: 'Diabetes risk and blood sugar control'
    }
  ]
};

// GET - Get all conditions
router.get('/conditions', (req, res) => {
  try {
    res.json({
      success: true,
      conditions: medicalDatabase.conditions,
      count: medicalDatabase.conditions.length
    });
  } catch (error) {
    console.error('Get conditions error:', error);
    res.status(500).json({ error: 'Failed to retrieve conditions' });
  }
});

// GET - Get single condition
router.get('/conditions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const condition = medicalDatabase.conditions.find(c => c.id === id);

    if (!condition) {
      return res.status(404).json({ error: 'Condition not found' });
    }

    res.json({
      success: true,
      condition
    });
  } catch (error) {
    console.error('Get condition error:', error);
    res.status(500).json({ error: 'Failed to retrieve condition' });
  }
});

// GET - Get all medications
router.get('/medications', (req, res) => {
  try {
    res.json({
      success: true,
      medications: medicalDatabase.medications,
      count: medicalDatabase.medications.length
    });
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ error: 'Failed to retrieve medications' });
  }
});

// GET - Get single medication
router.get('/medications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const medication = medicalDatabase.medications.find(m => m.id === id);

    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({
      success: true,
      medication
    });
  } catch (error) {
    console.error('Get medication error:', error);
    res.status(500).json({ error: 'Failed to retrieve medication' });
  }
});

// GET - Get all lab tests
router.get('/lab-tests', (req, res) => {
  try {
    res.json({
      success: true,
      tests: medicalDatabase.labTests,
      count: medicalDatabase.labTests.length
    });
  } catch (error) {
    console.error('Get lab tests error:', error);
    res.status(500).json({ error: 'Failed to retrieve lab tests' });
  }
});

// GET - Get single lab test
router.get('/lab-tests/:id', (req, res) => {
  try {
    const { id } = req.params;
    const test = medicalDatabase.labTests.find(t => t.id === id);

    if (!test) {
      return res.status(404).json({ error: 'Lab test not found' });
    }

    res.json({
      success: true,
      test
    });
  } catch (error) {
    console.error('Get lab test error:', error);
    res.status(500).json({ error: 'Failed to retrieve lab test' });
  }
});

// POST - Search medical information
router.post('/search', (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const lowerQuery = query.toLowerCase();

    const results = {
      conditions: medicalDatabase.conditions.filter(c => 
        c.name.toLowerCase().includes(lowerQuery) ||
        c.symptoms.some(s => s.toLowerCase().includes(lowerQuery))
      ),
      medications: medicalDatabase.medications.filter(m =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.purpose.toLowerCase().includes(lowerQuery)
      ),
      tests: medicalDatabase.labTests.filter(t =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.description.toLowerCase().includes(lowerQuery)
      )
    };

    res.json({
      success: true,
      query,
      results,
      totalResults: results.conditions.length + results.medications.length + results.tests.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search medical information' });
  }
});

export default router;
