import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import { Pencil } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Coursedragdrop from "./Coursedragdrop";

const courseData = [
    { id: "c1", name: "React Basics", modules: ["Introduction", "Components", "Props & State", "Hooks"] },
    { id: "c2", name: "Advanced TypeScript", modules: ["Types & Interfaces", "Generics", "Decorators", "Utility Types"] },
    { id: "c3", name: "TailwindCSS Mastery", modules: ["Utility Classes", "Grid & Flexbox", "Customization", "Dark Mode"] },
    { id: "c4", name: "Node.js Fundamentals", modules: ["Event Loop", "Express.js", "Middleware", "Database Integration"] },
    { id: "c5", name: "Angular Advanced", modules: ["Directives", "Services", "RxJS", "State Management"] },
];

interface Program {
    id: string;
    name: string;
    description: string;
    skillsGain: string;
    duration: string;
    courses: string;
    date: string;
    org: string;
    state: string;
    image?: string;
}

const ProgramName = () => {
    const { id } = useParams();
    const [program, setProgram] = useState<Program | null>(null);
    const [openCourse, setOpenCourse] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
    const paginatedPrograms = [program];
    const handleEditClick = (programId: string) => {
        navigate(`/editprogram/${programId}`);
    };
    const toggleCourse = (courseId: string) => {
        setOpenCourse(openCourse === courseId ? null : courseId);
    };

    useEffect(() => {
        const programs = JSON.parse(localStorage.getItem("programs") || "[]");
        const selectedProgram = programs.find((p: Program) => p.id === id);

        if (selectedProgram) {
            setProgram(selectedProgram);
        }
    }, [id]);

    if (!program) {
        return <div className="p-4 text-center">Program not found</div>;
    }

    return (
        <div className="w-full">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between rounded-lg pb-4">
                    <span>Student enrolled 256</span>
                    {paginatedPrograms.map((p) => (
                        <Button key={p.id} className="bg-[#141d71] text-white" onClick={() => handleEditClick(p.id)}>
                            <Pencil className="mr-2" />
                            Edit program Details
                        </Button>
                    )
                    )}

                </div>

                <h2 className="text-2xl font-bold mb-4">{program.name}</h2>
                <p><strong>Program ID:</strong> {program.id}</p>
                <p><strong>Duration:</strong> {program.duration}</p>

                <Separator className="my-4" />

                {program.image && (
                    <img
                        src={program.image}
                        alt="Program"
                        className="w-max h-48 object-cover rounded-lg mb-4"
                    />
                )}

                <p><strong>Date Created:</strong> {program.date}</p>
                <p><strong>Organization:</strong> {program.org}</p>
                <p><strong>Status:</strong> {program.state}</p>

                {program.description && (
                    <p className="pb-4">{program.description}</p>
                )}

                <p><strong>Skills gain:</strong> {program.skillsGain}</p>

                <Separator className="my-4" />

                {/* Course List Section */}
                <div className="mx-auto p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Course List</h2>
                    <div className="space-y-3">
                        {courseData.map((course, index) => (
                            <div
                                key={course.id}
                                className="p-4 border rounded-lg shadow-md cursor-pointer bg-gray-50"
                                onClick={() => toggleCourse(course.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">
                                        {index + 1}. {course.name}
                                    </span>
                                    {openCourse === course.id ?
                                        <ChevronUp size={20} /> :
                                        <ChevronDown size={20} />
                                    }
                                </div>
                                {openCourse === course.id && (
                                    <ul className="mt-2 pl-4 text-gray-600 list-disc">
                                        {course.modules.map((module, idx) => (
                                            <li key={idx}>{module}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Button className="mt-4 bg-[#141d71] text-white" onClick={() => setIsPopupOpen(true)}>
                    + Course
                </Button>

                {/* Course Selection Dialog */}
                <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                    <DialogContent className="fixed flex flex-col w-full h-max bg-white p-6">
                        <DialogTitle>Course Selection</DialogTitle>
                        <div className="flex-grow overflow-auto">
                            <Coursedragdrop />
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setIsPopupOpen(false)} className="bg-[#1d1f71] hover:bg-[bg-[#1d1f]">
                                Done
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ProgramName;
