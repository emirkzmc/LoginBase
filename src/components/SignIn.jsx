import Input from "./Input";
import InputField from "./InputField";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
      try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
      } else if (err.code === "auth/wrong-password") {
        setError("E-posta veya şifre hatalı.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Çok fazla başarısız giriş denemesi. Bir süre sonra tekrar deneyin.");
      } else {
        setError("Giriş başarısız oldu. Lütfen tekrar deneyin.");
        console.error("Giriş hatası:", err);
      }
    }
  };
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
                <div className="flex flex-col gap-7 items-center justify-center">
                <Button type="submit" variant="primary" whattype="text" text="GİRİŞ" />
                <Link to="/register" className="text-[13px]  text-[#397762] hover:text-[#5FE4B8] transition hover:duration-200 active:text-[#72A795]">
                            Hala kayıt değil misin?
                        </Link>
                </div>
                </div>{error && <p className="text-sm text-red-500">{error}</p>}


            </form>
        </>
    );

}