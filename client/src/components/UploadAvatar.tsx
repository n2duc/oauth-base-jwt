import { useAppDispatch } from "@/hooks/reduxHook";
import { openDialog } from "@/stores/dialog/dialog.slice";

interface UploadAvatarProps {
  avatar: string;
}

const UploadAvatar = ({ avatar }: UploadAvatarProps) => {
  const dispatch = useAppDispatch();
  const handleShowModal = () => dispatch(openDialog());
  return (
    <div>
      <img src={avatar} alt="avatar" className="size-20 rounded-full object-cover" />
      <button className="oivcl" onClick={handleShowModal}>
        Upload
      </button>
    </div>
  )
};

export default UploadAvatar;