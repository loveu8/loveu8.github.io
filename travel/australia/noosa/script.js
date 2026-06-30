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
        "backup": "⚡ 備案",
        "routeStops": "行程路線站點",
        "dayTabsLabel": "選擇天數",
        "backToTop": "回到頂部",
        "vegPicks": "🌱 素食推薦",
        "generalPicks": "🍖 一般餐點推薦"
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
        "backup": "⚡ Backup",
        "routeStops": "Route stops",
        "dayTabsLabel": "Choose day",
        "backToTop": "Back to top",
        "vegPicks": "🌱 Vegetarian picks",
        "generalPicks": "🍖 General / meat picks"
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
          "title": { "zh-TW": "🛍️ Eumundi Markets · 市集午餐", "en": "🛍️ Eumundi Markets · market lunch" },
          "intro": { "zh-TW": "陽光海岸知名週末市集，適合買小吃和手作小物，這段時間直接在市集解決中餐。", "en": "A well-known Sunshine Coast market for snacks, crafts, and browsing — eat lunch right here at the food stalls." },
          "links": [{ "label": { "zh-TW": "📍 Eumundi Markets", "en": "📍 Eumundi Markets" }, "url": "https://www.google.com/maps/search/?api=1&query=Eumundi%20Markets", "theme": "d1" }],
          "tags": [{ "type": "shop", "text": { "zh-TW": "市集 07:30-14:00", "en": "Market 07:30-14:00" } }],
          "note": { "zh-TW": "中餐推薦攤位：Seko Food（中東口味捲餅，素食/全素選擇多）、Samosa Cart（印度咖哩餃，全素）、Turkish Gozleme（土耳其烤餅，起司/菠菜素食口味）。市集攤位每週略有變動，到場可再確認。建議 13:30 前離開。", "en": "Recommended lunch stalls: Seko Food (Middle Eastern wraps, many vegan/vegetarian options), Samosa Cart (Indian samosas, fully vegetarian), Turkish Gozleme (cheese/spinach vegetarian options). Stalls rotate week to week, so confirm on site. Aim to leave before 13:30." },
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
        "title": { "zh-TW": "🍽️ Day 1 餐廳與預算", "en": "🍽️ Day 1 food and budget" },
        "vegRows": [
          { "type": { "zh-TW": "爬山後餐", "en": "Post-hike" }, "name": "The Coffee Club Cafe - Beerwah", "veg": { "zh-TW": "推薦：Tomato & Pesto Flat Grill", "en": "Pick: Tomato & Pesto Flat Grill" }, "budget": "AUD 20-30", "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Coffee%20Club%20Cafe%20Beerwah" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Seko Food (Eumundi Markets)", "veg": { "zh-TW": "中東捲餅，素食/全素選擇多", "en": "Middle Eastern wraps, many vegan/veg picks" }, "budget": "AUD 12-18", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Seko%20Food%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Samosa Cart (Eumundi Markets)", "veg": { "zh-TW": "印度咖哩餃，全素食", "en": "Indian samosas, fully vegetarian" }, "budget": "AUD 8-12", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Samosa%20Cart%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Turkish Gozleme (Eumundi Markets)", "veg": { "zh-TW": "起司/菠菜素食口味", "en": "Cheese / spinach vegetarian fillings" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Turkish%20Gozleme%20Eumundi%20Markets" },
          { "type": { "zh-TW": "晚餐首選", "en": "Dinner pick" }, "name": "Leela Noosa", "veg": { "zh-TW": "推薦：Saag Aloo / Chana Masala 等素食咖哩", "en": "Pick: Saag Aloo / Chana Masala veg curries" }, "budget": "AUD 20-30", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Leela%20Noosa" },
          { "type": { "zh-TW": "晚餐輕食", "en": "Light dinner" }, "name": "Raw + Rice Noosa", "veg": { "zh-TW": "推薦：豆腐 / 野菇碗（自選配料）", "en": "Pick: tofu / sticky mushroom bowl (build your own)" }, "budget": "AUD 17-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Raw%20%2B%20Rice%20Noosa" },
          { "type": { "zh-TW": "晚餐氣氛", "en": "Atmosphere" }, "name": "Somedays Pizza Noosa", "veg": { "zh-TW": "推薦：Margherita 蔬食披薩", "en": "Pick: Margherita veg pizza" }, "budget": "AUD 30-40", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Somedays%20Pizza%20Noosa" }
        ],
        "generalRows": [
          { "type": { "zh-TW": "爬山後餐", "en": "Post-hike" }, "name": "The Coffee Club Cafe - Beerwah", "veg": { "zh-TW": "推薦：雞肉三明治 / 牛排三明治", "en": "Pick: Chicken Schnitzel / Steak Sandwich" }, "budget": "AUD 20-30", "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Coffee%20Club%20Cafe%20Beerwah" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Pops Dim Sims (Eumundi Markets)", "veg": { "zh-TW": "招牌雞肉/豬肉煎餃（也有素食口味）", "en": "Signature chicken / pork dim sims (veg version also available)" }, "budget": "AUD 6-10", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Pops%20Dim%20Sims%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Traditional German Sausages (Eumundi Markets)", "veg": { "zh-TW": "德式香腸佐酸菜法棍", "en": "German sausage with sauerkraut in a baguette" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Traditional%20German%20Sausages%20Eumundi%20Markets" },
          { "type": { "zh-TW": "晚餐首選", "en": "Dinner pick" }, "name": "Leela Noosa", "veg": { "zh-TW": "推薦：肉類咖哩任選", "en": "Pick: choice of meat curries" }, "budget": "AUD 22-32", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Leela%20Noosa" },
          { "type": { "zh-TW": "晚餐輕食", "en": "Light dinner" }, "name": "Raw + Rice Noosa", "veg": { "zh-TW": "推薦：鮭魚 / 雞肉碗（自選配料）", "en": "Pick: salmon / chicken bowl (build your own)" }, "budget": "AUD 19-27", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Raw%20%2B%20Rice%20Noosa" },
          { "type": { "zh-TW": "晚餐氣氛", "en": "Atmosphere" }, "name": "Somedays Pizza Noosa", "veg": { "zh-TW": "推薦：Prosciutto / 煙燻肉腸披薩", "en": "Pick: Prosciutto / smoked meat pizza" }, "budget": "AUD 30-40", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Somedays%20Pizza%20Noosa" }
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
          "note": { "zh-TW": "大家推薦：Flying West（口碑很好的咖啡）、Roti 配仁當咖哩、現烤可頌與班尼迪克蛋等熱食攤位。建議空腹早點到，邊逛邊試吃。攤位每週略有變動，到場可再確認。", "en": "Crowd favourites: Flying West coffee, roti with rendang curry, fresh pastries, and hot breakfast stalls. Arrive hungry and early to graze your way through. Stalls rotate week to week, so confirm on site." }
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
        "title": { "zh-TW": "🍽️ Day 2 餐廳與預算", "en": "🍽️ Day 2 food and budget" },
        "vegRows": [
          { "type": { "zh-TW": "早餐市集", "en": "Breakfast" }, "name": "Noosa Farmers Market", "veg": { "zh-TW": "新鮮水果、果汁、烘焙、蔬食攤位多", "en": "Fresh fruit, juice, baked goods, many vegetarian stalls" }, "budget": "AUD 10-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦咖啡", "en": "Coffee pick" }, "name": "Flying West Coffee (Noosa Farmers Market)", "veg": { "zh-TW": "在地口碑咖啡攤", "en": "Locally loved coffee stall" }, "budget": "AUD 5-8", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Flying%20West%20Coffee%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "Roti & Rendang Curry stall (Noosa Farmers Market)", "veg": { "zh-TW": "推薦：素食仁當咖哩配 Roti（可詢問）", "en": "Pick: vegetarian rendang with roti (ask on site)" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rendang%20Curry%20Roti%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Viet Haus - Shop 9/12-20 Ocean St, Maroochydore", "veg": { "zh-TW": "推薦：蔬食河粉 / 鮮蔬春捲（可詢問）", "en": "Pick: vegetable pho / fresh veg spring rolls (ask on site)" }, "budget": "AUD 15-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Viet%20Haus%20Ocean%20St%20Maroochydore" }
        ],
        "generalRows": [
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "培根蛋堡 / 德式香腸攤位 (Noosa Farmers Market)", "veg": { "zh-TW": "經典市集早餐，攤位每週略有不同", "en": "Classic market breakfast, exact stall rotates weekly" }, "budget": "AUD 10-18", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "Roti & Rendang Curry stall (Noosa Farmers Market)", "veg": { "zh-TW": "推薦：經典牛肉仁當咖哩", "en": "Pick: classic beef rendang" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rendang%20Curry%20Roti%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Viet Haus - Shop 9/12-20 Ocean St, Maroochydore", "veg": { "zh-TW": "推薦：招牌牛肉河粉 Pho Bo", "en": "Pick: signature beef pho (Pho Bo)" }, "budget": "AUD 16-26", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Viet%20Haus%20Ocean%20St%20Maroochydore" }
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
  mapTimer: null,
  chipObserver: null,
  chipVisibility: {}
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
  lightboxClose: document.getElementById('lightboxClose'),
  backToTop: document.getElementById('backToTop')
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
    var isActive = chip.dataset.chip === chipKey;
    chip.classList.toggle('active', isActive);
    if (isActive) {
      chip.setAttribute('aria-current', 'step');
    } else {
      chip.removeAttribute('aria-current');
    }
  });

  if (!chipKey) return;
  var target = els.chipStrip.querySelector('[data-chip="' + chipKey + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function setupScrollSpy() {
  if (state.chipObserver) {
    state.chipObserver.disconnect();
    state.chipObserver = null;
  }
  if (!window.IntersectionObserver) return;

  var items = Array.prototype.slice.call(els.sidebarBody.querySelectorAll('.tl-item[data-chip]'));
  state.chipVisibility = {};
  if (!items.length) return;

  state.chipObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      state.chipVisibility[entry.target.dataset.chip] = entry.isIntersecting;
    });
    var current = null;
    items.forEach(function(item) {
      if (state.chipVisibility[item.dataset.chip]) current = item.dataset.chip;
    });
    if (current) setActiveChip(current);
  }, {
    root: els.sidebarBody,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  });

  items.forEach(function(item) { state.chipObserver.observe(item); });
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
    var isActive = day.id === state.day;
    var tab = el('button', 'day-tab' + (isActive ? ' active' : ''));
    tab.type = 'button';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
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

function renderFoodRows(rows, dietClass) {
  var cards = el('div', 'food-cards');
  rows.forEach(function(row) {
    var food = el('div', 'food-row');
    food.appendChild(el('div', 'fr-type', t(row.type)));
    var info = el('div', 'fr-info');
    info.appendChild(el('div', 'fr-name', row.name));
    info.appendChild(el('div', 'fr-veg ' + dietClass, t(row.veg)));
    food.appendChild(info);
    food.appendChild(el('div', 'fr-budget', row.budget));
    if (row.mapUrl) {
      var link = el('a', 'fr-link', '📍');
      link.href = row.mapUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', ui('map') + ': ' + row.name);
      link.title = ui('map');
      food.appendChild(link);
    }
    cards.appendChild(food);
  });
  return cards;
}

function renderFoodSection(section) {
  if (!section) return null;
  var frag = document.createDocumentFragment();
  frag.appendChild(el('div', 'section-label', t(section.title)));

  if (section.vegRows && section.vegRows.length) {
    frag.appendChild(el('div', 'subsection-label', ui('vegPicks')));
    frag.appendChild(renderFoodRows(section.vegRows, 'fr-veg-pick'));
  }
  if (section.generalRows && section.generalRows.length) {
    frag.appendChild(el('div', 'subsection-label', ui('generalPicks')));
    frag.appendChild(renderFoodRows(section.generalRows, 'fr-general-pick'));
  }

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
  els.chipStrip.setAttribute('aria-label', ui('routeStops'));
  els.dayTabs.setAttribute('aria-label', ui('dayTabsLabel'));
  els.backToTop.setAttribute('aria-label', ui('backToTop'));
  els.backToTop.setAttribute('title', ui('backToTop'));
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
  setupScrollSpy();
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

  els.sidebarBody.addEventListener('scroll', function() {
    els.backToTop.classList.toggle('show', els.sidebarBody.scrollTop > 280);
  });
  els.backToTop.addEventListener('click', function() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.sidebarBody.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
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
