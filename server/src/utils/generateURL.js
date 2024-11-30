/*
  This function generates the URL of the image that is stored in the server.
  It takes two parameters:
  - req: The request object
  - img: The image name
  The function returns the URL of the image.
*/

export const generateURL = (req, img) => {
  const baseURL = `${req.protocol}://${req.get("host")}`;
  const imageURL = `${baseURL}/public/images/${img}`;
  return imageURL;
};
