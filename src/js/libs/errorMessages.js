
export const errorMessages = {
    email: 'Email isn\'t a valid one.',
    name: 'You can use a-z, 0-9 and underscores. Minimum length is 5 characters.',
    password: 'Minimum of 8 ASCII characters required.',
    passwordMatch: 'Passwords don\'t match.',
    unknown: 'Unknown error.'
};

export const clearError = (targetId) => {
    const element = document.getElementById(`error-${targetId}`);
    element.parentNode.removeChild(element);
};

export const renderError = (targetId, errorMessage) => {
  document.getElementById(`${targetId}`)
      .insertAdjacentHTML('afterend', markupError(targetId, errorMessage));
};

const markupError = (targetId, errorMessage) => {
    return `<div class="error" id="${targetId}">${errorMessage}</div>`;
};