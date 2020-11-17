export const checkErrorsGuests = val => {
  if (val.length === 0) {
    return 'empty';
  } else if (isNaN(val)) {
    return 'invalid';
  } else if (val <= 0) {
    return 'bounds_low';
  } else if (val >= 25) {
    return 'bounds_high';
  }
  return null;
};

export const checkErrorsCardCvv = val => {
  const sanitizedVal = val.replace(' ', '');
  if (val.length === 0) {
    return 'empty';
  } else if (!Stripe.card.validateCVC(sanitizedVal)) {
    return 'invalid';
  }
  return null;
};

export const checkErrorsCardExpiry = val => {
  const sanitizedVal = val.replace(' ', '').replace('/', '');
  if (val.length === 0) {
    return 'empty';
  } else if (sanitizedVal.length < 4) {
    return 'length_low';
  } else if (!Stripe.card.validateExpiry(val)) {
    return 'invalid';
  }
  return null;
};

export const checkErrorsChargeAmount = val => {
  const regex = /^[0-9.]+$/;
  const sanitizedVal = val.replace(' ', '');
  if (val.length === 0) {
    return 'empty';
  } else if (!regex.test(sanitizedVal)) {
    return 'invalid';
  }
  return null;
};

export const checkErrorsCardNumber = val => {
  const sanitizedVal = val.replace(' ', '');
  if (val.length === 0) {
    return 'empty';
  } else if (sanitizedVal.length < 14) {
    return 'length_low';
  } else if (!Stripe.card.validateCardNumber(sanitizedVal)) {
    return 'invalid';
  }
  return null;
};

export const checkErrorsCustomerEmail = val => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (val.length === 0) {
    return 'empty';
  } else if (val.length < 6) {
    return 'length_low';
  } else if (!regex.test(val)) {
    return 'invalid';
  }
  return null;
};

export const checkErrorsCustomerName = val => {
  if (val.length === 0) {
    return 'empty';
  } else if (val.length < 4) {
    return 'length_low';
  }
  return null;
};

export const checkErrorsCustomerPostalCode = val => {
  if (val.length === 0) {
    return 'empty';
  } else if (val.length < 4) {
    return 'length_low';
  } else if (val.length > 12) {
    return 'length_high';
  }
  return null;
};

export const checkErrorsCustomerTelephone = val => {
  if (val.length === 0) {
    return 'empty';
  } else if (val.length < 10) {
    return 'length_low';
  }
  return null;
};
