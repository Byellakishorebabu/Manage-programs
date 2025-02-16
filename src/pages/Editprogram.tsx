import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import CourseSelection from "./CourseSelection";
// import Coursedragdrop from "./Coursedragdrop";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Program {
    id: number;
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
    programID?: number;
    skillsGain?: string;
    duration?: string;
}

const EditProgram = () => {
    const { id } = useParams();
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
        active: true
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        // Fetch program details from localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const program = existingPrograms.find((p: Program) => p.id === id);

        if (program) {
            setProgramName(program.name);
            setProgramID(program.id);
            setDescription(program.description);
            setSkillsGain(program.skillsGain);
            setDuration(program.duration);
            setActive(program.state === "Active");

            // Store initial values
            setInitialValues({
                name: program.name,
                description: program.description,
                skillsGain: program.skillsGain,
                duration: program.duration,
                active: program.state === "Active"
            });

            if (program.image) {
                setImagePreview(program.image);
                setImageUploaded(true);
            }
        }
    }, [id]);

    const validate = () => {
        const newErrors: FormErrors = {};

        if (!programName.trim()) newErrors.programName = "Program Name is required";
        if (!skillsGain.trim()) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        if (!programID.trim()) {
            newErrors.programID = "Program ID is required";
        } else if (!/^\d+$/.test(programID)) {
            newErrors.programID = "Program ID must be a number";
        }else if (isNaN(Number(programID))) {
            newErrors.programID = "Invalid number format";
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

        const updatedProgram: Program = {
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

        // Update program in localStorage
        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        const updatedPrograms = existingPrograms.map((program: Program) =>
            program.id === id ? updatedProgram : program
        );
        localStorage.setItem("programs", JSON.stringify(updatedPrograms));

        setShowSuccessPopup(true);
    };

    // Check if any values have changed
    const hasChanges = () => {
        return programName !== initialValues.name ||
            description !== initialValues.description ||
            skillsGain !== initialValues.skillsGain ||
            duration !== initialValues.duration ||
            active !== initialValues.active;
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Program</h2>
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

                <CourseSelection />
                {/* <div className="pt-4">
                    <span className="font-semibold ">Tag Courses </span>
                    <Coursedragdrop />
                </div> */}
                <div className="border p-4 rounded-md">
                    <label htmlFor="banner-upload" className="font-semibold block">Banner (Optional)</label>
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
                    className={`text-white w-max mt-4 ${hasChanges() ? "bg-[#1D1F71]" : "bg-orange-400 cursor-not-allowed"
                        }`}
                    onClick={handleSubmit}
                    disabled={!hasChanges()}
                >
                    Update Program
                </Button>
            </div>

            {showSuccessPopup && (
                <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                    <DialogContent className="items-center">
                        <DialogTitle><strong>Success</strong></DialogTitle>
                        <p>Program has been updated successfully.</p>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setShowSuccessPopup(false);
                                    navigate("/managerprogram");
                                }}
                                className="bg-[#1D1F71]"
                            >
                                Continue
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default EditProgram;
