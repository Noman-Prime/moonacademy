"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

const TopicPage = () => {
    const router = useRouter();
    const [topics, setTopics] = useState([]);

    const fetchTopics = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/topic/all", { withCredentials: true });
            setTopics(res.data.topics);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const viewTopic = (id) => {
        router.push(`/admin/viewTopic/${id}`);
    };

    const deleteTopic = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/v1/topic/delete${id}`, { withCredentials: true });
            if (result.data) {
                toast.success("topic deleted");
                fetchTopics();
            }
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">topic Management</h1>

                <Link href="/admin/createtopic" className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                    Create Topic
                </Link>
            </div>

            {topics.length === 0 ? (
                <h2 className="text-center text-xl">No topics Found</h2>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {topics.map((topic) => (
                        <div
                            key={topic._id}
                            className="overflow-hidden rounded-xl bg-white shadow-lg"
                        >
                            <img
                                src={topic.image?.url}
                                alt={topic.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="space-y-3 p-4">
                                <h2 className="text-xl font-bold">{topic.title}</h2>

                                <p className="text-gray-600">
                                    {topic.description}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => viewTopic(topic._id)}
                                        className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => deletetopic(topic._id)}
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

export default TopicPage;
