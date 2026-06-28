"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const ViewSubject = () => {
    const { id } = useParams();
    const router = useRouter();

    const [subject, setSubject] = useState(null);

    const getSubject = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/subject/get/${id}`, { withCredentials: true });
            console.log(res.data.subject);
            setSubject(res.data.subject);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const handleUpdate = () => {
        console.log("Update Clicked");

        // Next Step:
        // router.push(`/admin/updateSubject/${id}`);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/subject/delete/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            router.push("/admin/subject");
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        if (id) {
            getSubject();
        }
    }, [id]);

    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-4xl font-bold">
                View Subject
            </h1>


            <div className="overflow-hidden rounded-xl bg-white shadow-lg">

                <img
                    src={subject?.image?.url}
                    alt="subject"
                    className="h-96 w-full object-cover"
                />

                <div className="p-6">

                <h2 className="mb-2 text-2xl font-bold">
                        Title
                    </h2>

                    <p className="text-gray-700">
                        {subject?.title}
                    </p>

                    <h2 className="mb-2 text-2xl font-bold">
                        Description
                    </h2>

                    <p className="text-gray-700">
                        {subject?.description}
                    </p>

                    <div className="mt-8 flex gap-4">

                        <button
                            onClick={handleUpdate}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        >
                            Update
                        </button>

                        <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ViewSubject;