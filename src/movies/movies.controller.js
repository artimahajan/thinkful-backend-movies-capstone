const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie = await service.read(request.params.movieId);

  if(movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const isShowing = !!request.query.is_showing;
  const movies = await service.list(isShowing);
  response.json({ data: movies });
}

module.exports = {
  movieExists,
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
