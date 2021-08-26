import faker from 'faker';
export const photographic = {
  title: faker.name.jobTitle(),
  description: faker.commerce.productDescription(),
  location: faker.address.streetAddress(true),

  user: {
    avatar: faker.internet.avatar(),
    job: faker.name.jobType(),
    details: [
      {
        value: faker.datatype.number(400),
        label: 'Albums',
      },
      {
        value: faker.datatype.number(5000),
        label: 'Followers',
      },
      {
        value: faker.datatype.number(2000),
        label: 'Following',
      },
    ],
  },
};
