import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import StationList from "./StationList";
import useDebounce from "../components/hooks/useDebounce";
import { useQuery } from "react-query";

import CardAssets from "./Card";
import Loading from "./Loading";
import StatusList from "./StatusList";

// eslint-disable-next-line react/prop-types
function Home() {
  const [query, setQuery] = useState("");
  // const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const debouncedSearchTerm = useDebounce(query, 300);

  const [isListening, setIsListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "th-TH";

  useEffect(() => {
    if (isListening) {
      recognition.start();

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            // eslint-disable-next-line no-unused-vars
            interim += event.results[i][0].transcript;
          }
        }

        setSearchTerm(final);
      };
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const toggleListening = () => {
    setIsListening((prevIsListening) => !prevIsListening);
  };

  // Create a query using react-query
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["", debouncedSearchTerm, selectedValue],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch data based on the query
  async function fetchData() {
    if (debouncedSearchTerm === null || debouncedSearchTerm.length > 2) {
      const res = await axios.get(
        import.meta.env.VITE_ASSETS_QUERY_URL_V2 + `${debouncedSearchTerm}`
      );
      return res.data;
    }

    if (selectedValue) {
      const res = await axios.get(
        import.meta.env.VITE_ASSETS_STATION_FILTER + `${selectedValue}`
      );
      return res.data;
    } else {
      const res = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
      return res.data;
    }
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  console.log(data);
  console.log(isError);
  console.log(error);

  const handleSearch = (event, value) => {
    //setSearchTerm(event.target.value);
    setQuery(event.target.value);
    setSelectedValue(value);
    setQuery(searchTerm);
  };

  const handleOptionSelected = (value) => {
    setSelectedValue(value);
    console.log(selectedValue);
  };

  const handleOptionSelectedStatus = (value) => {
    setSelectedStatus(value);
    console.log(selectedStatus);
  };

  // Filter the data using useMemo
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!selectedStatus) return data; // Return the original data if no filter is selected

    // Filter the data based on the selected filter value
    return data.filter((item) => item.Status === selectedStatus);
  }, [data, selectedStatus]);

  const handleClear = () => {
    setSelectedValue(null);
    setSearchTerm(null);
    setSelectedStatus(null);
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
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="flex justify-center items-center gap-5 p-2">
              <button
                type="submit"
                onClick={handleSearch}
                className="p-2.5 ml-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none rounded-lg focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>

            <button
              type="submit"
              onClick={toggleListening}
              className="p-2.5 ml-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg"
            >
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 19"
              >
                <path d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
                <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
              </svg>
            </button>
          </div>

          <div>
            <div>
              {isListening ? (
                <div className="px-3 py-1 text-xs font-medium leading-none text-center text-red-800 bg-red-200 rounded-full animate-pulse dark:bg-red-900 dark:text-red-200">
                  ฟังอยู่...
                </div>
              ) : null}
            </div>
          </div>

          {data?.length === 0 ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 p-10">
                <p> {`ขออภัยค่ะไม่พบข้อมูลทรัพย์สิน "${searchTerm}"`}</p>
                <div>
                  <img
                    src="https://res.cloudinary.com/satjay/image/upload/f_auto,q_auto/v1/assets/Sorry_icon"
                    alt="sorry"
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="grid grid-cols-2 justify-center gap-2">
            <StationList
              onOptionSelected={handleOptionSelected}
              onClear={handleClear}
            />
            <StatusList
              onOptionSelected={handleOptionSelectedStatus}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>

      {error ? <div>Error: {error.message}</div> : null}

      <CardAssets
        data={filteredData}
        isLoading={isLoading}
        isFetching={isFetching}
        query={query}
      />

      {isLoading || isFetching ? <Loading /> : null}
    </div>
  );
}

export default Home;
