import { ItineraryDay, ChecklistItemData, TaxiCardData, HotelData, ShoppingItem } from './types';

export const ITINERARY_DATA: ItineraryDay[] = [
  {
    day: 1,
    date: "2/16 (Mon)",
    title: "啟程：初見京都與味蕾探險",
    theme: "arrival",
    highlights: ["錦市場", "因幡堂(動物御守)", "新風館", "京的燒肉處 弘"],
    spotGuide: "【錦市場】被稱為「京都的廚房」，有400年的歷史。這裡可以買到各式各樣的京都漬物、玉子燒、豆乳甜甜圈，是體驗在地食文化最好的地方。\n\n【平等寺 因幡堂】隱身在巷弄裡的千年古剎，以祈求「健康、抗癌」聞名。近期因為「文鳥」與「貓咪」造型的御守太過可愛而在網路上爆紅，是貓奴鳥奴必朝聖之地。",
    schedule: [
      { time: "07:30", activity: "桃園機場起飛 (TPE)", type: "plane", note: "VietJet VZ566 | 07:30 - 11:00", location: "Taoyuan Airport" },
      { time: "11:00", activity: "抵達關西機場 (KIX)", type: "transport", note: "入境審查、領取行李", location: "Kansai International Airport" },
      { time: "13:00", activity: "抵達京都住宿 (伏見區)", type: "hotel", note: "包車約90分。住宿點距離 JR 稻荷站步行約 5 分鐘。", location: "Fushimi Inari Area" },
      { time: "14:00", activity: "前往市區：四條河原町", type: "transport", note: "步行至京阪「伏見稻荷」→「祇園四條」。", location: "Gion-Shijo Station" },
      { time: "14:30", activity: "錦市場 (Nishiki Market)", type: "food", note: "必吃：三木雞卵、豆乳甜甜圈、章魚蛋串。店家約17:00打烊，建議先逛。", location: "Nishiki Market" },
      { time: "15:45", activity: "平等寺 因幡堂", type: "sightseeing", note: "走路約10分。祈求健康，購買超可愛的「六貓」或「文鳥」御守 (只到17:00)。", location: "Byodoji Inabado" },
      { time: "16:30", activity: "新風館 (ShinPuhKan)", type: "shopping", note: "由隈研吾設計的絕美商場。推薦逛：BEAMS JAPAN、Pilgrim Surf+Supply。", location: "ShinPuhKan" },
      { time: "17:45", activity: "散步前往晚餐", type: "walk", note: "途經 KAPITAL Kyoto (傳統町家建築，必看)。享受三條通的氛圍。", location: "KAPITAL KYOTO" },
      { time: "19:00", activity: "晚餐：京的燒肉處 弘", type: "food", note: "三條木屋町店 (已預約)。鴨川旁氣氛佳。", location: "Kyoto Yakiniku Hiro Sanjo Kiyamachi" },
      { time: "21:00", activity: "返回住宿", type: "transport", note: "京阪電車回「伏見稻荷站」或「龍谷大前深草」。", location: "Fushimi Inari Station" },
    ]
  },
  {
    day: 2,
    date: "2/17 (Tue)",
    title: "千本鳥居的祈福與微醺午後",
    theme: "kyoto",
    highlights: ["千本鳥居", "三得利啤酒廠", "The Premium Malt's"],
    spotGuide: "【伏見稻荷大社】全日本三萬座稻荷神社的總本宮，供奉掌管五穀豐收與生意興隆的神明。\n\n【三得利京都啤酒廠】The Premium Malt's 的故鄉。這裡使用京都西山的天然水釀造啤酒。參觀行程包含製程見學，最棒的是最後可以免費試飲剛釀好的頂級啤酒！",
    schedule: [
      { time: "08:30", activity: "前往伏見稻荷大社", type: "sightseeing", note: "住宿點步行即可抵達。建議早起避開人潮。", location: "Fushimi Inari Taisha" },
      { time: "10:00", activity: "稻荷山散策", type: "walk", note: "視體力決定是否登頂，沿途有許多茶屋可休息。", location: "Mount Inari" },
      { time: "12:00", activity: "午餐：鰻魚飯 / 烏龍麵", type: "food", note: "祢ざめ家 (Nezameya) 或周邊小吃。", location: "Nezameya" },
      { time: "13:30", activity: "移動至長岡京", type: "transport", note: "JR稻荷站 → 京都站轉乘 → JR長岡京站 (約30分)。", location: "JR Nagaokakyo Station" },
      { time: "14:30", activity: "搭乘接駁車", type: "transport", note: "從車站東口搭乘免費接駁巴士前往工廠。", location: "Suntory Shuttle Bus Stop" },
      { time: "15:00", activity: "三得利啤酒工廠見學", type: "sightseeing", note: "【需預約】天然水啤酒導覽 (70分鐘)。含試飲 The Premium Malts。", location: "Suntory Kyoto Brewery" },
      { time: "17:00", activity: "返回京都晚餐", type: "transport", note: "搭接駁車回車站，返回京都站周邊用餐。", location: "Kyoto Station" },
    ]
  },
  {
    day: 3,
    date: "2/18 (Wed)",
    title: "漫步古都：清水舞台與宇治茶香",
    theme: "kyoto",
    highlights: ["清水舞台", "宇治平等院", "抹茶甜點"],
    spotGuide: "本日提供兩種方案：\nPlan A 為經典京都散步路線，但坡道較多，體力消耗較大。\nPlan B 為金閣寺路線，較輕鬆舒適，移動距離稍長。\n\n【宇治】抹茶的故鄉。這裡的「平等院鳳凰堂」因為太美了，被刻在日幣10元硬幣上，千萬別忘了拿硬幣合照！",
    schedule: [], // This will be overriden by options
    options: [
      {
        id: "plan_a",
        label: "Plan A",
        subLabel: "清水寺經典",
        title: "清水寺、祇園與宇治抹茶",
        highlights: ["清水舞台 (經典)", "二三年坂", "祇園"],
        spotGuide: "【清水寺】京都最古老的寺院。著名的「清水舞台」懸空建於懸崖上，結構未使用一根釘子，是日本國寶級建築。二三年坂的石疊小路充滿古都風情，但人潮較多。",
        schedule: [
          { time: "09:00", activity: "清水寺 & 二、三年坂", type: "sightseeing", note: "建議直接搭計程車到門口，省去爬坡體力。", location: "Kiyomizu-dera" },
          { time: "12:30", activity: "祇園 / 花見小路", type: "walk", note: "午餐：親子丼或烏龍麵。", location: "Hanamikoji Street" },
          { time: "14:30", activity: "前往宇治", type: "transport", note: "京阪電車：「祇園四條」→「中書島」轉車→「宇治」。", location: "Uji Station (Keihan)" },
          { time: "15:00", activity: "平等院 & 表參道", type: "sightseeing", note: "必吃：中村藤吉或伊藤久右衛門抹茶甜點。", location: "Byodoin Temple" },
          { time: "18:00", activity: "返回住宿/晚餐", type: "food", note: "宇治周邊或回伏見吃。", location: "Fushimi Inari" },
        ]
      },
      {
        id: "plan_b",
        label: "Plan B",
        subLabel: "金閣寺悠閒",
        title: "金閣寺、京都車站與宇治",
        highlights: ["金閣寺 (華麗)", "京都車站美食", "宇治"],
        spotGuide: "【金閣寺】正式名稱為鹿苑寺。舍利殿的外牆全以金箔裝飾，倒映在鏡湖池中極為華麗。園區較平坦，適合長輩慢慢散步。\n午餐安排在京都車站，選擇多樣且舒適。",
        schedule: [
          { time: "09:00", activity: "前往金閣寺", type: "transport", note: "建議從住宿處直接搭計程車前往，最省力。", location: "Kinkaku-ji" },
          { time: "09:40", activity: "金閣寺 (鹿苑寺)", type: "sightseeing", note: "參觀金碧輝煌的舍利殿，享用金箔抹茶冰淇淋。", location: "Kinkaku-ji" },
          { time: "11:00", activity: "前往京都車站", type: "transport", note: "搭乘計程車前往 (約20-30分)。", location: "Kyoto Station" },
          { time: "11:30", activity: "午餐：伊勢丹/Porta", type: "food", note: "京都車站內選擇多 (推薦：東洋亭漢堡排、和幸豬排)。", location: "Kyoto Station Building" },
          { time: "13:15", activity: "前往宇治", type: "transport", note: "搭乘 JR 奈良線 (快速) 直達宇治 (約20分)。", location: "JR Uji Station" },
          { time: "14:00", activity: "宇治平等院 & 散策", type: "sightseeing", note: "參觀鳳凰堂，表參道買伴手禮，時間比Plan A更充裕。", location: "Byodoin Temple" },
          { time: "17:30", activity: "晚餐：宇治 / 伏見", type: "food", note: "視飢餓程度決定用餐地點。", location: "Fushimi Inari" },
        ]
      }
    ]
  },
  {
    day: 4,
    date: "2/19 (Thu)",
    title: "穿越時空：太陽之塔與道頓堀之夜",
    theme: "osaka",
    highlights: ["太陽之塔", "NIFREL 活體博物館", "梅田購物", "道頓堀"],
    spotGuide: "【太陽之塔】1970年大阪萬博的地標，由藝術家岡本太郎設計。造型前衛奇特，親眼見到會被它的巨大給震撼。\n\n【道頓堀】大阪最熱鬧的區域，巨大的固力果跑跑人看板是必拍地標。這裡充滿了誇張的立體招牌（螃蟹、餃子、章魚），是感受大阪熱情活力的最佳去處。",
    schedule: [
      { time: "09:30", activity: "退房 & 前往大阪", type: "transport", note: "走到「JR稻荷站」→「京都」→搭新快速至「大阪站」。", location: "Osaka Station" },
      { time: "10:40", activity: "寄放行李 (JR大阪站)", type: "info", note: "地點：1F Crosta Osaka。人工寄放，兩手空空去玩！", location: "Crosta Osaka" },
      { time: "11:00", activity: "前往 萬博紀念公園", type: "transport", note: "地鐵+單軌電車：御堂筋線「梅田」→「千里中央」轉單軌。", location: "Expo '70 Commemorative Park" },
      { time: "12:00", activity: "午餐：Lalaport EXPOCITY", type: "food", note: "推薦金子半之助或美食街。可逛 NIFREL (活體博物館)。", location: "Lalaport EXPOCITY" },
      { time: "13:30", activity: "太陽之塔", type: "sightseeing", note: "與地標合照 (進內部需預約)。", location: "Tower of the Sun" },
      { time: "16:00", activity: "返回大阪市區 Check-in", type: "hotel", note: "取回行李，前往大阪住宿 (西成區)。", location: "Osaka" },
      { time: "17:00", activity: "自由活動：梅田商圈", type: "shopping", note: "【體力充沛組】前往梅田 Lucua / Grand Front 逛街。", location: "Umeda" },
      { time: "17:00", activity: "飯店休息", type: "free", note: "【悠閒組】在民宿休息，或探索住宿周邊。", location: "Accommodation" },
      { time: "19:30", activity: "晚餐：道頓堀 & 心齋橋", type: "food", note: "【全員集合】固力果跑跑人合照。晚餐：一蘭、大阪燒或蟹道樂。", location: "Dotonbori Glico Man" },
    ]
  },
  {
    day: 5,
    date: "2/20 (Fri)",
    title: "洋風漫遊：北野異人館與堀江散策",
    theme: "kobe",
    highlights: ["神戶牛午餐", "北野異人館", "Orange Street"],
    spotGuide: "【北野異人館】明治開港時期外國人居住的洋房區，保留了濃濃的歐洲風情，連這裡的星巴克都是百年的美國木造大宅改建。\n\n【堀江 Orange Street】不同於心齋橋的擁擠，這裡是大阪「裏原宿」，街道寬敞舒適，充滿文青咖啡店與潮流選物店，是品味人士的最愛。",
    schedule: [
      { time: "10:00", activity: "前往神戶 (三宮)", type: "transport", note: "阪神電車：從難波搭「快速急行」直達。", location: "Kobe-Sannomiya Station" },
      { time: "11:00", activity: "北野異人館街", type: "sightseeing", note: "漫步歐式建築群，風見雞之館拍照。", location: "Kitano Ijinkan-gai" },
      { time: "13:00", activity: "午餐：神戶牛鐵板燒", type: "food", note: "建議預約：Mouriya 或 石田屋。", location: "Mouriya Sannomiya" },
      { time: "15:00", activity: "舊居留地 & 南京町", type: "walk", note: "街道寬敞舒適。順路逛 Beams House 神戶店。", location: "Kobe Motomachi" },
      { time: "18:00", activity: "返回大阪 & 堀江逛街", type: "shopping", note: "亮點：Orange Street。必逛 Supreme, BAPE, LHP (thisisneverthat)。", location: "Orange Street Osaka" },
      { time: "20:00", activity: "晚餐：難波/心齋橋", type: "food", note: "周邊自由覓食，享受大阪夜生活。", location: "Dotonbori" },
    ]
  },
  {
    day: 6,
    date: "2/21 (Sat)",
    title: "昭和懷舊：新世界與海邊購物時光",
    theme: "osaka",
    highlights: ["木津市場海鮮", "通天閣串炸", "臨空城 Outlet"],
    spotGuide: "【新世界 & 通天閣】這裡保留了100年前「昭和時代」的老大阪風情。色彩誇張的招牌、巨大的河豚燈籠，是拍照的好地方。\n\n【串炸】大阪的靈魂美食，記得「禁止二次沾醬 (二度漬け禁止)」的規矩喔！",
    schedule: [
      { time: "09:00", activity: "木津市場 (Kizu Market)", type: "food", note: "早餐：新鮮海鮮丼、當季水果。", location: "Osaka Kizu Wholesale Market" },
      { time: "11:00", activity: "通天閣 / 新世界", type: "sightseeing", note: "體驗昭和懷舊感，必吃「串炸」。", location: "Tsutenkaku" },
      { time: "13:30", activity: "前往 Rinku Premium Outlets", type: "transport", note: "南海電鐵：「天下茶屋」→「Rinku Town」。", location: "Rinku Premium Outlets" },
      { time: "14:00", activity: "Outlet 逛街大採購", type: "shopping", note: "海景 Outlet，運動品牌、日系服飾最後衝刺。", location: "Rinku Premium Outlets" },
      { time: "19:00", activity: "返回難波飯店", type: "transport", note: "整理行李，準備明日返程。", location: "Namba Station" },
    ]
  },
  {
    day: 7,
    date: "2/22 (Sun)",
    title: "完美句點：滿載回憶與伴手禮",
    theme: "departure",
    highlights: ["機場免稅店", "搭機"],
    spotGuide: "【關西機場】最後的衝刺點。管制區內的免稅店可以買到全日本的知名伴手禮，如北海道的白色戀人、東京香蕉等，不用擔心行李重量，買完直接上飛機！",
    schedule: [
      { time: "09:00", activity: "退房 & 前往機場", type: "transport", note: "搭乘南海電鐵特急 Rapit (建議先預約)。", location: "Namba Station" },
      { time: "10:00", activity: "抵達機場報到", type: "info", note: "辦理登機手續、托運。", location: "Kansai International Airport" },
      { time: "10:30", activity: "機場免稅店/午餐", type: "shopping", note: "購買白色戀人、ROYCE等伴手禮。", location: "KIX Duty Free" },
      { time: "12:00", activity: "搭機返台", type: "plane", note: "VietJet VZ567 | 12:00 - 14:15", location: "Kansai International Airport" },
    ]
  }
];

export const CHECKLIST_DATA: ChecklistItemData[] = [
  { id: 1, item: "護照 (有效期限6個月以上)", category: "document", important: true },
  { id: 2, item: "機票電子檔 (VZ566/VZ567)", category: "document", important: true },
  { id: 3, item: "VJW (Visit Japan Web) 截圖", category: "document", important: true },
  { id: 4, item: "網卡 / E-SIM 設定 QR Code", category: "gadget" },
  { id: 5, item: "西瓜卡 / ICOCA (iPhone可先加)", category: "gadget" },
  { id: 6, item: "日幣現金 (主要用於小店/儲值)", category: "money", important: true },
  { id: 7, item: "個人常備藥品", category: "clothing" },
  { id: 8, item: "保暖衣物 (2月關西仍冷)", category: "clothing" },
  { id: 9, item: "行動電源 & 充電線", category: "gadget" },
  { id: 10, item: "信用卡 (JCB/Visa)", category: "money" },
];

export const TAXI_CARDS: TaxiCardData[] = [
  { label: "關西機場 (KIX)", jp: "関西国際空港までお願いします。", cn: "請帶我去關西國際機場", type: "transport" },
  { label: "京都住宿 (伏見)", jp: "〒612-0005 京都市伏見区深草森吉町6-23 までお願いします。", cn: "請帶我去這個地址 (京都伏見)", type: "hotel" },
  { label: "大阪住宿 (JS暁宅・清音)", jp: "〒557-0031 大阪市西成区鶴見橋2丁目11-17 までお願いします。", cn: "請帶我去這個地址 (大阪西成)", type: "hotel" },
  { label: "清水寺", jp: "清水寺（きよみずでら）の入り口までお願いします。", cn: "請帶我去清水寺的入口 (避免爬坡)", type: "sightseeing" },
  { label: "金閣寺", jp: "金閣寺（きんかくじ）の入り口までお願いします。", cn: "請帶我去金閣寺 (Plan B)", type: "sightseeing" },
  { label: "大阪 梅田站", jp: "JR大阪駅（うめだ）までお願いします。", cn: "請帶我去JR大阪站", type: "transport" },
  { label: "萬博公園 (太陽之塔)", jp: "万博記念公園（ばんぱくきねんこうえん）までお願いします。", cn: "請帶我去萬博紀念公園", type: "sightseeing" },
];

export const HOTEL_INFO: HotelData[] = [
  { 
    city: "京都 Kyoto", 
    name: "京蘭 【柳月邸】", 
    address: "〒612-0005 京都府京都市伏見区深草森吉町6-23", 
    phone: "請確認訂房紀錄",
    note: "近 JR 稻荷站 (步行6分) / 京阪 伏見稻荷站" 
  },
  { 
    city: "大阪 Osaka", 
    name: "JS暁宅・清音", 
    address: "〒557-0031 大阪府大阪市西成区鶴見橋2丁目11-17", 
    phone: "請確認訂房紀錄",
    note: "退房後寄放行李" 
  }
];

export const SHOPPING_LIST: ShoppingItem[] = [
  { day: "Day 1", area: "京都 新風館", items: ["BEAMS JAPAN (限定商品)", "Pilgrim Surf+Supply", "KAPITAL (傳統工藝風)"] },
  { day: "Day 3", area: "宇治", items: ["中村藤吉 抹茶甜點", "伊藤久右衛門 伴手禮"] },
  { day: "Day 5", area: "大阪 堀江", items: ["Supreme (潮流)", "BAPE (潮流)", "LHP (thisisneverthat)", "古著店"] },
  { day: "Day 6", area: "臨空城 Outlet", items: ["Nike / Adidas", "日系服飾 (Beams/United Arrows)", "Le Creuset 鑄鐵鍋"] },
  { day: "Day 7", area: "機場免稅店", items: ["白色戀人", "ROYCE 生巧克力", "東京香蕉", "獺祭 (清酒)"] },
];