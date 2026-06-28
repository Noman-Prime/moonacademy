"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateSubject = () => {
    const [data, setData] = useState({
        image: null,
        title: "",
        description: "",
    });

    const changeData = (e) => {
        const { name, value, files, type } = e.target;

        setData((pre) => ({
            ...pre,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const createSubject = async () => {
        try {
            const formData = new FormData();

            formData.append("image", data.image);
            formData.append("title", data.title);
            formData.append("description", data.description);

            const response = await axios.post(
                "http://localhost:5000/api/v1/subject/create",
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);

                setData({
                    image: null,
                    title: "",
                    description: "",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">

                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Create Subject
                </h1>

                <p className="text-gray-500 mb-8">
                    Upload a subject image and enter its details.
                </p>

                <div className="space-y-6">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Subject Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={changeData}
                            className="w-full border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-5 file:border-0 file:bg-blue-700 file:text-white hover:file:bg-blue-800 file:cursor-pointer cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={changeData}
                            placeholder="Enter subject title..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-700"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={data.description}
                            onChange={changeData}
                            rows={5}
                            placeholder="Enter subject description..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-700 resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={createSubject}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 cursor-pointer"
                        >
                            Create Subject
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateSubject;