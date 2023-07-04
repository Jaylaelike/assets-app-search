/* eslint-disable no-undef */
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-center pb-5">
          <img
            className="rounded-full w-56 h-56 p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            src="https://org.thaipbs.or.th/media/EHJqPKtQaacHoXeQwPUe0kxFvZdz5abbe8FKGy.png"
            alt="thaipbs"
            height={200}
            width={200}
          />
        </div>
        <h1 className="header">เก็บรูปอุปกรณ์ทรัพย์สิน</h1>
        <p className="description">ThaiPBS Engineering Part.</p>

        <div className="flex justify-center pt-10">
          <form className="app" onSubmit={handleLogin}>
            <div>
              <input
                className="inputField"
                type="email"
                placeholder="ใส่ e-mail ของคุณที่นี่"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center pt-10">
              <button
                type="button"
                disabled={loading}
                onClick={handleLogin}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {loading ? <span>Loading</span> : <span>ลงทะเบียน</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
