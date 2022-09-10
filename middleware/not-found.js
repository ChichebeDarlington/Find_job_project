const notFoundMiddleware = (req, res) => {
  res.status(404).send("404 middleware not found");
};

export default notFoundMiddleware;
