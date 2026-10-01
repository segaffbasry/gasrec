/* Every line of copy on the page, taken verbatim from gasrec.co.uk (homepage first, then the pages it links to).
   The only edits: no em or en dashes (ranges read "to"), and the live typos are kept as they are on the site.
   Links keep their live URLs; the page guards them so nothing navigates (components/Shell.tsx). */

export const LIVE = "https://www.gasrec.co.uk";
const live = (path: string) => `${LIVE}${path}`;

export const announcement = { label: "Click here for Gasrec contact details", href: live("/contact") };

export const nav = [
  { label: "About gas", href: live("/about-gas") },
  { label: "What we do", href: live("/what-we-do") },
  { label: "Stations", href: live("/stations") },
  { label: "News & blog", href: live("/blog") },
  { label: "Knowledge Zone", href: live("/knowledge-zone") },
  { label: "Our team", href: live("/our-team") },
];
export const contactLink = { label: "Contact us", href: live("/contact") };

export const hero = {
  title: "Gas for transport",
  accent: "It’s what we do.",
  slides: [
    { src: "/media/hero-canopy", caption: "Refuelling", alt: "Gasrec refuelling canopy with LNG storage tanks and trucks refuelling" },
    { src: "/media/hero-tanker", caption: "Supply", alt: "A Gasrec LNG tanker on the road beside an LNG terminal" },
    { src: "/media/hero-fleet", caption: "Logistics", alt: "Gasrec tankers parked in front of the station's storage tanks" },
    { src: "/media/hams-hall", caption: "Hams Hall", alt: "Trucks refuelling under the canopy at Gasrec Hams Hall" },
  ],
  note: "Hams Hall. Next Generation Refuelling Station. Now Open",
  ctas: [
    { label: "What we do", href: live("/what-we-do") },
    { label: "Stations", href: live("/stations") },
  ],
};

// The live hero paragraph. The marked phrases are highlighted in the intro statement.
export const intro = {
  eyebrow: "Gasrec",
  parts: [
    { t: "Gasrec " },
    { t: "designs, builds and operates", hi: true },
    { t: " Bio-LNG and Bio-CNG refuelling stations and supplies renewable gas fuel to road-transport fleets, aiming to " },
    { t: "reduce CO₂ emissions by up to 90%.", hi: true },
  ],
  lead: "Our work is based on three core activities. We harness our expertise at each stage of the process to deliver the best possible service to our customers.",
  activities: [
    { n: "01", title: "Build", text: "We work with our clients to design and build bespoke CNG and LNG refuelling facilities. We offer private facilities or publicly accessible refuelling stations in strategic locations." },
    { n: "02", title: "Operate", text: "We run the station from the start. From upgrades to maintenance to expansions, our expert team of engineers do it all, 24 hours a day. Our stations are operated and maintained in partnership with TSG UK." },
    { n: "03", title: "Supply", text: "Our own gas-powered tankers deliver LNG direct to stations when customers need it. We also supply CNG by grid connection or by tanker (known as LCNG) where a grid connection is not available." },
  ],
  cta: { label: "What we do", href: live("/what-we-do") },
};

// The three homepage promises, plus the Remote Monitoring Centre from /what-we-do to close the second row.
export const promises = [
  { title: "Supply chain security", text: "Benefit from our long-term Bio-LNG and Bio-CNG supply agreement to give your fleet emissions reductions over multiple fleet lifetimes. Plus our sizeable logistics operation ensures you always get fuel when you need it.", img: "/media/supply", alt: "Reynolds Logistics tankers powered by Gasrec", tone: "navy", cta: { label: "About gas", href: live("/about-gas") } },
  { title: "Complete service package", text: "We do more than just dispense gas. Our team of experts works day and night to keep our nationwide operation going. Our support centre, dedicated engineering team and dedication to service will serve you best.", img: "/media/service", alt: "A Gasrec engineer checking a tanker connection with a tablet", tone: "blue", cta: { label: "What we do", href: live("/what-we-do") } },
  { title: "Long-term expertise", text: "We’ve assembled a team of committed experts at every level of our organisation to ensure we’re one step ahead of the competition and we’re always looking for ways to innovate, develop and serve our customers better.", img: "/media/expertise", alt: "Gasrec engineers with their service vans", tone: "green", cta: { label: "Our team", href: live("/our-team") } },
  { title: "Our Remote Monitoring Centre makes us different.", text: "We have a team of six technicians working round the clock, 365 days per year at our RMC to support our customers and their gas stations. Our friendly team of technicians triage engineers, offer advice and are a crucial and unique part of Gasrec’s operation.", img: "/media/band-rmc", alt: "Technicians at Gasrec's Remote Monitoring Centre", tone: "navy", cta: { label: "Learn more about our RMC here", href: live("/what-we-do") } },
] as const;

export const hamsHall = {
  eyebrow: "Now Open",
  title: "Hams Hall",
  subtitle: "Next Generation Refuelling Station",
  text: "This year Gasrec is opening a brand new, large-scale public access Bio-LNG refuelling station at Hams Hall. Located close to M6 and M42 junctions, this station is set to refuel up to 1000 vehicles daily at full capacity.",
  cta: { label: "Read more about the site here", href: live("/blog/2025/6/2/work-begins-at-hams-hall") },
  facts: [
    { value: "1000", label: "vehicles daily at full capacity" },
    { value: "M6 / M42", label: "junctions close by" },
  ],
  map: { src: "/media/map.jpg", alt: "Map showing Hams Hall between Birmingham and Coventry, close to the M6 and M42" },
  film: { id: "_bRIdzhOT7A", poster: "/media/film.jpg", title: "Why are fleets switching to Bio-LNG and Bio-CNG?", by: "James Westcott, Gasrec’s Chief Commercial Officer, explains all." },
};

export const netZero = {
  eyebrow: "About gas",
  title: "We’re helping your fleet drive towards Net Zero",
  img: { src: "/media/net-zero", alt: "A Gasrec LNG storage tank and dispenser at a customer depot" },
  items: [
    { title: "Reduce your emissions", stat: "80%", statLabel: "emissions reduction", text: "Gasrec's Bio-LNG and Bio-CNG fuels will reduce your emissions by around 80%, and often even more, helping you drive towards net zero, faster." },
    { title: "Save money", stat: "20 to 40%", statLabel: "typical cost saving", text: "Gas vehicles have consistently shown they will save your operation money. Typically, a gas vehicle will achieve a cost saving of around 20 to 40% compared to an equivalent diesel." },
    { title: "Utilise our network", stat: "17", statLabel: "stations across the UK", text: "Our network is growing giving you more opportunities to refuel across the UK. Gasrec's core business is to develop a network of large-scale, open-access Bio-LNG and Bio-CNG refuelling stations." },
  ],
  cta: { label: "Cost and carbon calculator", href: live("/knowledge-zone") },
};

export const stations = {
  eyebrow: "Our stations",
  title: "Our state-of-the-art station technology",
  text: "Our state-of-the-art station technology will give your fleet reliability, resilience and dependability. See our current locations below.",
  note: "Please note: access requirements to our facilities can vary. Please contact Gasrec before attempting to access a site.",
  cta: { label: "Our stations", href: live("/stations") },
  list: [
    { name: "Avonmouth", img: "st-avonmouth", text: "This mobile LNG station, situated on Tesco’s Avonmouth depot, services Tesco’s fleet with Bio-LNG." },
    { name: "Alperton", img: "st-alperton", text: "Pipeline CNG station built for waste management company Veolia in 2017." },
    { name: "Boroughbridge", img: "st-boroughbridge", text: "Deployed in 2021 on a customer site in Boroughbridge, North Yorkshire, supporting 70 Volvo vehicles. Capable of refuelling 150 vehicles per day." },
    { name: "Cullompton", img: "st-cullompton", text: "This mobile LNG station, situated on Gregory Distribution’s Cullompton depot, services around 30 LNG vehicles per day with Bio-LNG." },
    { name: "Coventry", img: "st-coventry", text: "Skid-based solution deployed in 2023 to service an initial order of DHL UK Mail vehicles at their Ryton hub." },
    { name: "Dartford", img: "st-dartford", text: "Station installed in 2025 at Asda’s Dartford depot to service an initial 32 LNG vehicles" },
    { name: "Didcot", img: "st-didcot", text: "Large permanent facility deployed in 2023 following deployment of an initial skid. Serving 100% of Asda’s fleet at their Didcot ADC." },
    { name: "DIRFT", img: "st-dirft", text: "Europe’s largest gas refuelling station at M1, junction 18. Capable of refuelling up to 700 trucks per day through 7 LNG dispensers, the station is supplied by tanker-delivered LNG." },
    { name: "Dordon", img: "st-dordon", text: "Tanker-fed CNG station built for Ocado in 2022 for 80 CNG vehicles at their CFC2 site." },
    { name: "Fradley Park", img: "st-fradley", text: "Deployed in 2023. Skid-based solution designed to provide initial refuelling ahead of wider development of LNG infrastructure." },
    { name: "Lutterworth", img: "st-lutterworth", text: "Twin skidded facilities ahead of larger public development in Lutterworth." },
    { name: "Erith", img: "st-didcot", text: "Large permanent facility deployed in 2024 to support Asda’s fleet in the south-east, in addition to their Dartford site, opening in early 2025." },
    { name: "South Elmsall", img: "st-elmsall", text: "Large facility to support part of Asda’s fleet in South Yorkshire. Multiple dispense points giving excellent resilience and reliability." },
    { name: "Swindon", img: "st-swindon", text: "Constructed in 2013 and upgraded in 2021 to support deployment of new generation of LNG trucks in B&Q’s fleet." },
    { name: "Redhouse", img: "st-redhouse", text: "B&Q’s second LNG site taking their total LNG fleet over 100 vehicles. Built in 2022 to support increasing nationwide demands for LNG." },
    { name: "Tamworth", img: "st-tamworth", text: "Discreet LNG refuelling facility on UPS’s Tamworth hub. Capable of refuelling 30 trucks per day with minimal ground footprint." },
    { name: "Warrington", img: "st-warrington", text: "Skidded facility installed in 2025 to give additional resilience to Asda operation in North-West England." },
  ],
};

export const team = {
  eyebrow: "Contact",
  title: "Speak to our team today",
  text: "Looking to try gas trucks or speak to us about gas refuelling? Get in touch and they’ll be delighted to help to you.",
  people: [
    { name: "Tom Brook", role: "Key Accounts Director", img: "/media/tom", bio: ["Tom’s been at Gasrec since 2018, when the new generation of gas vehicles were in their nacsent stage. Since then he’s built up over six years of experience supporting customers in developing their gas fleets and reducing emissions."], cta: "Contact Tom" },
    { name: "Amy Parrish", role: "Customer Relationship Lead", img: "/media/amy", bio: ["Amy is Gasrec’s customer relationship expert, helping us build strong, lasting connections with our customers and stakeholders.", "If you’re looking to start your emissions reduction journey, she’s here to help."], cta: "Contact Amy" },
    { name: "Ashley Blades", role: "Strategic Accounts Director", img: "/media/ashley", bio: ["Ashley comes from a background in BP, working over the last two decades in strategic accounts and sales, focusing on building strong, trusting relationships with his customers and partners. Speak to Ashley and he’ll help you find the solution you need."], cta: "Contact Ashley" },
  ],
  href: live("/contact"),
};

export const decarbonise = {
  text: "Decarbonising Britain means decarbonising transport. See how we’re making a difference to Britain’s emissions.",
  cta: { label: "Learn more", href: live("/what-we-do") },
  img: { src: "/media/dispenser", alt: "A Gasrec Bio-LNG dispenser at Asda's depot" },
};

export const news = {
  eyebrow: "News & blog",
  title: "News and blog",
  cta: { label: "News & blog", href: live("/blog") },
  posts: [
    { title: "Stepping on the gas: Warrington biomethane station to expand Gasrec’s growing network", date: "August 25, 2026", img: "/media/news-warrington", href: live("/blog/2026/8/25/stepping-on-the-gas-warrington-biomethane-station-to-expand-gasrecs-growing-network") },
    { title: "Hams Hall Open Day highlights benefits of Bio-LNG to the road transport sector", date: "May 6, 2026", img: "/media/news-open-day", href: live("/blog/2026/5/6/hams-hall-open-day-highlights-benefits-of-bio-lng-to-the-road-transport-sector") },
    { title: "Gateway to Greener Transport: Gasrec goes live with state-of-the-art biomethane site at Hams Hall", date: "November 18, 2025", img: "/media/hams-hall", href: live("/blog/2025/11/18/hams-hall-goes-live") },
    { title: "Gasrec secures investment stake from Centrica to boost its UK Bio-LNG ambitions", date: "July 30, 2025", img: "/media/news-centrica", href: live("/blog/2025/7/29/gasrec-secures-investment-stake-from-centrica") },
    { title: "Work begins on open-access refuelling site at Hams Hall", date: "June 3, 2025", img: "/media/news-ground", href: live("/blog/2025/6/2/work-begins-at-hams-hall") },
    { title: "Gasrec video series: launching today", date: "March 5, 2025", img: "/media/news-video", href: live("/blog/2025/3/4/gasrec-video-series-launching-today") },
  ],
};

// GasLog-style bands: one per section of the live site, each with that page's own opening line.
export const explore = [
  { title: "About gas", text: "Helping your fleet reduce its emissions", img: "/media/band-gas", href: live("/about-gas") },
  { title: "What we do", text: "Our work is based on three core activities.", img: "/media/engineer", href: live("/what-we-do") },
  { title: "Stations", text: "See our current locations", img: "/media/band-stations", href: live("/stations") },
  { title: "Knowledge Zone", text: "Everything you need to know about gas vehicles and the UK gas refuelling network", img: "/media/band-card", href: live("/knowledge-zone") },
  { title: "Our team", text: "Meet our team", img: "/media/band-team", href: live("/our-team") },
];

export const contact = {
  company: "Gasrec Ltd.",
  address: ["Lavender Studios First Floor,", "Mortimer House, 230-236 Lavender Hill,", "London, SW11 1LE"],
  ops: { label: "Operational support", phone: "+441788 822360", tel: "tel:+441788822360" },
  office: { label: "Head office", phone: "+4420 8191 7079", tel: "tel:+442081917079" },
  email: "info@gasrec.co.uk",
  mailto: "mailto:info@gasrec.co.uk",
  linkedin: "http://www.linkedin.com/companies/gasrec",
  img: { src: "/media/dusk", alt: "A truck at a Gasrec LNG station at dusk" },
};

export const footer = {
  copyright: "© Gasrec 2024",
  info: [
    { label: "Our stations", href: live("/stations") },
    { label: "Our team", href: live("/our-team") },
    { label: "About Gasrec", href: live("/about-gasrec") },
    { label: "What we do", href: live("/what-we-do") },
    { label: "News", href: live("/blog?category=News") },
    { label: "Blog", href: live("/blog?category=Blog") },
  ],
  legal: [
    { label: "GDPR policy", href: live("/gdpr") },
    { label: "Modern Slavery Statement", href: live("/modern-slavery") },
  ],
};
