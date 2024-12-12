import { authWithGoogle } from "@/configs/firebase";
import { useAppDispatch } from "@/hooks/reduxHook";
import { googleAuth } from "@/stores/auth/auth.action";

const GoogleButton = () => {
  const dispatch = useAppDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      const response = await authWithGoogle();
      if (response) {
        dispatch(
          googleAuth({
            name: response?.displayName || "",
            email: response?.email || "",
            photoUrl: response?.photoURL || ""
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button className="bg-zinc-900 text-zinc-50 border border-zinc-300" onClick={handleLoginWithGoogle}>
      Cyka Google
    </button>
  )
};

export default GoogleButton;