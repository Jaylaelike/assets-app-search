import { useEffect, useState } from "react";
import axios from "axios";
import CardAssets from "./Card";
import SearchIcon from "@mui/icons-material/Search";
import { blueGrey } from "@mui/material/colors";
import StationList from "./StationList";

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Check if the query is null or has more than 2 characters
      if (query === null || query.length > 2) {
        const res = await axios.get(
          import.meta.env.VITE_ASSETS_QUERY_URL_V2 + `${query}`
        );
        setData(res.data);
      } 
      else {
        // If the query is null or less than 3 characters, fetch data from another API
        const anotherRes = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
        setData(anotherRes.data);
      }
    };

    if (query.length === 0 || query.length > 2) 
    fetchData();

  }, [query]);

  useEffect(() => {
    const fetchStation = async () => {
      if (selectedValue) {
        const res = await axios.get(
          import.meta.env.VITE_ASSETS_STATION_FILTER + `${selectedValue}`
       );
        setData(res.data);
      } else {
        const anotherRes = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
      setData(anotherRes.data);
      }      
    };
    fetchStation();  
    
  }, [selectedValue]);

  // console.log(query);

  const handleSearch = (event,value) => {
    setSearchTerm(event.target.value);
    setQuery(event.target.value.toLowerCase());
    setSelectedValue(value);
  };

  const handleOptionSelected = (value) => {
    setSelectedValue(value);
    console.log(selectedValue);
  };

  const handleClear = () => {
    setSelectedValue(null);
  };

  return (
    <div>
      <div className="flex justify-center p-5 gap-3">
        <div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ค้นหาทรัพย์สิน"
            value={searchTerm}
            onChange={handleSearch}
          ></input>

          {data?.length === 0 ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 p-20">
                <p> {`ขออภัยค่ะไม่พบข้อมูลทรัพย์สิน "${searchTerm}"`}</p>
                <div>
                  <img src="https://res.cloudinary.com/satjay/image/upload/f_auto,q_auto/v1/assets/Sorry_icon" alt="sorry" />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <StationList onOptionSelected={handleOptionSelected} onClear={handleClear} />
        {selectedValue && <p>Selected Value: {selectedValue}</p>}
        <SearchIcon sx={{ fontSize: 40, color: blueGrey[500] }} />
      </div>

      <CardAssets data={data} query={query} />

    </div>
  );
}

export default Home;
