import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { motion } from "framer-motion";


export default function Signup() {
  const [usertc, setUsertc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { register , isLoading , error } = useRegister();



  const handleTcChange = (e) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value)) {

      if (value.length <= 11) {
        setUsertc(value);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(usertc, name, email, password, confirmPassword);
  };

  const inputs = [
    { iconType: "user",iconColor:"#3494d9" ,focusBorderColor:"#107ecc", placeholder: "Ad-Soyad", typee: "text", value: name, onChange: (e) => setName(e.target.value) },
    { iconType: "user",iconColor:"#3494d9" ,focusBorderColor:"#107ecc", placeholder: "T.C Kimlik", typee: "text", value: usertc, onChange: handleTcChange, maxLength: 11, inputMode: "numeric" },
    { iconType: "email",iconColor:"#3494d9" ,focusBorderColor:"#107ecc", placeholder: "E-posta Adresi", typee: "email", value: email, onChange: (e) => setEmail(e.target.value) },
    { iconType: "password",iconColor:"#3494d9" ,focusBorderColor:"#107ecc", placeholder: "Şifre", typee: "password", value: password, onChange: (e) => setPassword(e.target.value), showPassword: isChecked },
    { iconType: "password",iconColor:"#3494d9" ,focusBorderColor:"#107ecc", placeholder: "Şifre Tekrar", typee: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), showPassword: isChecked },
  ]

  return (
    <>
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full flex flex-col items-center justify-center"
      > 
      <form onSubmit={handleRegister} className="flex flex-col items-start justify-start gap-10">

        <p className="text-3xl font-semibold">KAYIT OL</p>

        <div className="flex flex-col gap-7">
          {inputs.map((input, index) => (
            <InputField
              key={index} {...input}/>
          ))}
        </div>

        <div className="flex justify-between gap-8">
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#326fa8] cursor-pointer">
              <Input
                typee="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span>Şifreyi Göster</span></label>
          </div>


        </div>
        <div className="flex flex-col gap-7 items-center justify-center">
          <Button type="submit" variant="secondary" whattype="text" text={isLoading ? "KAYIT OLUNUYOR.." : "KAYIT OL"} disabled={isLoading} />
          <Link
            to="/login"
            className="text-[14px] pt-3 text-[#003e6b] hover:text-[#8EDBFF] active:text-[#0D5080] transition hover:duration-300"
          >
            Zaten bir hesabın var mı?
          </Link>
        </div>
        {error && <p className="max-w-xs text-sm text-red-500">{error}</p>}

      </form>
      </motion.div>
    </>
  );
}