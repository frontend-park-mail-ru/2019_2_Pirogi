
export const errorMessages = {
    email: 'Некорректный email',
    name: 'Имя может состоять из букв a-z и цифр. Минимальная длина 5 символов.',
    password: 'Пароль должен состоять не менее чем из 8 символов.',
    passwordMatch: 'Пароли не совпадают!',
    unknown: 'Неизвестная ошибка.'
};

export const clearError = (targetId) => {
    const element = document.getElementById(`error-${targetId}`);
    if (element !== null) {
        element.parentNode.removeChild(element);
    }
};

export const renderError = (targetId, errorMessage) => {
    clearError(targetId);
    document.getElementById(`${targetId}`)
        .insertAdjacentHTML('afterend', markupError(targetId, errorMessage));
};

const markupError = (targetId, errorMessage) => {
    return `<div class="error" id="\error-${targetId}\">${errorMessage}</div>`;
};