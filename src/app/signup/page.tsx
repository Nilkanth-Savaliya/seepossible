"use client";
import Select from "@/componets/form-fields/select";
import TextField from "@/componets/form-fields/text";
import useValidation from "@/hooks/useValidation";
import { signup } from "@/redux/reducer/user-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
  });

  const { errors, validate, resetErrors } = useValidation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("errors", errors);
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      resetErrors();
      console.log("Form submitted successfully:", formData);
      let isValid = true;
      Object.entries(formData).forEach(([field, value]) => {
        if (!validate(field, value, formData.password)) isValid = false;
      });

      if (isValid) {
        console.log("Form submitted successfully:", formData);
        delete formData.confirmPassword;
        dispatch(signup(formData))
          .unwrap()
          .then((res) => {
            console.log("res", res);
            router.push("/dashboard");
          });
      }
    },
    [resetErrors, formData, validate, dispatch, router]
  );
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex gap-9">
        <div className="w-2/5 flex items-center border-r-2 border-blue-500">
          <img src="/next.svg" alt="logo" className="w-1/2 mx-auto" />
        </div>
        <div className="w-3/5 p-4">
          <h1 className="text-2xl text-left font-semibold mb-4 text-primary-text">
            Create an account
          </h1>
          <form onSubmit={handleSubmit}>
            <TextField
              type={"text"}
              placeholder={"Email"}
              label={"Email"}
              name={"email"}
              value={formData.email}
              error={errors?.email}
              onChange={handleInputChange}
            />

            <TextField
              type={"text"}
              placeholder={"Mobile Number"}
              label={"Mobile Number"}
              name={"mobile"}
              error={errors?.mobile}
              onChange={handleInputChange}
              value={formData.mobile}
            />
            <TextField
              type={"text"}
              placeholder={"Full Name"}
              label={"Full Name"}
              name={"name"}
              error={errors?.name}
              onChange={handleInputChange}
              value={formData.name}
            />

            <Select
              placeholder={"Select Gender"}
              name={"gender"}
              value={formData.gender}
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ]}
              label={"Select gender"}
              error={errors.gender}
              onChange={handleInputChange}
            />

            <TextField
              type={"password"}
              placeholder={"Password"}
              label={"Password"}
              name={"password"}
              error={errors?.password}
              onChange={handleInputChange}
              value={formData.password}
            />

            <TextField
              type={"password"}
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              name={"confirmPassword"}
              error={errors?.confirmPassword}
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
            <div className="flex items-center justify-end gap-3">
              <Link
                className="text-secondary-button-text underline"
                href={`/login`}
              >
                Login
              </Link>
              <button className="my-2 primary-button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
