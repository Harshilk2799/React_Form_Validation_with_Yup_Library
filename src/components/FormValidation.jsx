import { useState } from "react";
import * as Yup from "yup";

function FormValidation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
    address: {
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    email: Yup.string()
      .email("Invalid email format!")
      .required("Email is required!"),
    phoneNumber: Yup.string().required(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match!")
      .required("Confirm Password is required!"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old.")
      .max(100, "You cannot be older than 100 years."),
    gender: Yup.string().required("Gender is required!"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest."),
    birthDate: Yup.date().required("Date of birth is required."),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    country: Yup.string().required("Country is required!"),
    pincode: Yup.string().required("Pincode is required!"),
  });

  // this function manage all text, radio buttons, select dropdown
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  // For nested address fields
  function handleAddress(e) {
    const { name, value } = e.target;
    console.log("Name: ", name, "Value: ", value);
    setFormData((prevState) => {
      return { ...prevState, address: { ...prevState.address, [name]: value } };
    });
  }

  // this function manage checkbox array
  function handleInterestsChange(e) {
    console.log(e.target);
    const { value, checked } = e.target;
    console.log("Value: ", value, "Checked: ", checked);
    setFormData((prevState) => {
      return {
        ...prevState,
        interests: checked
          ? [...prevState.interests, value]
          : prevState.interests.filter((interest) => interest !== value),
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <h2 className="text-center mb-4 fw-bold">
              Form Validation with Yup Library
            </h2>

            {/* Name Fields Row */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="firstName"
                    id="firstname"
                    value={formData.firstName}
                    placeholder="Enter your first name"
                    onChange={handleChange}
                  />
                  <label htmlFor="firstname">First Name</label>
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="lastName"
                    id="lastname"
                    value={formData.lastName}
                    placeholder="Enter your last name"
                    onChange={handleChange}
                  />
                  <label htmlFor="lastname">Last Name</label>
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-floating mb-3">
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <label htmlFor="email">Email Address</label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Phone and Age Row */}
            <div className="row">
              <div className="col-md-8">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="phoneNumber"
                    id="phonenumber"
                    value={formData.phoneNumber}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                  />
                  <label htmlFor="phonenumber">Phone Number</label>
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${errors.age ? "is-invalid" : ""}`}
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    placeholder="Enter your age"
                    onChange={handleChange}
                  />
                  <label htmlFor="age">Age</label>
                  {errors.age && (
                    <div className="invalid-feedback">{errors.age}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password</label>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    type="password"
                    name="confirmPassword"
                    id="confirmpassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Birth Date */}
            <div className="form-floating mb-3">
              <input
                className={`form-control ${
                  errors.birthDate ? "is-invalid" : ""
                }`}
                type="date"
                name="birthDate"
                id="birthdate"
                value={formData.birthDate}
                onChange={handleChange}
              />
              <label htmlFor="birthdate">Birth Date</label>
              {errors.birthDate && (
                <div className="invalid-feedback">{errors.birthDate}</div>
              )}
            </div>

            {/* Address Fields Row */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="city"
                    id="city"
                    value={formData.address.city}
                    placeholder="Enter your city"
                    onChange={handleAddress}
                  />
                  <label htmlFor="city">City</label>
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.state ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="state"
                    id="state"
                    value={formData.address.state}
                    placeholder="Enter your state"
                    onChange={handleAddress}
                  />
                  <label htmlFor="state">State</label>
                  {errors.state && (
                    <div className="invalid-feedback">{errors.state}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Country and Pincode Row */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.country ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="country"
                    id="country"
                    value={formData.address.country}
                    placeholder="Enter your country"
                    onChange={handleAddress}
                  />
                  <label htmlFor="country">Country</label>
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${
                      errors.pincode ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="pincode"
                    id="pincode"
                    value={formData.address.pincode}
                    placeholder="Enter your pincode"
                    onChange={handleAddress}
                  />
                  <label htmlFor="pincode">Pincode</label>
                  {errors.pincode && (
                    <div className="invalid-feedback">{errors.pincode}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <div className="d-flex gap-4 mt-2">
                {["Male", "Female", "Other"].map((option) => (
                  <div className="form-check" key={option}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value={option}
                      id={option.toLowerCase()}
                      checked={formData.gender === option}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={option.toLowerCase()}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {errors.gender && (
                <div className="text-danger small mt-1">{errors.gender}</div>
              )}
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Interests</label>
              <div className="d-flex gap-4 mt-2 flex-wrap">
                {["Cricket", "Music", "Coding"].map((interest) => (
                  <div className="form-check" key={interest}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="interests"
                      value={interest}
                      id={interest.toLowerCase()}
                      checked={formData.interests.includes(interest)}
                      onChange={handleInterestsChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={interest.toLowerCase()}
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>

              {errors.interests && (
                <div className="text-danger small mt-1">{errors.interests}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormValidation;
