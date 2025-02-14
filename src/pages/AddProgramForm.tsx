import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import CourseSelection from "./CourseSelection";

const DB_KEY = "db_programs";

const AddProgram = () => {
    const [programName, setProgramName] = useState("");
    const [programID, setProgramID] = useState("");
    const [description, setDescription] = useState("");
    const [skillsGain, setSkillsGain] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState("");

    const validate = () => {
        let newErrors = {};
        if (!programName.trim()) newErrors.programName = "Program Name is required";
        if (!programID.match(/^\d+$/)) newErrors.programID = "Program ID should be a number";
        if (!skillsGain.trim()) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";

        const dbData = JSON.parse(localStorage.getItem(DB_KEY) || '{"programs": []}');
        if (dbData.programs.some((program) => program.programID === programID)) {
            newErrors.programID = "Program ID must be unique";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed!");
                return;
            }
            setImageUploaded(true);
        }
    };

    const handleAddCourse = () => {
        if (newCourse.trim()) {
            setCourses([...courses, newCourse.trim()]);
            setNewCourse("");
        }
    };

    const handleRemoveCourse = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setProgramName("");
        setProgramID("");
        setDescription("");
        setSkillsGain("");
        setDuration("");
        setActive(true);
        setImageUploaded(false);
        setCourses([]);
        setErrors({});
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Create program data object
        const programData = {
            programID,
            programName,
            description,
            skillsGain,
            duration,
            status: active ? "Active" : "Inactive",
            imageUploaded,
            createdDate: new Date().toISOString(),
            organization: "KLC Tech College",
            courses,
            lastModified: new Date().toISOString()
        };

        // Get existing data from localStorage
        const dbData = JSON.parse(localStorage.getItem(DB_KEY) || '{"programs": []}');
        
        // Add new program
        dbData.programs.push(programData);
        
        // Update localStorage
        localStorage.setItem(DB_KEY, JSON.stringify(dbData, null, 2));

        setShowSuccessPopup(true);
        resetForm();
    };

    const handleClose = () => {
        setShowSuccessPopup(false);
    };

    // Initialize db.json structure if it doesn't exist
    useEffect(() => {
        const dbData = localStorage.getItem(DB_KEY);
        if (!dbData) {
            localStorage.setItem(DB_KEY, JSON.stringify({ programs: [] }, null, 2));
        }
    }, []);

    return (
        <div className="p-6 w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add Program</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="programName">Program Name</Label>
                    <Input
                        id="programName"
                        placeholder="Program Name"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        required
                    />
                    {errors.programName && <p className="text-red-500 text-sm">{errors.programName}</p>}
                </div>

                <div>
                    <Label htmlFor="programID">Create Program ID</Label>
                    <Input
                        id="programID"
                        placeholder="Create Program ID"
                        value={programID}
                        onChange={(e) => setProgramID(e.target.value)}
                        required
                    />
                    {errors.programID && <p className="text-red-500 text-sm">{errors.programID}</p>}
                </div>

                <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input 
                        id="description"
                        placeholder="Description (Optional)" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div>
                    <Label htmlFor="skillsGain">Skills Gain</Label>
                    <Input
                        id="skillsGain"
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
{/* Add courses practice */}
                {/* <Card>
                    <CardContent className="p-4">
                        <Label>Courses</Label>
                        <div className="flex space-x-2 mt-2">
                            <Input
                                placeholder="Add course"
                                value={newCourse}
                                onChange={(e) => setNewCourse(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCourse()}
                            />
                            <Button onClick={handleAddCourse} size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mt-4 space-y-2">
                            {courses.map((course, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <span>{course}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveCourse(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card> */}
                <CourseSelection/>

                <div className="border p-4 rounded-md">
                    <label htmlFor="banner-upload" className="font-semibold block">Banner (Optional)</label>
                    <input 
                        id="banner-upload" 
                        type="file" 
                        accept="image/*" 
                        className="mt-2" 
                        onChange={handleFileUpload} 
                    />
                    {imageUploaded && <span className="text-green-600"> Uploaded</span>}
                </div>

                <Button 
                    className="w-full"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>

            <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                <DialogContent>
                    <DialogTitle>Success</DialogTitle>
                    <p>Program added successfully! The program data has been saved to the database.</p>
                    <DialogFooter>
                        <Button onClick={handleClose}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddProgram;