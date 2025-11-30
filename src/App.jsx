import React, { useState, useEffect, useRef } from 'react';
// 導入 Lucide Icons 用於交通模式和 UI 裝飾
import { Sun, CloudRain, TrainFront, CableCar, BusFront, Map, ArrowRight, Home, CarFront, Users, Building2, CalendarDays, Mountain, Clock, Plane, Hotel, MapPin, ExternalLink, ScrollText, Landmark, ShoppingBag, Ship, MapPinned, Route, Ticket, LocateFixed } from 'lucide-react'; 

// =========================================================================
// 新增/擴展數據 1: 飯店住宿資訊 (使用最新的飯店名稱和地圖連結)
// =========================================================================

// 備註: 這裡使用 mapLink 來儲存使用者提供的 Google Map App 連結 (maps.app.goo.gl)
const ACCOMMODATION_DATA = [
  {
    base: "琉森 (Lucerne)",
    dates: "12/28 - 12/29 (1 晚)",
    hotelName: "霍夫加藤盧澤恩酒店",
    address: "請點擊地圖連結導航", 
    mapLink: "https://maps.app.goo.gl/1z5u3vicojZXh6FKA",
  },
  {
    base: "因特拉肯 (Interlaken)",
    dates: "12/29 - 1/2 (4 晚)",
    hotelName: "Carlton-Europe Vintage Adults Hotel",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/TjCkNKc9gGn3YoLf9",
  },
  {
    base: "策馬特 (Zermatt)",
    dates: "1/2 - 1/4 (2 晚)",
    hotelName: "Airbnb",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/dvmDiEx8wZsTmcuG8",
  },
  {
    base: "米蘭 (Milan)",
    dates: "1/4 - 1/5 (1 晚)", 
    hotelName: "希爾頓米蘭酒店",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/AoayDYHESzJj95uE7",
  },
  {
    base: "威尼斯 (Venice)",
    dates: "1/5 - 1/8 (3 晚)", 
    hotelName: "加州CHIARETTA豪華公寓",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/Dry8WXeZ2VUckLd59",
  },
  {
    base: "佛羅倫斯 (Florence)",
    dates: "1/8 - 1/12 (4 晚)", 
    hotelName: "Chic Stay Boutique Apartments",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/5CLL1KTzSETMTEWMA",
  },
  {
    base: "羅馬 (Rome)",
    dates: "1/12 - 1/16 (4 晚)", 
    hotelName: "Circle6 Rome",
    address: "請點擊地圖連結導航",
    mapLink: "https://maps.app.goo.gl/Tt9TqC2znfv6fwfj9",
  },
];

/**
 * 輔助函數：根據地址或連結產生 Google Maps URL
 * 由於使用者提供了直接的 maps.app.goo.gl 連結，我們直接使用該連結。
 * @param {string} mapLink 飯店地圖連結
 * @returns {string} Google Maps URL
 */
const generateGoogleMapsUrl = (mapLink) => {
  return mapLink && mapLink.startsWith('http') ? mapLink : '#';
};


// =========================================================================
// 數據 2: 因特拉肯當日行程 (保持不變)
// =========================================================================
const ITINERARIES = [
  // 晴天方案 (Sunny Itineraries S1-S6)
  {
    id: "S1",
    type: "Sunny",
    title: "少女峰、溫根",
    brief: "登頂歐洲之巔，欣賞壯闊冰川。",
    totalTime: "約 2 小時 – 2 小時 10 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Lauterbrunnen/Grindelwald", time: "30-40 分鐘", transfer: true },
      { mode: "火車", from: "Lauterbrunnen/Grindelwald", to: "Kleine Scheidegg", time: "50-60 分鐘", transfer: true },
      { mode: "火車 (齒輪)", from: "Kleine Scheidegg", to: "Jungfraujoch", time: "30 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "因特拉肯東站", url: "https://www.google.com/maps/search/?api=1&query=Interlaken+Ost+train+station" },
      { name: "Kleine Scheidegg", url: "https://maps.google.com/maps?q=Kleine+Scheidegg" }
    ]
  },
  {
    id: "S2",
    type: "Sunny",
    title: "雪朗峰、米倫、瀑布鎮",
    brief: "007電影場景，懸崖步道和高山小鎮。",
    totalTime: "約 1 小時 30 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Lauterbrunnen", time: "20 分鐘", transfer: true },
      { mode: "纜車", from: "Lauterbrunnen", to: "Grütschalp", time: "4 分鐘", transfer: true },
      { mode: "火車", from: "Grütschalp", to: "Mürren", time: "15 分鐘", transfer: true },
      { mode: "纜車", from: "Mürren", to: "Schilthorn", time: "20 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "瀑布鎮車站 (Lauterbrunnen)", url: "https://www.google.com/maps/search/?api=1&query=Lauterbrunnen+train+station" },
      { name: "Mürren BLM", url: "https://maps.google.com/maps?q=Mürren+BLM" }
    ]
  },
  {
    id: "S3",
    type: "Sunny",
    title: "First、格林德瓦",
    brief: "刺激的懸崖步道和高山活動中心。",
    totalTime: "約 1 小時 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Grindelwald", time: "35 分鐘", transfer: true },
      { mode: "纜車", from: "Grindelwald", to: "Grindelwald First", time: "25 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "格林德瓦車站", url: "https://www.google.com/maps/search/?api=1&query=Grindelwald+train+station" },
      { name: "Grindelwald First 纜車站", url: "https://maps.google.com/maps?q=Grindelwald+First+Gondola" }
    ]
  },
  {
    id: "S4",
    type: "Sunny",
    title: "厄希嫩湖、藍湖",
    brief: "夢幻高山湖泊，體驗湖畔划船或健行。",
    totalTime: "約 1 小時 15 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Spiez", time: "20 分鐘", transfer: true },
      { mode: "火車", from: "Spiez", to: "Kandersteg", time: "35 分鐘", transfer: true },
      { mode: "步行/巴士", from: "Kandersteg 車站", to: "纜車站", time: "5 分鐘", transfer: true },
      { mode: "纜車", from: "纜車站", to: "Oeschinensee", time: "15 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "Kandersteg 車站", url: "https://www.google.com/maps/search/?api=1&query=Kandersteg+train+station" },
      { name: "Spiez 車站", url: "https://maps.google.com/maps?q=Spiez+train+station" }
    ]
  },
  {
    id: "S5",
    type: "Sunny",
    title: "Gelmerbahn、Gelmersee",
    brief: "世界最陡的開放式纜車，冰川湖泊探險。",
    totalTime: "約 1 小時 15 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Meiringen", time: "30 分鐘", transfer: true },
      { mode: "火車", from: "Meiringen", to: "Innertkirchen", time: "15 分鐘", transfer: true },
      { mode: "巴士", from: "Innertkirchen", to: "Gelmerbahn", time: "10 分鐘", transfer: true },
      { mode: "纜車", from: "Gelmerbahn", to: "Gelmersee", time: "7 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "Innertkirchen 車站", url: "https://www.google.com/maps/search/?api=1&query=Innertkirchen+train+station" },
      { name: "Meiringen 車站", url: "https://maps.google.com/maps?q=Meiringen+train+station" }
    ]
  },
  {
    id: "S6",
    type: "Sunny",
    title: "Niederhorn 山、圖恩湖遊船",
    brief: "俯瞰圖恩湖全景，搭配舒適遊船體驗。",
    totalTime: "約 1 小時 30 分鐘 (上山)",
    segments: [
      { mode: "巴士/船", from: "Interlaken Ost", to: "Beatenbucht", time: "40 分鐘", transfer: true },
      { mode: "纜車", from: "Beatenbucht", to: "Niederhorn", time: "20 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "Beatenbucht 纜車站", url: "https://www.google.com/maps/search/?api=1&query=Beatenbucht+cable+car+station" },
      { name: "Interlaken West 碼頭", url: "https://maps.google.com/maps?q=Interlaken+West+ship+pier" }
    ]
  },

  // 雨天方案 (Rainy Itineraries R1-R6)
  {
    id: "R1",
    type: "Rainy",
    title: "布里恩茨湖遊船",
    brief: "享受悠閒的湖光山色，避開惡劣天氣。",
    totalTime: "約 1 小時 20 分鐘 (遊船)",
    segments: [
      { mode: "遊船", from: "Interlaken Ost", to: "Brienz", time: "1 小時 20 分鐘", transfer: true },
      { mode: "火車", from: "Brienz", to: "Interlaken", time: "20 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "因特拉肯東站碼頭", url: "https://www.google.com/maps/search/?api=1&query=Interlaken+Ost+ship+pier" },
      { name: "Brienz 碼頭/車站", url: "https://maps.google.com/maps?q=Brienz+pier+train+station" }
    ]
  },
  {
    id: "R2",
    type: "Rainy",
    title: "伯恩市區深度遊 & 愛因斯坦故居",
    brief: "在伯恩中世紀拱廊避雨，參觀故居。",
    totalTime: "約 1 小時 10 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Bern", time: "55 分鐘", transfer: true },
      { mode: "步行", from: "Bern 火車站", to: "愛因斯坦故居", time: "約 15 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "伯恩火車總站", url: "https://www.google.com/maps/search/?api=1&query=Bern+Bahnhof" },
      { name: "愛因斯坦故居", url: "https://maps.google.com/maps?q=Einstein+House+Bern" }
    ]
  },
  {
    id: "R3",
    type: "Rainy",
    title: "Gruyères (起司/巧克力工廠)",
    brief: "參觀著名的起司和巧克力生產地。",
    totalTime: "約 2 小時 30 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Spiez", time: "20 分鐘", transfer: true },
      { mode: "火車", from: "Spiez", to: "Montbovon", time: "1 小時 30 分鐘", transfer: true },
      { mode: "火車", from: "Montbovon", to: "Gruyères", time: "10 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "Gruyères 車站", url: "https://www.google.com/maps/search/?api=1&query=Gruyères+train+station" },
      { name: "Montbovon 車站", url: "https://maps.google.com/maps?q=Montbovon+train+station" }
    ]
  },
  {
    id: "R4",
    type: "Rainy",
    title: "巴塞爾 (Basel) 美術館",
    brief: "歐洲文化之都，沉浸在豐富的藝術氛圍中。",
    totalTime: "約 2 小時 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Basel SBB", time: "2 小時", transfer: false }
    ],
    mapLinks: [
      { name: "巴塞爾 SBB 車站", url: "https://www.google.com/maps/search/?api=1&query=Basel+SBB+train+station" }
    ]
  },
  {
    id: "R5",
    type: "Rainy",
    title: "圖恩 (Thun) 城堡與市區",
    brief: "參觀歷史悠久的城堡和美麗的圖恩市區。",
    totalTime: "約 30 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Thun", time: "30 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "圖恩火車站", url: "https://www.google.com/maps/search/?api=1&query=Thun+train+station" },
      { name: "圖恩城堡", url: "https://maps.google.com/maps?q=Thun+Castle" }
    ]
  },
  {
    id: "R6",
    type: "Rainy",
    title: "Stoos 小鎮 (世界最陡纜車)",
    brief: "體驗世界之最的纜車，欣賞雲霧中的山景。",
    totalTime: "約 3 小時 – 3 小時 15 分鐘 (單程)",
    segments: [
      { mode: "火車", from: "Interlaken Ost", to: "Luzern", time: "1 小時 50 分鐘", transfer: true },
      { mode: "火車", from: "Luzern", to: "Schwyz", time: "40 分鐘", transfer: true },
      { mode: "巴士", from: "Schwyz", to: "Stoosbahn Schwyz", time: "15 分鐘", transfer: true },
      { mode: "纜車", from: "Stoosbahn", to: "Stoos Village", time: "7 分鐘", transfer: false }
    ],
    mapLinks: [
      { name: "Schwyz 車站", url: "https://www.google.com/maps/search/?api=1&query=Schwyz+train+station" },
      { name: "Stoosbahn Schwyz", url: "https://maps.google.com/maps?q=Stoosbahn+Schwyz" }
    ]
  },
];


// =========================================================================
// 數據 3: 20 天跨區域經典行程 (瑞義之旅) - COMPLETELY UPDATED from user table
// =========================================================================
const MULTI_DAY_ITINERARY = [
  // Day 1: 瑞士 琉森
  {
    day: "12/28 (Day 1)",
    base: "琉森 (Lucerne)",
    destination: "12:00 抵達 ZRH。ZRH → 琉森。下午：琉森市區觀光 (卡貝爾橋、獅子紀念碑)。",
    travel: "ZRH → 琉森：1小時 (火車)。直達城際/區間列車 (IR/IC)",
    recommendation: "不需要。此為一般瑞士國鐵 (SBB) 列車，Swiss Travel Pass 完全涵蓋。",
    duration: "1 小時",
    country: "Switzerland",
    station_from: "蘇黎世機場火車站(Zürich Flughafen)",
    station_to: "琉森火車站(Luzern Bahnhof)",
  },
  // Day 2: 瑞士 因特拉肯
  {
    day: "12/29 (Day 2)",
    base: "因特拉肯 (Interlaken)",
    destination: "上午：琉森 → 因特拉肯",
    travel: "琉森 → 因特拉肯：2小時 (火車)。Golden Pass Express (黃金特快列車)",
    recommendation: "非強制，但強烈建議。Swiss Travel Pass 完全涵蓋車票，但由於這是一條熱門觀光路線，建議您預訂座位以確保有位。",
    duration: "1 小時 50 分鐘",
    country: "Switzerland",
    station_from: "琉森火車站(Luzern Bahnhof)",
    station_to: "因特拉肯東站(Interlaken Ost)",
  },
  // Day 3: 瑞士 因特拉肯
  {
    day: "12/30 (Day 3)",
    base: "因特拉肯",
    destination: "參考INTERLAKEN的晴天及雨天六個行程規劃",
    travel: "單程約2小時15分鐘 (火車/纜車)",
    recommendation: "根據天氣選擇 S1-S6 或 R1-R6 方案。",
    duration: "請參考當日行程",
    country: "Switzerland",
    station_from: "因特拉肯東站",
    station_to: "因特拉肯東站",
  },
  // Day 4: 瑞士 因特拉肯
  {
    day: "12/31 (Day 4)",
    base: "因特拉肯",
    destination: "因特拉肯 → First/雪朗峰：約1小時至1小時40分鐘",
    travel: "火車/纜車",
    recommendation: "建議預訂 First 或雪朗峰的纜車。",
    duration: "1 小時 – 1 小時 40 分鐘",
    country: "Switzerland",
    station_from: "因特拉肯東站",
    station_to: "First/Schilthorn",
  },
  // Day 5: 瑞士 因特拉肯
  {
    day: "1/1 (Day 5)",
    base: "因特拉肯",
    destination: "勞特布魯嫩：約30分鐘 (火車)",
    travel: "火車",
    recommendation: "新年假日，請務必確認 SBB 班次及纜車的營運時間。",
    duration: "約 30 分鐘",
    country: "Switzerland",
    station_from: "因特拉肯東站",
    station_to: "勞特布魯嫩(Lauterbrunnen)",
  },
  // Day 6: 瑞士 策馬特
  {
    day: "1/2 (Day 6)",
    base: "策馬特 (Zermatt)",
    destination: "上午：因特拉肯 → 策馬特。下午：葛納葛特 (Gornergrat) 觀景。",
    travel: "因特拉肯 → 策馬特：約3小時20分 (火車)。需在 Spiez 和 Visp 轉乘。",
    recommendation: "不需要。此為一般瑞士國鐵 (SBB) 及馬特洪哥達鐵路 (MGB) 列車，Swiss Travel Pass 完全涵蓋。",
    duration: "2 小時 40 分鐘 – 3 小時 15 分鐘",
    country: "Switzerland",
    station_from: "因特拉肯東站(Interlaken Ost)",
    station_to: "策馬特火車站(Zermatt train station)",
  },
  // Day 7: 瑞士 策馬特
  {
    day: "1/3 (Day 7)",
    base: "策馬特",
    destination: "馬特洪峰觀景日：馬特洪峰冰川天堂 (Matterhorn Glacier Paradise) 觀景。",
    travel: "策馬特 → 冰川天堂：約45分鐘 (纜車)",
    recommendation: "冰川天堂纜車通常有折扣，請善用 Swiss Travel Pass 購買優惠票。",
    duration: "約 45 分鐘",
    country: "Switzerland",
    station_from: "Täsch", // Täsch 是策馬特門戶，這裡可能是指從 Täsch 停車場接駁
    station_to: "策馬特冰川天堂(Matterhorn Glacier Paradise)",
  },
  // Day 8: 義大利 米蘭
  {
    day: "1/4 (Day 8)",
    base: "米蘭 (Milan)",
    destination: "上午：策馬特 → 米蘭。下午：米蘭大教堂、艾曼紐二世迴廊。",
    travel: "策馬特 → 米蘭：約3.5小時至4小時 (火車)。MGB/EC 列車",
    recommendation: "強制或強烈建議。STP 涵蓋瑞士境內段。國際線 EC 列車通常需要額外購買座位預訂，或購買含預訂的優惠票。請務必在搭乘 EC 列車前完成預訂。",
    duration: "3 小時 45 分鐘 – 4 小時 15 分鐘",
    country: "Italy",
    station_from: "策馬特火車站(Zermatt train station)",
    station_to: "米蘭中央車站(Milano Centrale)",
  },
  // Day 9: 義大利 威尼斯
  {
    day: "1/5 (Day 9)",
    base: "威尼斯 (Venice)",
    destination: "上午：米蘭 → 威尼斯。下午：聖馬可廣場、總督宮、嘆息橋。",
    travel: "米蘭 → 威尼斯 S.L.：約2小時25分 (高鐵)",
    recommendation: "義大利高鐵 (Frecciarossa/Italo) 建議提前預訂，以確保座位並獲得優惠票價。",
    duration: "2 小時 25 分鐘",
    country: "Italy",
    station_from: "米蘭中央車站(Milano Centrale)",
    station_to: "威尼斯聖塔露西亞車站(Venezia Santa Lucia)",
  },
  // Day 10: 義大利 威尼斯
  {
    day: "1/6 (Day 10)",
    base: "威尼斯",
    destination: "威尼斯全天：水道之旅、貢多拉、聖馬可大教堂。",
    travel: "威尼斯島內：水上巴士 (Vaporetto)",
    recommendation: "建議購買威尼斯水上交通日票，方便全天移動。",
    duration: "全天",
    country: "Italy",
    station_from: "威尼斯聖塔露西亞車站",
    station_to: "威尼斯島內",
  },
  // Day 11: 義大利 威尼斯
  {
    day: "1/7 (Day 11)",
    base: "威尼斯",
    destination: "離島一日遊：彩色島 (Burano) 和玻璃島 (Murano)。",
    travel: "威尼斯 → 離島：水上巴士 (單程約40-60分鐘)",
    recommendation: "離島遊覽需預留充足時間，特別是等待水上巴士時間。",
    duration: "單程約 40-60 分鐘",
    country: "Italy",
    station_from: "威尼斯島內",
    station_to: "布拉諾島(Burano) / 穆拉諾島(Murano)",
  },
  // Day 12: 義大利 佛羅倫斯
  {
    day: "1/8 (Day 12)",
    base: "佛羅倫斯 (Florence)",
    destination: "上午：威尼斯 → 佛羅倫斯。下午：烏菲茲美術館 (預約)、老橋。",
    travel: "威尼斯 → 佛羅倫斯 S.M.N.：約2小時5分 (高鐵)",
    recommendation: "烏菲茲美術館門票強烈建議提前預約。",
    duration: "2 小時 5 分鐘",
    country: "Italy",
    station_from: "威尼斯聖塔露西亞車站(Venezia Santa Lucia)",
    station_to: "佛羅倫斯新聖母大教堂車站(Firenze S.M.N.)",
  },
  // Day 13: 義大利 佛羅倫斯
  {
    day: "1/9 (Day 13)",
    base: "佛羅倫斯",
    destination: "藝術日：學院美術館 (看大衛像)、聖母百花大教堂登頂/喬托鐘樓。",
    travel: "市區內：步行",
    recommendation: "大衛像及聖母百花大教堂登頂都需要預約。",
    duration: "全天",
    country: "Italy",
    station_from: "市區內",
    station_to: "市區內",
  },
  // Day 14: 義大利 佛羅倫斯
  {
    day: "1/10 (Day 14)",
    base: "佛羅倫斯",
    destination: "文化漫遊：皮蒂宮/波波里花園、聖十字教堂、領主廣場。",
    travel: "市區內：步行",
    recommendation: "皮蒂宮與花園需購買聯票。",
    duration: "全天",
    country: "Italy",
    station_from: "市區內",
    station_to: "市區內",
  },
  // Day 15: 義大利 佛羅倫斯
  {
    day: "1/11 (Day 15)",
    base: "佛羅倫斯",
    destination: "周邊/景觀：米開朗基羅廣場看夕陽，或安排半日遊。",
    travel: "市區內：步行/巴士",
    recommendation: "米開朗基羅廣場位於南岸，可搭乘 12/13 號公車或步行。",
    duration: "全天",
    country: "Italy",
    station_from: "市區內",
    station_to: "米開朗基羅廣場",
  },
  // Day 16: 義大利 羅馬
  {
    day: "1/12 (Day 16)",
    base: "羅馬 (Rome)",
    destination: "上午：佛羅倫斯 → 羅馬。下午：萬神殿、特萊維噴泉、納沃納廣場 (羅馬初印象)。",
    travel: "佛羅倫斯 → 羅馬 Termini：約1小時30分 (高鐵)",
    recommendation: "高鐵建議提前預訂。",
    duration: "1 小時 30 分鐘",
    country: "Italy",
    station_from: "佛羅倫斯新聖母大教堂車站(Firenze S.M.N.)",
    station_to: "羅馬中央車站(Roma Termini)",
  },
  // Day 17: 義大利 羅馬 (梵蒂岡)
  {
    day: "1/13 (Day 17)",
    base: "羅馬",
    destination: "梵蒂岡 (Vatican City)：梵蒂岡博物館、西斯汀教堂、聖伯多祿大殿 (務必預約)。",
    travel: "羅馬 → 梵蒂岡：地鐵/步行",
    recommendation: "梵蒂岡博物館門票**務必提前預約**，避免排隊。",
    duration: "全天",
    country: "Italy",
    station_from: "羅馬 Termini",
    station_to: "梵蒂岡(Ottaviano Metro)",
  },
  // Day 18: 義大利 羅馬
  {
    day: "1/14 (Day 18)",
    base: "羅馬",
    destination: "古羅馬遺跡：羅馬競技場、古羅馬廣場、帕拉提諾山 (務必預約門票)。",
    travel: "市區內：地鐵/步行",
    recommendation: "競技場聯票**務必提前預約**。",
    duration: "全天",
    country: "Italy",
    station_from: "羅馬 Termini",
    station_to: "羅馬競技場(Colosseo Metro)",
  },
  // Day 19: 義大利 羅馬
  {
    day: "1/15 (Day 19)",
    base: "羅馬",
    destination: "羅馬藝術與最後精華：博爾蓋塞美術館 (需預約，上午)；下午：西班牙廣場、聖天使城堡或最後購物。",
    travel: "市區內：地鐵/巴士",
    recommendation: "博爾蓋塞美術館門票**必須**預約且有固定參觀時間。",
    duration: "全天",
    country: "Italy",
    station_from: "市區內",
    station_to: "市區內",
  },
  // Day 20: 義大利 啟程回國
  {
    day: "1/16 (Day 20)",
    base: "羅馬",
    destination: "羅馬 → 羅馬菲烏米奇諾機場 (FCO) 離開。",
    travel: "羅馬 Termini → FCO：約32分鐘 (Leonardo Express火車)",
    recommendation: "預留充足時間辦理退稅和登機手續。",
    duration: "約 32 分鐘",
    country: "Italy",
    station_from: "羅馬中央車站(Roma Termini)",
    station_to: "羅馬菲烏米奇諾機場(FCO)",
  },
];


// 獲取交通模式圖標的輔助函數 (保持不變)
const getModeIcon = (mode) => {
  const iconClass = "w-5 h-5 text-blue-700 dark:text-blue-300";
  // 調整圖標以匹配新的交通描述
  if (mode.includes('火車')) return <TrainFront className={iconClass} />;
  if (mode.includes('高鐵') || mode.includes('快車') || mode.includes('Express')) return <TrainFront className={`${iconClass} text-red-500`} />;
  if (mode.includes('纜車')) return <CableCar className={iconClass} />;
  if (mode.includes('水上巴士') || mode.includes('遊船')) return <Ship className={iconClass} />;
  if (mode.includes('地鐵')) return <MapPinned className={iconClass} />;
  if (mode.includes('巴士')) return <BusFront className={iconClass} />;
  if (mode.includes('步行')) return <CarFront className={`${iconClass} scale-x-[-1]`} />;
  if (mode.includes('ZRH') || mode.includes('FCO')) return <Plane className={iconClass} />;
  
  return <Route className={iconClass} />;
};

// =========================================================================
// 組件: 飯店住宿資訊 (AccommodationInfo) - 使用新的 mapLink
// =========================================================================

const AccommodationInfo = ({ data, generateGoogleMapsUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800 dark:text-blue-300 flex items-center mb-6 border-b pb-3 border-blue-100 dark:border-gray-700">
        <Hotel className="w-7 h-7 mr-3 text-yellow-500" />
        全程住宿地點
      </h2>
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm transition hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${item.base.includes('瑞士') || item.base.includes('琉森') || item.base.includes('策馬特') || item.base.includes('因特拉肯') ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}>
                {item.base.includes('瑞士') || item.base.includes('琉森') || item.base.includes('策馬特') || item.base.includes('因特拉肯') ? '瑞士' : '義大利'}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                {item.dates}
              </span>
            </div>
            
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                {item.hotelName} 
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 font-medium ml-7">
                {item.base} 
            </p>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between border-t pt-3 border-gray-200 dark:border-gray-600">
                {/* 顯示飯店名稱作為地址的視覺化替代，因為實際地址文字缺失 */}
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2 sm:mb-0">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    {item.address} ({item.hotelName})
                </p>
                <a 
                    href={generateGoogleMapsUrl(item.mapLink)} // 使用 mapLink
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium transition duration-150"
                >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    導航規劃 (Google Maps)
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 組件: 當日行程卡片 (ItineraryCard) - 保持不變
// =========================================================================

const ItineraryCard = ({ itinerary, weatherIcon: Icon, color, isRainy }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-8 ${color} p-5 flex flex-col h-full transition-all duration-300 hover:shadow-xl`}>
    {/* 標題區 */}
    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Icon className={`w-6 h-6 mr-3 ${isRainy ? 'text-blue-500' : 'text-yellow-500'} flex-shrink-0`} />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{itinerary.title}</h3>
      </div>
      <span className={`text-sm font-medium px-3 py-1 rounded-full ${isRainy ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
        {isRainy ? '雨天備案' : '晴天首選'}
      </span>
    </div>

    {/* 簡介 */}
    <p className="text-gray-600 dark:text-gray-400 italic mb-4">{itinerary.brief}</p>
    
    {/* 交通時間 */}
    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
      <Clock className="w-4 h-4 mr-2 text-red-500" />
      <span className="font-semibold">總預計時間 (單程):</span> {itinerary.totalTime}
    </div>

    {/* 交通細節 - 時間軸風格 */}
    <div className="space-y-4 flex-grow">
      {itinerary.segments.map((segment, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-3">
            <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900">
              {getModeIcon(segment.mode)}
            </div>
            {index < itinerary.segments.length - 1 && (
              <div className={`h-8 w-px ${segment.transfer ? 'bg-red-400 border-dashed' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-base">{segment.mode}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{segment.time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              <span className="font-medium text-blue-600 dark:text-blue-400">{segment.from}</span> 
              <ArrowRight className="w-3 h-3 inline mx-1" /> 
              {segment.to}
            </p>
            {segment.transfer && (
                <span className="text-xs text-red-500 font-medium mt-1 inline-block">
                    (需轉乘)
                </span>
            )}
          </div>
        </div>
      ))}
    </div>
    
    {/* 地圖連結 */}
    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
        <MapPin className="w-4 h-4 mr-1 text-teal-500" />
        相關地點地圖:
      </p>
      <div className="flex flex-wrap gap-2">
        {itinerary.mapLinks.map((link, linkIndex) => (
          <a
            key={linkIndex}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full transition duration-150"
          >
            {link.name} <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        ))}
      </div>
    </div>
  </div>
);


// =========================================================================
// 組件: 多日行程卡片 (MultiDayCard) - 顯示車站和預訂要求
// =========================================================================

const MultiDayCard = ({ day }) => {
    // 判斷國家，用於樣式區分
    const isSwiss = day.country === 'Switzerland';
    const bgColor = isSwiss ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20';
    const borderColor = isSwiss ? 'border-red-400' : 'border-green-400';
    const titleColor = isSwiss ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300';
    const dotColor = isSwiss ? 'bg-red-500' : 'bg-green-500';

    // 處理預訂要求樣式
    const getRecommendationStyle = (text) => {
        let recClass = "text-gray-700 dark:text-gray-300";
        let recIcon = <ScrollText className="w-4 h-4 mr-2 mt-0.5 text-orange-600 flex-shrink-0" />;

        if (text.includes('務必') || text.includes('強制') || text.includes('強烈建議')) {
            recClass = "text-red-600 dark:text-red-400 font-bold";
            recIcon = <Ticket className="w-4 h-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />;
        } else if (text.includes('不需要') || text.includes('一般')) {
            recClass = "text-green-600 dark:text-green-400 font-medium";
            recIcon = <Ticket className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />;
        }
        return { recClass, recIcon };
    };

    const { recClass, recIcon } = getRecommendationStyle(day.recommendation);

    return (
        <div className="flex">
            {/* 左側：時間軸點和國家標識 */}
            <div className="flex flex-col items-center mr-4 sm:mr-6">
                <div className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0 shadow-md`}></div>
                <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
            
            {/* 右側：內容卡片 */}
            <div className={`flex-grow ${bgColor} border-l-4 ${borderColor} rounded-lg p-4 mb-6 shadow-md transition hover:shadow-lg`}>
                <div className="flex items-center justify-between mb-2">
                    {/* 日期與國家標籤 */}
                    <h3 className={`text-lg font-bold ${titleColor} flex items-center`}>
                        {isSwiss ? <Mountain className="w-5 h-5 mr-2" /> : <Landmark className="w-5 h-5 mr-2" />}
                        {day.day} 
                        <span className={`ml-3 text-xs font-semibold px-2 py-0.5 rounded-full ${isSwiss ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}>
                            {day.country === 'Switzerland' ? '瑞士' : '義大利'}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{day.base}</p>
                </div>
                
                {/* 行程目的地與簡介 */}
                <p className="text-gray-800 dark:text-gray-200 mb-3 text-base leading-relaxed">
                    {day.destination}
                </p>

                {/* 交通路線 */}
                <div className="text-sm border-t pt-3 border-gray-200 dark:border-gray-700 mb-2">
                    <p className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <TrainFront className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                        <span className="font-semibold mr-1">交通方式:</span> {day.travel}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <p className="text-gray-700 dark:text-gray-300 flex items-center">
                            <LocateFixed className="w-4 h-4 mr-2 text-teal-600 flex-shrink-0" />
                            <span className="font-semibold mr-1">起點:</span> {day.station_from}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-teal-600 flex-shrink-0" />
                            <span className="font-semibold mr-1">終點:</span> {day.station_to}
                        </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="font-semibold mr-1">行駛時間:</span> {day.duration}
                    </p>
                </div>
                
                {/* 預訂要求 */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className={`${recClass} flex items-start text-sm`}>
                        {recIcon}
                        <span className="font-semibold mr-1">預訂建議:</span> {day.recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
};


// =========================================================================
// 主應用程式組件 (App) - 保持不變
// =========================================================================

const App = () => {
  const [view, setView] = useState('MultiDay'); // 預設顯示多日行程
  const headerRef = useRef(null); // 用於滾動到頂部

  // 切換視圖時滾動到頁面頂部
  const toggleView = (newView) => {
    setView(newView);
    if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 根據當前視圖獲取按鈕樣式
  const viewButtonClasses = (targetView) => {
    const isActive = view === targetView;
    let baseClasses = "flex-1 flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-inner";
    
    if (isActive) {
      // 根據不同的視圖設置不同的強調色
      if (targetView === 'MultiDay') {
        return `${baseClasses} bg-blue-600 text-white shadow-blue-500/50 hover:bg-blue-700`;
      } else if (targetView === 'Sunny') {
        return `${baseClasses} bg-yellow-500 text-white shadow-yellow-500/50 hover:bg-yellow-600`;
      } else if (targetView === 'Rainy') {
        return `${baseClasses} bg-gray-600 text-white shadow-gray-500/50 hover:bg-gray-700`;
      }
    }
    
    // 非活動狀態
    return `${baseClasses} bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600`;
  };
  
  // 根據當前視圖動態設定標題和內容
  let currentTitle = "20 天瑞義經典行程 (12/28 - 1/16)";
  let currentSubtitle = "瑞士阿爾卑斯山區精華與義大利文藝復興/古羅馬巡禮。";
  let content = <AccommodationInfo data={ACCOMMODATION_DATA} generateGoogleMapsUrl={generateGoogleMapsUrl} />;
  
  if (view === 'MultiDay') {
    // 多日行程 (包含住宿資訊)
    currentTitle = "20 天瑞義經典行程 (12/28 - 1/16)";
    currentSubtitle = "瑞士阿爾卑斯山區精華與義大利文藝復興/古羅馬巡禮。";
    content = (
      <div className="space-y-10">
        <AccommodationInfo data={ACCOMMODATION_DATA} generateGoogleMapsUrl={generateGoogleMapsUrl} />
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8">
            <h2 className="text-3xl font-extrabold text-blue-800 dark:text-blue-300 flex items-center mb-8 border-b pb-3 border-blue-100 dark:border-gray-700">
                <MapPinned className="w-7 h-7 mr-3 text-red-500" />
                每日路線規劃
            </h2>
            <div className="relative">
                {/* 時間軸線條 */}
                <div className="absolute left-[13px] sm:left-[17px] top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>
                {MULTI_DAY_ITINERARY.map((day, index) => (
                    <MultiDayCard key={index} day={day} />
                ))}
            </div>
        </div>
      </div>
    );
  } else if (view === 'Sunny') {
    // 晴天方案
    currentTitle = "因特拉肯地區：晴天日遊首選";
    currentSubtitle = `共 ${ITINERARIES.filter(i => i.type === 'Sunny').length} 個方案。天氣晴朗時，務必登高！`;
    const sunnyItineraries = ITINERARIES.filter(i => i.type === 'Sunny');
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sunnyItineraries.map(item => (
          <ItineraryCard 
            key={item.id} 
            itinerary={item} 
            weatherIcon={Sun} 
            color="border-yellow-500"
            isRainy={false}
          />
        ))}
      </div>
    );
  } else if (view === 'Rainy') {
    // 雨天備案
    currentTitle = "因特拉肯地區：雨天或風雪備案";
    currentSubtitle = `共 ${ITINERARIES.filter(i => i.type === 'Rainy').length} 個室內或低海拔方案。風雪來襲也能玩得盡興。`;
    const rainyItineraries = ITINERARIES.filter(i => i.type === 'Rainy');
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {rainyItineraries.map(item => (
          <ItineraryCard 
            key={item.id} 
            itinerary={item} 
            weatherIcon={CloudRain} 
            color="border-gray-600"
            isRainy={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* 頂部標題與裝飾區 */}
      <div 
        ref={headerRef} 
        className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-800 dark:to-teal-600 text-white pt-12 pb-24 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
              <Home className="w-8 h-8 text-yellow-300"/>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                瑞義精華之旅
              </h1>
          </div>
          <p className="text-blue-200 dark:text-blue-300 text-xl max-w-2xl">
            {currentTitle}
          </p>
          <p className="text-blue-100 dark:text-blue-400 text-base mt-1">
            {currentSubtitle}
          </p>
        </div>
      </div>

      {/* 模式切換按鈕 - 現代膠囊設計，強調選中狀態的顏色 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 z-20 relative">
        <div className="flex flex-col sm:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 p-3 space-y-3 sm:space-y-0 sm:space-x-3">
          {/* 多日行程 - 主色調 */}
          <button
            onClick={() => toggleView('MultiDay')}
            className={viewButtonClasses('MultiDay')}
          >
            <CalendarDays className="w-5 h-5" />
            <span className='hidden sm:inline'>20 天瑞義經典行程</span>
            <span className='inline sm:hidden'>多日計畫</span>
          </button>

          {/* 晴天行程 - 暖色系強調 */}
          <button
            onClick={() => toggleView('Sunny')}
            className={viewButtonClasses('Sunny')}
          >
            <Sun className="w-5 h-5" />
            <span>因特拉肯 晴天日遊</span>
            <span className='text-xs'>({ITINERARIES.filter(i => i.type === 'Sunny').length})</span>
          </button>
          
          {/* 雨天備案 - 冷色系強調 */}
          <button
            onClick={() => toggleView('Rainy')}
            className={viewButtonClasses('Rainy')}
            >
            <CloudRain className="w-5 h-5" />
            <span>因特拉肯 雨天備案</span>
            <span className='text-xs'>({ITINERARIES.filter(i => i.type === 'Rainy').length})</span>
          </button>
        </div>
      </div>

      {/* 內容區塊 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        {content}
      </main>
      
      {/* 頁腳 */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400 dark:text-gray-600 text-sm border-t border-gray-200 dark:border-gray-700 mt-10">
        <p>旅行計畫 v1.1 | 數據來源：使用者提供之最新行程表</p>
        <p>建議：所有交通、門票與住宿資訊請以官方最新公告為準。</p>
      </footer>
    </div>
  );
};

export default App;