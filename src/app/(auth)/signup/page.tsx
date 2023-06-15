"use client"
import React, { useState } from "react";
import "./SignUp.css";

const generateYearOptions = () => {
  const arr = [];

  const startYear = 1900;
  const endYear = new Date().getFullYear();

  for (let i = endYear; i >= startYear; i--) {
    arr.push(<option value={i}>{i}</option>);
  }

  return arr;
};

const generateMonthOptions = () => {
  const arr = [];
  const startMonth = 1;
  const endMonth = 12;
  for (let i = endMonth; i >= startMonth; i--) {
    arr.push(<option value={i}>{i}</option>);
  }
  return arr;
};

const generateDayOptions = () => {
  const arr = [];
  const startDay = 1;
  const endDay = 31;
  for (let i = endDay; i >= startDay; i--) {
    arr.push(<option value={i}>{i}</option>);
  }
  return arr;
};

const initFormValue = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
  return /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(email);
};



export default function SignUpPage() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const ValidateForm = () => {
    const error = {};
    if (isEmptyValue(formValue.firstName)) {
      error["firstName"] = "First Name is required";
    }
    if (isEmptyValue(formValue.lastName)) {
      error["lastName"] = "Last Name is required";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is required";
    } else {
      if (!isEmailValid(formValue.email)) {
        error["email"] = "Email is invalid";
      }
    }
    if (isEmptyValue(formValue.username)) {
      error["username"] = "Username is required";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is required";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (event: React.SyntheticEvent) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (ValidateForm()) {
      console.log("form value", formValue);
    } else {
      console.log("form invalid");
    }
  };

  return (
    <div className="signup-page">
      <div className="introduce">
        <h1 className="namepage">SocialSphere</h1>
        <p>
          Welcome to SocialSphere - the place to conect with new friends and
          build your own.
        </p>
      </div>

      <div className="signup-form-container">
        <h1 className="titile">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="your-name" className="form-label">
              Your name
            </label>
            <div className="input-container">
              <input
                id="frist-name"
                className="form-control bg-gray-100 border-solid border-2"
                type="text"
                name="firstName"
                placeholder="First name"
                value={formValue.firstName}
                onChange={handleChange}
              />
              {formError.firstName && (
                <div className="error-feedback">{formError.firstName}</div>
              )}
              <input
                id="last-name"
                className="form-control bg-gray-100 border-solid border-2 ml-2"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formValue.lastName}
                onChange={handleChange}
              />
              {formError.lastName && (
                <div className="error-feedback">{formError.lastName}</div>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              className="form-control bg-gray-100 border-solid border-2"
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={formValue.email}
              onChange={handleChange}
            />
            {formError.email && (
              <div className="error-feedback">{formError.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              className="form-control bg-gray-100 border-solid border-2"
              type="text"
              name="username"
              placeholder="username123"
              value={formValue.username}
              onChange={handleChange}
            />
            {formError.username && (
              <div className="error-feedback">{formError.username}</div>
            )}
          </div>

          <div className="input-container">
            <div className="mb-4">
              <label htmlFor="gender" className="text-gray-600 font-medium">
                Gender
              </label>
              <select className="select-form">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="day" className="text-gray-600 font-medium">
                  Day
                </label>
                <select className="select-form" name="day">
                  <option value="0">Day</option>
                  {generateDayOptions()}
                </select>
              </div>
              <div>
                <label htmlFor="month" className="text-gray-600 font-medium">
                  Month
                </label>
                <select className="select-form" name="month">
                  <option value="0">Month</option>
                  {generateMonthOptions()}
                </select>
              </div>
              <div>
                <label htmlFor="year" className="text-gray-600 font-medium">
                  Year
                </label>
                <select className="select-form" name="year">
                  <option value="0">Year</option>
                  {generateYearOptions()}
                </select>
              </div>
            </div>
          </div>



          <div className="mb-2 relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control pas bg-gray-100 border-solid border-2 px-3 py-2 rounded-md"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}/>
            {formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
            <div className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="eye eye-open w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="eye eye-close w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>


          <div className="mb-2">
            <input type="checkbox" className="mr-2" />
            Agree with Term & Conditons
          </div>
          <div className="button-container button-margintop">
            <button type="signup" className="signup-btn">
              Sign Up
            </button>
          </div>

          <div className="button-container">
            Already have account?
            <a className="linkdignin" href="https://www.facebook.com/">
              {" "}
              Sign in to account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
