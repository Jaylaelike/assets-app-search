/* eslint-disable react/prop-types */
function Table({ data, query }) {

  if (!data || data.length === 0) {
    return <p>No matches for {query}</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>No</th>
            <th>Department</th>
            <th>Division</th>
            <th>Section</th>
            <th>Station_Type</th>
            <th>Station</th>
            <th>Code_Station</th>
            <th>Asset_No</th>
            <th>Name_Item</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Model</th>
     
          </tr>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.No}</td>
              <td>{item.Department}</td>
              <td>{item.Division}</td>
              <td>{item.Section}</td>
              <td>{item.Station_Type}</td>
              <td>{item.Station}</td>
              <td>{item.Code_Station}</td>
              <td>{item.Asset_No}</td>
              <td>{item.Name_Item}</td>
              <td>{item.Description}</td>
              <td>{item.Department}</td>
              <td>{item.Brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
