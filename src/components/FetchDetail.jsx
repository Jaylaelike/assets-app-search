import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import FetchImage from "./FetchImages";

function FetchDetial() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://192.168.1.198:4000/api/assets/${id}`,
          import.meta.env.VITE_ASSETS_URL + "/" + `${id}`,
          {
            signal: abortController.signal,
          }
        ); // Replace with your API endpoint
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error is :", error);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [id]);

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 from-10% via-green-00 via-30% to-pink-500 to-90%">
        <div className="flex items-center justify-center pt-4">
          <div className=" justify-items-center pt-6 max-w-6xl bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {data?.length === 0 ? (
              <div className="justify-items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  🤷🏼‍♂️ ไม่พบอุปกรณ์ในระบบ!!! 🤷🏼‍♂️
                </h5>
                <ReactLoading
                  type="spin"
                  color="red"
                  height={"40%"}
                  width={"40%"}
                />
              </div>
            ) : (
              <div className="justify-items-center">
                 <FetchImage />
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          ชื่ออุปกรณ์
                        </th>
                        <th scope="col" className="px-6 py-3">
                          รายละเอียดอุปกรณ์
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          ID
                        </th>
                        <td className="px-6 py-4">{data[0].No}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Asset_No
                        </th>
                        <td className="px-6 py-4">{data[0].Asset_No}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Code_Station
                        </th>
                        <td className="px-6 py-4">{data[0].Code_Station}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Department
                        </th>
                        <td className="px-6 py-4">{data[0].Department}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Description
                        </th>
                        <td className="px-6 py-4">{data[0].Description}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Code_Station
                        </th>
                        <td className="px-6 py-4">{data[0].Code_Station}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Division
                        </th>
                        <td className="px-6 py-4">{data[0].Division}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Editor
                        </th>
                        <td className="px-6 py-4">{data[0].Editor}</td>
                      </tr>{" "}
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Facility_Owner
                        </th>
                        <td className="px-6 py-4">{data[0].Faccility_Owner}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Location
                        </th>
                        <td className="px-6 py-4">{data[0].Location}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Model
                        </th>
                        <td className="px-6 py-4">{data[0].Model}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Modifired
                        </th>
                        <td className="px-6 py-4">{data[0].Modifired}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Name_Item
                        </th>
                        <td className="px-6 py-4">{data[0].Name_Item}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          No
                        </th>
                        <td className="px-6 py-4">{data[0].No}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Onair_date
                        </th>
                        <td className="px-6 py-4">{data[0].Onair_date}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Part_Number
                        </th>
                        <td className="px-6 py-4">{data[0].Part_Number}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Purchse
                        </th>
                        <td className="px-6 py-4">{data[0].Purchse}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Remark
                        </th>
                        <td className="px-6 py-4">{data[0].Remark}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Repair
                        </th>
                        <td className="px-6 py-4">{data[0].Repair}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Section
                        </th>
                        <td className="px-6 py-4">{data[0].Section}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Repair
                        </th>
                        <td className="px-6 py-4">{data[0].Repair}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Serial_No
                        </th>
                        <td className="px-6 py-4">{data[0].Serial_No}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Station
                        </th>
                        <td className="px-6 py-4">{data[0].Station}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Station_Type
                        </th>
                        <td className="px-6 py-4">{data[0].Station_Type}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Status
                        </th>
                        <td className="px-6 py-4">{data[0].Status}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          System
                        </th>
                        <td className="px-6 py-4">{data[0].System}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default FetchDetial;
