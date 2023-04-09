import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateFormData{
  title:string;
  description:string;
}

const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must provide title."),
    description: yup.string().required("You must provide description."),
  });

  const { register, handleSubmit, formState:{errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = (data: CreateFormData) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#fbfbfb]">
      <div className="grid w-80 grid-rows-4 gap-1">
        <form onSubmit={handleSubmit(onCreatePost)}>
          <p className="font-semibold text-gray-700">💌 Make a post</p>
          <input
            type="text"
            className="h-10 w-full rounded border p-2 text-sm"
            placeholder="Your title"
            {...register("title")}
          />
          <p className="text-red-600">{errors.title?.message}</p>
          <textarea
            className="h-10 w-full rounded border p-2 text-sm"
            placeholder="Your description"
            {...register("description")}
          />
          <p className="text-red-600">{errors.description?.message}</p>
          <input
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
