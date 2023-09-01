import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const CreateLocationModal = ({ isOpen, toggleModal, onCreateLocation }) => {
     const [isLoading, setIsLoading] = useState(false);
     const [locationName, setLocationName] = useState("");

     const handleCreateLocation = async () => {
          setIsLoading(true);
          // // Simulate an asynchronous API call
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          // setIsLoading(false);

          // Call the provided onCreateLocation callback with the location name
          onCreateLocation(
               locationName,
               () => {
                    setLocationName("");
                    toggleModal();
                    setIsLoading(false);
               },
               () => {
                    setIsLoading(false);
               },
          );
     };

     return (
          <Modal isOpen={isOpen} toggle={toggleModal} color="#fff" style={{ borderRadius: 8 }}>
               <ModalHeader style={{ backgroundColor: "#fff" }} toggle={toggleModal}>
                    Create Location
               </ModalHeader>
               <ModalBody style={{ backgroundColor: "#fff" }}>
                    <input
                         type="text"
                         value={locationName}
                         onChange={(e) => setLocationName(e.target.value)}
                         placeholder="Location Name"
                    />
               </ModalBody>
               <ModalFooter style={{ backgroundColor: "#fff" }}>
                    <Button color="primary" onClick={handleCreateLocation} disabled={isLoading}>
                         {isLoading ? "Creating..." : "Create"}
                    </Button>
                    <Button color="secondary" onClick={toggleModal} disabled={isLoading}>
                         Cancel
                    </Button>
               </ModalFooter>
          </Modal>
     );
};
