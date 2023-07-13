// Karakter bileşeniniz buraya gelecek
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const sema = Yup.object().shape({
  firstname: Yup.string()
    .required("FirstName is Required")
    .min(3, "Name must be at least 3 characters long."),
  lastname: Yup.string()
    .required("FirstName is Required")
    .min(3, "Name must be at least 3 characters long."),
  email: Yup.string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Passwords must be at least 6 characters long."),
  terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
  // required isn't required for checkboxes.
});

// Yup'u kullanarak, en az 2 adet doğrulama ve hata doğrulamada varsa ekranda gösterilecek hata mesajı ekleyin.
const Form = () => {
  const [formData, setFormData] = useState({
    firstname: "denemead",
    lastname: "denemesoyad",
    email: "deneme@deneme.com",
    password: "denemepass",
    terms: true,
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    terms: false,
  });
  const [isFormValid, setFormValid] = useState(false);

  const [kullanicilar, setKullanicilar] = useState([]);

  useEffect(() => {
    sema.isValid(formData).then((valid) => {
      setFormValid(valid);
    });
  }, [formData]);

  function handleChange(e) {
    let value = e.target.value;
    console.log(e);
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    Yup.reach(sema, e.target.name)
      .validate(value)
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

    setFormData({ ...formData, [e.target.name]: value });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit triggered", formData);
    if (!isFormValid) {
      console.log("formda hatalar var");
    } else {
      axios
        .post("https://reqres.in/api/users", formData)
        .then(function (response) {
          console.log(response);
          setKullanicilar([...kullanicilar, response.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          Ad :
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <br />
        <span className="form-error">{errors.firstname}</span>
        <br />
        <label>
          Soyad :
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <br />
        <span className="form-error">{errors.lastname}</span>
        <br />
        <label>
          Email :
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <span className="form-error">{errors.email}</span>
        <br />
        <label>
          Şifre :
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <span className="form-error">{errors.password}</span>
        <br />
        <label>
          Kullanım Şartları (Terms of Service) {/*(checkbox)*/}
          <input
            type="checkBox"
            value="TermsofService"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
        </label>
        <br />
        <span className="form-error">{errors.terms}</span>
        <br />

        <button type="submit" disabled={!isFormValid} name="button">
          Gönder butonu (formu göndermek için).
        </button>
      </form>
      <ul>
        {kullanicilar.map((kulanici) => {
          return <li key={kulanici.id}>{kulanici.firstname}</li>;
        })}
      </ul>
    </>
  );
};

export default Form;
