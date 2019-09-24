
const markupError = (errorMsg) => {
    return `
        <div class="error">${errorMsg}</div>
    `;
};

export const renderErrors = (form, errors) => {
    for (const key in errors) {
        if(errors.hasOwnProperty(key)) {
            for (const item of form.elements) {
                if (item.nodeName === 'INPUT'
                    && item.type === 'text'
                    && item.name === key) {
                    item.insertAdjacentHTML('afterend', markupError(errors[key]));
                }
            }
        }
    }
};

export const clearErrors = (form) => {
    for (const item of Array.from(form.childNodes)) {
        if (item.className === 'error') {
            item.parentNode.removeChild(item);
        }
    }
};
