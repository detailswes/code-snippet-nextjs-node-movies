"use client";
import { useState } from "react";
import InputBox from "../../common/Inputbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setToken } from "../../helpers/utils";
import { toast } from "react-toastify";
const initialValues = {
  email: "",
  password: "",
};

const FormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email Format")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:3000/api/users",
            values
          );
          toast.success("Login successfully");
          const token = response.data.token;
          setToken(token);
          // router.refresh();
          router.push("/");
        } catch (error) {
          if (error.response.data.success === false) {
            toast.error("User Not Found");
          } else {
            toast.error("An error occurred.");
          }
        }
        setLoading(false);
      },
    });

  return (
    <>
      <div className="h-screen flex justify-center items-center mx-3.5">
        <div className="max-w-[300px]">
          <h1 className="mb-10 text-center">Sign in</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div>
              <InputBox
                className={`inputbox ${
                  errors.email && touched.email ? "border border-error" : ""
                }`}
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                {errors.email && touched.email ? (
                  <p className="form-error text-error">{errors.email}</p>
                ) : null}
              </span>
            </div>

            <div>
              <InputBox
                className={`inputbox ${
                  errors.password && touched.password
                    ? "border border-error"
                    : ""
                }`}
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                {errors.password && touched.password ? (
                  <p className="form-error text-error">{errors.password}</p>
                ) : null}
              </span>
            </div>

            <div className="flex items-center justify-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                value=""
                className="w-[18px] h-[18px] mr-2 text-input bg-input accent-primary rounded-lg focus:ring-primary outline-none focus:ring-1"
              />
              <label
                htmlFor="remember-me"
                className="text-sm font-normal text-white"
              >
                Remember me
              </label>
            </div>
            <input className="button" type="submit" value="Login" />
          </form>
        </div>
      </div>
      <style jsx>{`
        .error-border {
          border-color: red;
        }
      `}</style>
    </>
  );
};

export default SignIn;
