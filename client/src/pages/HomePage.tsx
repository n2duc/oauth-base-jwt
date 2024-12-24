import Seo from "@/components/Seo";
import { TextBox, TextBoxRef } from "@/components/TextBox";
import { useAppSelector } from "@/hooks/reduxHook";
import { useRef } from "react";

const textList = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsum nihil atque omnis cum amet doloremque quod, asperiores earum delectus voluptatibus nisi repellat dolorum quae id dolore sint saepe unde, repudiandae corrupti repellendus illo excepturi nobis? Blanditiis ex incidunt ab iste dicta hic quasi ad nobis sit totam, fugiat fuga?"

const HomePage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const textRef = useRef<TextBoxRef>(null);
  const handleUpSize = () => {
    textRef.current?.changeSize();
  }
  return (
    <>
      <Seo
        title="Home Page"
        description="Description for Home Page"
      />
      <div>
        <h2>HomePage</h2>
        <p>Welcome, {userInfo?.username}</p>
        <button onClick={handleUpSize}>Up up up</button>
        <TextBox ref={textRef} content={textList} />
      </div>
    </>
  )
}

export default HomePage