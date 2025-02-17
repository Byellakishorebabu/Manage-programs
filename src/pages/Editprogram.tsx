import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
// import CourseSelection from "./CourseSelection";
// import Coursedragdrop from "./Coursedragdrop";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X, } from "lucide-react";


const availableCourses = ["Course A", "Course B", "Course C", "Course D", "Course E"];
const defaultSelectedCourses = [];



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
    imageUploaded?: string;
}

const EditProgram = () => {
    const { id } = useParams(); // Get programID from URL
    const navigate = useNavigate();
    
    const [programName, setProgramName] = useState("");
    const [programID, setProgramID] = useState("");
    const [description, setDescription] = useState("");
    const [skillsGain, setSkillsGain] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        skillsGain: "",
        duration: "",
        active: true,
        image: "",
        selectedCourses: [] as string[],
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: Program) => p.id === id);
        
        if (program) {
            setProgramName(program.name);
            setProgramID(program.id);
            setSkillsGain(program.skillsGain || "");
            setDuration(program.duration || "");
            setActive(program.state === "Active");

            // Storing initial data for comparison in the edit page form
            setInitialValues({
                name: program.name,
                description: program.description,
                skillsGain: program.skillsGain,
                duration: program.duration,
                active: program.state === "Active",
                image: program.image || "",
                selectedCourses: program.selectedCourses || [],
            });

            if (program.image) {
                setImagePreview(program.image);
                setImageUploaded(true);
            }

            if (program.selectedCourses) {
                setSelectedCourses(program.selectedCourses);
                setFilteredCourses(availableCourses.filter(
                    course => !program.selectedCourses.includes(course)
                ));
            }
        }
    }, [id]);

    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );


    const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);



    const validate = () => {
        let newErrors: any = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        } else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
        }
        if (!imageUploaded) newErrors.imageUploaded = "Image is required";
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

        const updatedProgram = {
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
            selectedCourses: selectedCourses,
        };

        // Update the program in localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const updatedPrograms = existingPrograms.map((p: any) => (p.id === id ? updatedProgram : p));
        localStorage.setItem("programs", JSON.stringify(updatedPrograms));

        setShowSuccessPopup(true);
    };

    // Check if any values have changed in the edit page form
    const hasChanges = () => {
        // Compare arrays by converting to JSON strings
        const coursesChanged = JSON.stringify(selectedCourses) !== JSON.stringify(initialValues.selectedCourses);
        
        return programName !== initialValues.name ||
            description !== initialValues.description ||
            skillsGain !== initialValues.skillsGain ||
            duration !== initialValues.duration ||
            active !== initialValues.active ||
            imagePreview !== initialValues.image ||
            coursesChanged;
    };


    // Course Selection and Drag and Drop functionality
    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };

    const handleCourseRemove = (course: string) => {
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(selectedCourses.filter(c => c !== course));
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


    return (
        <div className="p-6 ">
            {/* <h2 className="text-xl font-bold mb-4">Edit Program</h2> */}
            <div>
                <div className="mb-4">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input 
                        id="programName"
                        placeholder="Program Name"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                    />
                    {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="programID">Program ID</Label>
                    <Input 
                        id="programID"
                        placeholder="Program ID" 
                        value={programID} 
                        readOnly
                    // onChange={(e) => setProgramID(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        id="description"
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="skillsGain">Skills Gain</Label>
                    <Input 
                        id="skillsGain"
                        placeholder="Skills Gain"
                        value={skillsGain}
                        onChange={(e) => setSkillsGain(e.target.value)}
                    />
                    {errors.skillsGain && <p className="text-red-500 text-sm">{errors.skillsGain}</p>}
                </div>

                <div className="flex items-center space-x-6">
                    
                
                    <div className="w-1/2">
                    {/* <Label htmlFor="duration">Duration</Label> */}

                        <Select value={duration} onValueChange={setDuration}>
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
                            <input
                                type="radio"
                                checked={active}
                                onChange={() => setActive(true)}
                            />
                        <span>Active</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={!active}
                                onChange={() => setActive(false)}
                            />
                        <span>Inactive</span>
                        </label>
                    </div>
                </div>

                {/* Course Selection and Drag and Drop functionality */}
                <div>
                    <h6 className="font-semibold mt-4">Tag Courses</h6>
                    <div className="flex space-x-4 border p-4 rounded-md">
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
                                placeholder="Search student..."
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
                                        onDragStart={(e) => handleDragStart(e, course, false)}
                                    >
                                        <span>{course}</span>
                                        <Button variant="ghost" onClick={() => handleCourseSelect(course)}>+</Button>
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

                {/* <CourseSelection /> */}
                {/* <div className="pt-4">
                    <span className="font-semibold ">Tag Courses </span>
                    <Coursedragdrop />
                </div> */}
                <div className="border p-4 rounded-md">
                    <label htmlFor="banner-upload" className="font-semibold block">Banner </label>
                    <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={handleFileUpload}
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
                    className={`text-white w-max mt-4 ${hasChanges() ? "bg-[#1D1F71]" : "bg-red-400 cursor-not-allowed"
                        }`}
                    onClick={handleSubmit}
                    disabled={!hasChanges()}
                >
                    Update Program
                </Button>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                    <DialogContent className="text-center">
                        <DialogTitle className="text-[#1D1F71]">Congratulation</DialogTitle>
                        <p>We have successfully registered your program in data base you can go and visit later the detail of it!</p>
                        <DialogFooter >
                            <Button variant="outline" onClick={() => navigate("/programs")} className="border border-[#1D1F71] items-center">Back</Button>
                            <Button onClick={() => setShowSuccessPopup(false)} className="bg-[#1D1F71] items-center">OK</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default EditProgram;
