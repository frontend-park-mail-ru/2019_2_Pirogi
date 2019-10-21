/**
 * Clear errors messages
 * @param targetId
 */
export const clearError = (targetId) => {
    const element = document.getElementById(`error-${targetId}`);
    if (element !== null) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Render error message
 * @param targetId
 * @param errorMessage
 */
export const renderError = (targetId, errorMessage) => {
    clearError(targetId);
    document.getElementById(`${targetId}`)
        .insertAdjacentHTML('afterend', markupError(targetId, errorMessage));
};

/**
 * Create error message element
 * @param targetId
 * @param errorMessage
 * @returns {string}
 */
const markupError = (targetId, errorMessage) => {
    return `<div class="error" id="\error-${targetId}\">${errorMessage}</div>`;
};