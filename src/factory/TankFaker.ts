import { faker } from '@faker-js/faker';

interface Tank {
    tankValue: any
 }

function createRandomUser(): Tank {
  return {
    tankValue: faker.number.bigInt({ min: 1n, max: 10000n }),
  };
}

const Tank = createRandomUser();