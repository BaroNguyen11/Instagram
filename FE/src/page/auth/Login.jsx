import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await login(username,password)
    if (res.success){
        navigate("/")
    }else{
        alert(res.message)
    }
  }
  const inputStyle =
    "w-full bg-[rgba(255,255,255,0.1)] text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ";
  return (
    <>
      <div className="flex h-screen bg-black text-white ">
        <div className="w-[60%] border-r-3 border-gray-900 ">
          <img
            src="https://pub-896a899647b64fd7b1c609eb1ffb1dd4.r2.dev/banner.png"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[45%] px-12 items-center flex justify-center ">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-6">Login to BaoGram</h3>
            <div className="flex flex-col gap-4 ">
              <div className="relative group">
                <input
                  type="text"
                  className={inputStyle}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:-translate-y-3.5 group-focus-within:text-sm  duration-300 transition-all ease-in-out">
                  Username
                </span>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  className={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:-translate-y-3.5 group-focus-within:text-sm  duration-300 transition-all ease-in-out">
                  Password
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 rounded-xl py-3 cursor-pointer hover:bg-blue-400"
              >
                Login
              </button>
              <button className="text-blue-500 hover:text-blue-400 cursor-pointer">
                Forgot Password?
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-12">
              <button className="w-full bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)] rounded-xl px-5 py-3 cursor-pointer flex items-center justify-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                <span> Login with Google</span>
              </button>
              <button className="w-full bg-[rgba(255,255,255,0.1)] text-blue-500 hover:bg-[rgba(255,255,255,0.15)] rounded-xl px-5 py-3 cursor-pointer border border-blue-500">
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
