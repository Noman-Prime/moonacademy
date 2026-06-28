"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

const SliderPage = () => {
    const router = useRouter();
    const [sliders, setSliders] = useState([]);

    const fetchSliders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/slider/get/all", { withCredentials: true });
            setSliders(res.data.slider);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error("Failed to fetch sliders");
        }
    };

    const viewSlider = (id) => {
        router.push(`/admin/viewSlider/${id}`);
    };

    const deleteSlider = async (id) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/api/v1/slider/delete/${id}`,
                { withCredentials: true }
            );

            if (result.data) {
                toast.success("Slider deleted");
                fetchSliders();
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error("Slider not deleted");
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    return (
        <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Slider Management</h1>

                <Link href="/admin/createSlider" className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                    Create Slider
                </Link>
            </div>

            {sliders.length === 0 ? (
                <h2 className="text-center text-xl">No Sliders Found</h2>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {sliders.map((slider) => (
                        <div
                            key={slider._id}
                            className="overflow-hidden rounded-xl bg-white shadow-lg"
                        >
                            <img
                                src={slider.image?.url}
                                alt={slider.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="space-y-3 p-4">
                                <h2 className="text-xl font-bold">{slider.title}</h2>

                                <p className="text-gray-600">
                                    {slider.description}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => viewSlider(slider._id)}
                                        className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => deleteSlider(slider._id)}
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

export default SliderPage;
