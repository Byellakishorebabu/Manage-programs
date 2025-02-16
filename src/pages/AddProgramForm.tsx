import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
// import CourseSelection from "./CourseSelection";
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
    // const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [active, setActive] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();



    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );

    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };

    const handleCourseRemove = (course: string) => {
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(selectedCourses.filter(c => c !== course));
    };

    const handleDragStart = (event: DragEvent<HTMLDivElement>, course: string) => {
        event.dataTransfer.setData("text/plain", course);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>, isAdding: boolean) => {
        event.preventDefault();
        const course = event.dataTransfer.getData("text/plain");
        if (course) {
            if (isAdding && !selectedCourses.includes(course)) {
                handleCourseSelect(course);
            } else if (!isAdding && !filteredCourses.includes(course)) {
                handleCourseRemove(course);
            }
        }
    };


    const validate = () => {
        const newErrors: FormErrors = {};

        if (!programName.trim()) newErrors.programName = "Program Name is required";

        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        } else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
        }
        // if (!selectedCourses.trim()) 
        //     {newErrors.selectedCourses = "Course is required";}

        if (!description.trim()) newErrors.description = "Description is required";

        if (!skillsGain.trim()) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        if (!imageUploaded) newErrors.imageUploaded = "image is required";


        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        if (existingPrograms.some((program: Program) => program.id === programID)) {
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
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setImageUploaded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const newProgram: Program = {
            id: programID,
            name: programName,
            description: description,
            skillsGain: skillsGain,
            duration: duration,
            courses: "0",
            date: new Date().toLocaleDateString(),
            org: "KLC Tech College",
            state: active ? "Active" : "Inactive",
            image: imagePreview || undefined,
        };

        // Save to localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        existingPrograms.push(newProgram);
        localStorage.setItem("programs", JSON.stringify(existingPrograms));

        setShowSuccessPopup(true);
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-xl font-bold mb-4">Add Program</h2>
            <div>
                <div className="mb-4">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input
                        placeholder="Program Name"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        required
                    />
                    {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="programID">Create Program ID</Label>
                    <Input
                        placeholder="Create Program ID"
                        value={programID}
                        onChange={(e) => setProgramID(e.target.value)}
                        required
                    />
                    {errors.programID && <p className="text-red-500 text-sm">{errors.programID}</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="description">Description </Label>
                    <Input placeholder="Description " value={description} onChange={(e) => setDescription(e.target.value)} required />

                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                </div>

                <div className="my-4">
                    <Label htmlFor="skillsGain">Skills Gain</Label>
                    <Input
                        placeholder="Skills Gain"
                        value={skillsGain}
                        onChange={(e) => setSkillsGain(e.target.value)}
                        required
                    />
                    {errors.skillsGain && <p className="text-red-500 text-sm">{errors.skillsGain}</p>}
                </div>

                <div className="flex items-center space-x-6">
                    <div className="w-1/2">
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

                {/* <CourseSelection /> */}

                {/* drag nad drop */}
                <div >
                    <h3 className="text-lg font-semibold">Tag Courses</h3>
                    <div className="flex space-x-4 border p-4 rounded-md">
                        <div className="w-1/2">
                            <span>Courses to Select</span>
                            <Input
                                placeholder="Search courses..."
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFilteredCourses(availableCourses.filter(c => c.toLowerCase().includes(e.target.value.toLowerCase())))
                                }
                            />
                            <div className="border h-40 overflow-auto p-2 mt-2">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course}
                                        className="flex justify-between items-center p-2 border-b"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, course)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, false)}
                                    >
                                        <span>{course}</span>
                                        <Button variant="ghost" onClick={() => handleCourseSelect(course)}>+</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <span>Selected Courses</span>
                            <p className="text-sm text-gray-500">Drag to arrange the sequence of courses.</p>
                            <div className="border h-40 overflow-auto p-2 mt-2">
                                {selectedCourses.length > 0 ? (
                                    selectedCourses.map((course) => (
                                        <div
                                            key={course}
                                            className="flex justify-between items-center p-2 border-b"
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, course)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, true)}
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
                    <label htmlFor="banner-upload" className="font-semibold block ">Banner </label>
                    <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={handleFileUpload} required
                    />
                    {errors.imageUploaded && <p className="text-red-500 text-sm">{errors.imageUploaded}</p>}

                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-xs h-auto"
                            />
                        </div>
                    )}
                </div>

                <Button className=" text-white w-max mt-4 bg-[#1d1f71]" onClick={handleSubmit}>Submit</Button>
            </div>

            {/* Success Popup */}
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

export default AddProgramForm;