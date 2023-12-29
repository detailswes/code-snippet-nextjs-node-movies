"use client";
import { useState, useEffect } from "react";
import UploadIcon from ".././assets/images/icons/upload.svg";
import InputBox from "../common/Inputbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAddMovieMutation } from "../services/movies";
import { useUpdateMovieMutation } from "../services/movies";
import Link from "next/link";
import { useGetMoviesQuery } from "../services/movies";
const FormSchema = Yup.object({
  title: Yup.string().required("Please enter the title"),
  publishingYear: Yup.number()
    .typeError("Publishing year must be a number")
    .required("Please enter the publishing year"),
  poster: Yup.mixed().required("Please upload a poster"),
});

const MoviesForm = ({ movie, editPage = false, id }) => {
  const { data: movieData } = movie || {};
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    title: "",
    publishingYear: "",
    poster: null,
  };
  const { refetch: refetchMovies } = useGetMoviesQuery();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("publishingYear", values.publishingYear);
      formData.append("poster", values.poster);
      console.log(values, "values");
      if (editPage) {
        try {
          setLoading(true);
          const data = {
            id: id,
            formData: formData,
          };
          const response = await updateMovie(data);
          console.log(response, "response");
          if (response?.data?.success === true) {
            toast.success("Movie Updated successfully!");
            onSuccess();
            router.push("/");
          }
        } catch (error) {
          console.log(error);
          if (error.data) {
            toast.error(error.data.message);
          } else {
            toast.error("An error occurred.");
          }
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const response = await addMovie(formData);
          window.console.log(response, "response");
          if (response?.data?.success === true) {
            toast.success("Movie added successfully!");
            onSuccess();
            router.push("/");
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
      }
    },
  });

  useEffect(() => {
    if (movieData) {
      setValues({
        title: movieData?.title,
        publishingYear: movieData?.publishingYear.toString(),
        poster: movieData?.poster,
      });
    }
  }, [movieData]);

  const handleFileUpload = (e) => {
    setFieldValue("poster", e.target.files[0]);
  };

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
              <div className="mb-2 px-4">
                {values.poster ? (
                  <img
                    src={
                      values.poster instanceof File
                        ? URL.createObjectURL(values.poster)
                        : values.poster
                    }
                    alt="Selected Image"
                    className="w-full h-auto mb-2"
                  />
                ) : (
                  "Drop an image here"
                )}
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="poster"
              onChange={handleFileUpload}
              onBlur={handleBlur}
            />
            <span>
              {errors.poster && touched.poster ? (
                <p className="form-error text-error">{errors.poster}</p>
              ) : null}
            </span>
          </label>
        </div>

        <div className="w-full mt-4 lg:mt-0 max-w-[362px]">
          <div className="mb-6">
            <InputBox
              className={`inputbox ${
                errors.title && touched.title ? "border border-error" : ""
              }`}
              type="text"
              name="title"
              placeholder="Placeholder"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <span>
              {errors.title && touched.title ? (
                <p className="form-error text-error">{errors.title}</p>
              ) : null}
            </span>
          </div>

          <div className="w-full mb-6">
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
              value={values.publishingYear}
            />
            <span>
              {errors.publishingYear && touched.publishingYear ? (
                <p className="form-error text-error">{errors.publishingYear}</p>
              ) : null}
            </span>
          </div>
          <div className="mt-16 flex justify-between items-center">
            <Link href={"/"} className="light-button mr-2">
              {" "}
              <button className="light-button mr-2">Cancel</button>
            </Link>
            <button type="submit" className="button ml-2">
              {loading ? "Loading..." : editPage ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MoviesForm;