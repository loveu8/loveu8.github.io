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
  chipStrip: document.getElementById('chipStrip'),
  dayTabs: document.getElementById('dayTabs'),
  sidebar: document.getElementById('sidebar'),
  sidebarBody: document.getElementById('sidebarBody'),
  printBody: document.getElementById('printBody'),
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

var DIRFLG_BY_MODE = { driving: 'd', walking: 'w', bicycling: 'b', transit: 'r' };

function directionsEmbedUrl(origin, destination, travelMode) {
  return 'https://maps.google.com/maps?saddr=' + encodeURIComponent(origin) +
    '&daddr=' + encodeURIComponent(destination) +
    '&dirflg=' + (DIRFLG_BY_MODE[travelMode] || 'd') +
    '&output=embed&z=12&language=' + encodeURIComponent(state.lang);
}

function convertToEmbed(href) {
  try {
    var url = new URL(href);
    if (url.pathname.indexOf('/maps/dir/') !== -1) {
      var origin = url.searchParams.get('origin');
      var destination = url.searchParams.get('destination');
      if (!origin || !destination) return null;
      return directionsEmbedUrl(origin, destination, url.searchParams.get('travelmode'));
    }
    var query = url.searchParams.get('query');
    var destinationOnly = url.searchParams.get('destination');
    var value = query || destinationOnly;
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

var SUN_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<circle cx="12" cy="12" r="4"></circle>' +
  '<line x1="12" y1="2" x2="12" y2="4"></line>' +
  '<line x1="12" y1="20" x2="12" y2="22"></line>' +
  '<line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>' +
  '<line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>' +
  '<line x1="2" y1="12" x2="4" y2="12"></line>' +
  '<line x1="20" y1="12" x2="22" y2="12"></line>' +
  '<line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>' +
  '<line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>' +
  '</svg>';

var MOON_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"></path>' +
  '</svg>';

function applyTheme(theme) {
  if (theme === 'system') {
    els.html.removeAttribute('data-theme');
  } else {
    els.html.setAttribute('data-theme', theme);
  }

  var isDark = els.html.getAttribute('data-theme') === 'dark' ||
    (!els.html.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  els.themeToggle.innerHTML = isDark ? SUN_ICON_SVG : MOON_ICON_SVG;
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

function renderExternalLink(url, theme) {
  var link = el('a', 'tl-external-link ' + (theme || currentDay().theme), ui('openInGoogleMaps'));
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', ui('openInGoogleMaps'));
  return link;
}

function renderLinks(links) {
  var wrap = el('div', 'tl-links');
  (links || []).forEach(function(link) {
    var row = el('div', 'tl-loc');
    var theme = link.theme || currentDay().theme;
    var nameBtn = el('button', 'tl-loc-name tl-map-btn ' + theme, t(link.label));
    nameBtn.type = 'button';
    nameBtn.dataset.href = link.url;
    nameBtn.setAttribute('aria-label', ui('viewMap') + ': ' + t(link.label));
    row.appendChild(nameBtn);
    row.appendChild(renderExternalLink(link.url, link.theme));
    wrap.appendChild(row);
  });
  return wrap;
}

function renderPhotos(photos) {
  if (!photos || !photos.length) return null;
  var wrap = el('div', 'tl-photos');
  photos.forEach(function(photo) {
    var btn = el('button', 'tl-photo');
    btn.type = 'button';
    btn.setAttribute('aria-label', ui('viewPhoto') + (photo.alt ? ': ' + photo.alt : ''));
    var img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || '';
    btn.appendChild(img);
    btn.addEventListener('click', function() { openLightbox(photo.src); });
    wrap.appendChild(btn);
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

function renderTransitItem(item, isLast) {
  var row = el('div', 'tl-item tl-item-transit');
  if (item.chip) row.dataset.chip = item.chip;

  var time = el('div', 'tl-time');
  time.innerHTML = (item.time || []).join('<br>');
  row.appendChild(time);

  var axis = el('div', 'tl-axis');
  axis.appendChild(el('div', 'tl-dot sm dot-gray'));
  if (!isLast) axis.appendChild(el('div', 'tl-line tl-line-transit'));
  row.appendChild(axis);

  var body = el('div', 'tl-body tl-body-transit');
  var line = el('div', 'tl-transit-row');
  line.appendChild(el('span', 'tl-transit-icon', item.mode || '🚗'));
  var labelText = t(item.label);
  if (item.duration) labelText += ' · ' + t(item.duration);
  line.appendChild(el('span', 'tl-transit-label', labelText));
  body.appendChild(line);
  if (item.navUrl) {
    var actions = el('div', 'tl-loc');
    var routeBtn = el('button', 'tl-loc-name tl-map-btn tl-route-btn ' + (item.theme || 'd1'), ui('viewRoute'));
    routeBtn.type = 'button';
    routeBtn.dataset.href = item.navUrl;
    routeBtn.setAttribute('aria-label', ui('viewRoute') + ': ' + labelText);
    actions.appendChild(routeBtn);
    actions.appendChild(renderExternalLink(item.navUrl, item.theme || 'd1'));
    body.appendChild(actions);
  }
  if (item.note) body.appendChild(el('div', 'tl-transit-note', t(item.note)));

  row.appendChild(body);
  return row;
}

function renderItem(item, day, isLast) {
  if (item.kind === 'transit') return renderTransitItem(item, isLast);

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
      var actions = el('div', 'fr-actions');
      var mapBtn = el('button', 'fr-link tl-map-btn', '📍');
      mapBtn.type = 'button';
      mapBtn.dataset.href = row.mapUrl;
      mapBtn.setAttribute('aria-label', ui('viewMap') + ': ' + row.name);
      mapBtn.title = ui('viewMap');
      actions.appendChild(mapBtn);
      var ext = el('a', 'fr-link fr-ext', '↗');
      ext.href = row.mapUrl;
      ext.target = '_blank';
      ext.rel = 'noopener';
      ext.setAttribute('aria-label', ui('openInGoogleMaps') + ': ' + row.name);
      ext.title = ui('openInGoogleMaps');
      actions.appendChild(ext);
      food.appendChild(actions);
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

function renderPrintContent() {
  var originalDay = state.day;
  els.printBody.innerHTML = '';

  state.data.days.forEach(function(day) {
    state.day = day.id; // renderLinks/renderExternalLink fall back to currentDay().theme
    var section = el('div', 'print-day-section');

    var heading = el('div', 'print-day-heading ' + day.theme);
    heading.appendChild(el('span', 'print-day-label', t(day.label)));
    heading.appendChild(el('span', 'print-day-sub', t(day.tabSub)));
    section.appendChild(heading);

    var route = el('div', 'route-strip ' + day.theme);
    route.appendChild(el('span', 'route-strip-label', t(day.route)));
    section.appendChild(route);

    var timeline = el('div', 'timeline');
    day.items.forEach(function(item, index) {
      timeline.appendChild(renderItem(item, day, index === day.items.length - 1));
    });
    section.appendChild(timeline);

    var food = renderFoodSection(day.foodSection);
    if (food) section.appendChild(food);

    var tips = renderTips(day.tips);
    if (tips) section.appendChild(tips);

    els.printBody.appendChild(section);
  });

  state.day = originalDay;
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
  els.chipStrip.setAttribute('aria-label', ui('routeStops'));
  els.dayTabs.setAttribute('aria-label', ui('dayTabsLabel'));
  els.backToTop.setAttribute('aria-label', ui('backToTop'));
  els.backToTop.setAttribute('title', ui('backToTop'));
  els.lightboxClose.setAttribute('aria-label', ui('closeLightbox'));
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

function markSelected(item) {
  if (!item) return;
  els.sidebarBody.querySelectorAll('.tl-item').forEach(function(node) {
    node.classList.remove('selected');
  });
  item.classList.add('selected');
  setActiveChip(item.dataset.chip || null);
}

function previewOnMap(item, href) {
  markSelected(item);
  var embedUrl = href ? convertToEmbed(href) : null;
  var iframe = els.mapPanel.querySelector('.map-wrap.active iframe');
  if (embedUrl && iframe) updateIframeSrc(iframe, embedUrl);
  if (window.innerWidth < 768) {
    els.sidebar.classList.remove('expanded');
    els.handleHint.textContent = ui('expand');
  }
}

function handleTimelineClick(event) {
  var mapBtn = event.target.closest('.tl-map-btn');
  if (mapBtn) {
    previewOnMap(mapBtn.closest('.tl-item'), mapBtn.dataset.href);
    return;
  }

  var extLink = event.target.closest('.tl-external-link');
  if (extLink) {
    markSelected(extLink.closest('.tl-item'));
    return;
  }
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
  window.addEventListener('beforeprint', renderPrintContent);
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
