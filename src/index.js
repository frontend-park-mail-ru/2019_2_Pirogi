import './sass/main.scss'

import { elements } from './javascript/views/base';

const formProcessing = async (e) => {
    console.log(e.elements);
};

elements.loginForm.addEventListener(
    'submit',
    e => {
        console.log('submitted');
        e.preventDefault();
        formProcessing(e);
    }
    );
