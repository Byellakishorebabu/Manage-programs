// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { 
//     Select, 
//     SelectTrigger, 
//     SelectValue, 
//     SelectContent, 
//     SelectItem 
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import CourseSelection from "./CourseSelection";
// import img1 from "@/assets/c1.png";
// import img2 from "@/assets/c2.png";
// import img3 from "@/assets/c3.png";

// const images = [img1, img2, img3];

// const courseData = [
//     { id: "c1", name: "React Basics", modules: ["Introduction", "Components", "Props & State", "Hooks"] },
//     { id: "c2", name: "Advanced TypeScript", modules: ["Types & Interfaces", "Generics", "Decorators", "Utility Types"] },
//     { id: "c3", name: "TailwindCSS Mastery", modules: ["Utility Classes", "Grid & Flexbox", "Customization", "Dark Mode"] },
// ];

// const ProgramDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [program, setProgram] = useState(null);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);

//     const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
// const [selectedModules, setSelectedModules] = useState<string[]>([]);

// const handleCourseChange = (value: string) => {
//     setSelectedCourse(value);
//     const selected = courseData.find((course) => course.id === value);
//     setSelectedModules(selected ? selected.modules : []);
// };

//     useEffect(() => {
//         const programs = JSON.parse(localStorage.getItem("programs") || "[]");
//         const selectedProgram = programs.find(p => p.id.toString() === id);
//         setProgram(selectedProgram);
//     }, [id]);
//     useEffect(() => {
//         const programs = JSON.parse(localStorage.getItem("programs") || "[]");
//         const selectedProgram = programs.find((p: any) => p.id.toString() === id);

//         if (selectedProgram) {
//             selectedProgram.image = images[Math.floor(Math.random() * images.length)];
//             selectedProgram.description =
//                 "This program provides an in-depth understanding of the core concepts. It covers essential topics, practical implementations, and best practices to enhance learning.";
//         }

//         setProgram(selectedProgram);
//     }, [id]);

//     if (!program) {
//         return <div className="p-4 text-center">Program not found</div>;
//     }

//     return (
//         <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">

//             <p><strong>Program ID:</strong> {program.id}</p>
//             <p><strong>Duration:</strong> 2 years</p>

//             <Separator/>
//             <h2 className="text-2xl font-bold mb-4">{program.name}</h2>

//             <img src={program.image} alt="Program" className="w-full h-48 object-cover rounded-lg mb-4" />

//             <p><strong>Date Created:</strong> {program.date}</p>
//             <p><strong>Organization:</strong> {program.org}</p>
//             <p><strong>Status:</strong> {program.state}</p>
//             {/* <Button className="mt-4" onClick={() => navigate('/CourseSelection')}>+ Course </Button> */}
//             {/* <Button className="mt-4" onClick={() => navigate("/CourseSelection")}>
//                 + Course
//             </Button> */}



//             <Button className="mt-4" onClick={() => setIsPopupOpen(true)}>
//                 + Course
//             </Button>

//             {/* Popup Dialog */}
//             <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
//                 <DialogContent className="max-w-md">
//                     <DialogTitle>Course Selection</DialogTitle>

//                     {/* Render CourseSelection Component */}
//                     <CourseSelection />

//                     <DialogFooter>
//                         <Button variant="outline" onClick={() => setIsPopupOpen(false)}>
//                             Close
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default ProgramDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import img1 from "@/assets/c1.png";
import img2 from "@/assets/c2.png";
import img3 from "@/assets/c3.png";
import CourseSelection from "./CourseSelection";
import { Pencil } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CourseSelection from "./CourseSelection";

const courseData = [
    { id: "c1", name: "React Basics", modules: ["Introduction", "Components", "Props & State", "Hooks"] },
    { id: "c2", name: "Advanced TypeScript", modules: ["Types & Interfaces", "Generics", "Decorators", "Utility Types"] },
    { id: "c3", name: "TailwindCSS Mastery", modules: ["Utility Classes", "Grid & Flexbox", "Customization", "Dark Mode"] },
    { id: "c4", name: "Node.js Fundamentals", modules: ["Event Loop", "Express.js", "Middleware", "Database Integration"] },
    { id: "c5", name: "Angular Advanced", modules: ["Directives", "Services", "RxJS", "State Management"] },
];

const ProgramDetails = () => {
    const { id } = useParams();
    const [program, setProgram] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [openCourse, setOpenCourse] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const toggleCourse = (courseId: string) => {
        setOpenCourse(openCourse === courseId ? null : courseId);
    };

    useEffect(() => {
        const programs = JSON.parse(localStorage.getItem("programs") || "[]");
        const selectedProgram = programs.find((p: any) => p.id.toString() === id);

        if (selectedProgram) {
            selectedProgram.image = images[Math.floor(Math.random() * images.length)];
            selectedProgram.description =
                "This program provides an in-depth understanding of the core concepts.";
        }

        setProgram(selectedProgram);
    }, [id]);

    if (!program) {
        return <div className="p-4 text-center">Program not found</div>;
    }

    return (
        <div className="w-full">

            <div className="p-6   bg-white shadow-lg rounded-lg">
                <div className="flex justify-between rounded-lg pb-4 flex ">
                    Student enrolled 256
                    <Button className="bg-blue-600 text-white" ><span><Pencil /></span>+ Edit program Details</Button>

                </div>

                <h2 className="text-2xl font-bold mb-4">{program.name}</h2>
                <p><strong>Program ID:</strong> {program.id}</p>
                <p><strong>Duration:</strong> 2 Years</p>

                <Separator className="my-4" />


                <img src={program.image} alt="Program" className="w-max h-48 object-cover rounded-lg mb-4" />

                <p><strong>Date Created:</strong> {program.date}</p>
                <p><strong>Organization:</strong> {program.org}</p>
                <p><strong>Status:</strong> {program.state}</p>
                <p className="pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                
                <p><strong>Skills gain :</strong>C++, JAVA, HTML , Javascript, Python, Node js etc</p>
                <Separator className="my-4" />

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
                                    <span className="text-lg font-semibold">{index + 1}. {course.name}</span>
                                    {openCourse === course.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                <Button className="mt-4 bg-[#1D1F71] hover:bg-[#484ab0]" onClick={() => setIsPopupOpen(true)}>
                    + Course             </Button>
                {/* Popup Dialog */}
                <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                    <DialogContent className="fixed flex flex-col w-full h-max bg-white p-6">
                        <DialogTitle>Course Selection</DialogTitle>

                        {/* Render CourseSelection Component */}
                        <div className="flex-grow overflow-auto">
                            <CourseSelection />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPopupOpen(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};

export default ProgramDetails;
