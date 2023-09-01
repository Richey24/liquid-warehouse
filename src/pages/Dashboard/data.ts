import { TankProps } from "./types";
import { faker } from "@faker-js/faker";

interface Tank {
     tankValue: any;
}

function createRandomTankValue(): Tank {
     return {
          tankValue: faker.number.int({ min: 1, max: 100 }),
     };
}

const Tank = createRandomTankValue();

export const tabs = ["Home", "Pre Mix/Mixing"];
