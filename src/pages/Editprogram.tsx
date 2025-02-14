import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import CourseSelection from "./CourseSelection";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch copied program details
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: any) => p.id === id);
        
        if (program) {
            setProgramName(program.name);
            setProgramID(program.id);
            setSkillsGain(program.skillsGain || "");
            setDuration(program.duration || "");
            setActive(program.state === "Active");
        }
    }, [id]);

    const validate = () => {
        let newErrors: any = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const updatedProgram = {
            id: programID,
            name: programName,
            courses: "0", 
            date: new Date().toLocaleDateString(),
            org: "KLC Tech College",
            state: active ? "Active" : "Inactive",
        };

        // Update the program in localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const updatedPrograms = existingPrograms.map((p: any) => (p.id === id ? updatedProgram : p));
        localStorage.setItem("programs", JSON.stringify(updatedPrograms));

        setShowSuccessPopup(true);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            {/* <h2 className="text-xl font-bold mb-4">Edit Program</h2> */}
            <div>
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
                        disabled 
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="skillsGain">Skills Gain</Label>
                    <Input 
                        placeholder="Skills Gain"
                        value={skillsGain}
                        onChange={(e) => setSkillsGain(e.target.value)}
                    />
                    {errors.skillsGain && <p className="text-red-500 text-sm">{errors.skillsGain}</p>}
                </div>

                <div className="flex items-center space-x-6">
                    <div className="w-1/2">
                        <Select onValueChange={setDuration} defaultValue={duration}>
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
                        <Checkbox checked={active} onCheckedChange={() => setActive(true)} />
                        <span>Active</span>
                        <Checkbox checked={!active} onCheckedChange={() => setActive(false)} />
                        <span>Inactive</span>
                    </div>
                </div>

                <CourseSelection />

                <div className="border p-4 rounded-md">
                    <label htmlFor="banner-upload" className="font-semibold block">Banner (Optional)</label>
                    <input id="banner-upload" type="file" accept="image/*" className="mt-2" onChange={() => setImageUploaded(true)} />
                    {imageUploaded && <span className="text-green-600"> Uploaded</span>}
                </div>

                <Button className="bg-[#1D1F71] text-white w-max mt-4" onClick={handleSubmit}>Update</Button>
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
