
const createValidation = (validator, errorMsg) => data => {
    const result = validator(data);
    return result ? result : errorMsg;
};

const regExpressions = {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^[a-zA-Z0-9_]{5,}$/,
    // ASCII chars from ! to ~
    password: /[!-~]{8,}/
};

const validateField = (field, regExp) => {
    return regExp.test(String(field));
};

// Create validations with custom error messages
const createName = createValidation(
    name => name && validateField(name, regExpressions.name),
    "You can use a-z, 0-9 and underscores. Minimum length is 5 characters."
);
const createEmail = createValidation(
    email => email && validateField(email, regExpressions.email),
    "Email isn't a valid one."
);
const createPassword = createValidation(
    password => password && validateField(password, regExpressions.password),
    "Minimum of 8 ASCII characters required."
);

const validationForm = form => {
    return Object.keys(form).reduce((errors, key) => {
        let tmp;
        switch (key) {
            case 'name':
                tmp = createName(form[key]);
                if (tmp !== true) {
                    errors[key] = tmp;
                }
                break;
            case 'email':
                tmp = createEmail(form[key]);
                if (tmp !== true) {
                    errors[key] = tmp;
                }
                break;
            case 'password':
                tmp = createPassword(form[key]);
                if (tmp !== true) {
                    errors[key] = tmp;
                }
                break;
            default:
                break;
        }
        return errors;
    }, {});
};

export const errors = form => {
    const errors = validationForm(form);
    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
        return false;
    }
    return errors;
};

export const getForm = form => {
    if (!form || form.nodeName !== 'FORM') {
        // todo: acknowledge what s the best solution
        return;
    }
    let theForm = {};
    for (const item of form.elements) {
        if (item.nodeName === 'INPUT' && item.type === 'text') {
            theForm[item.name] = item.value;
        }
    }
    return theForm;
};
