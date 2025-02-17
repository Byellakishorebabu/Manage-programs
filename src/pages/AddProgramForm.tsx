import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import CourseSelection from "./CourseSelection";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X, } from "lucide-react";

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
    selectedCourses: string[];
}

interface FormErrors {
    programName?: string;
    programID?: string;
    skillsGain?: string;
    duration?: string;
    course?: string;
    description?: string;
    imageUploaded?: string;

}

const availableCourses = ["Course A", "Course B", "Course C", "Course D", "Course E"];
const defaultSelectedCourses = []; // Add default selected courses here

const AddProgramForm = () => {
    const [programName, setProgramName] = useState("");
    const [programID, setProgramID] = useState("");
    const [description, setDescription] = useState("");
    const [skillsGain, setSkillsGain] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );

    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };


    
    

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, course: string, fromSelected: boolean = false) => {
        event.dataTransfer.setData("text/plain", course);
        event.dataTransfer.setData("fromSelected", String(fromSelected));
        setDraggedCourse(course);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index?: number) => {
        event.preventDefault();
        if (index !== undefined) {
            setDragOverIndex(index);
        }
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, isSelectedArea: boolean, dropIndex?: number) => {
        event.preventDefault();
        setDragOverIndex(null);

        const course = event.dataTransfer.getData("text/plain");
        const fromSelected = event.dataTransfer.getData("fromSelected") === "true";

        if (!course) return;

        // Reordering within Selected Courses
        if (fromSelected && isSelectedArea && dropIndex !== undefined) {
            const currentIndex = selectedCourses.findIndex(c => c === course);
            if (currentIndex === -1) return;

            // Create new array without the dragged course
            const newSelectedCourses = [...selectedCourses];
            newSelectedCourses.splice(currentIndex, 1);

            // Insert at the new position
            newSelectedCourses.splice(dropIndex, 0, course);
            setSelectedCourses(newSelectedCourses);
        }
        // Moving from Available to Selected
        else if (!fromSelected && isSelectedArea) {
            if (!selectedCourses.includes(course)) {
                handleCourseSelect(course);
            }
        }
        // Moving from Selected to Available
        else if (fromSelected && !isSelectedArea) {
            if (!filteredCourses.includes(course)) {
                handleCourseRemove(course);
            }
        }

        setDraggedCourse(null);
    };

    const validate = () => {
        let newErrors: any = {};
        if (!programName.trim()) newErrors.programName = "Program Name is required";

        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        } else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
        }

        if (!description.trim()) newErrors.description = "Description is required";

        if (!skillsGain.trim()) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";

        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        if (existingPrograms.some((program: any) => program.id === programID)) {
            newErrors.programID = "Program ID must be unique";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed!");
                return;
            }
            setImageUploaded(true);
        }
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const newProgram = {
            id: programID,
            name: programName,
            courses: "0",
            date: new Date().toLocaleDateString(),
            org: "KLC Tech College",
            state: active ? "Active" : "Inactive",
            image: imagePreview || undefined,
            selectedCourses: selectedCourses,
        };

        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        localStorage.setItem("programs", JSON.stringify([...existingPrograms, newProgram]));

        setShowSuccessPopup(true);
    };

    return (
        <div className="p-2 sm:p-6 w-full max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add Program</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="programName">Program Name</Label>
                        <Input
                            placeholder="Program Name"
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            required
                        />
                        {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="programID">Create Program ID</Label>
                        <Input
                            placeholder="Create Program ID"
                            value={programID}
                            onChange={(e) => setProgramID(e.target.value)}
                            required
                        />
                        {errors.programID && <p className="text-red-500 text-sm">{errors.programID}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description </Label>
                        <Input placeholder="Description " value={description} onChange={(e) => setDescription(e.target.value)} required />

                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skillsGain">Skills Gain</Label>
                        <Input
                            placeholder="Skills Gain"
                            value={skillsGain}
                            onChange={(e) => setSkillsGain(e.target.value)}
                            required
                        />
                        {errors.skillsGain && <p className="text-red-500 text-sm">{errors.skillsGain}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select onValueChange={setDuration}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3 Months">3 Months</SelectItem>
                                <SelectItem value="6 Months">6 Months</SelectItem>
                                <SelectItem value="1 Year">1 Year</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="active">Active</Label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={active} onChange={() => setActive(true)} />
                                <span>Active</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={!active} onChange={() => setActive(false)} />
                                <span>Inactive</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Tag Courses</h3>
                    <div className="flex flex-col md:flex-row gap-4 border p-4 rounded-md">
                        <div className="w-full md:w-1/2">
                            <span>Courses to Select</span>
                            <Input 
                                placeholder="Search courses..."
                                className="my-2"
                            />
                            <div className="border h-40 sm:h-60 overflow-auto">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course}
                                        className="flex justify-between items-center p-2 border-b"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, course, false)}
                                    >
                                        <span>{course}</span>
                                        <Button variant="ghost" onClick={() => handleCourseSelect(course)}>+</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <span>Selected Courses</span>
                            <p className="text-sm text-gray-500">Drag to arrange the sequence of courses.</p>
                            <div
                                className="border h-40 overflow-auto p-2 mt-2"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, true)}
                            >
                                {selectedCourses.length > 0 ? (
                                    selectedCourses.map((course, index) => (
                                        <div
                                            key={course}
                                            className={`flex justify-between items-center p-2 border-b ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''
                                                } ${draggedCourse === course ? 'opacity-50' : ''}`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, course, true)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, true, index)}
                                        >
                                            <span>{course}</span>
                                            <Button variant="ghost" onClick={() => handleCourseRemove(course)}>
                                                <X />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No courses selected</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border p-4 rounded-md">
                    <label htmlFor="banner-upload" className="font-semibold block">Banner (Optional)</label>
                    <input id="banner-upload" type="file" accept="image/*" className="mt-2" onChange={handleFileUpload} />
                    {imageUploaded && <span className="text-green-600"> Uploaded</span>}
                </div>

                <Button className="bg-blue-600 text-white w-full mt-4" onClick={handleSubmit}>Submit</Button>
            </div>

            {showSuccessPopup && (
                <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                    <DialogContent>
                        <DialogTitle>Success</DialogTitle>
                        <p>Program added successfully!</p>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => navigate("/programs")}>Back</Button>
                            <Button onClick={() => setShowSuccessPopup(false)}>OK</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AddProgram;



// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import CourseSelection from "./CourseSelection";
// import { useNavigate } from "react-router-dom";
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// const AddProgram = () => {
//     const [programName, setProgramName] = useState("");
//     const [programID, setProgramID] = useState("");
//     const [description, setDescription] = useState("");
//     const [skillsGain, setSkillsGain] = useState("");
//     const [duration, setDuration] = useState("");
//     const [active, setActive] = useState(true);
//     const [imageUploaded, setImageUploaded] = useState(false);
//     const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     // Validation function
//     const validate = () => {
//         let newErrors: any = {};
//         if (!programName) newErrors.programName = "Program Name is required";
//         if (!programID) newErrors.programID = "Program ID is required";
//         if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
//         if (!duration) newErrors.duration = "Duration is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Handle form submission
//     const handleSubmit = () => {
//         if (!validate()) return;

//         const newProgram = {
//             id: programID,
//             name: programName,
//             skillsGain,
//             duration,
//             courses: "0",
//             date: new Date().toLocaleDateString(),
//             org: "KLC Tech College",
//             description:"A description is added by optionally",
//             state: active ? "Active" : "Inactive",
//         };

//         // Save to localStorage
//         const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
//         const updatedPrograms = [...existingPrograms, newProgram];
//         localStorage.setItem("programs", JSON.stringify(updatedPrograms));

//         // Download JSON file
//         // const blob = new Blob([JSON.stringify(updatedPrograms, null, 2)], { type: "application/json" });
//         // const url = URL.createObjectURL(blob);
//         // const a = document.createElement("a");
//         // a.href = url;
//         // a.download = "programs.json";
//         // document.body.appendChild(a);
//         // a.click();
//         // document.body.removeChild(a);
//         // URL.revokeObjectURL(url);

//         // setShowSuccessPopup(true);
//     };

//     return (
//         <div className="p-6 max-w-xl mx-auto">
//             <h2 className="text-xl font-bold mb-4">Add Program</h2>
//             <div>
//                 <div className="mb-4">
//                     <Label htmlFor="programName">Program Name</Label>
//                     <Input placeholder="Program Name" value={programName} onChange={(e) => setProgramName(e.target.value)} />
//                     {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
//                 </div>

//                 <div className="mb-4">
//                     <Label htmlFor="programID">Create Program ID</Label>
//                     <Input placeholder="Create Program ID" value={programID} onChange={(e) => setProgramID(e.target.value)} />
//                     {errors.programID && <p className="text-red-500 text-sm">{errors.programID}</p>}
//                 </div>

//                 <div className="mb-4">
//                     <Label htmlFor="description">Description (Optional)</Label>
//                     <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//                 </div>

//                 <div className="my-4">
//                     <Label htmlFor="skillsGain">Skills Gain</Label>
//                     <Input placeholder="Skills Gain" value={skillsGain} onChange={(e) => setSkillsGain(e.target.value)} />
//                     {errors.skillsGain && <p className="text-red-500 text-sm">{errors.skillsGain}</p>}
//                 </div>

//                 <div className="flex items-center space-x-6">
//                     <div className="w-1/2">
//                         <Select onValueChange={setDuration}>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="Select Duration" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="3 Months">3 Months</SelectItem>
//                                 <SelectItem value="6 Months">6 Months</SelectItem>
//                                 <SelectItem value="1 Year">1 Year</SelectItem>
//                             </SelectContent>
//                         </Select>
//                         {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Checkbox checked={active} onCheckedChange={() => setActive(true)} />
//                         <span>Active</span>
//                         <Checkbox checked={!active} onCheckedChange={() => setActive(false)} />
//                         <span>Inactive</span>
//                     </div>
//                 </div>
//                 <div>
//                     <CourseSelection />
//                 </div>

//                 <div className="border p-4 rounded-md">
//                     <label htmlFor="banner-upload" className="font-semibold block">Banner (Optional)</label>
//                     <input id="banner-upload" type="file" accept="image/*" className="mt-2" onChange={() => setImageUploaded(true)} />
//                     {imageUploaded && <span className="text-green-600"> Uploaded</span>}
//                 </div>

//                 <Button className="bg-blue-600 text-white w-full mt-4" onClick={handleSubmit}>Submit</Button>
//             </div>

//             {/* Success Popup */}
//             {showSuccessPopup && (
//                 <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
//                     <DialogContent>
//                         <DialogTitle>Success</DialogTitle>
//                         <p>Program added successfully!</p>
//                         <DialogFooter>
//                             <Button variant="ghost" onClick={() => navigate("/programs")}>Back</Button>
//                             <Button onClick={() => setShowSuccessPopup(false)}>OK</Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </div>
//     );
// };

// export default AddProgram;
