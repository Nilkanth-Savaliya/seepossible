"use client";
import TextField from "@/componets/form-fields/text";
import useAuth from "@/hooks/useAuth";
import useValidation from "@/hooks/useValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { errors, validate, resetErrors } = useValidation();
  const { authenticate, authError } = useAuth();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      resetErrors();
      console.log("Form submitted successfully:", formData);
      let isValid = true;
      // Object.entries(formData).forEach(([field, value]) => {
      if (!validate("email", formData?.email)) isValid = false;
      // });

      if (isValid) {
        console.log("Form submitted successfully:", formData);
        // dispatch(login(formData))
        //   .unwrap()
        //   .then((res) => {
        //     console.log("res", res);
        //     router.push("/dashboard");
        //   });
        const success = authenticate(formData.email, formData.password);

        if (success) {
          Cookies.set("user-info", JSON.stringify(formData));
          router.push("/dashboard");
        } else {
          console.log("authError", authError);
          setFormData({ email: "", password: "" });
        }
      }
    },
    [resetErrors, formData, validate, authenticate, router, authError]
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="flex gap-9">
        <div className="w-2/5 flex items-center border-r-2 border-blue-500">
          <img src="/next.svg" alt="logo" className="w-1/2 mx-auto" />
        </div>
        <div className="w-3/5 p-4">
          <h1 className="text-2xl text-left font-semibold mb-4 text-primary-text">
            Login to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              placeholder="Email"
              label="Email"
              name="email"
              error={errors?.email}
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              error={errors?.password}
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="flex items-center justify-end gap-3">
              <Link
                className="text-secondary-button-text underline"
                href={`/signup`}
              >
                Sign Up
              </Link>
              <button className="my-2 primary-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
