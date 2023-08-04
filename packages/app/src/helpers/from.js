export function clearFields() {
  this.fields = { ...this.emptyFields };
  this.errorFields = {};
  this.error = '';
  return true;
}

export function objToFormData(obj) {
  const fd = new FormData();
  Object.keys(obj).forEach((key) => {
    fd.append(key, obj[key] === null ? '' : obj[key]);
  });

  return fd;
}

export function checkFields(e) {
  let hasErrors = false;
  if (typeof e === 'object' && e?.response?.data?.errors) {
    const { errors } = e.response.data;
    Object.keys(errors).forEach((i) => {
      this.errorFields[i] = errors[i].join(', ');
    });
  } else {
    Object.keys(this.fields).forEach((i) => {
      if (
        this.requiredFields.indexOf(i) >= 0 &&
        !this.fields[i] &&
        this.fields[i] !== 0
      ) {
        this.errorFields[i] = 'Обязательно для заполнения';
        hasErrors = true;
      } else {
        this.errorFields[i] = false;
      }
    });
  }
  return hasErrors;
}

export function checkSelect(e) {
  let hasErrors = false;
  if (typeof e === 'object' && e?.response?.data?.errors) {
    const { errors } = e.response.data;
    Object.keys(errors).forEach((i) => {
      this.errorFields[i] = errors[i].join(', ');
    });
  } else {
    Object.keys(this.fields).forEach((i) => {
      if (
        this.requiredFields.indexOf(i) >= 0 &&
        !Object.keys(this.fields[i]).length &&
        this.fields[i] !== 0
      ) {
        this.errorFields[i] = 'Обязательно для заполнения';
        hasErrors = true;
      } else {
        this.errorFields[i] = false;
      }
    });
  }
  return hasErrors;
}

export function checkSelectTwo(e) {
  let hasErrors = false;
  if (typeof e === 'object' && e?.response?.data?.errors) {
    const { errors } = e.response.data;
    Object.keys(errors).forEach((i) => {
      this.errorFieldsTwo[i] = errors[i].join(', ');
    });
  } else {
    Object.keys(this.fieldsTwo).forEach((i) => {
      if (
        this.requiredFieldsTwo.indexOf(i) >= 0 &&
        !Object.keys(this.fieldsTwo[i]).length &&
        this.fieldsTwo[i] !== 0
      ) {
        this.errorFieldsTwo[i] = 'Обязательно для заполнения';
        hasErrors = true;
      } else {
        this.errorFieldsTwo[i] = false;
      }
    });
  }
  return hasErrors;
}

export function checkFieldsAddress(e) {
  let hasErrors = false;
  if (typeof e === 'object' && e?.response?.data?.errors) {
    const { errors } = e.response.data;
    Object.keys(errors).forEach((i) => {
      this.errorFields[i] = errors[i].join(', ');
    });
  } else {
    Object.keys(this.address).forEach((i) => {
      if (
        this.requiredFieldsAddress.indexOf(i) >= 0 &&
        !this.address[i] &&
        this.address[i] !== 0
      ) {
        this.errorFields[i] = 'Обязательно для заполнения';
        hasErrors = true;
      } else {
        this.errorFields[i] = false;
      }
    });
  }
  return hasErrors;
}
