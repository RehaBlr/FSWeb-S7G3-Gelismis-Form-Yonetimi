import { useState, useEffect } from "react";
import * as Yup from "yup";

const sema = Yup.object().shape({
  firstname: Yup.string()
    .required("İsim gerekli.")
    .min(5, "İsim en az 5 karakter olmalı."),
});

const Form2 = () => {
  const [formData, setFormData] = useState({
    firstname: "",
  });

  // State for the error messages
  const [errors, setErrors] = useState({
    firstname: "",
  });

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    sema.isValid(formData).then((valid) => {
      setFormValid(valid);
    });
  }, [formData]);

  function handleChange(e) {
    Yup.reach(sema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <form>
        <label>
          İsim
          <input
            type="text"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
        </label>
        <br />
        <span className="form-error">{errors.firstname}</span>

        <br />

        <button type="submit" disabled={!isFormValid}>
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Form2;
/*<label>
          Kullanım Şartları (Terms of Service) {/*(checkbox)}
          <input
            type="checkBox"
            value="TermsofService"
            name="terms"
            checked={formData.terms === true}
            onChange={handleChange2}
          />
        </label>
        <br />
        <span className="form-error">{errors.terms}</span>
        <br />*/
