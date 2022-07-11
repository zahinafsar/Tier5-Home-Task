const { faker } = require("@faker-js/faker");

exports.generateUsers = async (length) => {
  return await new Promise((resolve, reject) => {
    const dummy_users = [];
    const numeric = (min, max) => {
      return faker.datatype.number({
        min,
        max,
      });
    };
    Array.from({ length }).forEach((x, i) => {
      dummy_users.push({
        username: faker.internet.userName(),
        country: faker.address.state(),
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
