export interface TankEntry {
    name: string;
    batch?: string;
    weight?: number;
    temp?: number;
    dateTime?: string;
}

interface TimestampEntry {
    timeStamp: string;
    tanks: TankEntry[] | [];
}

export interface UnflattenedData {
    data: TankEntry[];
}

export function unflattenData(flattenedData: any[]): UnflattenedData {
    const unflattenedData: UnflattenedData = { data: [] };

    // Group the flattened data by timestamp
    const groupedData: { [key: string]: any[] } = {};
    for (const entry of flattenedData) {
         const timestamp = entry.timeStamp;
         if (!groupedData[timestamp]) {
              groupedData[timestamp] = [];
         }
         groupedData[timestamp].push(entry);
    }

   

    // Unflatten the data for each timestamp
    for (const timestamp in groupedData) {
         const entries = groupedData[timestamp];
         let tanks: TankEntry[] = [];

         for (const entry of entries) {
              //    console.log("eachData", entry);
              const keys = Object.keys(entry)
                   .filter((key) => key !== "autoDate")
                   .filter((key) => key !== "timeStamp");
              let tankKeys: TankEntry[] = [];

              keys.forEach((key) => {
                   if (tankKeys.some((tankKey) => key.match(tankKey?.name))) {
                        tankKeys = tankKeys.map((tankKey) => {
                             if (key.match(tankKey?.name)) {
                                  return {
                                       ...tankKey,
                                       [key.split("_")[2]?.toLowerCase()]: entry[key],
                                  };
                             }
                             return tankKey;
                        });
                   } else {
                        tankKeys.push({
                             name: `${key.split("_")[0]}_${key.split("_")[1]}`,
                             dateTime: timestamp,
                             [key.split("_")[2]?.toLowerCase()]: entry[key],
                        });
                   }
              });

              tanks = [...tanks, ...tankKeys];
         }
         unflattenedData.data = [...tanks, ...unflattenedData.data];
    }

    return unflattenedData;
}