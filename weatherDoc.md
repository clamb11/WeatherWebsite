# Weather Documentation:
## 12/2023:
1. Language and Environment:
  - JavaScript, HTML, CSS, VSCode
2. Product:
  - Website
3. Possible Tools:
  - Figma
  - Node.js
  - npm
  - express
  - cors
4. Process:
  - User inputs 2 things and presses get Rec button (HTML)
    - Zip Code
    - 2 letter country code
  - Button press calls getRec() (JS)
  - getRec() needs to read in user input for Geo Call to get lat and lon then get weather info from second api call 
    - maybe it calls getGeo() and that gets lat and lon then calls getRec()??
 - Get rec needs to then get a recommendation of what to wear
 - Get weather of day average:
   - (Min + max / 2) + feels like + temp / 3 = avg
     - Windspeed affect:
       - Calm (0-3.45 mph): no affect
       - Light Breeze (3.46 - 6.90 mph): -2°F
       - Gentle Breeze (6.91 - 11.50 mph): -4°F
       - Moderate Breeze (11.51 - 18.40 mph): -6°F
       - Fresh Breeze (18.41- 24.20 mph):  -8°F
       - Strong Breeze (24.21 - 31.10 mph): -10°F
       - Above Strong Breeze (<=31.11 mph): -12°F
     - Description Contains:
       - Thunderstorm: -3°F and rain jacket
       - Drizzle: -3°F and rain jacket
       - Rain: -3°F and rain jacket
       - Snow: -5°F and winter jacket
       - Clear: +5°F
       - Few clouds: +2°F
       - Scattered clouds: +1°F
       - Broken clouds: no affect
       - Overcast clouds: -1°F
   - What to Wear (Subjective to me):
     - Absolutely Freezing: below 20°F
       - Layers (everything covered)
       - Winter Coat
       - Long Sleeve and Hoodie, or warm Sweater and Hat and scarf
       - Gloves
       - Heavy Long Pants
     - Freezing: 20°F - 32°F
       - Layers (most things should be covered)
       - Winter Coat, or heavy jacket
       - Long Sleeve and Hoodie or Sweater and Hat
       - Heavy Long Pants
     - Cold: 33°F - 47°F
       - Layers
       - Heavy Jacket, or Heavy Sweatshirt
       - Long Sleeve, or Sweater
       - Light Long Pants
     - Mild: 48°F - 55°F
       - Layers
       - Short sleeve with Light Jacket or Sweatshirt, Long Sleeve, or Sweater
       - Light Long Pants
     - Moderate: 56°F - 64°F
     - Warm: 65°F - 75°F
     - Very warm: 76°F - 86°F
     - Hot: 87°F - 99°F
     - Very hot: above 100°F
5. For gender (Toggle?) or buisness/ casual use boolean
## 10/2023:
1. Info needed from API:
   - Latitude and Longitude to get weather info
   - Temp
   - What temp feels like
   - Temp min and max
   - Wind
   - Cloudy? Sunny? Rainy?
2. Jackson: Java to Json
   - Use to get info from API to JSON
3. Postman?:
   - Use to manage API?
## 09/2023:
1. Language and Environment:
  - Java, Intellij
2. Product:
  - GUI
3. Weather API:
  - Open Weather 
4. User Accounts: 
  - To set up preferences, like if person runs cold or hot
  - Gender for clothing rec?
    - Maybe ask ab Style?
  - Schedule, if at work suggest business casual 
  - Clothing restrictions
    - Dresscode
    - Dislike items of clothing (skirts, jeans,...)
  - Like and Dislike recommendations and save info
5. Tabs to suggest clothing recommendations
  - Indoors/Outdoors
  - Active/Inactive
6. Clothing Options:
  - Bottoms:
   - Shorts
   - Skirt
   - Light Long Pants
   - Heavy Long Pants
  - Top:
    - Long Sleeve
    - Short Sleeve
    - Tank Top
    - Sweater
  - Outerwear:
    - Light Jacket
    - Heavy Jacket
    - Sweatshirt
    - Winter Coat
    - Rain Jacket
  - Accesories:
    - Winter Hat
    - Sun Hat
    - Scarf 
    - Gloves
7. Questions:
  - Are indoor and outdoor temps related? Are outfits based on weather or dress code?
