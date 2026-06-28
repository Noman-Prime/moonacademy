"use client";

import Link from "next/link";

const Admin = () => {
    const pages = [
        { name: "Sliders", href: "/admin/slider" },
        { name: "Subjects", href: "/admin/subject" },
        { name: "Topics", href: "/admin/topic" },
        { name: "MCQs", href: "/admin/createMcqs" }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-10 text-center text-4xl font-bold">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {pages.map((page) => (
                        <Link
                            key={page.name}
                            href={page.href}
                            className="rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <h2 className="text-2xl font-semibold">
                                {page.name}
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Manage {page.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;