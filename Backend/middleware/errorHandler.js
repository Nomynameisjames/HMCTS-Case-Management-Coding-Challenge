import createError from 'http-errors';

const errorHandler = (err, req, res, next) => {
    // Prevents trying to send headers if they've already been sent
    if (res.headersSent) {
        return next(err);
    }

    // Send custom status code if provided
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }

    // Fallback to generic 500 error
    return res.status(500).json({ msg: err.message || 'Internal Server Error' });
};

const pagenotFound = (req, res, next) => {
    next(createError(404, 'Page Not Found'));
};

export { errorHandler, pagenotFound };
