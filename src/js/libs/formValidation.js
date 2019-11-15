const regExpressions = {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
    username: /^[а-яА-Яa-zA-Z0-9_]{2,}$/,
    // ASCII chars from ! to ~
    password: /[!-~]{4,}/
};

export const validators = {
    email: (email) => validateField(email, regExpressions.email),
    username: (username) => validateField(username, regExpressions.username),
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

/**
 * Validates the username
 * @function
 * @param {string} name
 * @returns {boolean}
 */
export const validateName = (name) => {
    return validateField(name, regExpressions.username);
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
