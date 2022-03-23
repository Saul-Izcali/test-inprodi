import { validationResult } from "express-validator";

const createValidator = validations => [
    ...validations,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    },
];

export default createValidator;
