import { useAppSelector } from "@/hooks/reduxHook";

const TextBox = () => {
  return (
    <p className="my-3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ullam saepe sint reiciendis libero? Enim tempora, facere minus quis illo laboriosam reprehenderit, blanditiis molestiae expedita soluta reiciendis cum cumque ducimus perspiciatis possimus deserunt fugiat eaque labore corporis ratione distinctio dolorum quae suscipit illum? Sunt modi veritatis atque iure provident suscipit nemo. Cumque unde, at ab recusandae minima quam quae provident, sint dolor incidunt magnam aliquid temporibus beatae repellat laboriosam alias ipsum et iste? Non, quidem molestiae facilis tempore officiis sit, atque dolores sed error fugiat, nihil vero explicabo deleniti ut porro quam harum fuga qui nemo nesciunt doloremque exercitationem veritatis.
    </p>
  )
}

const HomePage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div>
      <h2>HomePage</h2>
      <p>Welcome, {userInfo?.username}</p>
      <TextBox />
      <TextBox />
      <TextBox />
      <TextBox />
      <TextBox />
    </div>
  )
}

export default HomePage