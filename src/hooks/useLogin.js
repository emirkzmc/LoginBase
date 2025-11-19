
import { signInWithEmailAndPassword } from "firebase/auth";



export function useLogin({ auth, email, password, navigate, setError }) {
    
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

  return { handleLogin };
}
