import faker from 'faker';
import niceColors from 'nice-color-palettes';
import Images from '@assets';
faker.seed(1);
const data = [
  {
    type: 'Soup',
    image: Images.soup,
  },
  {
    type: 'Salad',
    image: Images.salad,
  },
  {
    type: 'Rice',
    image: Images.rice,
  },
  {
    type: 'Sushi',
    image: Images.nigiri,
  },
  {
    type: 'Spaghetti',
    image: Images.spaguetti,
  },
  {
    type: 'Pizza',
    image: Images.pizza,
  },
  {
    type: 'Burger',
    image: Images.burger,
  },
  {
    type: 'Fried egg',
    image: Images.fried_egg,
  },
  {
    type: 'Pancake',
    image: Images.pancakes,
  },
  {
    type: 'French fries',
    image: Images.fried_potatoes,
  },
  {
    type: 'Steak',
    image: Images.steak,
  },
  {
    type: 'Ice cream',
    image: Images.ice_cream,
  },
  {
    type: 'Roast chicken',
    image: Images.fried_chicken,
  },
  {
    type: 'Cheese',
    image: Images.cheese,
  },
  {
    type: 'Ramen',
    image: Images.ramen,
  },
  {
    type: 'Orange juice',
    image: Images.orange_juice,
  },

  {
    type: 'Hot dog',
    image: Images.hotdogs,
  },
  {
    type: 'English breakfast',
    image: Images.english_breakfast,
  },
  {
    type: 'Tea',
    image: Images.tea,
  },
  {
    type: 'Waffle',
    image: Images.waffles,
  },
  {
    type: 'Lasagna',
    image: Images.lasagna,
  },
  {
    type: 'Cake',
    image: Images.cake,
  },
  {
    type: 'Fish',
    image: Images.fish,
  },
  {
    type: 'Beer',
    image: Images.beer,
  },
];

const colors = niceColors[1];

export const tabs = [
  'Today',
  'Chips',
  'Fish',
  'Tea',
  'Burger',
  'Coffee',
  'Drinks',
  'Breakfast',
];

export const popularFood = faker.helpers.shuffle(data).map((item, index) => ({
  ...item,
  key: index + 'popular',
  rating: `${faker.datatype.number(30) + 20 / 10}`,
  price: `$${faker.datatype.number(200) + 50 / 100}`,
}));

const foods = data.map((item, index) => {
  return {
    ...item,
    key: index + 'food',
    subType: faker.commerce.productName(),
    color: `${colors[index % colors.length]}66`,
    fullColor: colors[index % colors.length],
    price: `$${faker.datatype.number(200) + 50 / 100}`,
    subcategories: faker.helpers.shuffle(data).slice(0, 3),
    description: [...Array(2).keys()]
      .map(faker.commerce.productDescription)
      .join('. '),
  };
});

export default foods;
