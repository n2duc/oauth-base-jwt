import { useAppDispatch } from "@/hooks/reduxHook";
import { useUpdateAvatarMutation } from "@/services/rootApi";
import { setAvatar } from "@/stores/auth/auth.slice";
import { closeDialog } from "@/stores/dialog/dialog.slice";
import { useEffect, useState } from "react";

const SelectPhoto = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const [updateAvatar, { data, isSuccess, isLoading }] = useUpdateAvatarMutation();

  console.log({ isLoading, isSuccess, data });

  // Handle file selection (image)
  const handSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setImage(file);
    }
  }

  // Submit the selected image
  const handleUpdateAvatar = () => {
    if (image) {
      const formData = new FormData();
      formData.append("avatar", image);
      updateAvatar(formData);
    }
  };

  const handleClose = () => dispatch(closeDialog());

  useEffect(() => {
    if (isSuccess && data?.data.avatar) {
      dispatch(setAvatar(data?.data.avatar || ''));
      dispatch(closeDialog());
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div
      className="absolute w-full h-screen top-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={handleClose}
    >
      <div
        className="bg-zinc-600 w-full max-w-sm px-6 py-4 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center mb-3 text-lg font-medium">SelectPhoto</h3>
        <div className="w-full min-h-60 h-full bg-zinc-700 border border-zinc-500 rounded">
          {imageURL ? (
            <img src={imageURL} alt="avatar" className="w-full aspect-square object-contain" />
          ) : (
            <label htmlFor="avatar" className="w-full h-60 flex items-center justify-center rounded">
              <input type="file" id="avatar" className="hidden" accept="image/*" onChange={handSelectImage} />
              Select Photo
            </label>
          )}
        </div>
        <div className="flex items-center justify-evenly mt-4">
          <button onClick={handleClose}>Cook</button>
          <button onClick={handleUpdateAvatar} disabled={isLoading}>{isLoading ? "Hmm" : "Bus"}</button>
        </div>
      </div>
    </div>
  );
};

export default SelectPhoto;
