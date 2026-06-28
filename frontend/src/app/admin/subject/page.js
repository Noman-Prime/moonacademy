"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const SubjectPage = () => {
    const router = useRouter();

    const [subjects, setSubjects] = useState([]);

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/v1/subject/all",
                { withCredentials: true }
            );

            console.log(res.data);

            setSubjects(
                res.data.subjects ||
                res.data.subject ||
                res.data.data ||
                []
            );
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch subjects");
        }
    };

    const viewSubject = (id) => {
        router.push(`/admin/viewSubject/${id}`);
    };

    const deleteSubject = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/subject/delete/${id}`,
                { withCredentials: true }
            );

            toast.success(res.data.message || "Subject deleted");

            fetchSubjects();
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to delete subject"
            );
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="p-6">

            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Subject Management
                </h1>

                <button
                    onClick={() => router.push("/admin/createSubject")}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Create Subject
                </button>
            </div>

            {subjects.length === 0 ? (
                <h2 className="text-center text-xl font-semibold">
                    No Subjects Found
                </h2>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {subjects.map((subject) => (
                        <div
                            key={subject._id}
                            className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-xl"
                        >

                            <img
                                src={
                                    subject.image?.url ||
                                    subject.thumbnail?.url ||
                                    subject.icon?.url ||
                                    "/no-image.png"
                                }
                                alt={subject.title || subject.name}
                                className="h-56 w-full object-cover"
                            />

                            <div className="space-y-3 p-4">

                                <h2 className="text-xl font-bold">
                                    {subject.title || subject.name}
                                </h2>

                                <p className="line-clamp-3 text-gray-600">
                                    {subject.description}
                                </p>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => viewSubject(subject._id)}
                                        className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => deleteSubject(subject._id)}
                                        className="flex-1 rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default SubjectPage;