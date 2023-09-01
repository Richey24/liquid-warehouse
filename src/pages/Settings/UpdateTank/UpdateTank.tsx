import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const TankUpdateForm = ({
     tanks,
     setActiveTank,
     handleDisplay,
     updatedDetails,
     setUpdatedDetails,
}) => {
     const [selectedTank, setSelectedTank] = useState("");

     const handleTankSelection = (event) => {
          const tank = JSON.parse(event.target.value);
          setSelectedTank(tank);
          setUpdatedDetails(tank);
          setActiveTank(tank);
          handleDisplay();
     };

     const handleInputChange = (event) => {
          const { name, value } = event.target;

          setUpdatedDetails((prevDetails) => ({
               ...prevDetails,
               [name]: value,
          }));
     };

     const handleSubmit = (event) => {
          event.preventDefault();
     };

     return (
          <div>
               <h2 className="mb-5">Update Tank Details</h2>
               <Form onSubmit={handleSubmit}>
                    <FormGroup>
                         <Label for="tankSelect">Select Tank:</Label>
                         <Input
                              type="select"
                              name="tankSelect"
                              id="tankSelect"
                              onChange={handleTankSelection}
                         >
                              <option value="">Select a tank...</option>
                              {tanks &&
                                   tanks.map((tank, idx) => (
                                        <option key={idx} value={JSON.stringify(tank)}>
                                             {tank.title}
                                        </option>
                                   ))}
                         </Input>
                    </FormGroup>

                    {selectedTank && (
                         <>
                              <FormGroup>
                                   <Label for="batchNumber">Batch Number:</Label>
                                   <Input
                                        type="text"
                                        name="batchNumber"
                                        id="batchNumber"
                                        disabled={true}
                                        onChange={handleInputChange}
                                        value={updatedDetails?.batchNumber || ""}
                                   />
                              </FormGroup>
                              <FormGroup>
                                   <Label for="fillValue">Weight:</Label>
                                   <Input
                                        type="text"
                                        name="fillValue"
                                        id="fillValue"
                                        disabled={true}
                                        onChange={handleInputChange}
                                        value={updatedDetails?.fillValue || ""}
                                   />
                              </FormGroup>
                              <FormGroup>
                                   <Label for="fillValue">Tank Capacity (kg):</Label>
                                   <Input
                                        type="text"
                                        name="fillMaxValue"
                                        id="fillMaxValue"
                                        // disabled={true}
                                        onChange={handleInputChange}
                                        value={updatedDetails?.fillMaxValue || ""}
                                   />
                              </FormGroup>
                              <FormGroup>
                                   <Label for="temperature">Temperature:</Label>
                                   <Input
                                        type="text"
                                        name="temperature"
                                        id="temperature"
                                        disabled={true}
                                        onChange={handleInputChange}
                                        value={updatedDetails?.temperature || ""}
                                   />
                              </FormGroup>{" "}
                              {updatedDetails?.temperature && (
                                   <FormGroup>
                                        <Label for="temperature">Temperature Threshold:</Label>
                                        <Input
                                             type="text"
                                             name="minimumTemperature"
                                             id="minimumTemperature"
                                             onChange={handleInputChange}
                                             value={updatedDetails?.minimumTemperature || ""}
                                        />
                                   </FormGroup>
                              )}{" "}
                              <FormGroup>
                                   <Label for="formula">Formula:</Label>
                                   <Input
                                        type="text"
                                        name="formula"
                                        id="formula"
                                        onChange={handleInputChange}
                                        value={updatedDetails?.formula || ""}
                                   />
                              </FormGroup>{" "}
                         </>
                    )}
               </Form>
          </div>
     );
};
