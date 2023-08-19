import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="col  flex  justify-center bg-white min-h-screen main pt-5 mt-3">
      <div className="col-lg-7 gap-44 justify-center rounded-md col-lg-6 col-lg-12">
        <h5 className="flex justify-center mt-3 mb-3 text-4xl text-secondary">
          Check Your Streaming Stats
        </h5>
        <div className="table-responsive h-9/12 w-[1200px] mb-10 flex justify-center p-10 rounded-md">
          <table className="table table-striped rounded-md  border">
            <thead className="thead-light">
              <tr className="bg-[#44455B] text-white ml-10">
                <th>No</th>
                <th>Label</th>
                <th>Header</th>
                <th>Column</th>
                <th>Record Data</th>
              </tr>
            </thead>
            <tbody>
              {record.slice(0, 5).map((output) => (
                <tr key={output.id}>
                  <td>{output.id}</td>
                  <td>{output.name}</td>
                  <td>{output.email}</td>
                  <td>{output.username}</td>
                  <td>{output.website}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <a id="more"></a>
      <hr />
      {/* Rest of the code... */}
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
