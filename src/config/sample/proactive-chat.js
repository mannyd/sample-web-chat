import { managerStrings } from './manager-strings';

const events = {
  CheckoutError: {
    isFromMe: false,
    authorName: 'Sales Assistance',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'Are you having trouble with checkout?'
  },
  AcquadiParmaEventType: {
    isFromMe: false,
    authorName: 'Acqua di Parma',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'Can I make some recommendations?'
  },
  AMOREPACIFICEventType: {
    isFromMe: false,
    authorName: 'Amorepacific',
    specialistName: 'Kristyn Miller',
    biography: "With over 15 years’ experience in luxury skincare, Kristyn loves helping her clients create the perfect customized Amore Pacific skincare regimen. Ask Kristyn about the secret to timeless beauty!",
    body: "Hi! I'm your Amorepacific specialist. I'm happy to make recommendations or help if you have questions."
  },
  AERINEventType: {
    isFromMe: false,
    authorName: 'Aerin',
    specialistName: 'Devlyn Lavrenchik',
    biography: "Devlyn brings her years of experience in skin care, fragrance and makeup artistry online, providing personal and individual service to help you find the Estee Lauder products you need and want!",
    body: "Hello! I’m the Estee Lauder and Aerin Specialist. I'm happy to help if you have any questions."
  },
  BobbiBrownEventType: {
    isFromMe: false,
    authorName: 'Bobbi Brown',
    specialistName: 'Candy Samuel',
    biography: "For over 10 years, Candy has been helping our clients of all colors find their perfect shade of foundation and create their best looks.  Let her share her expertise with you today!",
    body: "Hi! I'm your specialist for Bobbi Brown. I'm happy to help if you have any questions."
  },
  CledePeauBeauteEventType: {
    isFromMe: false,
    authorName: 'Cle de Peau Beaute',
    specialistName: 'Barbara Richards',
    biography: "Barbara brings her cosmetics expertise online to provide her clients personalized treatment recommendations for luxury skincare benefits at home and complementary makeup choices with seasonal trends.",
    body: "Hello! I'm with Cle de Peau. I'm happy to help with any questions today."
  },
  CHANELEventType: {
    isFromMe: false,
    authorName: 'Chanel',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer! Feel free to ask me about this week",
    body: "Hello! I'm your CHANEL beauty and fragrance specialist. I'm happy to help if you have questions."
  },
  ChantecailleEventType: {
    isFromMe: false,
    authorName: 'Chantecaille',
    specialistName: 'Andrea Kearney',
    biography: "With over 20 years in luxury beauty, Andrea loves to use her expertise to help clients find the perfect Chantecaille color, skin care or fragrance to enhance their beauty wardrobe.",
    body: "Hi! I'm the Beauty specialist for Chantecaille. I'm happy to help if you have any questions."
  },
  DiorEventType: {
    isFromMe: false,
    authorName: 'Dior Beauty',
    specialistName: 'Elizabeth Jawhary',
    biography: "Elizabeth takes pride in helping clients find the best Dior Beauty products to feel and look their very best.  Ask her about a fragrance wardrobe, customized skincare routine or makeup consultation!",
    body: "Hello! I’m your Dior Specialist. I’m happy to help with any questions or if you need suggestions!"
  },
  EsteeLauderEventType: {
    isFromMe: false,
    authorName: 'Estee Lauder',
    specialistName: 'Devlyn Lavrenchik',
    biography: "Devlyn brings her years of experience in skin care, fragrance and makeup artistry online, providing personal and individual service to help you find the Estee Lauder products you need and want!",
    body: "Hello! I’m the Estee Lauder Specialist. I'm happy to help if you have any questions."
  },
  FredericMalleEventType: {
    isFromMe: false,
    authorName: 'Frederic Malle',
    specialistName: 'Allison Soileau',
    biography: "As a seasoned beauty professional, Allison takes pleasure in helping her customers navigate their fragrance journey. ",
    body: "Hi! I'm your Frederic Malle fragrance Specialist. I'm happy to help if you have any questions."
  },
  ARMANIBeautyEventType: {
    isFromMe: false,
    authorName: 'Giorgio Armani',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I’m your Beauty Specialist for Giorgio Armani Beauty. I'm happy to help if you have any questions."
  },
  GivenchyEventType: {
    isFromMe: false,
    authorName: 'Givenchy Beauty',
    specialistName: 'Dora Gomez',
    biography: "With over 10 years’ experience in luxury beauty, Dora loves creating the perfect look, fragrance or skincare routine for her clients.",
    body: "Hi, I’m your Givenchy beauty specialist. I’m happy to assist if you have any questions. Feel free to ask me about this week’s special beauty offer!"
  },
  GuerlainEventType: {
    isFromMe: false,
    authorName: 'Guerlain Beauty',
    specialistName: 'Dora Gomez',
    biography: "With over 10 years’ experience in luxury beauty, Dora loves creating the perfect look, fragrance or skincare routine for her clients.",
    body: "Hi, I’m your Guerlain beauty specialist. I’m happy to assist if you have any questions. Feel free to ask me about this week’s exclusive beauty offer!"
  },
  CREEDEventType: {
    isFromMe: false,
    authorName: 'House of Creed',
    specialistName: 'Martine Campbell Marechal',
    biography: "A luxury fragrance expert, Martine offers her expertise with passion and proven knowledge. Seven years in France honed her skills to bring you her most concise and personal fragrance recommendations.",
    body: "Hello and welcome! I'm your House of Creed specialist. I'm happy to assist if you have any questions."
  },
  JoMaloneLondonEventType: {
    isFromMe: false,
    authorName: 'Jo Malone London',
    specialistName: 'Candy Samuel',
    biography: "For over 10 years, Candy has been helping our clients create their own signature scents.  Let her share her expertise with you today!",
    body: "Hi! I'm your fragrance specialist for Jo Malone London. I'm happy to help if you have any questions."
  },
  KilianEventType: {
    isFromMe: false,
    authorName: 'Kilian',
    specialistName: 'Allison Soileau',
    biography: "As a seasoned beauty professional, Allison takes pleasure in helping her customers navigate their fragrance journey.",
    body: "Hi! I'm your fragrance Specialist for Kilian. I'm happy to help if you have any questions."
  },
  LaMerEventType: {
    isFromMe: false,
    authorName: 'La Mer',
    specialistName: 'Kristin Nightengale',
    biography: "Kristin has been sharing her love of skincare and beauty with our clients for over 18 years. Her knowledge of La Mer and passion to help is unwavering. She has the answers…just ask!",
    body: "Hi! I'm the La Mer Expert online. I'd be glad to answer any questions you have about La Mer!"
  },
  LaPrairieEventType: {
    isFromMe: false,
    authorName: 'La Prairie',
    specialistName: 'Whitney Alexander',
    biography: "As a skincare enthusiast, Whitney has a passion for helping people feel beautiful and confident in their own skin. She’s happy to customize the perfect La Prairie routine to suit your specific needs.",
    body: "Hello! I'm your specialist for La Prairie. I'm happy to make skincare recommendations and answer any questions that you may have."
  },
  LancomeEventType: {
    isFromMe: false,
    authorName: 'Lancome',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Bonjour! I'm your Lancome Specialist. I'm happy to make recommendations or help if you have questions."
  },
  LauraMercierEventType: {
    isFromMe: false,
    authorName: 'Laura Mercier',
    specialistName: 'Robin Moody',
    biography: "Robin brings years of expertise and her love of all things beauty to assist her clients with creating a customized skin care routine and makeup look that is all their own.",
    body: "Hi! I’m the specialist for Laura Mercier. I'm happy to make recommendations or help if you have questions."
  },
  MaisonFrancisKurkdjianEventType: {
    isFromMe: false,
    authorName: 'Maison Francis Kurkdjian',
    specialistName: 'Lea Point',
    biography: "A seasoned beauty and fragrance expert, Lea is a pro at helping clients find the perfect scent for creating their own invisible, yet identifiable identity through fragrance.",
    body: "Welcome to Maison Francis Kurkdjian! I'm happy to help if you have questions."
  },
  MoltonBrownEventType: {
    isFromMe: false,
    authorName: 'Molton Brown',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I’m your Beauty Specialist for Molton Brown Beauty. I'm happy to help if you have any questions."
  },
  ReViveEventType: {
    isFromMe: false,
    authorName: 'ReVive',
    specialistName: 'Lori Wright',
    biography: "Lori is a skincare guru with over 24 years in the industry. She’s here to help give new life to your skin through ReVive and assist you with finding the perfect products. She’s just a click away!",
    body: "Hello! I'm your ReVive specialist. I'm happy to make recommendations or help if you have questions."
  },
  ShiseidoEventType: {
    isFromMe: false,
    authorName: 'Shiseido',
    specialistName: 'Robin Moody',
    biography: "Robin brings years of expertise and her love of all things beauty to assist her clients with creating a customized skin care routine and makeup look that is all their own.",
    body: "Hi! I’m the specialist for Shiseido. I'm happy to make recommendations or help if you have questions."
  },
  SisleyParisEventType: {
    isFromMe: false,
    authorName: 'Sisley-Paris',
    specialistName: 'Pam Luna',
    biography: "Pam loves being an online specialist and is always excited to provide help with products, including details that enable customers to use Sisley-Paris products in the most effective way. Ask her today!",
    body: "Hi! I'm your Sisley-Paris specialist. I'm happy to help if you have any questions."
  },
  SulwhasooEventType: {
    isFromMe: false,
    authorName: 'Sulwhasoo',
    specialistName: 'Kristyn Miller',
    biography: "With over 15 years’ experience in luxury skincare, Kristyn loves helping her clients create the perfect customized Sulwhasoo skincare regimen. Ask her about discovering the secret to timeless beauty!",
    body: "Hello! I'm your Sulwhasoo specialist. I'm happy to make recommendations or help if you have questions."
  },
  TOMFORDEventType: {
    isFromMe: false,
    authorName: 'Tom Ford Beauty',
    specialistName: 'Ryan Perez',
    biography: "Ryan is a devotee of Tom Ford Beauty since its inception. He can find the perfect Tom Ford product and assist clients in confidently becoming the best version of themselves. He’s eager to serve you!",
    body: "Hello! I’m with Tom Ford Beauty. I'm happy to make recommendations or help if you have questions."
  },
  TrishMcEvoyEventType: {
    isFromMe: false,
    authorName: 'Trish McEvoy',
    specialistName: 'Lori Wright',
    biography: "Lori’s passion for over 24 years is helping clients feel confident and beautiful. She’s happy to share Trish’s philosophy, expert training, and amazing products with you. She’s just a click away!",
    body: "Hello! I'm your Trish McEvoy specialist. I'm happy to make recommendations or help if you have questions."
  },
  YvesSaintLaurentBeauteEventType: {
    isFromMe: false,
    authorName: 'YSL Beaute',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I’m your Beauty Specialist for Yves Saint Laurent Beauty. I'm happy to help if you have any questions."
  },
  RobertoCoinEventType: {
    isFromMe: false,
    authorName: 'Roberto Coin',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'May I schedule an appointment for you with one of our jewelry experts?'
  },
  MarcoBicegoEventType: {
    isFromMe: false,
    authorName: 'Marco Bicego',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'May I schedule an appointment for you with one of our jewelry experts?'
  },
  ElizabethLockeEventType: {
    isFromMe: false,
    authorName: 'ElizabethLocke',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'May I schedule an appointment for you with one of our jewelry experts?'
  },
  BoucheronEventType: {
    isFromMe: false,
    authorName: 'Boucheron',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'May I schedule an appointment for you with one of our jewelry experts?'
  },
  HolidayEventType: {
    isFromMe: false,
    authorName: 'Holiday',
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: 'May I make some gifting recommendations?'
  },
  AesopEventType: {
    isFromMe: false,
    authorName: 'Aesop',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Hi! I'm your online Specialist for Aesop. I'm happy to help if you have questions."
  },
  AugustinusBaderEventType: {
    isFromMe: false,
    authorName: 'Augustinus Bader',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Hi! I'm your online Beauty Specialist for Augustinus Bader.  I'm happy to make recommendations or help if you have questions."
  },
  ByredoEventType: {
    isFromMe: false,
    authorName: 'Byredo',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I'm your online Beauty Specialist for Byredo. I'm happy to help if you have questions."
  },
  DrBarbaraSturmEventType: {
    isFromMe: false,
    authorName: 'Dr. Barbara Sturm',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Hello! I'm your online Beauty Specialist for Dr. Barbara Sturm. I'm happy to help if you have questions."
  },
  CliveChristianEventType: {
    isFromMe: false,
    authorName: 'Clive Christian',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I'm your online Specialist for Clive Christian. I'm happy to make recommendations or help if you have questions."
  },
  HourglassCosmeticsEventType: {
    isFromMe: false,
    authorName: 'Hourglass Cosmetics',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hi! I'm your online Beauty Specialist for Hourglass Cosmetics. I'm happy to make recommendations or help if you have questions."
  },
  InitioParfumsPrivesEventType: {
    isFromMe: false,
    authorName: 'Initio Parfums Prives',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I'm your online Specialist for Initio Parfums Prives.  I'm happy to make recommendations or help if you have questions."
  },
  NaturaBisseEventType: {
    isFromMe: false,
    authorName: 'Natura Bisse',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Hi! I'm your online Beauty Specialist for Natura Bissé. I'm happy to make recommendations or help if you have questions."
  },
  OribeEventType: {
    isFromMe: false,
    authorName: 'Oribe',
    specialistName: 'Amber Smith',
    biography: "As a licensed Esthetician, beauty and fragrance expert with over 25 years in the luxury industry, Amber loves helping her clients find the perfect products to fit their needs and lifestyle.",
    body: "Hello! I'm your online Specialist for Oribe.  I'm happy to make recommendations or help if you have questions."
  },
  SundayRileyModernSkincareEventType: {
    isFromMe: false,
    authorName: 'Sunday Riley Modern Skincare',
    specialistName: 'Johanna Uek',
    biography: "As a beauty and esthetics professional, Johanna has a passion for skincare, cosmetics, and wellness. She’s happy to join you on your journey for the right products to look and feel your best.",
    body: "Hello! I'm your online Specialist for Sunday Riley. I'm happy to help if you have questions."
  },
  VintnersDaughterEventType: {
    isFromMe: false,
    authorName: "Vintner's Daughter",
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your brand advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: "Hello! I'm your online Specialist for Vintner’s Daughter. I'm happy to help if you have questions."
  },
  //DLE Proactive Chat
  WomensDressesCategoryEventType: {
    isFromMe: false,
    authorName: "Style",
    specialistName: 'Beauty Advisor',
    biography: "Hi! I'm your style advisor. I'm happy to make recommendations or help if you have questions. Feel free to ask me about this week’s special beauty offer!",
    body: "Hi! I’d love to help you find what you’re shopping for. What are your style needs today?"
  }
};

export function getPredefinedMessage(eventType) {
  const defaultMessage = {
    isFromMe: false,
    authorName: managerStrings.PredefinedChatMessageAuthorName,
    specialistName: managerStrings.PredefinedChatMessageSpecialistName,
    biography: managerStrings.PredefinedChatMessageBiography,
    body: managerStrings.PredefinedChatMessageBody
  };
  return !!events[eventType] ? events[eventType] : defaultMessage;
}
