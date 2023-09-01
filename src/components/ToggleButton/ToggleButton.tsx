import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";

const ToggleButton = ({ active, setActive }) => {
     const handleButtonChange = (value) => {
          setActive(value);
     };

     return (
          <ButtonGroup vertical>
               <Button
                    color={active === "weight" ? "primary" : "secondary"}
                    onClick={() => handleButtonChange("weight")}
               >
                    Weight
               </Button>
               <Button
                    color={active === "temp" ? "primary" : "secondary"}
                    onClick={() => handleButtonChange("temp")}
               >
                    Temp
               </Button>
          </ButtonGroup>
     );
};

export default ToggleButton;
