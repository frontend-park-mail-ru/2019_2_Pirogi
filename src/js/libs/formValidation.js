
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

export const validateName = (name) => {
    return validateField(name, regExpressions.name);
};

export const validateEmail = (email) => {
    return validateField(email, regExpressions.email);
};

export const validatePassword = (password) => {
    return validateField(password, regExpressions.password);
};


export const getForm = form => {
    if (!form || form.nodeName !== 'FORM') {
        console.log('Not a form');
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
