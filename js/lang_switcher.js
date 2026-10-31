/**
 * ==============================================================================
 * GUJARATI & ENGLISH BILINGUAL TRANSLATION ENGINE
 * ==============================================================================
 * Seamlessly converts every single string on the entire wedding invitation
 * between English and Gujarati (Kankotri language) upon clicking the
 * floating language switcher button.
 * ==============================================================================
 */

(function () {
  window.CURRENT_LANG = 'en';

  const TRANSLATIONS = {
    en: {
      lang_btn_text: "ગુજરાતી",
      lang_btn_title: "Switch to Gujarati / ગુજરાતીમાં જુઓ",

      // Tap / Hero Overlay
      tap_overlay_title: "Click anywhere to open invitation",
      hero_tagline: "We're getting married",
      hero_couple_names: 'Akash <span class="hero-ampersand">&</span> Sakshi',
      hero_together_tagline: "Together with their families, invite you to celebrate their love",
      hero_hashtag: "#AkashKiSakshi",
      scroll_hint: "Scroll to explore",

      // Blessing / Traditional Card
      blessing_header: "ॐ श्री गणेशाय नमः",
      blessing_text: "With the divine blessings of Lord Ganesha and our beloved ancestors, we embark on this sacred journey of love and togetherness.",
      grandparents_blessings: "With heavenly blessings from Late Shri Ram Lal Sharma & Late Smt. Kamala Devi",
      host_groom_parents: "Smt. Sunita & Shri Rajesh Sharma",
      son_of: "Son of",
      groom_full_name: "Akash Sharma",
      weds_text: "weds",
      bride_full_name: "Sakshi Verma",
      daughter_of: "Daughter of",
      host_bride_parents: "Smt. Meena & Shri Dinesh Verma",
      formal_invitation_body: "Cordially request the pleasure of your gracious company and blessings on the auspicious wedding ceremony of their beloved children.",
      compliments_note: "With best compliments from all Sharma & Verma family members, relatives and friends.",

      // Scratch to Reveal
      scratch_card_title: "Scratch to Reveal",
      scratch_card_instruction: "Swipe across the golden heart",
      revealed_headline: "Save the Date",
      revealed_date_day: "14th",
      revealed_date_month: "December",
      revealed_date_year: "2026",
      revealed_message: "We cannot wait to celebrate the most magical night of our lives with you!",

      // Countdown Timer
      countdown_heading: "Counting Down to Forever",
      countdown_days: "Days",
      countdown_hours: "Hours",
      countdown_mins: "Mins",
      countdown_secs: "Secs",
      countdown_subtitle: "Until We Say I Do",

      // Story Milestones
      story_heading: "Our Story",
      story_1_title: "How We Met",
      story_1_year: "October 2022",
      story_1_desc: "A chance encounter at a cozy rooftop café over cold brew coffee turned into a four-hour conversation about dreams, music, and travel.",
      story_2_title: "The First Trip",
      story_2_year: "November 2023",
      story_2_desc: "Exploring the misty hills of Munnar, getting caught in sudden monsoon rains, and realizing we never wanted to wander through life without each other.",
      story_3_title: "The Proposal",
      story_3_year: "February 2025",
      story_3_desc: "Under a golden sunset on a quiet beach in Goa, with waves softly crashing against the shore, Akash got down on one knee. Sakshi said yes before he could even finish asking!",
      story_4_title: "Growing Together",
      story_4_year: "June 2025",
      story_4_desc: "Through every laugh, shared dream, and adventure, our bond grew deeper and stronger each passing day.",
      story_5_title: "The Families Meet",
      story_5_year: "September 2025",
      story_5_desc: "Bringing our two families together filled the room with joy, sweet blessings, and heartwarming celebration.",
      story_6_title: "Counting Down to Forever",
      story_6_year: "December 2026",
      story_6_desc: "Ready to begin this sacred next chapter surrounded by the love, laughter, and blessings of our dearest family and friends.",

      // The Celebrations
      celebrations_heading: "The Celebrations",
      event_1_name: "Satsang & Ganesh Puja",
      event_1_date: "Friday, December 12, 2026",
      event_1_time: "10:00 AM - 01:00 PM",
      event_1_venue: "Crystal Banquet Hall, The Grand Palace",
      event_1_desc: "An auspicious prayer gathering invoking divine grace for the couple's new beginning, followed by lunch.",

      event_2_name: "Mehendi & Sundowner Carnival",
      event_2_date: "Friday, December 12, 2026",
      event_2_time: "04:00 PM onwards",
      event_2_venue: "Lakeside Lawn, The Grand Palace",
      event_2_desc: "Henna patterns, foot-tapping beats, live food stalls, and sunset cocktails by the lake.",

      event_3_name: "Sangeet & DJ Night",
      event_3_date: "Saturday, December 13, 2026",
      event_3_time: "07:30 PM till late",
      event_3_venue: "Royal Ballroom, The Grand Palace",
      event_3_desc: "An electrifying night of family dance performances, cocktails, and non-stop dancing under the starlight!",

      event_4_name: "Shubh Vivah (Wedding & Pheras)",
      event_4_date: "Sunday, December 14, 2026",
      event_4_time: "06:30 PM (Baraat Swagat) | 08:30 PM (Pheras)",
      event_4_venue: "Shahi Mandapam by the Lake",
      event_4_desc: "The grand wedding rituals, Vedic vows around the sacred fire, followed by royal dinner and blessings.",

      btn_directions: "Get Directions",
      btn_calendar: "Add to Calendar",

      // Dress Code
      dresscode_title: "Dress code",
      dresscode_subtitle: "A colour for each function, if you'd like a hint.",
      dress_1_name: "Satsang & Ganesh Puja",
      dress_1_desc: "Traditional pastels & florals",
      dress_2_name: "Mehendi & Sundowner Carnival",
      dress_2_desc: "Greens and soft pinks",
      dress_3_name: "Sangeet & DJ Night",
      dress_3_desc: "Jewel tones and sparkle",
      dress_4_name: "Shubh Vivah (Wedding & Pheras)",
      dress_4_desc: "Traditional Indian, in any colour you love",

      // Venue Section
      venue_section_heading: "The Wedding Ceremony",
      venue_name: "The Grand Palace Resort & Convention Center",
      venue_address: "108 Heritage Lake Road, Near Lake Pichola, Udaipur, Rajasthan 313001",
      btn_open_maps: "OPEN IN MAPS",

      // Our Family & Thank You
      our_family_heading: "Our Family",
      family_groom_parents: "Smt. Sunita & Shri Rajesh Sharma",
      family_bride_parents: "Smt. Meena & Shri Dinesh Verma",
      family_grandparents: "With heavenly blessings from Late Shri Ram Lal Sharma & Late Smt. Kamala Devi",
      family_compliments: "All Relatives & Friends",
      thank_you_heading: "Thank You",
      thank_you_note: "Your love, laughter, and presence will make our celebration truly complete.",
      rsvp_deadline: "Please let us know by November 15, 2026",

      // RSVP Form
      rsvp_name_label: "Your Full Name",
      rsvp_guests_label: "Number of Guests Attending",
      rsvp_guests_opt1: "1 Guest",
      rsvp_guests_opt2: "2 Guests",
      rsvp_guests_opt3: "3 Guests",
      rsvp_guests_opt4: "4 Guests",
      rsvp_guests_opt5: "5+ Guests",
      rsvp_accept_label: "Joyfully Accept",
      rsvp_decline_label: "Regretfully Decline",
      rsvp_diet_label: "Dietary Preferences (Optional)",
      rsvp_diet_placeholder: "e.g. Vegetarian, Jain, Vegan...",
      rsvp_wishes_label: "Blessings & Wishes for the Couple",
      rsvp_wishes_placeholder: "Write your warm wishes here...",
      rsvp_submit_btn: "CONFIRM RSVP VIA WHATSAPP",

      // Quick Actions
      btn_share: "Share Invite",
      btn_copy_link: "Copy Link",
      btn_copy_link_copied: "Copied! ✓",
      btn_pdf: "Save as PDF",

      // Success & Footer
      rsvp_success_heading: "Thank You!",
      rsvp_success_text: "Your response and heartfelt blessings have been received with love.",
      rsvp_success_btn: "Send RSVP to Host via WhatsApp 💬",
      footer_credits: "Made with love for our family and friends",
      back_to_top: "Back to Top ↑",
      heart_venue_city: "Udaipur, Rajasthan"
    },

    gu: {
      lang_btn_text: "English",
      lang_btn_title: "Switch to English / અંગ્રેજીમાં જુઓ",

      // Tap / Hero Overlay
      tap_overlay_title: "નિમંત્રણ પત્રિકા ખોલવા માટે અહીં સ્પર્શ કરો",
      hero_tagline: "અમે લગ્નગ્રંથિથી જોડાઈ રહ્યા છીએ",
      hero_couple_names: 'આકાશ <span class="hero-ampersand">અને</span> સાક્ષી',
      hero_together_tagline: "અમારા પરિવારો સાથે, આપ સૌને અમારા સ્નેહમિલનની ઉજવણીમાં હાર્દિક આમંત્રણ આપીએ છીએ",
      hero_hashtag: "#આકાશ_સંગ_સાક્ષી",
      scroll_hint: "વધુ જોવા માટે નીચે સ્ક્રોલ કરો",

      // Blessing / Traditional Card
      blessing_header: "ૐ શ્રી ગણેશાય નમઃ",
      blessing_text: "શ્રી ગણેશજી અને અમારા પૂજ્ય પૂર્વજોના દિવ્ય આશીર્વાદથી, અમે પ્રેમ અને સ્નેહના આ પવિત્ર મંગલ પંથે પ્રયાણ કરી રહ્યા છીએ.",
      grandparents_blessings: "સ્વ. શ્રી રામલાલ શર્મા અને સ્વ. શ્રીમતી કમલાદેવીના દિવ્ય આશીર્વાદ સહ",
      host_groom_parents: "શ્રીમતી સુનિતા અને શ્રી રાજેશ શર્મા",
      son_of: "સુપુત્ર",
      groom_full_name: "આકાશ શર્મા",
      weds_text: "સંગ",
      bride_full_name: "સાક્ષી વર્મા",
      daughter_of: "સુપુત્રી",
      host_bride_parents: "શ્રીમતી મીના અને શ્રી દિનેશ વર્મા",
      formal_invitation_body: "અમારા પ્રિય સંતાનોના શુભ લગ્ન પ્રસંગે આપના સ્નેહભર્યા સાન્નિધ્ય અને મંગલ આશીર્વાદની નમ્ર પ્રાર્થના કરીએ છીએ.",
      compliments_note: "સમસ્ત શર્મા અને વર્મા પરિવાર, સ્નેહીજનો તથા મિત્રવૃંદ તરફથી ભાવભર્યું નિમંત્રણ.",

      // Scratch to Reveal
      scratch_card_title: "તારીખ જાણવા માટે સ્ક્રેચ કરો",
      scratch_card_instruction: "સુવર્ણ હૃદય પર સ્વાઇપ કરો",
      revealed_headline: "શુભ લગ્ન તારીખ",
      revealed_date_day: "૧૪",
      revealed_date_month: "ડિસેમ્બર",
      revealed_date_year: "૨૦૨૬",
      revealed_message: "અમારા જીવનની આ અવિસ્મરણીય અને મંગલ ક્ષણો આપ સહુની સાથે માણવા અમે અત્યંત ઉત્સુક છીએ!",

      // Countdown Timer
      countdown_heading: "મંગલ ઘડીની ગણતરી",
      countdown_days: "દિવસ",
      countdown_hours: "કલાક",
      countdown_mins: "મિનિટ",
      countdown_secs: "સેકન્ડ",
      countdown_subtitle: "શુભ લગ્ન ઘડી આવવા સુધી",

      // Story Milestones
      story_heading: "અમારી પ્રેમકથા",
      story_1_title: "પહેલી મુલાકાત",
      story_1_year: "ઓક્ટોબર ૨૦૨૨",
      story_1_desc: "એક સુંદર રૂફટોપ કાફેમાં અચાનક થયેલી મુલાકાત, સપનાઓ, સંગીત અને પ્રવાસની ચાર કલાકની મધુર વાતોમાં ફેરવાઈ ગઈ.",
      story_2_title: "પ્રથમ પ્રવાસ",
      story_2_year: "નવેમ્બર ૨૦૨૩",
      story_2_desc: "મુન્નારની ધુમ્મસભરી ટેકરીઓ, અચાનક વરસેલો વરસાદ અને એ અહેસાસ કે જીવનનો પ્રત્યેક પ્રવાસ હવે સાથે જ કરવો છે.",
      story_3_title: "જીવનભરનો સાથ",
      story_3_year: "ફેબ્રુઆરી ૨૦૨૫",
      story_3_desc: "ગોવાના શાંત દરિયાકિનારે, સુવર્ણ સૂર્યાસ્ત અને મોજાઓના સંગાથે આકાશે પ્રપોઝ કર્યું અને સાક્ષીએ ક્ષણનાય વિલંબ વગર હા પાડી દીધી!",
      story_4_title: "સાથે વિકાસ",
      story_4_year: "જૂન ૨૦૨૫",
      story_4_desc: "દરેક હાસ્ય, સપના અને સફરમાં અમારો સ્નેહ સંબંધ દિવસેને દિવસે વધુ ગાઢ અને મજબૂત બનતો ગયો.",
      story_5_title: "પરિવારનું મિલન",
      story_5_year: "સપ્ટેમ્બર ૨૦૨૫",
      story_5_desc: "બંને પરિવારોના મિલનથી સમગ્ર વાતાવરણ ખુશીઓ, આશીર્વાદ અને આનંદોલ્લાસથી છલકાઈ ઊઠ્યું.",
      story_6_title: "નવા જીવન તરફ",
      story_6_year: "ડિસેમ્બર ૨૦૨૬",
      story_6_desc: "અમારા સ્નેહીજનો અને મિત્રોના પ્રેમ તથા આશીર્વાદની છત્રછાયામાં જીવનના આ પવિત્ર અધ્યાયની શરૂઆત કરવા આતુર છીએ.",

      // The Celebrations
      celebrations_heading: "મંગલ ઉત્સવો",
      event_1_name: "સત્સંગ અને ગણેશ પૂજા",
      event_1_date: "શુક્રવાર, ૧૨ ડિસેમ્બર, ૨૦૨૬",
      event_1_time: "સવારે ૧૦:૦૦ થી બપોરે ૦૧:૦૦",
      event_1_venue: "ક્રિસ્ટલ બેન્ક્વેટ હોલ, ધ ગ્રાન્ડ પેલેસ",
      event_1_desc: "નવદંપતીના મંગલ ભવિષ્ય માટે પ્રભુ કૃપાની યાચના અર્થે પવિત્ર સત્સંગ અને પૂજન, ત્યારબાદ પ્રીતિભોજન.",

      event_2_name: "મહેંદી અને સનડાઉન્સર કાર્નિવલ",
      event_2_date: "શુક્રવાર, ૧૨ ડિસેમ્બર, ૨૦૨૬",
      event_2_time: "સાંજે ૦૪:૦૦ વાગ્યાથી",
      event_2_venue: "લેકસાઇડ લૉન, ધ ગ્રાન્ડ પેલેસ",
      event_2_desc: "હાથોમાં રચાતી મહેંદી, ઢોલના તાલે ઝૂમતો આનંદ, સ્વાદિષ્ટ વાનગીઓ અને સરોવર કિનારે સાંજનો ઉત્સવ.",

      event_3_name: "સંગીત સંધ્યા અને ડીજે નાઇટ",
      event_3_date: "શનિવાર, ૧૩ ડિસેમ્બર, ૨૦૨૬",
      event_3_time: "સાંજે ૦૭:૩૦ થી રાત્રિ સુધી",
      event_3_venue: "રોયલ બૉલરૂમ, ધ ગ્રાન્ડ પેલેસ",
      event_3_desc: "તારાઓની છાયામાં પારિવારિક નૃત્ય, સંગીતના સૂર અને ધમાકેદાર ઉજવણીની રોમાંચક રાત!",

      event_4_name: "શુભ વિવાહ (હસ્તમેળાપ અને ફેરા)",
      event_4_date: "રવિવાર, ૧૪ ડિસેમ્બર, ૨૦૨૬",
      event_4_time: "સાંજે ૦૬:૩૦ (જાન આગમન) | રાત્રે ૦૮:૩૦ (હસ્તમેળાપ અને સપ્તપદી)",
      event_4_venue: "શાહી મંડપમ, તળાવ કિનારે",
      event_4_desc: "પવિત્ર અગ્નિની સાક્ષીએ વૈદિક મંત્રોચ્ચાર સાથે સપ્તપદીના ફેરા, ત્યારબાદ શાહી ભોજન સમારંભ અને આશીર્વાદ.",

      btn_directions: "સ્થળનો રસ્તો જુઓ",
      btn_calendar: "કેલેન્ડરમાં ઉમેરો",

      // Dress Code
      dresscode_title: "પહેરવેશ (ડ્રેસ કોડ)",
      dresscode_subtitle: "દરેક પ્રસંગ માટે મનપસંદ રંગોની એક ઝલક",
      dress_1_name: "સત્સંગ અને ગણેશ પૂજા",
      dress_1_desc: "પરંપરાગત પેસ્ટલ અને ફ્લોરલ વસ્ત્રો",
      dress_2_name: "મહેંદી અને સનડાઉન્સર કાર્નિવલ",
      dress_2_desc: "લીલા અને ગુલાબી રંગોના વસ્ત્રો",
      dress_3_name: "સંગીત સંધ્યા અને ડીજે નાઇટ",
      dress_3_desc: "ચમકદાર અને રોયલ કલરના વસ્ત્રો",
      dress_4_name: "શુભ વિવાહ (હસ્તમેળાપ અને ફેરા)",
      dress_4_desc: "પરંપરાગત ભારતીય પરિધાન, આપના મનપસંદ રંગમાં",

      // Venue Section
      venue_section_heading: "શુભ લગ્ન સ્થળ",
      venue_name: "ધ ગ્રાન્ડ પેલેસ રિસોર્ટ અને કન્વેન્શન સેન્ટર",
      venue_address: "૧૦૮ હેરિટેજ લેક રોડ, પીછોલા તળાવ પાસે, ઉદયપુર, રાજસ્થાન ૩૧૩૦૦૧",
      btn_open_maps: "મેપમાં જુઓ",

      // Our Family & Thank You
      our_family_heading: "અમારો પરિવાર",
      family_groom_parents: "શ્રીમતી સુનિતા અને શ્રી રાજેશ શર્મા",
      family_bride_parents: "શ્રીમતી મીના અને શ્રી દિનેશ વર્મા",
      family_grandparents: "સ્વ. શ્રી રામલાલ શર્મા અને સ્વ. શ્રીમતી કમલાદેવીના દિવ્ય આશીર્વાદ સહ",
      family_compliments: "સમસ્ત સ્નેહીજનો તથા મિત્રવૃંદ",
      thank_you_heading: "આભાર દર્શન",
      thank_you_note: "આપની ઉપસ્થિતિ અને આશીર્વાદ અમારા આ ઉત્સવને પરિપૂર્ણ અને સ્મરણીય બનાવશે.",
      rsvp_deadline: "કૃપા કરીને ૧૫ નવેમ્બર, ૨૦૨૬ સુધીમાં જાણ કરશો",

      // RSVP Form
      rsvp_name_label: "આપનું પૂરું નામ",
      rsvp_guests_label: "ઉપસ્થિત રહેનાર મહેમાનોની સંખ્યા",
      rsvp_guests_opt1: "૧ મહેમાન",
      rsvp_guests_opt2: "૨ મહેમાનો",
      rsvp_guests_opt3: "૩ મહેમાનો",
      rsvp_guests_opt4: "૪ મહેમાનો",
      rsvp_guests_opt5: "૫+ મહેમાનો",
      rsvp_accept_label: "આનંદપૂર્વક ઉપસ્થિત રહીશું",
      rsvp_decline_label: "દિલગીરી સાથે અસમર્થ છીએ",
      rsvp_diet_label: "ભોજનની પસંદગી (વૈકલ્પિક)",
      rsvp_diet_placeholder: "દા.ત. શુદ્ધ શાકાહારી, જૈન...",
      rsvp_wishes_label: "નવદંપતી માટે શુભકામનાઓ અને આશીર્વાદ",
      rsvp_wishes_placeholder: "અહીં આપના સ્નેહભર્યા આશીર્વાદ લખો...",
      rsvp_submit_btn: "વોટ્સએપ દ્વારા પુષ્ટિ કરો",

      // Quick Actions
      btn_share: "નિમંત્રણ શેર કરો",
      btn_copy_link: "લિંક કોપી કરો",
      btn_copy_link_copied: "કોપી થઈ ગયું! ✓",
      btn_pdf: "પીડીએફ સાચવો",

      // Success & Footer
      rsvp_success_heading: "આભાર!",
      rsvp_success_text: "આપનો પ્રતિસાદ અને સ્નેહભર્યા આશીર્વાદ પ્રેમપૂર્વક સ્વીકારવામાં આવ્યા છે.",
      rsvp_success_btn: "વોટ્સએપ દ્વારા હોસ્ટને આરએસવીપી મોકલો 💬",
      footer_credits: "અમારા પરિવાર અને સ્નેહીજનો માટે સ્નેહપૂર્વક નિર્મિત",
      back_to_top: "ટોચ પર જાઓ ↑",
      heart_venue_city: "ઉદયપુર, રાજસ્થાન"
    }
  };

  window.CARD_TRANSLATIONS = TRANSLATIONS;

  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    window.CURRENT_LANG = lang;
    const t = TRANSLATIONS[lang];

    // 1. Update HTML document lang attribute & body class for typography
    document.documentElement.lang = lang;
    if (lang === 'gu') {
      document.body.classList.add('lang-gu');
    } else {
      document.body.classList.remove('lang-gu');
    }

    // 2. Update language switcher button text and title
    const langBtnText = document.getElementById('langSwitchText');
    const langBtn = document.getElementById('langSwitchBtn');
    if (langBtnText) langBtnText.textContent = t.lang_btn_text;
    if (langBtn) {
      langBtn.title = t.lang_btn_title;
      langBtn.setAttribute('aria-label', t.lang_btn_title);
    }

    // 3. Update all elements mapped via data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t[key];
        } else {
          el.innerHTML = t[key];
        }
      }
    });

    // 4. Update form dropdown option labels
    const countSelect = document.getElementById('guestCount');
    if (countSelect && countSelect.options.length >= 5) {
      countSelect.options[0].text = t.rsvp_guests_opt1;
      countSelect.options[1].text = t.rsvp_guests_opt2;
      countSelect.options[2].text = t.rsvp_guests_opt3;
      countSelect.options[3].text = t.rsvp_guests_opt4;
      countSelect.options[4].text = t.rsvp_guests_opt5;
    }

    const attendSelect = document.getElementById('attendanceSelect');
    if (attendSelect && attendSelect.options.length >= 2) {
      attendSelect.options[0].text = t.rsvp_accept_label;
      attendSelect.options[1].text = t.rsvp_decline_label;
    }

    // 5. Update Scratch Card Heading state if already revealed
    const scratchStage = document.querySelector('.pure-heart-stage');
    const scratchHeading = document.getElementById('scratchHeading');
    if (scratchStage && scratchHeading) {
      if (scratchStage.classList.contains('revealed')) {
        scratchHeading.textContent = t.revealed_headline;
      } else {
        scratchHeading.textContent = t.scratch_card_title;
      }
    }

    // 6. Update action buttons text
    document.querySelectorAll('.event-btn.directions').forEach((btn) => {
      const svg = btn.querySelector('svg');
      btn.innerHTML = '';
      if (svg) btn.appendChild(svg);
      btn.appendChild(document.createTextNode(' ' + t.btn_directions));
    });

    document.querySelectorAll('.event-btn.calendar').forEach((btn) => {
      const svg = btn.querySelector('svg');
      btn.innerHTML = '';
      if (svg) btn.appendChild(svg);
      btn.appendChild(document.createTextNode(' ' + t.btn_calendar));
    });

    // 7. Update bottom action buttons (Share, Copy, PDF)
    const shareBtn = document.getElementById('shareInviteBtn');
    if (shareBtn) {
      const svg = shareBtn.querySelector('svg');
      shareBtn.innerHTML = '';
      if (svg) shareBtn.appendChild(svg);
      shareBtn.appendChild(document.createTextNode(' ' + t.btn_share));
    }

    const copyBtn = document.getElementById('copyInviteLinkBtn');
    if (copyBtn) {
      const svg = copyBtn.querySelector('svg');
      copyBtn.innerHTML = '';
      if (svg) copyBtn.appendChild(svg);
      copyBtn.appendChild(document.createTextNode(' ' + t.btn_copy_link));
    }

    const pdfBtn = document.getElementById('savePdfBtn');
    if (pdfBtn) {
      const svg = pdfBtn.querySelector('svg');
      pdfBtn.innerHTML = '';
      if (svg) pdfBtn.appendChild(svg);
      pdfBtn.appendChild(document.createTextNode(' ' + t.btn_pdf));
    }

    // 8. Update Open Maps Button
    const mapsBtn = document.querySelector('.maps-pulse-btn');
    if (mapsBtn) {
      const svg = mapsBtn.querySelector('svg');
      mapsBtn.innerHTML = '';
      if (svg) mapsBtn.appendChild(svg);
      mapsBtn.appendChild(document.createTextNode(' ' + t.btn_open_maps));
    }

    // 9. Update RSVP Submit Button
    const rsvpBtn = document.querySelector('.rsvp-submit-btn');
    if (rsvpBtn) {
      const span = rsvpBtn.querySelector('span');
      if (span) span.textContent = t.rsvp_submit_btn;
      else rsvpBtn.textContent = t.rsvp_submit_btn;
    }

    // 10. Update Tap Overlay Tooltip
    const tapOverlay = document.getElementById('videoTapOverlay');
    if (tapOverlay) {
      tapOverlay.title = t.tap_overlay_title;
    }

    // Broadcast event for any other module
    window.dispatchEvent(new CustomEvent('languageSwitched', { detail: { lang } }));
  }

  // Toggle Function
  function toggleLanguage() {
    const targetLang = (window.CURRENT_LANG === 'gu') ? 'en' : 'gu';
    applyLanguage(targetLang);

    // Visual pulse feedback on button
    const btn = document.getElementById('langSwitchBtn');
    if (btn) {
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 180);
    }
  }

  // Bind Switcher Button
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langSwitchBtn');
    if (btn) {
      btn.addEventListener('click', toggleLanguage);
    }
  });

  // Export globally
  window.applyLanguage = applyLanguage;
  window.toggleLanguage = toggleLanguage;
})();
