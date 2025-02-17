import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X, } from "lucide-react";


// import CourseSelection from "./CourseSelection";


const availableCourses = ["Course A", "Course B", "Course C", "Course D", "Course E"];
const defaultSelectedCourses = []; // Add default selected courses here

interface FormErrors {
    programName?: string;
    programID?: string;
    skillsGain?: string;
    duration?: string;
    imageUploaded?: string;
}

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

const Duplicateprogram = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );



    const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };

    

    const handleCourseRemove = (course: string) => {
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(selectedCourses.filter(c => c !== course));
    };

    const [programName, setProgramName] = useState("");
    const [programID, setProgramID] = useState("");
    const [description, setDescription] = useState("");
    const [skillsGain, setSkillsGain] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUploaded, setImageUploaded] = useState(false);

    // const handleDragStart = (event: React.DragEvent<HTMLDivElement>, course: string, fromSelected: boolean = false) => {
    //     event.dataTransfer.setData("text/plain", course);
    //     event.dataTransfer.setData("fromSelected", String(fromSelected));
    //     setDraggedCourse(course);
    // };

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

    useEffect(() => {
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: any) => p.id === id);

        if (program) {
            setProgramName(`${program.name}`);
            setProgramID(`${program.id}`);
            setDescription(program.description || "");
            setSkillsGain(program.skillsGain || "");
            setDuration(program.duration || "");
            setActive(program.state === "Active");
            
            // Load selected courses
            if (program.selectedCourses) {
                setSelectedCourses(program.selectedCourses);
                setFilteredCourses(availableCourses.filter(
                    course => !program.selectedCourses.includes(course)
                ));
            }

            if (program.image) {
                setImagePreview(program.image);
                setImageUploaded(true);
            }
        }
    }, [id]);

    const validate = () => {
        let newErrors: any = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        } else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
        }
        if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        if (!imageUploaded) newErrors.imageUploaded = "Image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const copiedProgram = {
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
        existingPrograms.push(copiedProgram);
        localStorage.setItem("programs", JSON.stringify(existingPrograms));
        setShowSuccessPopup(true);
    };

    return (
        <div className="p-6 ">
            {/* <h2 className="text-xl font-bold mb-4">Copy Program</h2> */}
            <div>
                {/* Editable Fields */}
                <div className="mb-4">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input
                        placeholder="Program Name"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                    />
                    {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="programID">Program ID</Label>
                    <Input
                        placeholder="Program ID"
                        value={programID}
                        // readOnly
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProgramID(e.target.value)}
                    />
                </div>

                {/* Read-Only Fields */}
                <div className="mb-4">
                    <Label htmlFor="description">Description </Label>
                    <Input
                        placeholder="Description"
                        value={description}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="skillsGain">Skills Gain </Label>
                    <Input
                        placeholder="Skills Gain"
                        value={skillsGain}
                        readOnly
                    />
                </div>

                <div className="flex items-center space-x-6">
                    <div className="w-1/2">

                        <Select value={duration} readOnly>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3 Months">3 Months</SelectItem>
                                <SelectItem value="6 Months">6 Months</SelectItem>
                                <SelectItem value="1 Year">1 Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Checkbox checked={active} disabled />
                        <span>Active</span>
                        <Checkbox checked={!active} disabled />
                        <span>Inactive</span>
                    </div>
                </div>
                <div >
                    <h3 className="text-lg font-semibold">Tag Courses</h3>
                    <div className="flex space-x-4 border p-4 rounded-md"  >
                        {/* <div className="w-1/2">
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
                </div> */}

                        <div className="w-1/2">
                            <span>Courses to Select</span>
                            <Input 
                                placeholder="Search student..." readOnly={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFilteredCourses(availableCourses.filter(c =>
                                        c.toLowerCase().includes(e.target.value.toLowerCase()) &&
                                        !selectedCourses.includes(c)
                                    ))
                                }
                            />
                            <div
                                className="border h-40 overflow-auto p-2 mt-2"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, false)}
                            >
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course}
                                        className="flex justify-between items-center p-2 border-b"
                                        draggable
                                        // onDragStart={(e) => handleDragStart(e, course, false)}
                                    >
                                        <span>{course}</span>
                                        <Button variant="ghost" onClick={() => handleCourseSelect(course)} disabled={true}>+</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="w-1/2">
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
                </div> */}

                        <div className="w-1/2">
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
                                            // onDragStart={(e) => handleDragStart(e, course, true)}
                                            // onDragOver={(e) => handleDragOver(e, index)}
                                            // onDragLeave={handleDragLeave}
                                            // onDrop={(e) => handleDrop(e, true, index)}
                                        >
                                            <span>{course}</span>
                                            <Button variant="ghost" onClick={() => handleCourseRemove(course)} disabled={true}>
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
                    <Label htmlFor="banner">Banner</Label>
                    <input
                        type="file"
                        id="banner"
                        accept="image/*"
                        className="mt-2"
                        disabled
                        title="Banner upload is disabled in copy mode"
                    />
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

                <Button
                    className="bg-[#1D1F71] text-white w-max mt-4"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                    <DialogContent className="items-center">
                        <DialogTitle><strong>Completed</strong></DialogTitle>
                        <p>Program has been updated successfully. </p>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setShowSuccessPopup(false)} className="bg-[#1D1F71]">Continue</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default CopyProgram;
