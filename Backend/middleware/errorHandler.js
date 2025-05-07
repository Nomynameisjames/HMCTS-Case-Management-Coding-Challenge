import createError from 'http-errors';

/**
 * Custom error-handling middleware.
 * Catches all errors and sends appropriate HTTP response to the client.
 */
const errorHandler = (err, req, res, next) => {
    // Prevents trying to send headers if they've already been sent
    if (res.headersSent) {
        return next(err);
    }
    // Send custom status code if provided
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }
    // Default to 500 Internal Server Error for unexpected issues
    return res.status(500).json({ msg: err.message || 'Internal Server Error' });
};

/**
 * Middleware to handle requests to undefined routes.
 * Passes a 404 error to the error-handling middleware.
 */
const pagenotFound = (req, res, next) => {
    next(createError(404, 'Page Not Found'));
};

export { errorHandler, pagenotFound };