"use client";
import { useState } from "react";
import UploadIcon from "../../assets/images/icons/upload.svg";
import InputBox from "../../common/Inputbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAddMovieMutation } from "../../services/movies";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../helpers/utils";

const FormSchema = Yup.object({
  title: Yup.string().required("Please Enter the Title"),
  publishingYear: Yup.number()
    .typeError("Publishing Year must be of type number")
    .required("Please Enter the Publishing Year"),
  poster: Yup.mixed().required("Please Upload a Poster"),
});

const MoviesForm = ({ movie = {} }) => {
  const [addMovie] = useAddMovieMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    title: "",
    publishingYear: "",
    poster: null,
  };
  if (movie) {
  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("publishingYear", values.publishingYear);
        formData.append("poster", values.poster);

        const response = await addMovie(formData);

        window.console.log(response, "response");
        if (response?.data?.success === true) {
          toast.success("Movie added successfully!");
        }
      } catch (error) {
        window.console.log(error);
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("An error occurred.");
        }
      } finally {
        action.resetForm();
        setLoading(false);
      }
    },
  });
  console.log(values);
  const handleCancel = () => {
    router.push("/");
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files[0], "e.target.files");
    setFieldValue("poster", e.target.files[0]);
  };

  console.log(values, "values");

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="w-full lg:flex items-start">
        <div className="flex items-center justify-center w-full max-w-[473px] lg:mr-[127px]">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full min-h-[504px] border-2 border-white border-dashed rounded-xl cursor-pointer bg-input"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="mb-2" />
              <p className="mb-2">
                {values.poster
                  ? values.poster.name || values.poster.split("\\").pop() // Extract file name
                  : "Drop an image here"}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="poster"
              onChange={handleFileUpload}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {/* <span>
          {errors.poster && touched.poster ? (
            <p className="form-error text-error">{errors.title}</p>
          ) : null}
        </span> */}
        <div className="w-full mt-4 lg:mt-0 max-w-[362px]">
          <div>
            <InputBox
              className={`inputbox ${
                errors.title && touched.title ? "border border-error" : ""
              }`}
              type="text"
              name="title"
              placeholder="Placeholder"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              {errors.title && touched.title ? (
                <p className="form-error text-error">{errors.title}</p>
              ) : null}
            </span>
          </div>

          <div className="w-full">
            <InputBox
              className={`inputbox ${
                errors.publishingYear && touched.publishingYear
                  ? "border border-error"
                  : ""
              }`}
              type="text"
              name="publishingYear"
              placeholder="Publishing year"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              {errors.publishingYear && touched.publishingYear ? (
                <p className="form-error text-error">{errors.publishingYear}</p>
              ) : null}
            </span>
          </div>
          <div className="hidden md:block">
            {/* Render your other components for larger screens */}
          </div>
          <div className="mt-16 flex justify-between items-center">
            <button onClick={handleCancel} className="light-button mr-2">
              Cancel
            </button>
            <button type="submit" className="button ml-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MoviesForm;
