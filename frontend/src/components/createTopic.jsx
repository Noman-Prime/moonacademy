"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateTopic = () => {
    const [subjects, setSubjects] = useState([]);

    const [data, setData] = useState({
        subject: "",
        title: "",
        description: "",
        notes: "",
        image: null,
        video: null,
    });

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/subject/all",
                    {
                        withCredentials: true,
                    }
                );

                // CHANGE THIS IF YOUR RESPONSE PROPERTY IS DIFFERENT
                setSubjects(response.data.subjects || response.data.subject || []);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch subjects");
            }
        };

        fetchSubjects();
    }, []);

    const changeData = (e) => {
        const { name, value, files, type } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const createTopic = async () => {
        try {
            const formData = new FormData();

            formData.append("subject", data.subject);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("notes", data.notes);

            if (data.image) {
                formData.append("image", data.image);
            }

            if (data.video) {
                formData.append("video", data.video);
            }

            const response = await axios.post(
                "http://localhost:5000/api/v1/topic/create",
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message || "Topic created successfully");

                setData({
                    subject: "",
                    title: "",
                    description: "",
                    notes: "",
                    image: null,
                    video: null,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">

                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Create Topic
                </h1>

                <p className="text-gray-500 mb-8">
                    Select a subject and add topic details.
                </p>

                <div className="space-y-6">

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Subject
                        </label>

                        <select
                            name="subject"
                            value={data.subject}
                            onChange={changeData}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-700"
                        >
                            <option value="">Select Subject</option>

                            {subjects.map((subject) => (
                                <option
                                    key={subject._id}
                                    value={subject._id}
                                >
                                    {subject.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={changeData}
                            placeholder="Enter topic title..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={data.description}
                            onChange={changeData}
                            rows={5}
                            placeholder="Enter topic description..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            value={data.notes}
                            onChange={changeData}
                            rows={5}
                            placeholder="Enter notes (optional)..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Topic Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={changeData}
                            className="w-full border border-gray-300 rounded-lg file:mr-4 file:px-5 file:py-3 file:border-0 file:bg-blue-700 file:text-white hover:file:bg-blue-800 file:cursor-pointer cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Topic Video
                        </label>

                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={changeData}
                            className="w-full border border-gray-300 rounded-lg file:mr-4 file:px-5 file:py-3 file:border-0 file:bg-blue-700 file:text-white hover:file:bg-blue-800 file:cursor-pointer cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={createTopic}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 cursor-pointer"
                        >
                            Create Topic
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateTopic;