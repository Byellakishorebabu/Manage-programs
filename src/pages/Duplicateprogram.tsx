import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CourseSelection from "./CourseSelection";

interface FormErrors {
  programName?: string;
  programID?: string;
  skillsGain?: string;
  duration?: string;
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
}

const Duplicateprogram = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        // Fetch existing program details
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: Program) => p.id === id);

        if (program) {
            setProgramName(` ${program.name}`);
            setProgramID(`${program.id}`);
            setDescription(program.description || "");
            setSkillsGain(program.skillsGain || "");
            setDuration(program.duration || "");
            setActive(program.state === "Active");
            // Set image preview if exists
            if (program.image) {
                setImagePreview(program.image);
                setImageUploaded(true);
            }
        }
    }, [id]);

    const validate = () => {
        const newErrors: FormErrors = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        }else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
        }
        if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const copiedProgram: Program = {
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

        // Save the copied program in localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");

        // Find index of the program to update
        const index = existingPrograms.findIndex(p => p.programID === copiedProgram.programID);
        
        if (index !== -1) {
            // Update the existing program
            existingPrograms[index] = { ...existingPrograms[index], ...copiedProgram };
        } else {
            newErrors.programID = "Program not found"; // Handle case where ID doesn't exist
        }
        
        localStorage.setItem("programs", JSON.stringify(existingPrograms));
        
        setShowSuccessPopup(true);
    };

    return (
        <div className="p-6">
            <div>
                <div className="mb-4">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input
                        id="programName"
                        placeholder="Program Name"
                        value={programName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProgramName(e.target.value)}
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
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProgramID(e.target.value)}
                    />
                    {errors.programID && <p className="text-red-500 text-sm">{errors.programID}</p>}
                </div>

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
                <div>
                    <CourseSelection />
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

export default Duplicateprogram;
