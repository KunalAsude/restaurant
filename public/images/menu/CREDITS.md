# Menu banner photos

Each of the 9 menu groups on `/menu` has a banner. Right now every banner uses a CSS pattern, so this folder has no photos yet.

## Rules for adding photos

- Source: Unsplash or Pexels only, under their free licence. Never use Google, Zomato or Instagram images.
- Vegetarian dishes only: no meat, fish or egg anywhere in the frame.
- Size: at most 1600 px wide and under 250 KB (compress with squoosh.app).
- Each banner shows a small "Serving suggestion" caption automatically.

## How to add one

1. Save the photo here, e.g. `public/images/menu/breakfast-tea.jpg`.
2. Add it to `menuBanners` in `data/restaurant.ts`:
   ```ts
   export const menuBanners = {
     "Breakfast & tea": { src: "/images/menu/breakfast-tea.jpg", alt: "Cutting chai and misal pav" },
   }
   ```
3. Fill in its row in the table below.

## Suggested search terms

| Group | File name | Search terms |
|---|---|---|
| Breakfast & tea | `breakfast-tea.jpg` | cutting chai, masala chai glass, misal pav, poha |
| Soups & starters | `soups-starters.jpg` | paneer tikka, tomato soup, veg manchurian |
| Main course | `main-course.jpg` | paneer butter masala, veg curry, Indian thali |
| Breads & rice | `breads-rice.jpg` | butter naan, roti basket, veg biryani |
| Chinese | `chinese.jpg` | veg hakka noodles, veg fried rice, chilli paneer |
| South Indian | `south-indian.jpg` | masala dosa, idli sambar, uttapam |
| Pizza, pasta & sandwiches | `pizza-pasta.jpg` | margherita pizza, veg pasta, grilled sandwich |
| Desserts & falooda | `desserts-falooda.jpg` | kesar falooda, gulab jamun, kulfi |
| Shakes & mocktails | `shakes-mocktails.jpg` | mango milkshake, virgin mojito, mocktail glass |

## Credits

| Group | File | Photographer | Source URL | Licence |
|---|---|---|---|---|
| (none yet) | | | | |
