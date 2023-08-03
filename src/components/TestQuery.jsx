import { useQuery } from "react-query";
import { useState } from "react";
import useDebounce from "../components/hooks/useDebounce";
import axios from "axios";

function TestQuery() {
    const [query, setQuery] = useState('');
    const debouncedSearchTerm = useDebounce(query, 300);
    // Create a query using react-query
    const { data, isLoading, error , isError } = useQuery(
        {
            queryKey: ['', debouncedSearchTerm],
            queryFn: fetchData,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          }
        );
  
    // Fetch data based on the query
    async function fetchData() {
      if (debouncedSearchTerm === null || debouncedSearchTerm.length > 1) {
        const res = await axios.get(import.meta.env.VITE_ASSETS_QUERY_URL_V2 + `${debouncedSearchTerm}`);
        return res.data;
      } else {
        const res = await axios.get(import.meta.env.VITE_IMAGES_URL_V2);
        return res.data;
      }
    }
  
    const handleChange = (event) => {
      setQuery(event.target.value);
    };

    if (isError) {
        return <h2>{error.message}</h2>;
      }
    console.log(data);
  
    return (
      <div>
        <input type="text" value={query} onChange={handleChange} />
        {isLoading ? <div>Loading...</div> : null}
        {error ? <div>Error: {error.message}</div> : null}
        {data ? (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ); 

            }
export default TestQuery
