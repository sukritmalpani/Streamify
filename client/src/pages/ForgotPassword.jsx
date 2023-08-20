import axios from "axios";
import React, { useRef, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [val, setVal] = useState(false);
  const [store, setStore] = useState("");
  const email = useRef(null);
  const otp = useRef(null);
  const newPass = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setVal(true);
    alert("otp sent to the email");
    const resp = await axios.post("http://localhost:5000/otp", {
      email: email.current.value,
    });
    setStore(resp.data);
    console.log(resp);
  };

  const handleOtp = async () => {
    if (store === otp.current.value) {
      const resp = await axios.put("http://localhost:5000/chPass", {
        email: email.current.value,
        newPass: newPass.current.value,
      });
      console.log(resp);
      alert("changed password");
    } else {
      alert("wrong otp");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="w-full flex bg-white">
        <div className="flex-1 flex items-center  justify-center h-screen">
          <div className="w-full max-w-md p-10 bg-white text-gray-600 sm:px-0 ">
            <h1 className="m-5 text-3xl">Set New Password</h1>
            <form
              action=""
              className="space-y-5 border-2 p-5 rounded-lg shadow-lg"
              onSubmit={(e) => handleSubmit(e)}
            >
              <label htmlFor="email">Enter Your Email</label>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="text"
                  id="email"
                  // className="email "
                  className="email w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  style={{ border: "2px solid black" }}
                  ref={email}
                />
                <button className="w-[200px] m-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                  Submit
                </button>
              </div>
            </form>
            {val && (
              <div className="space-y-5 border-2 p-5 rounded-lg shadow-lg">
                <h1>Now Enter Your otp and new password</h1>
                <input
                  type="text"
                  // className="otp"
                  className="otp w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  style={{ border: "2px solid black" }}
                  ref={otp}
                />
                <div>
                  <input
                    type="text"
                    // className="newPass"
                  className="w-full newPass mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"

                    style={{ border: "2px solid black" }}
                    ref={newPass}
                  />
                </div>
                <button className="w-[200px] m-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  onClick={handleOtp}
                >
                  {" "}
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
