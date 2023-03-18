async function addToCollectionHandler(req, res) {
  const { userName, name, desc, movieTitle } = req.body;
  try {
    const result = await movieModel.findOneAndUpdate(
      { movie: movieTitle },
      { $push: { userFavs: userCollection } },
      { new: true }
    );
    res.status(201).send({ message: "Photo added to collection" });
  } catch (err) {
    console.log("Error while updating", err);
  }
}
// async function updateProductHandler(req, res) {
//   const { name, brand, price, image_link, description } = req.body;
//   const id = req.params.id;
//   await productModel.findByIdAndUpdate(
//     id,
//     { name, brand, price, imageUrl, description },
//     { new: true, overwrite: true }
//   );
//   let allProducts = await productModel.find({});
//   res.send(allProducts);
// }
