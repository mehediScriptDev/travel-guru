import React, { useContext, useState } from "react";
import Nav from "../Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const {user,err,setUser,setErr,emailSignIn,googleSignIn,passForgot} = useContext(AuthContext);
  const [wrong,setWrong] = useState(null);
  const [sent,setSent] = useState(null);
  const navigate =useNavigate();
  const loginHandler =e=>{
    setErr(null)
    setSent(null)
    setWrong(null)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;



    
    // signIn
    emailSignIn(email,password)
    .then(result => {
      setUser(result.user)
      navigate('/')
    })
    .catch((error)=>{
      setErr(error)
      
    })
  }
  const googleSignInhander= ()=>{
    // signInWithGoogle
    googleSignIn(provider)
    .then(result=>{
      setUser(result.user)
      navigate('/')
    })
    .catch(err=>{
      setErr(err)
    })
  }
  // passwordreset
  const resetPass = () =>{
    const email = prompt('enter your email');
    if(!email){
      return setWrong('Please provide a valid email')
    }
    else{
      passForgot(email).then(()=>{
        setSent('reset email sent')
      })
      .catch(err=>{
        setWrong(err.message)
      })
    }
  }
  return (
    <div>
      <div className="">
        <Nav></Nav>
      </div>

      <div className="bg-gray-100 pt-4 md:pt-12">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white border rounded-md p-8 w-11/12 mx-auto max-w-sm shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={loginHandler} className="space-y-4 ">
              <div>
                <label className="block text-sm text-gray-700">
                  Username or Email
                </label>
                <input
                  name="email"
                  type="text"
                  className="w-full border-b focus:outline-none focus:border-orange-500 py-1"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Passowrd</label>{" "}
                {/* Keeping the typo for fidelity */}
                <input
                  name="password"
                  type="password"
                  className="w-full border-b focus:outline-none focus:border-orange-500 py-1"
                  placeholder=""
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember Me
                </label>
                <btn onClick={resetPass} className="text-orange-500 hover:underline">
                  Forgot Password
                </btn>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-orange-600 text-black py-2 rounded mt-2"
              >
                Login
              </button>
              {wrong && <span className="text-red-500">{wrong}</span>}
              {
                sent&& <span className="text-red-400">{sent}</span>
              }
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link to={'/register'} className="text-orange-500 hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </div>
          {/* divider for google login */}
          <div className="flex flex-col">
            <div className="divider ">OR</div>
            <div className="flex flex-col space-y-2">
              <button onClick={googleSignInhander} className="btn bg-white text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>

              {/* Facebook */}
              <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
                <svg
                  aria-label="Facebook logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="white"
                    d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                  ></path>
                </svg>
                Login with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
