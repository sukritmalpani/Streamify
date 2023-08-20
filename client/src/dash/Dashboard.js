import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("http://localhost:5000/getRequest")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };
  const handleClick1 = async (email) => {
    try {
      const response = await axios.patch('http://localhost:5000/updatePub', { email });
      console.log(response);
      const updatedUser = response.data;
      console.log('Updated user:', updatedUser);
    } catch (error) {
      toast.error(error.message)
    }
    try {
      const response = await axios.delete(`http://localhost:5000/deleteReq/${email}`);
      const deletedUser = response.data;
      console.log('Deleted user:', deletedUser);
      getData();
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleClick2 = async (email) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteReq/${email}`);
      const deletedUser = response.data;
      console.log('Deleted user:', deletedUser);
      getData();
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="col  flex  justify-center bg-white min-h-screen main pt-5 mt-3">
        <div className="col-lg-7 gap-44 justify-center rounded-md col-lg-6 col-lg-12">
          <h5 className="flex justify-center mt-3 mb-3 text-4xl text-secondary">
            Check Your Streaming Stats
          </h5>
          <div className="table-responsive w-[1400px] mb-10 flex justify-center p-10 rounded-md">
            <table className="table table-striped rounded-md">
              <thead className="">
                <tr className="bg-[#44455B] text-white">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Social Media</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.map((output) => (
                  <tr key={output._id} className="">
                    <td>{output._id}</td>
                    <td>{output.username}</td>
                    <td>{output.email}</td>
                    <td>{output.link}</td>
                    <td>
                      <div class="inline-flex">
                        <button class="bg-red-300 hover:bg-red-400 text-gray-800 m-1 font-bold py-2 px-4 rounded-md" onClick={() => handleClick1(output.email)}>
                          Accept
                        </button>
                        <button class="bg-green-300 hover:bg-green-400 text-gray-800 m-1 font-bold py-2 px-4 rounded-md" onClick={() => handleClick2(output.email)}>
                          Reject
                        </button>
                      </div>
                    </td>
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
      <Footer />
    </>
  );
};

export default Dashboard;
