import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";


function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      // Check if the query is null or has more than 2 characters
      if (query === null || query.length > 2) {
        const res = await axios.get(
          import.meta.env.VITE_ASSETS_QUERY_URL + `${query}`
        );
        setData(res.data);
      } else {
        // If the query is null or less than 3 characters, fetch data from another API
        const anotherRes = await axios.get(import.meta.env.VITE_ASSETS_URL);
        setData(anotherRes.data);
      }
    };

    // const fetchData = async () => {
    //   const res = await axios.get(
    //     `http://192.168.1.198:4000/search?keyword=${query}`
    // //   );
    //   setData(res.data);
    // };

    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  console.log(query);

  return (
    <div>
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <Table data={data}  query={query}
      />
    </div>
  );
}

export default Home;
