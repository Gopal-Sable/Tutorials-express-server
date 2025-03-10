const notFound = (req, res, next) => {
    const error = new error("Not Found");
    error.status = 404;
    next(error);
};

export default notFound;
