
import { googleProvider, db } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";

export function useGoogleLogin({ auth, googleProvider, db, navigate, setError }) {
  const loginWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
  
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
  
        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            usertc: "Belirtilmemiş"
          });
          console.log("Yeni kullanıcı oluşturuldu ve veritabanına eklendi.");
        }
  
        navigate('/');
      } catch (error) {
        console.error("Google ile giriş hatası:", error);
        if (err.code === "auth/popup-closed-by-user") {
          setError("Giriş yapılamadı, lütfen tekrar deneyin.");
        }
      }
    };
    return {
        loginWithGoogle
  };
  
}
