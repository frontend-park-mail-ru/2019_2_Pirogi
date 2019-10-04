const regExpressions = {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^[a-zA-Z0-9_]{5,}$/,
    // ASCII chars from ! to ~
    password: /[!-~]{8,}/
};

export const validators = {
    email: (email) => validateField(email, regExpressions.email),
    name: (name) => validateField(name, regExpressions.name),
    password: (password) => validateField(password, regExpressions.password)
};

/**
 * Validates the chosen field
 * @function
 * @param {string} field
 * @param {string} regExp
 * @returns {boolean}
 */
const validateField = (field, regExp) => {
    return regExp.test(String(field));
};

// todo: delete rest
/**
 * Validates the username
 * @function
 * @param {string} name
 * @returns {boolean}
 */
export const validateName = (name) => {
    return validateField(name, regExpressions.name);
};

/**
 * Validate the email
 * @function
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    return validateField(email, regExpressions.email);
};


/**
 * Validates the password
 * @function
 * @param password
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    return validateField(password, regExpressions.password);
};
