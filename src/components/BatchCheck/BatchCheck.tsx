import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BatchInfo } from "../BatchInfo/BatchInfo";
import { AppContext } from "../../pages/appState";

// const batch = {
//      id: "1",
//      batchNumber: "B001",
//      productName: "Product A",
//      quantity: 100,
//      productionDate: "2022-01-01",
// };

const BatchView = ({ open, toggleModal }) => {
     const navigate = useNavigate();
     const { batch } = useContext<{
          batch: any;
     }>(AppContext);

     const handleTankHistory = () => {
          navigate("/batch-history");
          toggleModal();
     };

     return (
          <>
               {batch && (
                    <Modal isOpen={open} toggle={toggleModal} size="lg">
                         <ModalHeader
                              toggle={toggleModal}
                              style={{ backgroundColor: "#fff", color: "#000" }}
                         >
                              Batch Details
                         </ModalHeader>
                         <ModalBody style={{ backgroundColor: "#fff", color: "#000" }}>
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>Liquid:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.liquidId}
                                   </div>
                              </div>
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>Description:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.description}
                                   </div>
                              </div>
                              {/* <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Quantity:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.description}
                              </div>
                         </div> */}
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>Batch:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.batchId}
                                   </div>
                              </div>
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>Date:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.date}
                                   </div>
                              </div>
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>pH:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.pH}
                                   </div>
                              </div>
                              <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                                   <strong>pH spec:</strong>
                                   <div className="flex-fill bg-dark px-2 rounded ml-2">
                                        {batch.pHSpecUpperThreshold}
                                   </div>
                              </div>
                         </ModalBody>
                         <BatchInfo />
                         <ModalFooter style={{ backgroundColor: "#fff", color: "#000" }}>
                              <Button color="secondary" onClick={handleTankHistory}>
                                   Check Tank History
                              </Button>
                              <Button color="danger" onClick={toggleModal}>
                                   Close
                              </Button>
                         </ModalFooter>
                    </Modal>
               )}
          </>
     );
};

export default BatchView;
