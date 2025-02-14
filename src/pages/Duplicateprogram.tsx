import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CourseSelection from "./CourseSelection";

const CopyProgram = () => {
    const { id } = useParams(); // Get programID from URL
    const navigate = useNavigate();

    const [programName, setProgramName] = useState("");
    const [programID, setProgramID] = useState("");
    const [description, setDescription] = useState("");
    const [skillsGain, setSkillsGain] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch existing program details
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: any) => p.id === id);

        if (program) {
            setProgramName(`${program.name}`);
            setProgramID(`${program.id}`);
            setDescription(program.description || "");
            setSkillsGain(program.skillsGain || "");
            setDuration(program.duration || "");
            setActive(program.state === "Active");
        }
    }, [id]);

    const validate = () => {
        let newErrors: any = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!programID) newErrors.programID = "Program ID is required";
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
        };

        // Save the copied program in localStorage
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
                        onChange={(e) => setProgramID(e.target.value)}
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
                        <Select defaultValue={duration} disabled>
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
                    <label className="font-semibold block">Banner </label>
                    <input type="file" accept="image/*" className="mt-2" disabled />
                </div>

                <Button className="bg-[#1D1F71] text-white w-max mt-4" onClick={handleSubmit}>Submit</Button>
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
