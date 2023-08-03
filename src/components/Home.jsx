import { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { blueGrey } from "@mui/material/colors";
import StationList from "./StationList";
import useDebounce from "../components/hooks/useDebounce";
import { useQuery } from "react-query";

import CardAssets from "./Card";
import Loading from "./Loading";

function Home() {
  const [query, setQuery] = useState("");
 // const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearchTerm = useDebounce(query, 300);

  
  // Create a query using react-query
  const { data, isLoading, error , isError ,isFetching} = useQuery(
      {
          queryKey: ['', debouncedSearchTerm, selectedValue],
          queryFn: fetchData,
          refetchOnMount: true,
          refetchOnWindowFocus: true,
        }
      );

      // Fetch data based on the query
      async function fetchData() {
        if (debouncedSearchTerm === null || debouncedSearchTerm.length > 2) {
          const res = await axios.get(import.meta.env.VITE_ASSETS_QUERY_URL_V2 + `${debouncedSearchTerm}`);
          return res.data;
        } 
      else  if (selectedValue) {
          const res = await axios.get(
            import.meta.env.VITE_ASSETS_STATION_FILTER + `${selectedValue}`
         );
         return res.data;
        }
        else {
          const res = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
          return res.data;
        }
      }

      if (isError) {
        return <h2>{error.message}</h2>;
      }
   // console.log(data);    



  // useEffect(() => {
  //   const fetchStation = async () => {
  //     if (selectedValue) {
  //       const res = await axios.get(
  //         import.meta.env.VITE_ASSETS_STATION_FILTER + `${selectedValue}`
  //      );
  //       setData(res.data);
  //     } else {
  //       const anotherRes = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
  //     setData(anotherRes.data);
  //     }      
  //   };
  //   fetchStation();  
    
  // }, [selectedValue]);

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

      <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 gap-5">
        <div className="flex justify-center items-center">
        <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ค้นหาทรัพย์สิน"
            value={searchTerm}
            onChange={handleSearch}
          ></input>
          <SearchIcon sx={{ fontSize: 40, color: blueGrey[500] }} />

        </div>
          
  
          

          {data?.length === 0 ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 p-10">
                <p> {`ขออภัยค่ะไม่พบข้อมูลทรัพย์สิน "${searchTerm}"`}</p>
                <div>
                  <img src="https://res.cloudinary.com/satjay/image/upload/f_auto,q_auto/v1/assets/Sorry_icon" alt="sorry" />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
         
         

        <div className="grid grid-cols-1 justify-center gap-2">
        <StationList onOptionSelected={handleOptionSelected} onClear={handleClear} />
        </div>
      
  
     </div>
      </div>

    <CardAssets data={data} query={query} isLoading={isLoading} isFetching={isFetching}/> 

    {isLoading || isFetching ?
      <Loading />
      : null}

    {error ? <div>Error: {error.message}</div> : null}

    

    </div>
  );
}

export default Home;
