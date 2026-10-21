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
        "viewMap": "🗺️ 查看地圖",
        "viewRoute": "📍 路線",
        "openInGoogleMaps": "↗ Maps",
        "main": "✅ 主要",
        "mainPlan": "✅ 主要行程",
        "backup": "⚡ 備案",
        "routeStops": "行程路線站點",
        "dayTabsLabel": "選擇天數",
        "backToTop": "回到頂部",
        "vegPicks": "🌱 素食推薦",
        "generalPicks": "🍖 一般餐點推薦",
        "closeLightbox": "關閉圖片",
        "viewPhoto": "查看照片"
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
        "viewMap": "🗺️ View map",
        "viewRoute": "📍 Route",
        "openInGoogleMaps": "↗ Maps",
        "main": "✅ Main",
        "mainPlan": "✅ Main plan",
        "backup": "⚡ Backup",
        "routeStops": "Route stops",
        "dayTabsLabel": "Choose day",
        "backToTop": "Back to top",
        "vegPicks": "🌱 Vegetarian picks",
        "generalPicks": "🍖 General / meat picks",
        "closeLightbox": "Close photo",
        "viewPhoto": "View photo"
      },
      "tripTitle": "NOOSA Weekend Itinerary",
      "tripSubtitle": "2026/07/04-05 · Self-drive · Vegetarian friendly"
    }
  },
  "maps": {
    "day1": {
      "query": "Mount Ngungun Summit Track Carpark, Glass House Mountains QLD",
      "routeUrl": "https://www.google.com/maps/dir/?api=1&origin=Carina%20QLD&destination=Noosa%20National%20Park%20Carpark&waypoints=Mount%20Ngungun%20Summit%20Track%20Carpark%7CEumundi%20Markets%7CNoosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&travelmode=driving"
    },
    "day2": {
      "query": "Chocolate Country Montville",
      "routeUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&destination=Carina%20QLD&waypoints=Noosa%20Farmers%20Market%7CChocolate%20Country%20Montville%7CCostco%20Wholesale%20North%20Lakes&travelmode=driving"
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
        "zh-TW": "🗺️ Mt Ngungun → Eumundi → Noosa River Retreat → Noosa National Park",
        "en": "🗺️ Mt Ngungun → Eumundi → Noosa River Retreat → Noosa National Park"
      },
      "chips": [
        ["carina", "Carina"],
        ["ngungun", "Mt Ngungun"],
        ["eumundi", "Eumundi Markets"],
        ["noosa", "Noosa River Retreat"],
        ["noosanp", "Noosa National Park"]
      ],
      "items": [
        {
          "kind": "transit",
          "time": ["06:30", "07:40"],
          "chip": "carina",
          "label": { "zh-TW": "Carina → Mount Ngungun 步道口", "en": "Carina → Mount Ngungun trailhead" },
          "duration": { "zh-TW": "開車 約 70 分鐘", "en": "Drive about 70 min" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Carina%20QLD&destination=125%20Fullertons%20Rd%2C%20Glass%20House%20Mountains%20QLD%204518&travelmode=driving",
          "theme": "d1",
          "note": { "zh-TW": "⚡ 早出發，停車和準備更充裕。記得帶簡單麵包跟香蕉備用！", "en": "⚡ Leave early for easier parking and prep. Bring bread and bananas as backup snacks." }
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
              "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Mount%20Ngungun%20Summit%20Track%20Carpark", "theme": "d1" }],
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
          "kind": "transit",
          "time": ["09:40", "11:00"],
          "label": { "zh-TW": "Mount Ngungun → Eumundi Markets", "en": "Mount Ngungun → Eumundi Markets" },
          "duration": { "zh-TW": "開車 約 40 分鐘（含彈性時間）", "en": "Drive about 40 min (includes buffer)" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=125%20Fullertons%20Rd%2C%20Glass%20House%20Mountains%20QLD%204518&destination=Eumundi%20Markets&travelmode=driving",
          "theme": "d1"
        },
        {
          "time": ["11:00", "13:30"],
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
          "kind": "transit",
          "time": ["13:30", "14:15"],
          "label": { "zh-TW": "Eumundi Markets → Noosa River Retreat", "en": "Eumundi Markets → Noosa River Retreat" },
          "duration": { "zh-TW": "開車 約 15-20 分鐘", "en": "Drive about 15-20 min" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Eumundi%20Markets&destination=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&travelmode=driving",
          "theme": "d1"
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
          "kind": "transit",
          "time": ["15:15", "15:35"],
          "label": { "zh-TW": "Noosa River Retreat → Noosa National Park", "en": "Noosa River Retreat → Noosa National Park" },
          "duration": { "zh-TW": "開車 約 10 分鐘", "en": "Drive about 10 min" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&destination=Noosa%20National%20Park%20Carpark&travelmode=driving",
          "theme": "d1"
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
          "kind": "transit",
          "time": ["17:00", "17:10"],
          "label": { "zh-TW": "Noosa National Park → Massimo's Gelateria", "en": "Noosa National Park → Massimo's Gelateria" },
          "duration": { "zh-TW": "步行或開車 約 10 分鐘", "en": "About 10 min on foot or by car" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20National%20Park%20Carpark&destination=Massimo%27s%20Gelateria%20Noosa&travelmode=walking",
          "theme": "d1"
        },
        {
          "time": ["17:10", "17:40"],
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
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Seko Food (Eumundi Markets)", "veg": { "zh-TW": "中東烤餅捲鷹嘴豆泥、炸鷹嘴豆餅（falafel）與時蔬，多款素食/全素選擇", "en": "Lebanese-style wraps with hummus, falafel and fresh vegetables; many vegan/vegetarian options" }, "budget": "AUD 12-18", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Seko%20Food%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Samosa Cart (Eumundi Markets)", "veg": { "zh-TW": "酥炸三角餃，內餡為馬鈴薯、豌豆與孜然辛香料，全素", "en": "Deep-fried pastry triangles filled with spiced potato, peas and cumin; fully vegetarian" }, "budget": "AUD 8-12", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Samosa%20Cart%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Turkish Gozleme (Eumundi Markets)", "veg": { "zh-TW": "土耳其薄餅現煎，起司或菠菜起司內餡，外皮酥脆", "en": "Griddle-cooked Turkish flatbread with a cheese or spinach-and-cheese filling, crisp on the outside" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Turkish%20Gozleme%20Eumundi%20Markets" },
          { "type": { "zh-TW": "晚餐首選", "en": "Dinner pick" }, "name": "Leela Noosa", "veg": { "zh-TW": "推薦 Saag Aloo（菠菜馬鈴薯咖哩）或 Chana Masala（鷹嘴豆咖哩），配印度香米飯", "en": "Pick: Saag Aloo (spinach & potato curry) or Chana Masala (spiced chickpea curry), served with basmati rice" }, "budget": "AUD 20-30", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Leela%20Noosa" },
          { "type": { "zh-TW": "晚餐輕食", "en": "Light dinner" }, "name": "Raw + Rice Noosa", "veg": { "zh-TW": "推薦豆腐或野菇碗：香煎豆腐或炒野菇配藜麥/糙米，自選醬料與時蔬配料", "en": "Pick: tofu or wild mushroom bowl — pan-seared tofu or sautéed mushrooms over quinoa or brown rice, build-your-own sauce and veg toppings" }, "budget": "AUD 17-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Raw%20%2B%20Rice%20Noosa" },
          { "type": { "zh-TW": "晚餐氣氛", "en": "Atmosphere" }, "name": "Somedays Pizza Noosa", "veg": { "zh-TW": "推薦 Margherita：經典瑪格麗特披薩，番茄、莫札瑞拉起司與羅勒，柴燒窯烤", "en": "Pick: classic wood-fired Margherita with tomato, mozzarella and fresh basil" }, "budget": "AUD 30-40", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Somedays%20Pizza%20Noosa" }
        ],
        "generalRows": [
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Pops Dim Sims (Eumundi Markets)", "veg": { "zh-TW": "招牌手工煎餃，雞肉或豬肉內餡，外皮煎至金黃酥脆（也有素食口味）", "en": "Handmade dim sims with chicken or pork filling, pan-fried until golden and crisp (vegetarian version also available)" }, "budget": "AUD 6-10", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Pops%20Dim%20Sims%20Eumundi%20Markets" },
          { "type": { "zh-TW": "市集午餐", "en": "Market lunch" }, "name": "Traditional German Sausages (Eumundi Markets)", "veg": { "zh-TW": "德式煙燻香腸夾法棍，佐酸菜與芥末醬", "en": "Smoked German sausage in a baguette with sauerkraut and mustard" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Traditional%20German%20Sausages%20Eumundi%20Markets" },
          { "type": { "zh-TW": "晚餐首選", "en": "Dinner pick" }, "name": "Leela Noosa", "veg": { "zh-TW": "多款肉類咖哩任選，如奶油雞（Butter Chicken）或羊肉咖哩，配印度香米飯", "en": "Choice of meat curries such as Butter Chicken or lamb curry, served with basmati rice" }, "budget": "AUD 22-32", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Leela%20Noosa" },
          { "type": { "zh-TW": "晚餐輕食", "en": "Light dinner" }, "name": "Raw + Rice Noosa", "veg": { "zh-TW": "推薦鮭魚或雞肉碗：香煎鮭魚或雞肉配藜麥/糙米，自選醬料與時蔬配料", "en": "Pick: salmon or chicken bowl — pan-seared salmon or chicken over quinoa or brown rice, build-your-own sauce and veg toppings" }, "budget": "AUD 19-27", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Raw%20%2B%20Rice%20Noosa" },
          { "type": { "zh-TW": "晚餐氣氛", "en": "Atmosphere" }, "name": "Somedays Pizza Noosa", "veg": { "zh-TW": "推薦帕瑪火腿或煙燻香腸披薩，佐芝麻葉與帕瑪森起司", "en": "Pick: Prosciutto or smoked meat pizza topped with rocket and shaved parmesan" }, "budget": "AUD 30-40", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Somedays%20Pizza%20Noosa" }
        ]
      }
    },
    {
      "id": 2,
      "theme": "d2",
      "mapId": "day2",
      "label": { "zh-TW": "Day 2", "en": "Day 2" },
      "tabSub": { "zh-TW": "07/05 (日) Montville→返家", "en": "Jul 05 Sun · Montville to home" },
      "route": { "zh-TW": "🗺️ Farmers Mkt → Montville → Costco → Carina", "en": "🗺️ Farmers Market → Montville → Costco → Carina" },
      "chips": [["hotel", "Noosa River Retreat"], ["farmersmarket", "Farmers Market"], ["montville", "Montville"], ["costco", "Costco"], ["home", "Carina"]],
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
          "kind": "transit",
          "time": ["08:10", "08:25"],
          "label": { "zh-TW": "Noosa Farmers Market → 飯店", "en": "Noosa Farmers Market → hotel" },
          "duration": { "zh-TW": "開車 約 5-10 分鐘", "en": "Drive about 5-10 min" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20Farmers%20Market&destination=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&travelmode=driving",
          "theme": "d2"
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
          "kind": "transit",
          "time": ["09:00", "11:00"],
          "label": { "zh-TW": "飯店 → Chocolate Country Montville", "en": "Hotel → Chocolate Country Montville" },
          "duration": { "zh-TW": "開車 約 45 分鐘（含彈性與停車時間）", "en": "Drive about 45 min (includes buffer and parking)" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Noosa%20River%20Retreat%20Holiday%20Apartments%20Noosaville&destination=Chocolate%20Country%20Montville&travelmode=driving",
          "theme": "d2"
        },
        {
          "time": ["11:00", "13:00"],
          "chip": "montville",
          "dot": "orange",
          "title": { "zh-TW": "🏘️ Montville · 瑞士小鎮風情", "en": "🏘️ Montville · Swiss-village charm" },
          "intro": { "zh-TW": "陽光海岸腹地的山城小鎮，木造建築與歐風店面林立，適合散步、買手工果醬和牛奶軟糖，也能在這裡解決午餐。", "en": "A Sunshine Coast hinterland village with timber buildings and European-style shopfronts — good for a wander, fudge and jam shopping, and lunch." },
          "links": [{ "label": { "zh-TW": "📍 停車：Chocolate Country", "en": "📍 Parking: Chocolate Country" }, "url": "https://www.google.com/maps/search/?api=1&query=Chocolate%20Country%20Montville", "theme": "d2" }],
          "tags": [{ "type": "shop", "text": { "zh-TW": "手作商店 / 觀景", "en": "Craft shops / lookouts" } }, { "type": "food", "text": { "zh-TW": "可在地午餐", "en": "Lunch on site" } }],
          "note": { "zh-TW": "停車在 Chocolate Country Montville，再步行逛 Main Street，沿途有多個觀景點。", "en": "Park at Chocolate Country Montville, then walk Main Street — several lookouts are along the way." }
        },
        {
          "kind": "transit",
          "time": ["13:00", "14:30"],
          "label": { "zh-TW": "Chocolate Country Montville → Costco Wholesale North Lakes", "en": "Chocolate Country Montville → Costco Wholesale North Lakes" },
          "duration": { "zh-TW": "開車 約 1.5 小時", "en": "Drive about 1.5 hours" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Chocolate%20Country%20Montville&destination=Costco%20Wholesale%20North%20Lakes&travelmode=driving",
          "theme": "d2"
        },
        {
          "time": ["14:30", "16:00"],
          "chip": "costco",
          "dot": "purple",
          "title": { "zh-TW": "🛒 好市多 Costco Warehouse (North Lakes)", "en": "🛒 Costco Warehouse (North Lakes)" },
          "intro": { "zh-TW": "回布里斯本路上順路採購，補貨後直接開車回家。", "en": "A stop on the way back to Brisbane for a last shop before driving home." },
          "links": [{ "label": { "zh-TW": "📍 地圖", "en": "📍 Map" }, "url": "https://www.google.com/maps/search/?api=1&query=Costco%20Wholesale%20North%20Lakes", "theme": "d2" }],
          "tags": [{ "type": "shop", "text": { "zh-TW": "需要會員卡", "en": "Membership required" } }],
          "note": { "zh-TW": "北湖 (North Lakes) 分店，正好在回程的路上。", "en": "The North Lakes warehouse sits right on the route home." }
        },
        {
          "kind": "transit",
          "time": ["16:00", "16:40"],
          "chip": "home",
          "label": { "zh-TW": "🏠 Costco North Lakes → Carina 返家", "en": "🏠 Costco North Lakes → Carina home" },
          "duration": { "zh-TW": "約 30-40 分鐘", "en": "About 30-40 min" },
          "navUrl": "https://www.google.com/maps/dir/?api=1&origin=Costco%20Wholesale%20North%20Lakes&destination=Carina%20QLD&travelmode=driving",
          "theme": "d2"
        }
      ],
      "foodSection": {
        "title": { "zh-TW": "🍽️ Day 2 餐廳與預算", "en": "🍽️ Day 2 food and budget" },
        "vegRows": [
          { "type": { "zh-TW": "早餐市集", "en": "Breakfast" }, "name": "Noosa Farmers Market", "veg": { "zh-TW": "新鮮當季水果、現榨果汁、手工烘焙點心，多個蔬食/全素攤位", "en": "Fresh seasonal fruit, cold-pressed juice, artisan baked goods, and several vegan/vegetarian stalls" }, "budget": "AUD 10-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦咖啡", "en": "Coffee pick" }, "name": "Flying West Coffee (Noosa Farmers Market)", "veg": { "zh-TW": "在地小農烘焙咖啡豆現沖，口碑咖啡攤", "en": "Locally roasted single-origin coffee brewed on the spot; a market favorite" }, "budget": "AUD 5-8", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Flying%20West%20Coffee%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "Roti & Rendang Curry stall (Noosa Farmers Market)", "veg": { "zh-TW": "印尼風味素食仁當咖哩：椰漿與香料燉煮蔬菜/豆腐，配印度烤餅 Roti（現場可詢問素食版本）", "en": "Indonesian-style vegetarian rendang — vegetables or tofu slow-simmered in coconut milk and spices — served with roti (ask staff for the veg version)" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rendang%20Curry%20Roti%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Chocolate Country Montville", "veg": { "zh-TW": "推薦菠菜費達起司烤餅（quiche）或蔬食帕尼尼，佐沙拉，飯後可加點手工牛奶軟糖或熱巧克力", "en": "Pick: spinach and feta quiche or a vegetarian panini with side salad — follow up with handmade fudge or hot chocolate" }, "budget": "AUD 15-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chocolate%20Country%20Montville" },
          { "type": { "zh-TW": "午餐・風景咖啡廳", "en": "Lunch · scenic-view cafe" }, "name": "The Edge Restaurant Montville", "veg": { "zh-TW": "Main Street 127 號，坐在懸崖邊露台俯瞰陽光海岸全景，推薦南瓜燉飯或烤時蔬沙拉，08:30-16:00 供應早午餐", "en": "127 Main Street — escarpment-edge deck overlooking the whole Sunshine Coast. Pick: pumpkin risotto or roasted vegetable salad. Breakfast/lunch served 8:30am-4pm" }, "budget": "AUD 20-32", "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Edge%20Restaurant%20Montville" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Poets Cafe Montville", "veg": { "zh-TW": "1995 年開業的歐風小酒館，戶外座位視野佳，推薦蔬食法式鹹派或田園沙拉", "en": "A European-style bistro since 1995 with scenic outdoor seating. Pick: vegetarian quiche or garden salad" }, "budget": "AUD 18-28", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Poets%20Cafe%20Montville" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Secrets on the Lake", "veg": { "zh-TW": "雨林湖畔庭園景觀餐廳，樹屋座位氛圍佳，推薦蔬食湯品或田園沙拉碗", "en": "A rainforest lakeside garden restaurant with treehouse seating. Pick: vegetarian soup or a garden salad bowl" }, "budget": "AUD 20-30", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Secrets%20on%20the%20Lake%20Montville" }
        ],
        "generalRows": [
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "培根蛋堡 / 德式香腸攤位 (Noosa Farmers Market)", "veg": { "zh-TW": "培根蛋堡：酥脆培根、太陽蛋、起司夾軟法包；或德式香腸堡，市集經典早餐，攤位每週略有不同", "en": "Classic bacon-and-egg roll (crispy bacon, fried egg, cheese in a soft roll) or a German sausage roll — a market breakfast staple; exact stall rotates weekly" }, "budget": "AUD 10-18", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "推薦早餐", "en": "Breakfast pick" }, "name": "Roti & Rendang Curry stall (Noosa Farmers Market)", "veg": { "zh-TW": "經典印尼牛肉仁當咖哩，椰漿與香料慢燉入味，配印度烤餅 Roti", "en": "Classic Indonesian beef rendang, slow-simmered in coconut milk and spices, served with roti" }, "budget": "AUD 10-15", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rendang%20Curry%20Roti%20Noosa%20Farmers%20Market" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Chocolate Country Montville", "veg": { "zh-TW": "推薦火腿起司帕尼尼或牧羊人派，飯後可加點巧克力沾草莓或牛奶軟糖", "en": "Pick: ham and cheese panini or shepherd's pie — follow up with chocolate-dipped strawberries or fudge" }, "budget": "AUD 15-25", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chocolate%20Country%20Montville" },
          { "type": { "zh-TW": "午餐・風景咖啡廳", "en": "Lunch · scenic-view cafe" }, "name": "The Edge Restaurant Montville", "veg": { "zh-TW": "Main Street 127 號，坐在懸崖邊露台俯瞰陽光海岸全景，招牌菜為梭魚魚排與脆皮豬五花，08:30-16:00 供應早午餐", "en": "127 Main Street — escarpment-edge deck overlooking the whole Sunshine Coast. Signature dishes: barramundi and crispy pork belly. Breakfast/lunch served 8:30am-4pm" }, "budget": "AUD 25-38", "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Edge%20Restaurant%20Montville" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Poets Cafe Montville", "veg": { "zh-TW": "1995 年開業的歐風小酒館，戶外座位視野佳，推薦招牌牛肉漢堡或酒燒雞肉料理", "en": "A European-style bistro since 1995 with scenic outdoor seating. Pick: signature beef burger or braised chicken" }, "budget": "AUD 20-32", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Poets%20Cafe%20Montville" },
          { "type": { "zh-TW": "午餐", "en": "Lunch" }, "name": "Secrets on the Lake", "veg": { "zh-TW": "雨林湖畔庭園景觀餐廳，樹屋座位氛圍佳，推薦招牌牛排或烤雞料理", "en": "A rainforest lakeside garden restaurant with treehouse seating. Pick: signature steak or roast chicken" }, "budget": "AUD 25-38", "mapUrl": "https://www.google.com/maps/search/?api=1&query=Secrets%20on%20the%20Lake%20Montville" }
        ]
      },
      "tips": {
        "title": { "zh-TW": "⚠️ 重要提醒", "en": "⚠️ Key reminders" },
        "items": [
          { "zh-TW": "Noosa NP 停車場週末可能客滿，備案停 Hastings Street 附近", "en": "Noosa NP parking may fill on weekends. Use Hastings Street as backup." },
          { "zh-TW": "Montville 主街停車位有限，週末建議提早找車位", "en": "Parking on Montville's Main Street is limited — arrive early on weekends." },
          { "zh-TW": "好市多需要會員卡才能入場採購", "en": "A Costco membership card is required to shop." }
        ]
      }
    }
  ]
}
;
