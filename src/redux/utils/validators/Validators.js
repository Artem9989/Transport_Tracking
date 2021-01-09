export const required = value => {
    if (value) return undefined;
    return 'пустое поле';
    
}



export const minLengthCreator = (minLength) => (value) => {
    if (value && value.length < minLength) return `Минимальное количество ${minLength} символа`;
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) 
    return `Максимальное количество ${maxLength} символа`;
}