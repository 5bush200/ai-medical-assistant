import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for demo (replace with database in production)
const chatSessions = new Map();

// Medical knowledge base for responses
const medicalResponses = {
  'symptoms': "Common symptoms can vary. Please describe your symptoms in detail (onset, duration, severity, associated symptoms) and I can provide general health information. Always consult a healthcare professional for diagnosis and treatment.",
  'medication': "I can provide general information about common medications. For specific dosing, interactions, or changes to prescriptions, consult your prescriber or pharmacist.",
  'appointment': "I can help you understand appointment scheduling and preparation. Contact your local clinic or use their online portal to book specifics.",
  'lab results': "Lab results should be reviewed with your healthcare provider. I can explain common findings in general terms but cannot provide a definitive interpretation.",
  'prevention': "Preventive care includes vaccinations, healthy diet, regular exercise, adequate sleep, hand hygiene, and routine screenings appropriate for age and risk factors.",
  'healthy living': "A healthy lifestyle includes balanced nutrition, regular physical activity, staying hydrated, managing stress, avoiding tobacco, limiting alcohol, and keeping up with preventive care.",
  'fever': "Fever is a rise in body temperature often due to infection. Symptoms: sweating, chills, body aches, headache. Home care: rest, fluids, paracetamol/ibuprofen as directed, cool compresses. Seek urgent care for: very high fever (≥40°C), fever with stiff neck, confusion, difficulty breathing, persistent fever >72 hours, or in infants/elderly at provider discretion. This is educational only.",
  'headache': "Headaches have many causes (tension, migraine, dehydration, infection, eye strain). Symptoms vary by type. Home care: rest in a quiet dark room, hydrate, cold/warm compress, OTC analgesics (paracetamol/ibuprofen) as directed. Seek care for sudden severe headache, neurological signs (vision changes, weakness), fever with stiff neck, or new/unusual pattern.",
  'cough': "Cough causes: viral infections, bronchitis, pneumonia, asthma, reflux, allergies. Symptoms: productive (phlegm) vs dry. Home care: fluids, honey (age >1), humidifier, lozenges, avoid smoke. See provider for high fever, shortness of breath, blood in sputum, or cough >3 weeks.",
  'cold': "Common cold is viral. Symptoms: runny/stuffy nose, sore throat, cough, sneezing, mild fatigue. Home care: rest, fluids, saline nasal rinse, warm salt gargles, decongestants if appropriate. Prevent with hand hygiene and avoiding close contact with sick people.",
  'sore throat': "Causes: viral, bacterial (strep), allergies, reflux. Symptoms: throat pain, difficulty swallowing, swollen glands. Home care: saltwater gargles, lozenges, hydration, analgesics. Seek care for severe pain, high fever, drooling, difficulty breathing, or signs of bacterial infection (refer for testing and possible antibiotics).",
  'diarrhea': "Causes: viral gastroenteritis, food poisoning, medications, intolerances. Symptoms: loose stools, cramping, sometimes fever. Home care: oral rehydration, BRAT/bland diet, avoid dairy/alcohol/caffeine, probiotic may help. Seek care for severe dehydration, bloody stools, high fever, or symptoms lasting >48-72 hours.",
  'nausea': "Causes: gastroenteritis, meds, pregnancy, migraine, anxiety. Home care: small bland meals, ginger or peppermint, sip clear fluids, rest. Seek care for persistent vomiting, signs of dehydration, severe abdominal pain, or blood in vomit.",
  'allergies': "Allergic rhinitis or food/venom allergies cause sneezing, itching, hives, swelling, GI upset. Home care: avoid known triggers, OTC antihistamines (cetirizine, loratadine), nasal corticosteroid sprays for nasal symptoms. Seek immediate care for signs of anaphylaxis (difficulty breathing, throat tightness, swelling) and use epinephrine if prescribed.",
  'fatigue': "Causes: poor sleep, anemia, thyroid disease, depression, chronic illness, medications. Home care: sleep hygiene, balanced diet, regular activity, treat underlying causes. Seek evaluation if persistent, with weight loss, night sweats, or other concerning symptoms.",
  'back pain': "Causes: muscle strain, disc problems, arthritis, poor ergonomics. Home care: short rest, gradual return to movement, heat/ice, analgesics, gentle stretching, core strengthening. Seek care for severe pain, numbness/weakness in legs, or bowel/bladder dysfunction.",
  'insomnia': "Difficulty falling or staying asleep. Home care: sleep hygiene, consistent schedule, limit screens before bed, caffeine avoidance, relaxation techniques. Consider CBT-I or medical review for persistent cases.",
  'anxiety': "Excessive worry, panic, physical symptoms like palpitations. Home care: breathing exercises, regular exercise, sleep, limit stimulants, discuss with trusted person. Seek care for persistent impairment, suicidal thoughts, or panic attacks—therapy and medications can help.",
  'blood pressure': "Hypertension often has no symptoms but increases risk for heart disease and stroke. Home care: reduce salt, follow DASH-style diet, exercise, weight loss, limit alcohol, stop smoking. Regular BP checks and follow-up for medication if needed.",
  'diabetes': "Type 1: autoimmune, requires insulin. Type 2: related to lifestyle and genetics. Symptoms: increased thirst, urination, fatigue, blurred vision, slow wound healing. Management: blood glucose monitoring, diet, exercise, medications, insulin as needed, routine screening for complications.",
  'indigestion': "Dyspepsia/heartburn causes: overeating, fatty/spicy foods, reflux. Home care: smaller meals, avoid triggers, antacids, elevate head at night, avoid late meals. Seek care for weight loss, GI bleeding, or difficulty swallowing.",
  'asthma': "Chronic airway inflammation causing wheeze, cough, breathlessness. Triggers: allergens, exercise, infections. Management: prescribed inhalers (short-acting bronchodilator for relief, inhaled steroid for control), avoid triggers, have an action plan. Seek urgent care for severe shortness of breath or blue lips/face.",
  'pneumonia': "Lung infection—symptoms include cough, fever, chest pain, difficulty breathing. Home care: rest, fluids; bacterial cases require antibiotics prescribed by a provider. Seek urgent care for high fever, low oxygen, or rapid breathing. Vaccination prevents some types.",
  'bronchitis': "Inflammation of bronchial tubes causing cough and sputum. Often viral—supportive care: fluids, rest, humidifier, avoid smoke. See provider if high fever, bloody sputum, or prolonged cough.",
  'urinary tract infection': "UTI symptoms: burning with urination, frequency, urgency, lower abdominal pain. Home care: fluids; see provider for testing and antibiotics if bacterial UTI is suspected. Untreated UTI can progress to kidney infection.",
  'ear infection': "Ear pain, reduced hearing, fever; otitis media (middle ear) common in children. Home care: pain relief, warm compress; seek care for persistent fever, severe pain, drainage, or in infants.",
  'sinusitis': "Sinus infection—facial pain/pressure, nasal congestion, thick nasal discharge. Home care: saline rinses, steam, nasal steroid sprays, analgesics. See provider for symptoms >10 days, severe facial pain, or vision changes.",
  'skin infection': "Cellulitis or bacterial skin infection—redness, warmth, swelling, pain. Keep area clean and seek evaluation; antibiotics may be needed. Seek urgent care for rapidly spreading infection or systemic symptoms.",
  'eczema': "Itchy, dry, inflamed skin. Management: emollients, avoid triggers, topical corticosteroids for flares. Seek care for signs of skin infection or uncontrolled symptoms.",
  'acne': "Comedones, papules, pustules on face/back. Home care: gentle cleansing, topical OTC treatments (benzoyl peroxide, salicylic acid). Severe acne may need prescription therapy.",
  'hives': "Raised itchy welts from allergic or unknown triggers. Home care: antihistamines, avoid triggers. Seek urgent care for facial/throat swelling or breathing difficulty.",
  'appendicitis': "Periumbilical pain migrating to right lower abdomen, fever, nausea. Suspected appendicitis is a surgical emergency—seek immediate care.",
  'kidney stones': "Severe flank pain radiating to groin, blood in urine, nausea/vomiting. Home care: fluids and pain control; see provider for imaging and possible procedures if large or obstructing.",
  'gastroenteritis': "Viral/bacterial stomach flu—vomiting, diarrhea, cramps. Home care: oral rehydration, rest, gradual refeeding. Seek care for dehydration, bloody diarrhea, or severe pain.",
  'gerd': "Gastroesophageal reflux—heartburn, regurgitation. Home care: smaller meals, avoid triggers, elevate head, antacids or PPI for persistent symptoms. Seek care for progressive symptoms or difficulty swallowing.",
  'peptic ulcer': "Burning epigastric pain, possible bleeding. Causes include H. pylori and NSAIDs. Seek care for black stools, vomiting blood, or severe pain. Treatment depends on cause.",
  'hepatitis': "Liver inflammation—fatigue, jaundice, abdominal pain, dark urine. Evaluate liver tests; treatment depends on cause (viral, alcohol, autoimmune).",
  'anemia': "Fatigue, pallor, shortness of breath. Causes include iron or B12 deficiency. Management: investigate cause; iron or vitamin replacement as indicated.",
  'stroke': "Sudden neurological signs—face droop, arm weakness, speech difficulty (FAST). Emergency—call emergency services immediately.",
  'heart attack': "Chest pain/pressure, arm/jaw pain, breathlessness, sweating, nausea. Emergency—call emergency services immediately.",
  'copd': "Chronic cough, breathlessness, sputum production. Management: smoking cessation, bronchodilators, inhaled steroids, pulmonary rehab. Seek care for acute worsening.",
  'conjunctivitis': "Red eye, discharge, itching. Home care: hygiene, warm compress; seek care for severe pain, vision changes, or newborn eye discharge.",
  'yeast infection': "Vaginal itching and cottage-cheese discharge. OTC antifungals help; see provider if recurrent or uncertain.",
  'menstrual cramps': "Cramping during menses. Home care: NSAIDs, heat, exercise. Seek care for very heavy bleeding or severe unrelieved pain.",
  'influenza': "Flu—fever, body aches, cough, fatigue. Home care: rest, fluids; antivirals for high-risk individuals if within treatment window. Annual vaccination recommended.",
  'covid-19': "Fever, cough, loss of taste/smell, fatigue. Test if suspected, isolate per guidance, supportive care for mild cases; seek care for breathing difficulty or persistent high fever.",
  'cancer': "Cancer is a group of diseases characterized by uncontrolled cell growth and spread. Symptoms vary by type and location. Common signs include unexplained weight loss, fatigue, pain, lumps, or changes in skin. Diagnosis requires medical evaluation including imaging, biopsies, and lab tests. Treatment options include surgery, chemotherapy, radiation, immunotherapy, or targeted therapies. Early detection and treatment are crucial. This is educational only; consult healthcare professionals for diagnosis and treatment.",
  'dengue': "Dengue is a viral infection transmitted by Aedes mosquitoes. Symptoms: high fever, severe headache, joint pain, rash, bleeding. Home care: rest, fluids, pain relievers (avoid aspirin). Seek care for severe symptoms, signs of bleeding, or dehydration. Prevention: avoid mosquito bites, eliminate stagnant water.",
  'tuberculosis': "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. Symptoms: persistent cough lasting 3 weeks or more, coughing up blood or sputum, chest pain, fatigue, weight loss, night sweats, fever, chills. Treatment: combination antibiotic therapy for 6-9 months. Prevention: BCG vaccination, early detection and treatment. Seek care for persistent cough or unexplained weight loss.",
  'diabetes_mellitus': "Diabetes mellitus is a chronic metabolic disorder characterized by elevated blood glucose levels. Symptoms: frequent urination, increased thirst, increased hunger, fatigue, slow-healing sores, frequent infections, blurred vision, tingling or numbness. Management: blood glucose monitoring, diet, exercise, medications, insulin as needed. Seek care for persistent thirst, unexplained weight loss, or fatigue.",
  'hypertension': "Hypertension (high blood pressure) often has no symptoms but increases risk for heart disease and stroke. Home care: reduce salt intake, follow DASH-style diet, exercise, weight loss, limit alcohol, stop smoking. Regular BP checks and follow-up for medication if needed. Seek care for consistently high readings.",
  'cholera': "Cholera is a bacterial infection causing severe diarrhea and dehydration. Symptoms: watery diarrhea, vomiting, muscle cramps, rapid heart rate, low blood pressure. Home care: oral rehydration solution, rest. Seek immediate care for severe dehydration, rapid heartbeat, or confusion. Prevention: safe water, hygiene, vaccination in endemic areas.",
  'hiv': "HIV (Human Immunodeficiency Virus) attacks the immune system. Symptoms: flu-like illness, fatigue, swollen lymph nodes, recurrent infections. Management: antiretroviral therapy (ART), regular monitoring, healthy lifestyle. Prevention: safe sex practices, condom use, pre-exposure prophylaxis (PrEP), avoid sharing needles. Seek care for persistent symptoms or high-risk exposure.",
  'typhoid': "Typhoid fever is a bacterial infection caused by Salmonella typhi. Symptoms: high fever, headache, abdominal pain, constipation or diarrhea, rose-colored spots on the chest. Home care: rest, fluids, antibiotics as prescribed. Seek care for persistent fever, severe abdominal pain, or signs of complications. Prevention: vaccination, safe food and water practices.",
  'abdominal pain': "Abdominal pain can have many causes (appendicitis, gastroenteritis, kidney stones, ulcers, IBS). Symptoms vary by cause. Home care: rest, clear fluids, avoid heavy foods. Seek urgent care for severe pain, fever, vomiting blood, black stools, or signs of appendicitis (pain migrating to right lower abdomen).",
  'stomach pain': "Abdominal pain can have many causes (appendicitis, gastroenteritis, kidney stones, ulcers, IBS). Symptoms vary by cause. Home care: rest, clear fluids, avoid heavy foods. Seek urgent care for severe pain, fever, vomiting blood, black stools, or signs of appendicitis (pain migrating to right lower abdomen).",
  'default': "I can provide general information on many common conditions (causes, symptoms, home care, prevention). This information is educational only and not a substitute for professional medical advice. For urgent or severe symptoms (difficulty breathing, chest pain, sudden neurological changes, heavy bleeding, severe dehydration), seek emergency care immediately."
};

// POST - Send a message and get AI response
router.post('/send', (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const msgId = uuidv4();
    const timestamp = new Date().toISOString();

    // User message
    const userMsg = {
      id: msgId,
      text: message,
      sender: 'user',
      timestamp
    };

    // Generate AI response: use rule-based system
    const aiResponseText = getAIResponse(message);

    const aiMsg = {
      id: uuidv4(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date().toISOString()
    };

    // Initialize conversation if new
    if (!chatSessions.has(conversationId)) {
      chatSessions.set(conversationId, {
        id: conversationId,
        userId,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    const conversation = chatSessions.get(conversationId);
    conversation.messages.push(userMsg);
    conversation.messages.push(aiMsg);
    conversation.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      userMessage: userMsg,
      aiMessage: aiMsg,
      conversationId
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// GET - Retrieve conversation history
router.get('/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!chatSessions.has(conversationId)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const conversation = chatSessions.get(conversationId);
    res.json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
});

// Helper function to generate AI responses
function getAIResponse(userMessage) {
  const lowerMessage = (userMessage || '').toLowerCase().trim();
  const msg = lowerMessage;

  // Lightweight levenshtein distance for fuzzy matching
  function levenshtein(a, b) {
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,
          matrix[j][i - 1] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }
    return matrix[b.length][a.length];
  }

  function similarity(a, b) {
    if (!a || !b) return 0;
    const d = levenshtein(a, b);
    return 1 - d / Math.max(a.length, b.length);
  }

  // Quick direct variation handling
  if (msg.includes('vomit') || msg.includes('throwing up')) return medicalResponses['nausea'];
  if (msg.includes('covid') || msg.includes('coronavirus')) return medicalResponses['covid-19'];
  if (msg.includes('heart disease') || msg.includes('cardiac') || msg.includes('chest pain')) return medicalResponses['heart attack'];

  // Direct exact/substring matches first
  for (const [keyword, response] of Object.entries(medicalResponses)) {
    if (keyword === 'default') continue;
    if (msg.includes(keyword)) return response;
  }

  // Fuzzy match: find best key by token similarity
  const keys = Object.keys(medicalResponses).filter((k) => k !== 'default');
  const tokens = msg.split(/\W+/).filter(Boolean);
  let best = { key: null, score: 0 };
  for (const key of keys) {
    const keyWords = key.split(/\W+/).filter(Boolean);
    // compare each token to each keyWord, take best similarity
    let keyBest = 0;
    for (const kw of keyWords) {
      for (const tok of tokens) {
        const sim = similarity(kw, tok);
        if (sim > keyBest) keyBest = sim;
      }
    }
    if (keyBest > best.score) {
      best = { key, score: keyBest };
    }
  }

  // If we have a reasonably good fuzzy match, suggest/auto-correct
  if (best.score >= 0.65 && best.key) {
    return `Did you mean "${best.key}"?\n\n${medicalResponses[best.key]}`;
  }

  // Intent detection (treatment vs symptoms vs causes) on the original message
  const isTreatment = /\b(how to|how do i|treat|manage|cure|what to do|home remedy|remedy|take|dose|dosing)\b/.test(msg);
  const isSymptoms = /\b(symptom|symptoms|signs|feeling|feel|presenting)\b/.test(msg);

  if (isTreatment) {
    return "For general treatment guidance: rest, stay hydrated, use over-the-counter medications as appropriate (e.g., paracetamol/ibuprofen for fever/pain) and follow dosing instructions on the package. If symptoms are severe, worsening, or you are unsure, seek medical care. Provide more details (symptoms, duration, age, and any medical conditions) for a more specific recommendation. This information is for educational purposes only and is not a substitute for professional medical advice.";
  }

  if (isSymptoms) {
    return "Could you describe the symptoms in more detail (onset, duration, severity, associated symptoms like cough, rash, breathing difficulty)? With that information I can provide general guidance. This is informational only and not a substitute for professional medical advice.";
  }

  // If we reach here, it's health-related but not recognized
  return "I couldn't identify a specific condition from that message. Please rephrase, check spelling, or describe your symptoms (e.g., 'fever and cough', 'sharp abdominal pain'). I can only answer medical-related queries.";
}

export default router;
