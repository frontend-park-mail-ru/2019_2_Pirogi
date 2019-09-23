import './sass/main.scss'

import { elements } from './javascript/views/base';
import * as formValidation from './javascript/models/formValidation';
import * as formView from './javascript/views/formView';

const formProcessing = async (e) => {
    const form = formValidation.getForm(e.target);
    const errors = formValidation.errors(form);
    if (errors === false) {
        // form is correct, send to server with await
        console.log(form);
    } else {
        console.log(errors);
        formView.renderErrors(e.target, errors);
    }
};

elements.loginForm.addEventListener(
    'submit',
    e => {
        console.log("form submitted");
        e.preventDefault();
        formView.clearErrors(e.target);
        formProcessing(e);
    }
);
