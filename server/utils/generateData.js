const { faker } = require("@faker-js/faker");

const numeric = (min, max) => {
  return faker.datatype.number({
    min,
    max,
  });
};

exports.generateUsers = async (length) => {
  return await new Promise((resolve, reject) => {
    const dummy_users = [];
    Array.from({ length }).forEach((x, i) => {
      dummy_users.push({
        username: faker.internet.userName(),
        country: faker.address.country(),
        age: numeric(13, 70),
        gender: numeric(1, 3),
        devices: numeric(1, 5),
        activeHours: {
          today: numeric(3, 6),
          thisWeek: numeric(25, 40),
          thisMonth: numeric(100, 200),
        },
      });
    });
    resolve(dummy_users);
  });
};

exports.generateUsage = async () => {
  return await new Promise((resolve, reject) => {
    const dummy_data = [];
    Array.from({ length: 10 }).forEach((x, i) => {
      dummy_data.push({
        year: 2010 + i,
        totalUsage: numeric(10000, 20000),
      });
    });
    resolve(dummy_data);
  });
};
