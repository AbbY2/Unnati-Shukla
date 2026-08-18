// ─────────────────────────────────────────────────────────────
// Central content source for Unnati Retina Clinic
// Edit copy, links and data here — every section reads from this.
// ─────────────────────────────────────────────────────────────

export const clinic = {
  name: 'Unnati Retina Clinic',
  shortName: 'Unnati Retina',
  tagline: 'Advanced Retina Care',
  city: 'Ahmedabad',
  state: 'Gujarat',
  country: 'India',
  phone: '+91 78748 89197',
  phoneHref: 'tel:+917874889197',
  whatsapp: 'https://wa.me/917874889197',
  email: 'appointments@unnatiretina.clinic', // TODO: replace with real email
  addressLine: 'Ahmedabad, Gujarat, India',
  hours: 'Mon – Sat · 10:00 AM – 7:00 PM',
  mapEmbed:
    'https://www.google.com/maps?q=Unnati+Retina+Clinic+Ahmedabad&output=embed',
  mapLink: 'https://maps.app.goo.gl/cHdMWfTsKHoAtztW6',
} as const;

export const socials = {
  instagram: 'https://www.instagram.com/unnatiretinaclinic/',
  facebook: 'https://www.facebook.com/unnatishuklaretina/',
  kivihealth: 'https://kivihealth.com/clinic/unnati-retina-clinic',
  eyewiki: 'https://eyewiki.org/User:Unnati_shukla',
  maps: 'https://maps.app.goo.gl/cHdMWfTsKHoAtztW6',
} as const;

export const doctor = {
  name: 'Dr. Unnati Shukla Bharadwaj',
  role: 'Vitreoretinal Surgeon',
  quals: ['MS Ophthalmology', 'DNB Ophthalmology', 'Fellowship in Vitreoretinal Surgery'],
  expertise: [
    'Vitreoretinal Surgery',
    'Retinal Detachment Surgery',
    'Diabetic Eye Disease',
    'Medical Retina',
    'Surgical Retina',
    'OCT Guided Diagnosis',
    'Intravitreal Injections',
    'ROP Screening & Laser',
  ],
  timeline: [
    { year: 'MS', label: 'Master of Surgery', detail: 'Ophthalmology — foundational surgical training' },
    { year: 'DNB', label: 'Diplomate of National Board', detail: 'Ophthalmology — board certification' },
    { year: 'Fellowship', label: 'Vitreoretinal Surgery', detail: 'Sub-specialty training in medical & surgical retina' },
    { year: 'Now', label: 'Founder & Retina Specialist', detail: 'Unnati Retina Clinic, Ahmedabad' },
  ],
} as const;

export type Condition = {
  id: string;
  name: string;
  short: string;
  description: string;
  signs: string[];
  accent: string; // hex
};

export const conditions: Condition[] = [
  {
    id: 'diabetic-retinopathy',
    name: 'Diabetic Retinopathy',
    short: 'Damage to retinal vessels from diabetes.',
    description:
      'High blood sugar weakens the tiny vessels that nourish the retina, causing leakage, swelling and abnormal vessel growth. Caught early, vision loss is largely preventable.',
    signs: ['Blurred or fluctuating vision', 'Dark floaters or spots', 'Impaired colour vision'],
    accent: '#38E1FF',
  },
  {
    id: 'retinal-detachment',
    name: 'Retinal Detachment',
    short: 'The retina lifts away from its support layer.',
    description:
      'A surgical emergency where the retina separates from the back wall of the eye. Prompt vitreoretinal surgery can restore and preserve sight.',
    signs: ['Sudden shower of floaters', 'Flashes of light', 'A curtain over the vision'],
    accent: '#7A5CFF',
  },
  {
    id: 'amd',
    name: 'Age-related Macular Degeneration',
    short: 'Deterioration of the central macula.',
    description:
      'AMD affects the macula, blurring the sharp central vision needed for reading and faces. Modern injections and monitoring slow its progression.',
    signs: ['Straight lines appear wavy', 'Blurred central spot', 'Difficulty reading'],
    accent: '#25E0A4',
  },
  {
    id: 'rvo',
    name: 'Retinal Vein Occlusion',
    short: 'A blocked retinal vein.',
    description:
      'A blockage in the retinal venous drainage causes bleeding and swelling. Targeted injections and laser reduce swelling and protect vision.',
    signs: ['Sudden painless vision loss', 'Blurred area in vision', 'Distortion'],
    accent: '#5CC8FF',
  },
  {
    id: 'macular-hole',
    name: 'Macular Hole',
    short: 'A small break in the central retina.',
    description:
      'A tiny full-thickness defect at the fovea distorts central vision. Micro-incision vitrectomy closes the hole with excellent success rates.',
    signs: ['Central blur or blind spot', 'Distorted straight lines', 'Reading difficulty'],
    accent: '#A66BFF',
  },
  {
    id: 'erm',
    name: 'Epiretinal Membrane',
    short: 'A fine scar tissue over the retina.',
    description:
      'A cellophane-like membrane contracts over the macula and wrinkles it. Delicate peeling surgery smooths the retina and improves clarity.',
    signs: ['Wavy distorted vision', 'Blur in the centre', 'Double vision in one eye'],
    accent: '#38E1FF',
  },
  {
    id: 'vitreous-hemorrhage',
    name: 'Vitreous Hemorrhage',
    short: 'Bleeding into the vitreous gel.',
    description:
      'Blood clouds the clear gel that fills the eye, suddenly dimming vision. We identify the source and treat with laser, injections or vitrectomy.',
    signs: ['Sudden haze or shadows', 'Reddish tint to vision', 'Numerous new floaters'],
    accent: '#7A5CFF',
  },
  {
    id: 'rop',
    name: 'Retinopathy of Prematurity',
    short: 'Abnormal retinal vessels in premature infants.',
    description:
      'In premature babies the retinal vessels can grow abnormally. Timely screening and laser or injection therapy protect a lifetime of sight.',
    signs: ['Detected on newborn screening', 'Requires timely review', 'Treatable when caught early'],
    accent: '#25E0A4',
  },
];

export const technology = [
  {
    id: 'oct',
    name: 'OCT',
    full: 'Optical Coherence Tomography',
    blurb: 'Cross-sectional micron-level scans of every retinal layer for precise diagnosis.',
  },
  {
    id: 'fundus',
    name: 'Fundus Camera',
    full: 'Digital Fundus Imaging',
    blurb: 'High-resolution photographs that document and track the health of the retina.',
  },
  {
    id: 'laser',
    name: 'Retinal Laser',
    full: 'Green / PASCAL Laser',
    blurb: 'Targeted photocoagulation that seals leaks and abnormal vessels with precision.',
  },
  {
    id: 'vitrectomy',
    name: 'Vitrectomy System',
    full: 'Micro-incision Surgery',
    blurb: 'Advanced small-gauge platform for delicate surgical retina procedures.',
  },
  {
    id: 'widefield',
    name: 'Wide-field Imaging',
    full: 'Ultra-wide Retina View',
    blurb: 'Captures the far retinal periphery in a single image for complete assessment.',
  },
  {
    id: 'octa',
    name: 'OCT Angiography',
    full: 'FA / OCT-A',
    blurb: 'Dye and dye-free mapping of retinal blood flow, layer by layer.',
  },
];

export const stats = [
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 15000, suffix: '+', label: 'Patients Treated' },
  { value: 4000, suffix: '+', label: 'Retina Surgeries' },
  { value: 6, suffix: '+', label: 'Advanced Diagnostic Systems' },
  { value: 98, suffix: '%', label: 'Patient Satisfaction' },
];

export const journeySteps = [
  { n: '01', title: 'Consultation', text: 'A calm, unhurried conversation to understand your eyes and your story.' },
  { n: '02', title: 'Advanced Retina Imaging', text: 'OCT, fundus and wide-field scans capture your retina in stunning detail.' },
  { n: '03', title: 'Precise Diagnosis', text: 'Layer-by-layer analysis pinpoints the cause with clarity and confidence.' },
  { n: '04', title: 'Personalised Treatment', text: 'A plan shaped around your vision, your life and your goals.' },
  { n: '05', title: 'Vision Recovery', text: 'Ongoing care and monitoring to protect your sight for the long term.' },
];

export const timelineStages = [
  { title: 'Healthy Retina', text: 'A baseline of clear, vibrant vision worth protecting.' },
  { title: 'Early Detection', text: 'Subtle changes spotted before symptoms ever appear.' },
  { title: 'Advanced Imaging', text: 'Micron-level scans reveal the full picture.' },
  { title: 'Timely Treatment', text: 'The right intervention, at the right moment.' },
  { title: 'Vision Preservation', text: 'Sight protected and quality of life restored.' },
  { title: 'Long-term Eye Health', text: 'A partnership that guards your vision for years to come.' },
];

export const testimonials = [
  {
    name: 'Rajesh P.',
    location: 'Ahmedabad',
    text: 'After my diabetic retinopathy diagnosis I was terrified. Dr. Unnati explained every scan and every step. Two years on, my vision is stable and I finally feel in control.',
  },
  {
    name: 'Meena S.',
    location: 'Gandhinagar',
    text: 'A retinal detachment could have cost me my sight. The surgery was flawless and the care afterwards was so warm. I cannot thank the whole team enough.',
  },
  {
    name: 'Arun K.',
    location: 'Vadodara',
    text: 'The clinic feels more like a premium experience than a hospital. The imaging technology is remarkable and the diagnosis was spot on.',
  },
  {
    name: 'Priya D.',
    location: 'Ahmedabad',
    text: 'Injections for my macular degeneration were painless and quick. My reading vision has come back — small moments that mean everything.',
  },
  {
    name: 'Sanjay M.',
    location: 'Nadiad',
    text: 'Our premature baby needed urgent ROP screening. The gentleness and expertise gave us hope in a very frightening time.',
  },
];

export const visionModes = [
  {
    id: 'normal',
    label: 'Normal Vision',
    desc: 'Sharp, vivid, full-field sight.',
  },
  {
    id: 'diabetic',
    label: 'Diabetic Retinopathy',
    desc: 'Dark patches and floaters from leaking vessels.',
  },
  {
    id: 'amd',
    label: 'Macular Degeneration',
    desc: 'A blurred, distorted central blind spot.',
  },
  {
    id: 'detachment',
    label: 'Retinal Detachment',
    desc: 'A dark curtain drawn across the vision.',
  },
] as const;
