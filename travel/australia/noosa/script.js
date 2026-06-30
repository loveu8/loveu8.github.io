var ITINERARY_DATA = 
{
  "defaultLanguage": "zh-TW",
  "languages": {
    "zh-TW": {
      "ui": {
        "languageButton": "EN",
        "themeDark": "切換深色模式",
        "themeLight": "切換淺色模式",
        "expand": "▲ 查看行程",
        "collapse": "▼ 收起行程",
        "print": "🖨️ 列印",
        "openRoute": "🗺️ 開啟完整導航",
        "navigate": "導航",
        "map": "地圖",
        "mapLoading": "地圖更新中",
        "mapUpdated": "↓ 地圖已更新，收起行程可查看",
        "main": "✅ 主要",
        "mainPlan": "✅ 主要行程",
        "backup": "⚡ 備案"
      },
      "tripTitle": "NOOSA 週末行程",
      "tripSubtitle": "2026/07/04-05 · 全程自駕 · 素食友善"
    },
    "en": {
      "ui": {
        "languageButton": "中文",
        "themeDark": "Switch to dark mode",
        "themeLight": "Switch to light mode",
        "expand": "▲ View itinerary",
        "collapse": "▼ Collapse itinerary",
        "print": "🖨️ Print",
        "openRoute": "🗺️ Open full route",
        "navigate": "Navigate",
        "map": "Map",
        "mapLoading": "Updating map",
        "mapUpdated": "↓ Map updated. Collapse itinerary to view it.",
        "main": "✅ Main",
        "mainPlan": "✅ Main plan",
        "backup": "⚡ Backup"
      },
      "tripTitle": "NOOSA Weekend Itinerary",
      "tripSubtitle": "2026/07/04-05 · Self-drive · Vegetarian friendly"
    }
  },
  "maps": {
    "day1": {
      "query": "Mount Ngungun Glass House Mountains Queensland",
      "routeUrl": "https://www.google.com/maps/dir/?api=1&origin=Carina%20QLD&destination=Noosa%20National%20Park%20Carpark&waypoints=Mount%20Ngungun%20Glass%20House%20Mountains%7CThe%20Coffee%20Club%20Beerwah%7CEumundi%20Markets%7CNoosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&travelmode=driving"
    },
    "day2": {
      "query": "Mount Coolum National Park Queensland",
      "routeUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&destination=Carina%20QLD&waypoints=Noosa%20Farmers%20Market%7CMount%20Coolum%20Walking%20Trail%7CViet%20Haus%20Ocean%20St%20Maroochydore&travelmode=driving"
    }
  },
  "days": [
    {
      "id": 1,
      "theme": "d1",
      "mapId": "day1",
      "label": { "zh-TW": "Day 1", "en": "Day 1" },
      "tabSub": { "zh-TW": "07/04 (六) Ngungun→努沙", "en": "Jul 04 Sat · Ngungun to Noosa" },
      "route": {
        "zh-TW": "🗺️ Mt Ngungun → Coffee Club → Eumundi → Noosa River Retreat → Noosa National Park",
        "en": "🗺️ Mt Ngungun → Coffee Club → Eumundi → Noosa River Retreat → Noosa National Park"
      },
      "chips": [
        ["carina", "Carina"],
        ["ngungun", "Mt Ngungun"],
        ["coffeeclub", "Coffee Club"],
        ["eumundi", "Eumundi Markets"],
        ["noosa", "Noosa River Retreat"],
        ["noosanp", "Noosa National Park"]
      ],
      "items": [
        {
          "time": ["06:30", "07:40"],
          "chip": "carina",
          "dot": "blue",
          "title": { "zh-TW": "🚗 Carina 出發 → Mount Ngungun 步道口", "en": "🚗 Depart Carina → Mount Ngungun trailhead" },
          "intro": { "zh-TW": "清晨出發避開人潮，抵達後有時間整裝和找車位。", "en": "An early start keeps parking easier and gives time to get ready." },
          "links": [{ "label": { "zh-TW": "📍 導航", "en": "📍 Navigate" }, "url": "https://www.google.com/maps/dir/?api=1&origin=Carina%20QLD&destination=Mount%20Ngungun%20Glass%20House%20Mountains%20QLD&travelmode=driving", "theme": "d1" }],
          "tags": [{ "type": "drive", "text": { "zh-TW": "開車 約 70 分鐘", "en": "Drive about 70 min" } }, { "type": "warn", "text": { "zh-TW": "⚡ 出發備品", "en": "⚡ Pack snacks" } }],
          "note": { "zh-TW": "早出發，停車和準備更充裕。記得帶簡單麵包跟香蕉備用！", "en": "Leave early for easier parking and prep. Bring bread and bananas as backup snacks." }
        },
        {
          "time": ["07:40", "09:40"],
          "chip": "ngungun",
          "dot": "green",
          "title": { "zh-TW": "⛰️ 爬山", "en": "⛰️ Morning hike" },
          "cards": [
            {
              "kind": "mainPlan",
              "name": "Mount Ngungun Summit Walk",
              "intro": { "zh-TW": "玻璃屋山群經典短登山路線，山頂視野開闊。", "en": "A classic Glass House Mountains short summit walk with open views." },
              "tags": [{ "type": "hike", "text": { "zh-TW": "Grade 3", "en": "Grade 3" } }, { "type": "hike", "text": { "zh-TW": "2.4km 來回", "en": "2.4 km return" } }, { "type": "hike", "text": { "zh-TW": "2 小時", "en": "2 hours" } }, { "type": "hike", "text": { "zh-TW": "253m", "en": "253 m" } }],
              "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Mount%20Ngungun%20Glass%20House%20Mountains", "theme": "d1" }],
              "note": { "zh-TW": "登頂可遠眺玻璃屋山群全景，360° 全景視野。", "en": "The summit gives a wide 360-degree view across the Glass House Mountains." },
              "photos": [{ "src": "pics/Mount Ngungun Summit Track.JPG", "alt": "Mount Ngungun" }, { "src": "pics/Mount Ngungun Summit Track - 1.JPG", "alt": "Mount Ngungun Summit" }]
            },
            {
              "kind": "backup",
              "name": "Glass House Mountains Lookout",
              "intro": { "zh-TW": "較短的觀景步道，體力或時間不足時很好替換。", "en": "A shorter lookout walk for a lower-effort backup option." },
              "tags": [{ "type": "hike", "text": { "zh-TW": "Grade 3", "en": "Grade 3" } }, { "type": "hike", "text": { "zh-TW": "800m", "en": "800 m" } }, { "type": "hike", "text": { "zh-TW": "約 1 小時", "en": "About 1 hour" } }],
              "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Glass%20House%20Mountains%20Lookout", "theme": "d1" }],
              "note": { "zh-TW": "觀景台短步道，輕鬆版，體力或時間不足時的替代選擇。", "en": "A lighter walk with lookout views when time or energy is limited." },
              "photos": [{ "src": "pics/Glass House Mountains Lookout Track.JPG", "alt": "Glass House Lookout" }, { "src": "pics/Glass House Mountains Lookout Track - 1.JPG", "alt": "Glass House Lookout 2" }]
            }
          ]
        },
        {
          "time": ["09:40", "09:55"],
          "dot": "gray",
          "smallDot": true,
          "title": { "zh-TW": "🚗 前往 Beerwah Village", "en": "🚗 Drive to Beerwah Village" },
          "links": [{ "label": { "zh-TW": "📍 導航", "en": "📍 Navigate" }, "url": "https://www.google.com/maps/dir/?api=1&origin=Mount%20Ngungun%20Glass%20House%20Mountains&destination=The%20Coffee%20Club%20Cafe%20Beerwah%20QLD&travelmode=driving", "theme": "d1" }],
          "tags": [{ "type": "drive", "text": { "zh-TW": "短程 約 10-15 分鐘", "en": "Short drive, 10-15 min" } }]
        },
        {
          "time": ["09:55", "11:25"],
          "chip": "coffeeclub",
          "dot": "orange",
          "title": { "zh-TW": "☕ 爬山後餐點", "en": "☕ Post-hike meal" },
          "tags": [{ "type": "warn", "text": { "zh-TW": "含開車緩衝 1.5h", "en": "Includes 1.5h buffer" } }],
          "cards": [
            {
              "kind": "main",
              "name": "The Coffee Club Cafe - Beerwah",
              "intro": { "zh-TW": "Beerwah Village 的穩定補給點，適合爬完山休息。", "en": "A reliable Beerwah Village stop for food and coffee after the hike." },
              "tags": [{ "type": "food", "text": { "zh-TW": "AUD 20-30/人", "en": "AUD 20-30 pp" } }, { "type": "food", "text": { "zh-TW": "素食 OK", "en": "Vegetarian OK" } }],
              "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=The%20Coffee%20Club%20Cafe%20Beerwah", "theme": "d1" }],
              "note": { "zh-TW": "Beerwah Village，爬完山補充體力的好據點。", "en": "Good for a reset after the morning climb." }
            },
            {
              "kind": "backup",
              "name": "The Lookout Cafe",
              "intro": { "zh-TW": "靠近 Glass House Mountains，備案時動線自然。", "en": "Near Glass House Mountains, useful if the backup route wins." },
              "tags": [{ "type": "food", "text": { "zh-TW": "AUD 20-30/人", "en": "AUD 20-30 pp" } }, { "type": "food", "text": { "zh-TW": "Veg / Vegan OK", "en": "Veg / vegan OK" } }],
              "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=The%20Lookout%20Cafe%20Glass%20House%20Mountains", "theme": "d1" }],
              "note": { "zh-TW": "Glass House Mtns，08:30-14:30。", "en": "Glass House Mtns, 08:30-14:30." }
            }
          ]
        },
        {
          "time": ["12:10", "13:30"],
          "chip": "eumundi",
          "dot": "orange",
          "title": { "zh-TW": "🛍️ Eumundi Markets", "en": "🛍️ Eumundi Markets" },
          "intro": { "zh-TW": "陽光海岸知名週末市集，適合買小吃和手作小物。", "en": "A well-known Sunshine Coast market for snacks, crafts, and browsing." },
          "links": [{ "label": { "zh-TW": "📍 Eumundi Markets", "en": "📍 Eumundi Markets" }, "url": "https://www.google.com/maps/search/?api=1&query=Eumundi%20Markets", "theme": "d1" }],
          "tags": [{ "type": "shop", "text": { "zh-TW": "市集 07:30-14:00", "en": "Market 07:30-14:00" } }],
          "note": { "zh-TW": "已在 Coffee Club 吃過，這段以逛市集為主。建議 13:30 前離開。", "en": "Keep this as market browsing after Coffee Club. Aim to leave before 13:30." },
          "photos": [{ "src": "pics/Eumundi Markets.JPG", "alt": "Eumundi Markets" }]
        },
        {
          "time": ["14:15", "15:15"],
          "chip": "noosa",
          "dot": "purple",
          "title": { "zh-TW": "🏨 Check-in · Noosa River Retreat + 休息", "en": "🏨 Check in · Noosa River Retreat + rest" },
          "intro": { "zh-TW": "Noosaville 河岸區住宿點，適合放行李和短暫恢復體力。", "en": "A Noosaville base for dropping bags and taking a short reset." },
          "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville", "theme": "d1" }],
          "tags": [{ "type": "rest", "text": { "zh-TW": "下午 2 點後可入住", "en": "Check-in after 2pm" } }],
          "note": { "zh-TW": "放行李、稍作休息，準備下午健行。", "en": "Drop bags, rest briefly, then prepare for the afternoon walk." },
          "photos": [{ "src": "pics/Noosa River Retreat Holiday Apartments.JPG", "alt": "Noosa River Retreat" }]
        },
        {
          "time": ["15:35", "17:00"],
          "chip": "noosanp",
          "dot": "green",
          "title": { "zh-TW": "🌿 Noosa National Park：Tea Tree Bay → Dolphin Point", "en": "🌿 Noosa National Park: Tea Tree Bay → Dolphin Point" },
          "intro": { "zh-TW": "Noosa 經典海岸步道，沿線有海景、岩岸和海豚觀景點。", "en": "A classic Noosa coastal walk with ocean views, rocky coves, and lookout points." },
          "links": [{ "label": { "zh-TW": "📍 停車場", "en": "📍 Carpark" }, "url": "https://www.google.com/maps/search/?api=1&query=Noosa%20National%20Park%20Carpark", "theme": "d1" }, { "label": { "zh-TW": "📍 Tea Tree Bay", "en": "📍 Tea Tree Bay" }, "url": "https://www.google.com/maps/search/?api=1&query=Tea%20Tree%20Bay%20Beach%20Noosa", "theme": "d1" }, { "label": { "zh-TW": "📍 Dolphin Point", "en": "📍 Dolphin Point" }, "url": "https://www.google.com/maps/search/?api=1&query=Dolphin%20Point%20Lookout%20Noosa", "theme": "d1" }],
          "tags": [{ "type": "hike", "text": { "zh-TW": "原路折返", "en": "Out and back" } }, { "type": "hike", "text": { "zh-TW": "1.2km 單程", "en": "1.2 km one way" } }, { "type": "hike", "text": { "zh-TW": "約 75-100 分鐘", "en": "About 75-100 min" } }],
          "note": { "zh-TW": "沿海步道，有機會看到海豚。", "en": "Coastal path with a chance of spotting dolphins." },
          "photos": [{ "src": "pics/Noosa Coastal Walk.JPG", "alt": "Noosa Coastal Walk" }]
        },
        {
          "time": ["17:00", "17:30"],
          "chip": "noosa",
          "dot": "orange",
          "title": { "zh-TW": "🍦 Massimo's Gelateria", "en": "🍦 Massimo's Gelateria" },
          "intro": { "zh-TW": "步道後的甜點停靠點，適合輕鬆收尾。", "en": "A simple dessert stop after the coastal walk." },
          "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Massimo%27s%20Gelateria%20Noosa", "theme": "d1" }],
          "tags": [{ "type": "food", "text": { "zh-TW": "週六開到 21:30", "en": "Open Sat until 21:30" } }],
          "note": { "zh-TW": "走完步道後的完美甜點。", "en": "A good post-walk gelato stop." }
        }
      ],
      "foodSection": {
        "title": { "zh-TW": "🍽️ Day 1 餐廳與素食預算", "en": "🍽️ Day 1 food and vegetarian budget" },
        "rows": [
          { "type": { "zh-TW": "爬山後餐", "en": "Post-hike" }, "name": "The Coffee Club Cafe - Beerwah", "veg": { "zh-TW": "部分 Vegan 可調", "en": "Some vegan adjustments" }, "budget": "AUD 20-30" },
          { "type": { "zh-TW": "晚餐首選", "en": "Dinner pick" }, "name": "Leela Noosa", "veg": { "zh-TW": "素食咖哩選擇多", "en": "Many vegetarian curries" }, "budget": "AUD 20-30" },
          { "type": { "zh-TW": "晚餐輕食", "en": "Light dinner" }, "name": "Raw + Rice Noosa", "veg": { "zh-TW": "Tofu / Vegan OK", "en": "Tofu / vegan OK" }, "budget": "AUD 17-25" },
          { "type": { "zh-TW": "晚餐氣氛", "en": "Atmosphere" }, "name": "Somedays Pizza Noosa", "veg": { "zh-TW": "Veg / Vegan 選項", "en": "Veg / vegan options" }, "budget": "AUD 30-40" }
        ]
      }
    },
    {
      "id": 2,
      "theme": "d2",
      "mapId": "day2",
      "label": { "zh-TW": "Day 2", "en": "Day 2" },
      "tabSub": { "zh-TW": "07/05 (日) Coolum→返家", "en": "Jul 05 Sun · Coolum to home" },
      "route": { "zh-TW": "🗺️ Farmers Mkt → Mt Coolum → Viet Haus → Carina", "en": "🗺️ Farmers Market → Mt Coolum → Viet Haus → Carina" },
      "chips": [["hotel", "Noosa River Retreat"], ["farmersmarket", "Farmers Market"], ["coolum", "Mt Coolum"], ["viethaus", "Viet Haus"], ["home", "Carina"]],
      "items": [
        {
          "time": ["07:00", "08:10"],
          "chip": "farmersmarket",
          "dot": "orange",
          "title": { "zh-TW": "🥦 早餐：Noosa Farmers Market", "en": "🥦 Breakfast: Noosa Farmers Market" },
          "intro": { "zh-TW": "週日早上市集，水果、咖啡和蔬食選項都容易找。", "en": "A Sunday morning market with fruit, coffee, and vegetarian-friendly options." },
          "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Noosa%20Farmers%20Market", "theme": "d2" }],
          "tags": [{ "type": "food", "text": { "zh-TW": "市集早餐 AUD 10-25/人", "en": "Market breakfast AUD 10-25 pp" } }, { "type": "shop", "text": { "zh-TW": "週日 07:00-12:00", "en": "Sun 07:00-12:00" } }],
          "note": { "zh-TW": "水果、麵包、咖啡、蔬食攤位，素食選項容易找。", "en": "Good for fruit, bread, coffee, and easy vegetarian options." }
        },
        {
          "time": ["08:25", "09:00"],
          "chip": "hotel",
          "dot": "purple",
          "title": { "zh-TW": "🧳 收拾行李", "en": "🧳 Pack and reset" },
          "tags": [{ "type": "warn", "text": { "zh-TW": "⚠️ 重要！不可壓縮", "en": "⚠️ Important buffer" } }],
          "note": { "zh-TW": "留足夠時間整理，避免倉皇退房。", "en": "Leave real time to pack so checkout is not rushed." }
        },
        {
          "time": ["10:00", "12:00"],
          "chip": "coolum",
          "dot": "green",
          "title": { "zh-TW": "⛰️ Mount Coolum Walking Trail（登頂）", "en": "⛰️ Mount Coolum Walking Trail summit" },
          "intro": { "zh-TW": "短但偏陡的火山岩步道，登頂後能看海岸線。", "en": "A short but steep volcanic-rock climb with coastal views from the top." },
          "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Mount%20Coolum%20Walking%20Trail", "theme": "d2" }],
          "tags": [{ "type": "hike", "text": { "zh-TW": "Grade 4", "en": "Grade 4" } }, { "type": "hike", "text": { "zh-TW": "Steep / Rocky", "en": "Steep / rocky" } }, { "type": "hike", "text": { "zh-TW": "1.9km 來回", "en": "1.9 km return" } }, { "type": "hike", "text": { "zh-TW": "約 2 小時", "en": "About 2 hours" } }],
          "note": { "zh-TW": "官方 Grade 4，有陡峭岩石路段。攜帶充足水分，穿防滑登山鞋。", "en": "Official Grade 4 with steep rocky sections. Bring enough water and grippy shoes." },
          "photos": [{ "src": "pics/Mount Coolum Track.JPG", "alt": "Mount Coolum" }, { "src": "pics/Mount Coolum Track - 1.JPG", "alt": "Mount Coolum Summit" }]
        },
        {
          "time": ["12:50", "14:00"],
          "chip": "viethaus",
          "dot": "orange",
          "title": { "zh-TW": "🍜 午餐：Viet Haus", "en": "🍜 Lunch: Viet Haus" },
          "intro": { "zh-TW": "Maroochydore 的越南料理午餐點，爬完山後適合熱湯麵。", "en": "A Maroochydore Vietnamese lunch stop, good for hot soup after hiking." },
          "links": [{ "label": { "zh-TW": "📍 Viet Haus 地圖", "en": "📍 Viet Haus map" }, "url": "https://www.google.com/maps/search/?api=1&query=Viet%20Haus%20Ocean%20St%20Maroochydore", "theme": "d2" }],
          "tags": [{ "type": "food", "text": { "zh-TW": "越南料理", "en": "Vietnamese" } }, { "type": "food", "text": { "zh-TW": "Shop 9 / 12-20 Ocean St", "en": "Shop 9 / 12-20 Ocean St" } }],
          "note": { "zh-TW": "越南河粉、春卷，有素食選項可詢問。爬完山後吃熱湯麵非常舒服。", "en": "Pho and rolls. Ask for vegetarian options. Hot soup lands well after the climb." }
        },
        {
          "time": ["14:00", "16:00"],
          "chip": "home",
          "dot": "blue",
          "title": { "zh-TW": "🏠 Sunshine Plaza → Carina 返家", "en": "🏠 Sunshine Plaza → Carina home" },
          "links": [{ "label": { "zh-TW": "📍 導航", "en": "📍 Navigate" }, "url": "https://www.google.com/maps/dir/?api=1&origin=Viet%20Haus%20Ocean%20St%20Maroochydore&destination=Carina%20QLD&travelmode=driving", "theme": "d2" }],
          "tags": [{ "type": "drive", "text": { "zh-TW": "約 1.5-2 小時", "en": "About 1.5-2 hours" } }],
          "note": { "zh-TW": "週日下午回布里斯本車流較多，保守估計 2 小時。", "en": "Sunday afternoon traffic back to Brisbane can be heavier. Budget 2 hours." }
        }
      ],
      "foodSection": {
        "title": { "zh-TW": "🍽️ Day 2 餐廳與素食預算", "en": "🍽️ Day 2 food and vegetarian budget" },
        "rows": [
          { "type": { "zh-TW": "早餐", "en": "Breakfast" }, "name": "Noosa Farmers Market", "veg": { "zh-TW": "蔬食攤位多", "en": "Many vegetarian stalls" }, "budget": "AUD 10-25" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Viet Haus - Shop 9/12-20 Ocean St, Maroochydore", "veg": { "zh-TW": "越南料理・素食選項可詢問", "en": "Vietnamese, ask for vegetarian options" }, "budget": "AUD 15-25" }
        ]
      },
      "tips": {
        "title": { "zh-TW": "⚠️ 重要提醒", "en": "⚠️ Key reminders" },
        "items": [
          { "zh-TW": "Noosa NP 停車場週末可能客滿，備案停 Hastings Street 附近", "en": "Noosa NP parking may fill on weekends. Use Hastings Street as backup." },
          { "zh-TW": "Mount Coolum Grade 4，帶足夠水分和防滑登山鞋", "en": "Mount Coolum is Grade 4. Bring enough water and grippy shoes." },
          { "zh-TW": "週日下午回布里斯本，抓 2 小時車程比較穩", "en": "Budget 2 hours for the Sunday afternoon drive back to Brisbane." }
        ]
      }
    }
  ]
}
;

var state = {
  data: null,
  lang: localStorage.getItem('lang') || 'zh-TW',
  day: 1,
  mapTimer: null
};

var els = {
  html: document.documentElement,
  title: document.querySelector('title'),
  mapPanel: document.getElementById('mapPanel'),
  mapLoading: document.getElementById('mapLoading'),
  mapLoadingText: document.getElementById('mapLoadingText'),
  mapToast: document.getElementById('mapToast'),
  chipStrip: document.getElementById('chipStrip'),
  dayTabs: document.getElementById('dayTabs'),
  sidebar: document.getElementById('sidebar'),
  sidebarBody: document.getElementById('sidebarBody'),
  sidebarHeader: document.getElementById('sidebarHeader'),
  sheetHandle: document.getElementById('sheetHandle'),
  handleHint: document.getElementById('handleHint'),
  tripTitle: document.getElementById('tripTitle'),
  tripSubtitle: document.getElementById('tripSubtitle'),
  printBtn: document.getElementById('printBtn'),
  themeToggle: document.getElementById('themeToggle'),
  langToggle: document.getElementById('langToggle'),
  resizeDivider: document.getElementById('resizeDivider'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxClose: document.getElementById('lightboxClose')
};

function t(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[state.lang] || value['zh-TW'] || value.en || '';
}

function ui(key) {
  return state.data.languages[state.lang].ui[key];
}

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function mapEmbedUrl(query) {
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(query) +
    '&output=embed&z=14&language=' + encodeURIComponent(state.lang);
}

function convertToEmbed(href) {
  try {
    var url = new URL(href);
    var query = url.searchParams.get('query');
    var destination = url.searchParams.get('destination');
    var value = query || destination;
    if (!value) return null;
    return mapEmbedUrl(value);
  } catch (err) {
    return null;
  }
}

function showMapLoading() {
  els.mapLoading.classList.add('show');
  window.clearTimeout(state.mapTimer);
  state.mapTimer = window.setTimeout(hideMapLoading, 3200);
}

function hideMapLoading() {
  window.clearTimeout(state.mapTimer);
  els.mapLoading.classList.remove('show');
}

function updateIframeSrc(iframe, src) {
  if (!iframe || iframe.src === src) return;
  showMapLoading();
  iframe.src = src;
}

function showMapToast() {
  if (window.innerWidth >= 768) return;
  els.mapToast.classList.add('show');
  window.clearTimeout(window._toastTimer);
  window._toastTimer = window.setTimeout(function() {
    els.mapToast.classList.remove('show');
  }, 2200);
}

function applyTheme(theme) {
  if (theme === 'system') {
    els.html.removeAttribute('data-theme');
  } else {
    els.html.setAttribute('data-theme', theme);
  }

  var isDark = els.html.getAttribute('data-theme') === 'dark' ||
    (!els.html.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  els.themeToggle.textContent = isDark ? '☼' : '◐';
  els.themeToggle.setAttribute('aria-label', isDark ? ui('themeLight') : ui('themeDark'));
  els.themeToggle.setAttribute('title', isDark ? ui('themeLight') : ui('themeDark'));
}

function toggleSidebar() {
  if (window.innerWidth >= 768) return;
  var expanded = els.sidebar.classList.toggle('expanded');
  els.handleHint.textContent = expanded ? ui('collapse') : ui('expand');
}

function setActiveChip(chipKey) {
  els.chipStrip.querySelectorAll('.chip').forEach(function(chip) {
    chip.classList.toggle('active', chip.dataset.chip === chipKey);
  });

  if (!chipKey) return;
  var target = els.chipStrip.querySelector('[data-chip="' + chipKey + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function currentDay() {
  return state.data.days.find(function(day) { return day.id === state.day; }) || state.data.days[0];
}

function renderChips(day) {
  els.chipStrip.innerHTML = '';
  day.chips.forEach(function(chip, index) {
    var node = el('button', 'chip ' + day.theme, chip[1]);
    node.type = 'button';
    node.dataset.chip = chip[0];
    node.addEventListener('click', function() {
      var item = els.sidebarBody.querySelector('[data-chip="' + chip[0] + '"]');
      if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setActiveChip(chip[0]);
    });
    els.chipStrip.appendChild(node);

    if (index < day.chips.length - 1) {
      els.chipStrip.appendChild(el('span', 'chip-arrow', '→'));
    }
  });
}

function renderMap(day) {
  els.mapPanel.querySelectorAll('.map-wrap').forEach(function(node) {
    node.classList.remove('active');
  });

  var mapWrap = document.getElementById('map-' + day.mapId);
  if (!mapWrap) {
    var map = state.data.maps[day.mapId];
    mapWrap = el('div', 'map-wrap');
    mapWrap.id = 'map-' + day.mapId;

    var iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Day ' + day.id + ' Map';
    iframe.addEventListener('load', hideMapLoading);
    iframe.src = mapEmbedUrl(map.query);

    var link = el('a', 'map-nav-float ' + day.theme, ui('openRoute'));
    link.href = map.routeUrl;
    link.target = '_blank';

    mapWrap.appendChild(iframe);
    mapWrap.appendChild(link);
    els.mapPanel.appendChild(mapWrap);
  }

  mapWrap.querySelector('.map-nav-float').textContent = ui('openRoute');
  mapWrap.classList.add('active');
}

function renderTabs() {
  els.dayTabs.innerHTML = '';
  state.data.days.forEach(function(day) {
    var tab = el('button', 'day-tab' + (day.id === state.day ? ' active' : ''));
    tab.type = 'button';
    tab.innerHTML = '<span class="tab-label"></span><span class="tab-sub"></span>';
    tab.querySelector('.tab-label').textContent = t(day.label);
    tab.querySelector('.tab-sub').textContent = t(day.tabSub);
    tab.addEventListener('click', function() { switchDay(day.id); });
    els.dayTabs.appendChild(tab);
  });
}

function renderTags(tags) {
  var wrap = el('div', 'tl-tags');
  (tags || []).forEach(function(tag) {
    wrap.appendChild(el('span', 'tag tag-' + tag.type, t(tag.text)));
  });
  return wrap;
}

function renderLinks(links) {
  var wrap = el('div', 'tl-links');
  (links || []).forEach(function(link) {
    var node = el('a', 'tl-link ' + (link.theme || currentDay().theme), t(link.label));
    node.href = link.url;
    node.target = '_blank';
    wrap.appendChild(node);
  });
  return wrap;
}

function renderPhotos(photos) {
  if (!photos || !photos.length) return null;
  var wrap = el('div', 'tl-photos');
  photos.forEach(function(photo) {
    var img = document.createElement('img');
    img.className = 'tl-photo';
    img.src = photo.src;
    img.alt = photo.alt || '';
    img.addEventListener('click', function() { openLightbox(photo.src); });
    wrap.appendChild(img);
  });
  return wrap;
}

function renderCard(card, day) {
  var node = el('div', 'tl-card ' + (card.kind === 'backup' ? 'tl-card-backup' : 'tl-card-main'));
  node.appendChild(el('div', 'tl-card-label', ui(card.kind || 'main')));
  node.appendChild(el('div', 'tl-card-name', card.name));
  if (card.intro) node.appendChild(el('div', 'place-intro', t(card.intro)));
  if (card.tags) node.appendChild(renderTags(card.tags));
  if (card.links) node.appendChild(renderLinks(card.links));
  if (card.note) node.appendChild(el('div', 'tl-card-note', t(card.note)));
  var photos = renderPhotos(card.photos);
  if (photos) node.appendChild(photos);
  return node;
}

function renderItem(item, day, isLast) {
  var row = el('div', 'tl-item');
  if (item.chip) row.dataset.chip = item.chip;

  var time = el('div', 'tl-time');
  time.innerHTML = (item.time || []).join('<br>');
  row.appendChild(time);

  var axis = el('div', 'tl-axis');
  axis.appendChild(el('div', 'tl-dot ' + (item.smallDot ? 'sm ' : '') + 'dot-' + item.dot));
  if (!isLast) axis.appendChild(el('div', 'tl-line'));
  row.appendChild(axis);

  var body = el('div', 'tl-body');
  body.appendChild(el('div', 'tl-main', t(item.title)));
  if (item.intro) body.appendChild(el('div', 'place-intro', t(item.intro)));
  if (item.links) body.appendChild(renderLinks(item.links));
  if (item.tags) body.appendChild(renderTags(item.tags));
  if (item.note) body.appendChild(el('div', 'tl-note', t(item.note)));

  if (item.cards) {
    var cards = el('div', 'tl-parallel');
    item.cards.forEach(function(card) { cards.appendChild(renderCard(card, day)); });
    body.appendChild(cards);
  }

  var photos = renderPhotos(item.photos);
  if (photos) body.appendChild(photos);

  row.appendChild(body);
  return row;
}

function renderFoodSection(section) {
  if (!section) return null;
  var frag = document.createDocumentFragment();
  frag.appendChild(el('div', 'section-label', t(section.title)));
  var cards = el('div', 'food-cards');

  section.rows.forEach(function(row) {
    var food = el('div', 'food-row');
    food.appendChild(el('div', 'fr-type', t(row.type)));
    var info = el('div', 'fr-info');
    info.appendChild(el('div', 'fr-name', row.name));
    info.appendChild(el('div', 'fr-veg', t(row.veg)));
    food.appendChild(info);
    food.appendChild(el('div', 'fr-budget', row.budget));
    cards.appendChild(food);
  });

  frag.appendChild(cards);
  return frag;
}

function renderTips(tips) {
  if (!tips) return null;
  var box = el('div', 'tips-box');
  box.appendChild(el('div', 'tips-title', t(tips.title)));
  var list = el('ul', 'tips-list');
  tips.items.forEach(function(item) { list.appendChild(el('li', '', t(item))); });
  box.appendChild(list);
  return box;
}

function renderDayContent(day) {
  els.sidebarBody.innerHTML = '';

  var route = el('div', 'route-strip ' + day.theme);
  route.appendChild(el('span', 'route-strip-label', t(day.route)));
  var nav = el('a', 'nav-btn ' + day.theme, ui('navigate'));
  nav.href = state.data.maps[day.mapId].routeUrl;
  nav.target = '_blank';
  route.appendChild(nav);
  els.sidebarBody.appendChild(route);

  var timeline = el('div', 'timeline');
  day.items.forEach(function(item, index) {
    timeline.appendChild(renderItem(item, day, index === day.items.length - 1));
  });
  els.sidebarBody.appendChild(timeline);

  var food = renderFoodSection(day.foodSection);
  if (food) els.sidebarBody.appendChild(food);

  var tips = renderTips(day.tips);
  if (tips) els.sidebarBody.appendChild(tips);
}

function renderStaticText() {
  var langData = state.data.languages[state.lang];
  els.html.lang = state.lang;
  els.title.textContent = langData.tripTitle;
  els.tripTitle.textContent = langData.tripTitle;
  els.tripSubtitle.textContent = langData.tripSubtitle;
  els.printBtn.textContent = ui('print');
  els.handleHint.textContent = els.sidebar.classList.contains('expanded') ? ui('collapse') : ui('expand');
  els.langToggle.textContent = ui('languageButton');
  els.mapLoadingText.textContent = ui('mapLoading');
  els.mapToast.textContent = ui('mapUpdated');
  applyTheme(localStorage.getItem('theme') || 'system');
}

function render() {
  var day = currentDay();
  renderStaticText();
  renderTabs();
  renderChips(day);
  renderMap(day);
  renderDayContent(day);
  setActiveChip(null);
}

function switchDay(dayId) {
  state.day = dayId;
  render();

  if (window.innerWidth < 768) {
    els.sidebar.classList.add('expanded');
    els.handleHint.textContent = ui('collapse');
    els.sidebarBody.scrollTop = 0;
  }
}

function openLightbox(src) {
  els.lightboxImg.src = src;
  els.lightbox.classList.add('open');
}

function closeLightbox() {
  els.lightbox.classList.remove('open');
}

function handleTimelineClick(event) {
  var link = event.target.closest('a.tl-link');
  if (link) {
    if (window.innerWidth < 768) {
      event.preventDefault();
      var linkItem = link.closest('.tl-item');
      selectItem(linkItem, link.href);
    }
    return;
  }

  if (event.target.closest('a')) return;

  var item = event.target.closest('.tl-item');
  if (!item) return;
  var firstLink = item.querySelector('.tl-link');
  selectItem(item, firstLink ? firstLink.href : null);
}

function selectItem(item, href) {
  if (!item) return;
  els.sidebarBody.querySelectorAll('.tl-item').forEach(function(node) {
    node.classList.remove('selected');
  });
  item.classList.add('selected');
  setActiveChip(item.dataset.chip || null);

  var embedUrl = href ? convertToEmbed(href) : null;
  var iframe = els.mapPanel.querySelector('.map-wrap.active iframe');
  if (embedUrl && iframe) updateIframeSrc(iframe, embedUrl);
  showMapToast();
}

function setupResize() {
  var divider = els.resizeDivider;
  var isDragging = false;

  function startDrag(event) {
    if (window.innerWidth < 768) return;
    isDragging = true;
    divider.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }

  function onDrag(clientX) {
    if (!isDragging) return;
    var minW = Math.floor(window.innerWidth / 4);
    var maxW = Math.floor(window.innerWidth / 2);
    var newW = Math.max(minW, Math.min(maxW, window.innerWidth - clientX));
    els.sidebar.style.width = newW + 'px';
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    divider.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  divider.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', function(event) { onDrag(event.clientX); });
  document.addEventListener('mouseup', stopDrag);
  divider.addEventListener('touchstart', function(event) { startDrag(event.touches[0]); }, { passive: false });
  document.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    onDrag(event.touches[0].clientX);
    event.preventDefault();
  }, { passive: false });
  document.addEventListener('touchend', stopDrag);
}

function setupEvents() {
  els.themeToggle.addEventListener('click', function() {
    var current = els.html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  els.langToggle.addEventListener('click', function() {
    state.lang = state.lang === 'zh-TW' ? 'en' : 'zh-TW';
    localStorage.setItem('lang', state.lang);
    render();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (!localStorage.getItem('theme')) applyTheme('system');
  });

  els.sheetHandle.addEventListener('click', toggleSidebar);
  els.sidebarHeader.addEventListener('click', toggleSidebar);
  els.printBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    window.print();
  });
  els.sidebarBody.addEventListener('click', handleTimelineClick);
  els.lightbox.addEventListener('click', closeLightbox);
  els.lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLightbox();
  });

  setupResize();
}

function init(data) {
  state.data = data;
  if (!state.data.languages[state.lang]) state.lang = state.data.defaultLanguage;
  setupEvents();
  render();
}

init(ITINERARY_DATA);
