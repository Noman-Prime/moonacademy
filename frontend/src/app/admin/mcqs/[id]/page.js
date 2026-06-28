"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"; // Recommended for icons

const MCQS = () => {
    const { id } = useParams();
    const [mcqs, setMcqs] = useState([]);
    const [expandedId, setExpandedId] = useState(null); // Track open item
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

    const getMCQS = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/v1/mcqs/topic/${id}`, { withCredentials: true });
            setMcqs(result.data.mcqs);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch MCQs");
        }
    };

    useEffect(() => {
        getMCQS();
    }, []);

    const handleDelete = async (mcqId) => {
        try {
            const result = await axios.delete("http://localhost:5000/api/v1/mcqs/delete", { withCredentials: true })
            if (result) {
                toast.success("Mcqs is deleted")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    };

    const handleUpdate = async (mcqId) => {
        try {
            const id = mcqId
            console.log(id);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-4">
                {mcqs.map((mcq, index) => (
                    <div key={mcq._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Header / Clickable Area */}
                        <div
                            className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() => setExpandedId(expandedId === mcq._id ? null : mcq._id)}
                        >
                            <h2 className="text-lg font-bold">
                                Q{index + 1}. {mcq.statement}
                            </h2>
                            <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleUpdate(mcq._id)} className="text-blue-600 hover:text-blue-800">
                                    <Edit size={20} />
                                </button>
                                <button onClick={() => handleDelete(mcq._id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={20} />
                                </button>
                                {expandedId === mcq._id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        {expandedId === mcq._id && (
                            <div className="px-6 pb-6 border-t pt-4 space-y-4">
                                <div className="space-y-2">
                                    {mcq.options.map((option) => (
                                        <div key={option.id} className="bg-gray-50 border rounded-lg p-3">
                                            <span className="font-semibold mr-2">{option.id}.</span>
                                            {option.text}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p><span className="font-bold">Correct Option:</span> {mcq.correctOption}</p>
                                    <p className="col-span-2"><span className="font-bold">Reason:</span> {mcq.reason}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MCQS;