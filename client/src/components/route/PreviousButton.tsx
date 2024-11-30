import { useNavigate } from "react-router-dom";

const PreviousButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  return (
    <button onClick={handleGoBack}>
      Go back
    </button>
  )
};

export default PreviousButton;