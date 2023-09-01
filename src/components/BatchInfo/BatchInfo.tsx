import React, { useContext } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "./styles.css";
import { AppContext } from "../../pages/appState";

export const BatchInfo = () => {
     const { batchDetails } = useContext(AppContext);    

     const columns =
          Object.keys(batchDetails?.[0] ?? {}).map((batch) => ({
               key: batch,
               name: batch.toUpperCase(),
               editable: true,
               minWidth: 50,
          })) ?? [];

     //  const columns = [
     //       {
     //            key: "matnr",
     //            name: "MATNR",
     //            editable: true,
     //            minWidth: 50,
     //       },
     //       {
     //            key: "bdmng",
     //            name: "BDMNG",
     //            editable: true,
     //            minWidth: 50,
     //            style: { backgroundColor: "#fff" },
     //       },
     //       { key: "meins", name: "MEINS", editable: true, minWidth: 50 },
     //       {
     //            key: "enmng",
     //            name: "ENMNG",
     //            editable: true,
     //            minWidth: 50,
     //       },
     //       { key: "maktx", name: "MAKTX", editable: true, minWidth: 50 },
     //  ];

     const rows = [...batchDetails];

     return (
          <div
               className="material-table-container"
               style={{ padding: 16, backgroundColor: "#fff" }}
          >
               <DataGrid
                    columns={columns}
                    rows={rows}
                    className="rdg-light"
                    style={{ backgroundColor: "#fff", height: 200 }}
               />
          </div>
     );
};
