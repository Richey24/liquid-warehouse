import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css"; // Import custom CSS for styling
import { useGetHistory } from "../hooks";

const DateRangePicker = ({ setTankHistory, loading, setLoading }) => {
     const [startDate, setStartDate] = useState<any>(null);
     const [endDate, setEndDate] = useState<any>(null);
     const getHistory = useGetHistory();

     useEffect(() => {
          const today = new Date();
          const defaultStartDate = new Date(
               today.getFullYear(),
               today.getMonth(),
               today.getDate() - 6,
               today.getHours(), // Set the default hours to the current time
               today.getMinutes(), // Set the default minutes to the current time
          );
          setStartDate(defaultStartDate);
          setEndDate(today);
     }, []);

     const handleStartDateChange = (date) => {
          setStartDate(date);
     };

     const handleEndDateChange = (date) => {
          setEndDate(date);
     };

     const handleSearch = () => {
          const st = new Date(startDate);
          const ed = new Date(endDate);
          setLoading(true);
          getHistory(
               {
                    startdate: st.toISOString(),
                    enddate: ed.toISOString(),
                    // startdate: defaultStartDate.toISOString(),
                    // enddate: today.toISOString() as string,
               },

               (data) => {
                    setTankHistory(data.data);
                    setLoading(false);
               },
               () => {
                    setLoading(false);
               },
          );
     };

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
               }}
          >
               <FormGroup
                    style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                    }}
               >
                    <DatePicker
                         id="startDate"
                         selected={startDate}
                         onChange={handleStartDateChange}
                         showTimeSelect
                         timeFormat="HH:mm"
                         timeIntervals={15}
                         dateFormat="yyyy-MM-dd HH:mm"
                         timeCaption="Time"
                         className="form-control"
                         calendarClassName="custom-calendar"
                    />
               </FormGroup>
               <span style={{ height: "100%", marginBottom: 16 }}>-</span>
               <FormGroup
                    style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                    }}
               >
                    <DatePicker
                         id="endDate"
                         selected={endDate}
                         onChange={handleEndDateChange}
                         showTimeSelect
                         timeFormat="HH:mm"
                         timeIntervals={15}
                         dateFormat="yyyy-MM-dd HH:mm"
                         timeCaption="Time"
                         className="form-control"
                         calendarClassName="custom-calendar"
                    />
               </FormGroup>
               <Button style={{ padding: "12px 40px" }} onClick={handleSearch} className="mb-3">
                    Search
               </Button>
          </div>
     );
};

export default DateRangePicker;