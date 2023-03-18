//CONSIDER USERS!!! DO NOT DELETE IF >1 USER HAVE FAVOURITED IT.
//below code just deletes it, needs modifying!

// async function movieDeleteHandler(req, res) {
//   const result = await movieModel.findByIdAndDelete(req.params.id);

//   res.json(result);
// }

async function movieDeleteHandler(req, res) {
  const id = req.params.id;
  await movieModel.findByIdAndDelete(id);
  let allMovies = await movieModel.find({});
  res.send(allMovies);
}
module.exports = movieDeleteHandler;
