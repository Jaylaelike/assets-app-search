
 function Table({ data }) {
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
              {/* <th>Serial_No</th>
              <th>Part_Number</th>
              <th>Status</th>
              <th>Repair</th> */}
              {/* <th>Purchse</th>
              <th>Onair_date</th>
              <th>Faccility_Owner</th>
              <th>Location</th>
              <th>Remark</th>
              <th>Modifired</th>
              <th>Editor</th> */}
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

export default Table



