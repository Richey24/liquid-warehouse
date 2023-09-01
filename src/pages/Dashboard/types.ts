export interface TankProps {
     number: number;
     color: string;
     fillMaxValue: number;
     title: string;
     fillValue: any;
     type?: string;
     temperature?: number;
     minimumTemperature?: number;
     temperatureMsm?: string;
     temperatureColor?: string;
     threshold: number;
     batchNumber?: number;
     style?: any;
     locationId?: number;
     id: number;
     usersId: number[] | string | null;
     fomula: string;
}

export interface TankConfigurationProps {
     sysConfigIdx: number;
     tankIdentifier: string;
     tankName: string;
     tankType: number;
     color: string;
     pHSetting: number;
     tempSetting: number;
     tempThreshold: number;
     temperatureColor: string;
     formula: string;
     locationId: number;
     location: string;
     currentFluidLevel: number;
     maximumFluidLevel: number;
     isTankOnline: boolean;
     lastUpdatedBy: string;
     usersId: number[] | string | null;
}
