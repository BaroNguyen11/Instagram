import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Register = () => {
  const { register } = useAuth(); // Giả định context của bạn có hàm register
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [styleUsername, setStyleUsername] = useState("");
  const [stylePassword, setStylePassword] = useState("");
  const [styleConfirmPassword, setStyleConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu khớp nhau trước khi gửi API
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Gọi hàm register từ AuthContext (hãy điều chỉnh tùy thuộc vào API thật của bạn)
    const res = await register(username, password);
    if (res.success) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setStyleUsername(value !== "" ? "-translate-y-3.5 text-sm" : "");
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStylePassword(value !== "" ? "-translate-y-3.5 text-sm" : "");
  };

  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setStyleConfirmPassword(value !== "" ? "-translate-y-3.5 text-sm" : "");
  };

  const inputStyle =
    "w-full bg-[rgba(255,255,255,0.1)] text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ";

  return (
    <>
      <div className="flex h-screen bg-black text-white ">
        {/* Banner Left Side */}
        <div className="w-[60%] border-r-3 border-gray-900 ">
          <img
            src="https://pub-896a899647b64fd7b1c609eb1ffb1dd4.r2.dev/banner.png"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Register Form Right Side */}
        <div className="w-[45%] px-12 items-center flex flex-col justify-center ">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-6">Create your BaoGram account</h3>
            
            <div className="flex flex-col gap-4 ">
              {/* Username Input */}
              <div className="relative group">
                <input
                  type="text"
                  className={inputStyle}
                  value={username}
                  onChange={handleChangeUsername}
                  required
                />
                <span
                  className={`absolute left-4 top-3.5 text-gray-400 group-focus-within:-translate-y-3.5 group-focus-within:text-sm duration-300 transition-all ease-in-out ${styleUsername}`}
                >
                  Username
                </span>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  type="password"
                  className={inputStyle}
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
                <span
                  className={`absolute left-4 top-3.5 text-gray-400 group-focus-within:-translate-y-3.5 group-focus-within:text-sm duration-300 transition-all ease-in-out ${stylePassword}`}
                >
                  Password
                </span>
              </div>

              {/* Confirm Password Input */}
              <div className="relative group">
                <input
                  type="password"
                  className={inputStyle}
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  required
                />
                <span
                  className={`absolute left-4 top-3.5 text-gray-400 group-focus-within:-translate-y-3.5 group-focus-within:text-sm duration-300 transition-all ease-in-out ${styleConfirmPassword}`}
                >
                  Confirm Password
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 rounded-xl py-3 cursor-pointer hover:bg-blue-400 font-semibold"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Divider hoặc Lựa chọn khác nếu cần */}
          <div className="flex flex-col gap-2 mt-12 w-full">
            <span className="text-gray-400 text-center text-sm mb-2">
              Already have an account?
            </span>
            <Link to="/login">
              <button className="w-full bg-[rgba(255,255,255,0.1)] text-blue-500 hover:bg-[rgba(255,255,255,0.15)] rounded-xl px-5 py-3 cursor-pointer border border-blue-500">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;