export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

export const checkValidity = (value, rules) => {
  let isValid = false;

  if (!rules) {
    return true // for "deliveryMethod" state object
  }

  if (rules.required) {
    isValid = value.trim() !== '';
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength;
  }

  if (rules.minLength && rules.maxLength) {
    isValid =  (value.trim().length >= rules.minLength) && (value.trim().length <= rules.maxLength);
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }

  return isValid;
}