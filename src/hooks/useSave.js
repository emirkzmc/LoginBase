import { getFirestore, doc, updateDoc } from 'firebase/firestore';


export function useSave({currentUser, formData, setIsEditing, setIsSaving, setSaveError, refreshUserInfo}) {
    const db = getFirestore();
    const handleSave = async () => {
        setIsSaving(true);
        setSaveError(null);

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);

            const dataToUpdate = {
                name: formData.name,
                email: formData.email,
                usertc: formData.usertc
            };

            await updateDoc(userDocRef, dataToUpdate);

            await refreshUserInfo();

            setIsEditing(false);
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            setSaveError("Bilgiler güncellenirken bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };
    
  return {
    handleSave
  };
    
  
}
