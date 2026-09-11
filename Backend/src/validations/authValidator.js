import { body, validationResult } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation errors',
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        })
    }

    next()
}

export const registerValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
            .isLength({ max: 30 }).withMessage('Username must not exceed 30 characters')
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage('Username can only contain letters, numbers, and underscores'),

        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Must be a valid email address')
            .normalizeEmail(),

        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one digit'),

        handleValidationErrors
    ]
}