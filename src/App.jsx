import React, { useState } from 'react';
// 導入 Lucide Icons 用於交通模式和 UI 裝飾
import { Sun, CloudRain, TrainFront, CableCar, BusFront, Map, ArrowRight, Home, CarFront, Users, Building2, CalendarDays, Mountain, Clock, Plane } from 'lucide-react';

// =========================================================================
// 數據 1: 因特拉肯當日行程 (12 個方案)
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
// 數據 2: 8 天跨區域經典行程 (來自用戶圖片)
// =========================================================================
const MULTI_DAY_ITINERARY = [
  {
    day: "12/28 (Day 1)",
    base: "琉森 (Lucerne)",
    destination: "抵達 ZRH -> 琉森。下午：市區觀光，獅子紀念碑、卡貝爾橋。",
    travel: "ZRH -> 琉森：1 小時 (火車)",
    recommendation: "直達城際列車 (IC)",
    duration: "1 小時"
  },
  {
    day: "12/29 (Day 2)",
    base: "因特拉肯",
    destination: "上午：琉森 -> 因特拉肯。下午：瑞吉山 (Rigi Kulm) 或 哈德昆 (Harder Kulm) (擇一登頂)。",
    travel: "琉森 -> 因特拉肯：1 小時 50 分鐘 (黃金列車)",
    recommendation: "黃金列車專線 (Golden Pass Express)",
    duration: "1 小時 50 分鐘"
  },
  {
    day: "12/30 (Day 3)",
    base: "因特拉肯",
    destination: "少女峰 (Jungfraujoch) 登頂一日遊。風雪日：雪朗峰 (Piz Gloria) 或 菲斯特 (First) 纜車。",
    travel: "單程約 3 小時 15 分鐘 (齒輪火車)",
    recommendation: "確保行程預訂。",
    duration: "約 3 小時 15 分鐘 (單程)"
  },
  {
    day: "12/31 (Day 4)",
    base: "因特拉肯",
    destination: "Touch the Mountains 慶典。新年夜：勞特布倫嫩 (Lauterbrunnen)、米倫 (Murren) 或 文根 (Wengen) 擇一遊覽。",
    travel: "因特拉肯 -> First 約 40 分鐘 / 勞特布倫嫩約 30 分鐘 (火車)",
    recommendation: "確認新年夜交通。",
    duration: "40 分鐘 - 1 小時"
  },
  {
    day: "1/1 (Day 5)",
    base: "因特拉肯",
    destination: "文根 (Wengen) 或 米倫 (Murren) 擇一，享受安靜的山居生活。",
    travel: "勞特布倫嫩：約 30 分鐘 (火車)",
    recommendation: "確認纜車開放時間。",
    duration: "約 30 分鐘"
  },
  {
    day: "1/2 (Day 6)",
    base: "策馬特 (Zermatt)",
    destination: "因特拉肯 -> 策馬特。下午：葛納葛特 (Gornergrat) 觀景臺，或 馬特洪峰冰川天堂 (Matterhorn Glacier Paradise)。",
    travel: "因特拉肯 -> 策馬特：約 2 小時 40 分鐘 (火車)",
    recommendation: "需在 Spiez 及 Visp 轉乘。",
    duration: "2 小時 40 分鐘 - 3 小時 15 分鐘"
  },
  {
    day: "1/3 (Day 7)",
    base: "策馬特",
    destination: "葛納葛特或 馬特洪峰冰川天堂 (擇一)。",
    travel: "策馬特 -> 葛納葛特：約 45 分鐘 (齒輪火車)",
    recommendation: "擇天氣晴朗時上山。",
    duration: "45 分鐘"
  },
  {
    day: "1/4 (Day 8)",
    base: "米蘭 (Milan) / 策馬特",
    destination: "上午：策馬特 -> 米蘭。下午：米蘭市區觀光 / 大學區。",
    travel: "策馬特 -> 米蘭：約 3 小時 45 分鐘 (火車)",
    recommendation: "需在 Visp/Brig 轉乘，搭乘歐洲之星 (EuroCity, EC) 至米蘭。",
    duration: "3 小時 45 分鐘 - 4 小時"
  }
];


// 獲取交通模式圖標的輔助函數 (與之前相同)
const getModeIcon = (mode) => {
  switch (mode.split('(')[0].trim()) {
    case '火車':
      return <TrainFront className="w-5 h-5 text-indigo-600" />;
    case '纜車':
    case '火車 (齒輪)':
      return <CableCar className="w-5 h-5 text-indigo-600" />;
    case '巴士':
      return <BusFront className="w-5 h-5 text-indigo-600" />;
    case '遊船':
      return <Users className="w-5 h-5 text-indigo-600" />;
    case '步行':
      return <CarFront className="w-5 h-5 text-indigo-600 scale-x-[-1]" />;
    case '巴士/船':
      return <BusFront className="w-5 h-5 text-indigo-600" />;
    default:
      return <Map className="w-5 h-5 text-indigo-600" />;
  }
};

// =========================================================================
// 組件 1: 行程卡片列表視圖 (ItineraryCard) - 保持不變
// =========================================================================

const ItineraryCard = ({ itinerary, onViewDetail }) => {
  const isSunny = itinerary.type === 'Sunny';

  return (
    <div
      onClick={() => onViewDetail(itinerary)}
      className={`
        bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300
        hover:shadow-xl hover:ring-2 
        ${isSunny ? 'hover:ring-amber-500' : 'hover:ring-blue-400'}
        flex flex-col space-y-2
      `}
    >
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${isSunny ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
          方案 {itinerary.id}
        </span>
        <span className="text-gray-500 text-sm">{itinerary.totalTime}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
        {itinerary.title}
      </h3>
      <p className="text-sm text-gray-500 min-h-[40px]">{itinerary.brief}</p>

      <div className="flex items-center space-x-2 text-indigo-600 font-medium pt-2">
        <span>查看詳情</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};

// =========================================================================
// 組件 2: 行程詳細頁視圖 (ItineraryDetail) - 保持不變
// =========================================================================

const ItineraryDetail = ({ itinerary, onBack }) => {
  const isSunny = itinerary.type === 'Sunny';

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition duration-150"
      >
        <ArrowRight className="w-5 h-5 mr-2 scale-x-[-1]" />
        返回行程列表
      </button>

      {/* ... [ItineraryDetail 組件內容保持不變] ... */}
      <div className={`rounded-xl shadow-2xl p-6 bg-white border-t-8 ${isSunny ? 'border-amber-500' : 'border-blue-400'}`}>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{itinerary.title}</h1>
        <p className={`text-lg font-semibold mb-4 ${isSunny ? 'text-amber-600' : 'text-blue-500'}`}>
          {isSunny ? <Sun className="inline w-6 h-6 mr-1" /> : <CloudRain className="inline w-6 h-6 mr-1" />}
          {itinerary.type === 'Sunny' ? '晴天首選方案' : '雨天備用方案'} - {itinerary.totalTime}
        </p>
        <p className="text-gray-600 italic mb-6 border-b pb-4">{itinerary.brief}</p>

        {/* 交通分段時間軸 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <TrainFront className="w-6 h-6 mr-2 text-red-500" />
            交通分段 (Interlaken Ost 起)
        </h2>
        <div className="space-y-4 relative pl-4">
          {itinerary.segments.map((segment, index) => (
            <div key={index} className="flex items-start">
              {/* 圖標和線條 */}
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-indigo-100 ring-4 ring-white shadow-md z-10">
                  {getModeIcon(segment.mode)}
                </div>
                {index < itinerary.segments.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-300 -mt-0.5 -mb-0.5" />
                )}
              </div>
              
              {/* 內容 */}
              <div className="ml-4 pt-0.5 pb-2 w-full">
                <p className="text-sm text-gray-500">
                    從 <span className="font-semibold text-gray-700">{segment.from}</span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                    {segment.mode} <span className="text-indigo-600 text-base font-normal">({segment.time})</span>
                </p>
                <p className={`text-sm ${segment.transfer ? 'text-red-500 font-medium' : 'text-green-600 font-medium'}`}>
                    抵達 <span className="font-semibold text-gray-700">{segment.to}</span>
                    {segment.transfer && ' (需中轉/換乘)'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 地圖連結區 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-t pt-4 flex items-center">
            <Map className="w-6 h-6 mr-2 text-green-500" />
            重要地圖連結
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {itinerary.mapLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-150 text-center flex items-center justify-center space-x-2"
            >
              <Building2 className="w-5 h-5" />
              <span>{link.name} (Google Maps)</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 組件 3: 多日行程列表視圖 (MultiDayItinerary) - 已移除外部容器，僅保留內容
// =========================================================================

const MultiDayItinerary = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <CalendarDays className="w-7 h-7 mr-2 text-purple-600" />
        八天經典行程規劃 (琉森、因特拉肯、策馬特)
      </h2>
      <p className="text-gray-600 mb-6 italic">
        此為完整的跨區行程建議，涵蓋瑞士東部到西部的經典路線。
      </p>

      {/* 行程表格 */}
      <div className="overflow-x-auto rounded-xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider w-1/12">日期</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider w-2/12">主要據點</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider w-4/12">行程與目的地</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider w-3/12">交通說明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {MULTI_DAY_ITINERARY.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-purple-600">
                  {item.day}
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-gray-900 font-medium">
                  {item.base}
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-gray-600">
                  <p className="font-semibold text-gray-800">{item.destination}</p>
                  <div className="flex items-center text-xs text-indigo-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" /> 總時程: {item.duration}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-gray-600">
                    <p className="text-xs text-gray-500 italic mb-1">
                      {item.recommendation}
                    </p>
                    <p className="font-medium text-gray-700">{item.travel}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer className="text-center text-gray-500 text-sm mt-10 py-4 border-t">
        <p>資料來源: 用戶提供之八天行程規劃表。</p>
      </footer>
    </>
  );
};

// =========================================================================
// 核心組件: App
// =========================================================================

export default function App() {
  // 狀態 1: 當前視圖 ('Sunny', 'Rainy' 或 'MultiDay')
  const [currentView, setCurrentView] = useState('MultiDay');
  
  // 狀態 2: 用戶是否在詳細視圖 (null 表示在列表視圖)
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  // 根據當前模式篩選行程列表 (僅適用於 Sunny/Rainy)
  const filteredItineraries = ITINERARIES.filter(item => item.type === currentView);

  // 處理點擊卡片，切換到詳細視圖
  const handleViewDetail = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  // 處理返回按鈕，切換回列表視圖
  const handleBack = () => {
    setSelectedItinerary(null);
  };

  // 處理模式切換
  const toggleView = (view) => {
    setCurrentView(view);
    setSelectedItinerary(null); // 切換模式時，重置詳細視圖
  };

  // 邏輯: 如果在詳細頁面，渲染詳細組件 (這是唯一會跳過 Header 的情況)
  if (selectedItinerary) {
    return <ItineraryDetail itinerary={selectedItinerary} onBack={handleBack} />;
  }
  
  // 邏輯: 渲染主介面 (包含 Header 和切換按鈕)
  const isMultiDay = currentView === 'MultiDay';
  const headerBg = isMultiDay ? 'bg-purple-600' : (currentView === 'Sunny' ? 'bg-amber-500' : 'bg-blue-600');
  const mainContent = isMultiDay ? (
      <MultiDayItinerary />
  ) : (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {currentView === 'Sunny' ? '🏔️ 6 個必去晴天方案' : '☔ 6 個實用雨天備案'}
      </h2>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredItineraries.map(itinerary => (
          <ItineraryCard 
            key={itinerary.id} 
            itinerary={itinerary} 
            onViewDetail={handleViewDetail} 
          />
        ))}
      </div>
      
      <footer className="text-center text-gray-500 text-sm mt-10 py-4 border-t">
          <p>當日行程資料來源: 瑞士交通網絡與 Google Maps 預估時間。</p>
      </footer>
    </>
  );


  // 最終渲染結構: Header 和切換按鈕會保持不變
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      
      {/* 頂部標頭與模式切換 */}
      <header className={`py-6 shadow-md ${headerBg}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <Mountain className="w-8 h-8 mr-3" />
            瑞士行程指南 (Interlaken 中心)
          </h1>
          <p className="text-white text-opacity-90 mt-1">
            當日行程可根據天氣切換，或查看跨區多日規劃。
          </p>
        </div>
      </header>
      
      {/* 模式切換按鈕 (三種視圖) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 z-10 relative">
        <div className="flex rounded-xl shadow-xl overflow-hidden bg-white p-1">
          {/* 多日行程 (第一個按鈕) */}
          <button
            onClick={() => toggleView('MultiDay')}
            className={`flex-1 p-3 text-center text-sm sm:text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 ${
              currentView === 'MultiDay' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className='hidden sm:inline'>八天經典行程</span>
            <span className='inline sm:hidden'>多日計畫</span>
          </button>

          {/* 晴天行程 */}
          <button
            onClick={() => toggleView('Sunny')}
            className={`flex-1 p-3 text-center text-sm sm:text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 ${
              currentView === 'Sunny' ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>晴天日遊 ({ITINERARIES.filter(i => i.type === 'Sunny').length})</span>
          </button>
          
          {/* 雨天備案 */}
          <button
            onClick={() => toggleView('Rainy')}
            className={`flex-1 p-3 text-center text-sm sm:text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 ${
              currentView === 'Rainy' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CloudRain className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>雨天備案 ({ITINERARIES.filter(i => i.type === 'Rainy').length})</span>
          </button>
        </div>
      </div>

      {/* 主要內容區域：根據 currentView 渲染不同內容 */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-8 bg-gray-100 min-h-screen">
        {mainContent}
      </main>
    </div>
  );
}