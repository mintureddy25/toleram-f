import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../../Components/Text";
import { useLoginMutation } from "../../app/Services/authApi";
import { setErrors } from "../../Utils/ErrorSlice";
import { setCredentials } from "../../Utils/AuthSlice";
import { useDispatch } from "react-redux";
import FullText from "../../Components/FullText";
import { toast } from "react-toastify";

export default function Login({ setUserToken }) {
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = async (e) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
    } catch (error) {
      if (error.status == 401 || error.status == 422) {
        setError("password", { type: "custom", message: error?.data?.message });
      }
      if (error.status == 404) {
        setError("email", { type: "custom", message: error?.data?.message });
      }
      toast.error(error.data.message);
    }
  };

  const onChange = (e) => {
    clearErrors(e.target.name);
    setValue(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="m-5 md:mx-auto lg:w-1/2 min-h-full flex-col justify-center px-6 py-6 lg:px-8 bg-green-[#213528] rounded-xl shadow-lg border border-green-100">
      <div className="sm:mx-auto">
        <h2 className="mt-6 font-bold text-center text-3xl text-white">
          Log in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white text-left"
            >
              Username
            </label>
            <div className="mt-2">
              <FullText
                register={register}
                name="email"
                type="text"
                value={data?.email}
                onChange={onChange}
                withCheck={true}
                options={{
                  required: "Please enter username",
                }}
                errors={errors}
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <FullText
                register={register}
                name="password"
                type="password"
                value={data?.password}
                onChange={onChange}
                withCheck={true}
                options={{
                  required: "Please enter password",
                }}
                errors={errors}
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
