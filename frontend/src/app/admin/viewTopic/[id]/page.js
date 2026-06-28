"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const ViewTopic = () => {
    const { id } = useParams();
    const router = useRouter();

    const [topic, setTopic] = useState(null);

    const getTopic = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/topic/get/${id}`, { withCredentials: true });

            setTopic(res.data.topic);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const handleUpdate = () => {
        router.push(`/admin/updatetopic/${id}`);
    };
    
    const handleMCQs = () => {
        router.push(`/admin/mcqs/${id}`);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/topic/delete/${id}`,
                {
                    withCredentials: true,
                }
            );

            toast.success(res.data.message);
            router.push("/admin/topic");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete topic."
            );
        }
    };

    useEffect(() => {
        getTopic();
    }, []);

    const imageUrl = topic?.image?.url;
    const videoUrl = topic?.video?.url;
    return (
        <div className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-4 py-10">

                {!topic ? (
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-semibold">
                            Topic not found
                        </h2>
                    </div>
                ) : (
                    <div className="space-y-10">

                        {imageUrl && (
                            <div className="overflow-hidden rounded-xl border border-gray-200">
                                <img
                                    src={imageUrl}
                                    alt={topic.title}
                                    className="h-[430px] w-full object-cover"
                                />
                            </div>
                        )}

                        <section>
                            <h1 className="text-4xl font-bold">
                                {topic.title}
                            </h1>

                            {topic.subject?.title && (
                                <p className="mt-3 text-lg text-gray-600">
                                    Subject: {topic.subject.title}
                                </p>
                            )}
                        </section>

                        <section className="border-b border-gray-200 pb-8">
                            <h2 className="mb-5 text-2xl font-semibold">
                                Topic Description
                            </h2>

                            <p className="whitespace-pre-line text-[17px] leading-8 text-gray-800">
                                {topic.description}
                            </p>
                        </section>

                        {videoUrl && (
                            <section className="border-b border-gray-200 pb-8">
                                <h2 className="mb-5 text-2xl font-semibold">
                                    Video Lecture
                                </h2>

                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-black">
                                    <video controls className="w-full max-h-[520px]">
                                        <source
                                            src={videoUrl}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="mb-5 text-2xl font-semibold">
                                Notes
                            </h2>

                            {topic.notes ? (
                                <div className="space-y-4">
                                    {topic.notes
                                        .split("\n")
                                        .filter(note => note.trim() !== "")
                                        .map((note, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4 rounded-xl border border-gray-200 p-4"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                                                    {index + 1}
                                                </div>

                                                <p className="leading-8 text-gray-800">
                                                    {note}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-gray-200 p-5 text-gray-500">
                                    No notes available.
                                </div>
                            )}
                        </section>

                        <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">

                            <button
                                onClick={handleMCQs}
                                className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                            >
                                View MCQs
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                            >
                                Update Topic
                            </button>

                            <button
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                            >
                                Delete Topic
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ViewTopic;