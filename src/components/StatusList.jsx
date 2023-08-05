/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useEffect, useState } from "react";
function StatusList({ onOptionSelected, onClear }) {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
  
    useEffect(() => {
      fetchDataFromAPI()
        .then((data) => setOptions(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_ASSETS_STATUS_LIST
        );
        return response.data;
      } catch (error) {
        throw new Error("API request failed");
      }
    };
  
    const handleOptionSelected = (event, value) => {
      setSelectedValue(value);
      onOptionSelected(value.Status); // Replace 'column_name' with your actual API response key
    };
  
    const handleClear = () => {
      setSelectedValue(null); // Clear the selected value
      onClear(); // Notify the parent component that data has been cleared
    };
  
  
    return (
      <div className="pl-3 max-w-xs">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.Status}
        onChange={handleOptionSelected} // Call the callback function when an option is selected
        value={selectedValue} 
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="สถานี" />}
      />
      <button onClick={handleClear}>Clear</button>
      </div>
     
    );
}

export default StatusList
