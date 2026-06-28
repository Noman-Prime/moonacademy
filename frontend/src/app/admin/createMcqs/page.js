"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateMcqs = () => {
    const [savedSubjects, setSavedSubjects] = useState([]);
    const [savedTopics, setSavedTopics] = useState([]);

    const [formData, setFormData] = useState({
        subject: "",
        topic: "",
        statement: "",
        options: [
            { id: "A", text: "" },
            { id: "B", text: "" },
            { id: "C", text: "" },
            { id: "D", text: "" },
        ],
        correctOption: "",
        reason: "",
    });

    const handleInput = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOptionChange = (index, value) => {
        const options = [...formData.options];
        options[index].text = value;

        setFormData((prev) => ({
            ...prev,
            options,
        }));
    };

    const getSubjects = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/v1/subject/all",
                { withCredentials: true }
            );

            setSavedSubjects(result.data.subject);
        } catch (error) {
            console.log(error);
        }
    };

    const getTopics = async (subjectId) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/topic/subject/${subjectId}`,
                { withCredentials: true }
            );

            setSavedTopics(result.data.topic);
        } catch (error) {
            console.log(error);
            setSavedTopics([]);
        }
    };
    const submitData = async () => {
        try {
            const result = await axios.post(
                "http://localhost:5000/api/v1/mcqs/create",
                formData,
                { withCredentials: true }
            );

            toast.success("Mcqs is Created");
            setFormData((prev) => ({
                ...prev,
                statement: "",
                options: [
                    { id: "A", text: "" },
                    { id: "B", text: "" },
                    { id: "C", text: "" },
                    { id: "D", text: "" },
                ],
                correctOption: "",
                reason: "",
            }));
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Create MCQ
                </h1>

                <div className="space-y-6">

                    <div>
                        <label className="font-medium block mb-2">
                            Select Subject
                        </label>

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => {
                                handleInput(e);

                                if (e.target.value) {
                                    getTopics(e.target.value);
                                } else {
                                    setSavedTopics([]);
                                }

                                setFormData((prev) => ({
                                    ...prev,
                                    subject: e.target.value,
                                    topic: "",
                                }));
                            }}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Subject</option>

                            {savedSubjects.map((sub) => (
                                <option key={sub._id} value={sub._id}>
                                    {sub.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Select Topic
                        </label>

                        <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Topic</option>

                            {savedTopics.map((topic) => (
                                <option key={topic._id} value={topic._id}>
                                    {topic.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Statement
                        </label>

                        <textarea
                            name="statement"
                            rows="4"
                            value={formData.statement}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter Question"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Option A
                        </label>

                        <input
                            type="text"
                            value={formData.options[0].text}
                            onChange={(e) =>
                                handleOptionChange(0, e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="Option A"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Option B
                        </label>

                        <input
                            type="text"
                            value={formData.options[1].text}
                            onChange={(e) =>
                                handleOptionChange(1, e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="Option B"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Option C
                        </label>

                        <input
                            type="text"
                            value={formData.options[2].text}
                            onChange={(e) =>
                                handleOptionChange(2, e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="Option C"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Option D
                        </label>

                        <input
                            type="text"
                            value={formData.options[3].text}
                            onChange={(e) =>
                                handleOptionChange(3, e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="Option D"
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Correct Option
                        </label>

                        <select
                            name="correctOption"
                            value={formData.correctOption}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Correct Option</option>
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-2">
                            Reason
                        </label>

                        <textarea
                            name="reason"
                            rows="4"
                            value={formData.reason}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter Reason"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={submitData}
                        className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
                    >
                        Create MCQ
                    </button>

                </div>

            </div>
        </div>
    );
};

export default CreateMcqs;