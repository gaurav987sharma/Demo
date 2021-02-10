const isFormValid = (form) => {
    let formIsValid = true;
    for (let inputIdentifier in form) {
      formIsValid = form[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
  };
  export default isFormValid;
  