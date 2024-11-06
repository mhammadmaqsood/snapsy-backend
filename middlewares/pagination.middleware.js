const paginationMiddleware = (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 3 comments per page

    // Calculate the skip value
    req.pagination = {
        limit,
        skip: (page - 1) * limit,
    };

    next();
};

module.exports = paginationMiddleware;
