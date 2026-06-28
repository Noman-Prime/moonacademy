"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const ViewSlider = () => {
    const { id } = useParams();
    const router = useRouter();

    const [slider, setSlider] = useState(null);

    const getSlider = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/slider/get/${id}`,
                { withCredentials: true }
            );

            setSlider(res.data.slider);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const handleUpdate = () => {
        console.log("Update Clicked");

        // Next Step:
        // router.push(`/admin/updateSlider/${id}`);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/slider/delete/${id}`,
                { withCredentials: true }
            );

            toast.success(res.data.message);

            router.push("/admin/slider");
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        if (id) {
            getSlider();
        }
    }, [id]);

    if (!slider) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-4xl font-bold">
                View Slider
            </h1>

            <div className="overflow-hidden rounded-xl bg-white shadow-lg">

                <img
                    src={slider.image?.url}
                    alt="Slider"
                    className="h-96 w-full object-cover"
                />

                <div className="p-6">

                    <h2 className="mb-2 text-2xl font-bold">
                        Description
                    </h2>

                    <p className="text-gray-700">
                        {slider.description}
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

export default ViewSlider;