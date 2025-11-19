import Input from "./Input";
import InputField from "./InputField";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth , googleProvider, db } from "../config/firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";
import { useGoogleLogin } from "../hooks/useGoogleLogin.js";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const {handleLogin} = useLogin({auth, email, password, navigate, setError});
  const {loginWithGoogle} = useGoogleLogin({auth, googleProvider, db, navigate, setError});
  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col items-start justify-start gap-10">

        <p className="text-3xl font-semibold">HOŞ GELDİNİZ</p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-7">
            <InputField
              iconType="email"
              placeholder="E-posta Adresi"
              typee="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconColor="#009951"
              focusBorderColor="#24AC6D"
            />
            <InputField
              iconType="password"
              placeholder="Şifre"
              typee="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={isChecked}
              iconColor="#009951"
              focusBorderColor="#24AC6D"
            />
          </div>
          <div className="flex flex-col justify-between ">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">
                  <Input
                    typee="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}

                  />
                  <span>Şifreyi Göster</span></label></div>
              <Link to="/forget" className="text-[13px]  text-[#397762] hover:text-[#5FE4B8] transition hover:duration-200 active:text-[#72A795]">
                Şifremi unuttum
              </Link>
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center gap-8">
            <Button type="submit" variant="primary" whattype="text" text="GİRİŞ" />
            <button
              onClick={loginWithGoogle}
              type="button"
              className="group flex items-center justify-center gap-3 w-[300px] h-10 text-xl rounded-4xl  border-1 border-black  text-black  transition hover:duration-300 hover:bg-[#9cb8a8] hover:border-[#008c3f] hover:text-[#ffffff] active:bg-[#007530] active:border-[#005723] active:text-white">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24" 
                width="24"
                viewBox="0 0 640 640"
                className="transition-colors text-black group-hover:text-[#ffffff] relative top-[0.5px] right-8 ">
                <path
                  fill="currentColor" 
                  d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"
                />
              </svg>
              <span>Google ile giriş</span>
            </button>

          </div>
          <Link to="/register" className="text-[13px]  text-[#397762] hover:text-[#5FE4B8] transition hover:duration-200 active:text-[#72A795]">
            Hala kayıt değil misin?
          </Link>
        </div>{error && <p className="text-sm text-red-500">{error}</p>}


      </form>
    </>
  );

}