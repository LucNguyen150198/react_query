import faker from 'faker';
import niceColors from 'nice-color-palettes';
import Images from '@assets';
faker.seed(1);
const data = [
  { image: Images.avatar1 },
  { image: Images.avatar2 },
  { image: Images.avatar3 },
  { image: Images.avatar4 },
  { image: Images.avatar5 },
  { image: Images.avatar6 },
  { image: Images.avatar7 },
  { image: Images.avatar8 },
  { image: Images.avatar9 },
  { image: Images.avatar10 },
  { image: Images.avatar11 },
  { image: Images.avatar12 },
  { image: Images.avatar13 },
  { image: Images.avatar14 },
  { image: Images.avatar15 },
  { image: Images.avatar16 },
  { image: Images.avatar17 },
  { image: Images.avatar18 },
  { image: Images.avatar19 },
  { image: Images.avatar20 },
  { image: Images.avatar21 },
  { image: Images.avatar22 },
  { image: Images.avatar23 },
  { image: Images.avatar24 },
  { image: Images.avatar25 },
];

const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(0, 3),
];

export const detailIcon = [
  { color: '#9FD7F1', icon: 'isv' },
  { color: '#F38000', icon: 'Trophy' },
  { color: '#F2988F', icon: 'edit' },
];

const salons = data.map((item, index) => {
  return {
    ...item,
    key: index + '',
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    color: `${colors[index % colors.length]}66`,
    categories: [...Array(3).keys()].map((index) => {
      return {
        key: index + '',
        title: faker.name.jobType(),
         subcats: [...Array(3).keys()].map(faker.name.jobType),
      };
    }),
  };
});

export default salons;
