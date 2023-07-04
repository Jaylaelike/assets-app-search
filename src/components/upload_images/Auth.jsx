/* eslint-disable no-undef */
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("smarkwisai@gmail.com");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);


    const { error } = await supabase.auth.signInWithOtp({
      email
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">เก็บรูปอุปกรณ์ทรัพย์สิน</h1>
        <p className="description">
          ThaiPBS Engineering Part.
        </p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>ลงทะเบียน</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
