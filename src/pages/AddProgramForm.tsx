import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import CourseSelection from "./CourseSelection";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
    const navigate = useNavigate();

    const validate = () => {
        let newErrors: any = {};
        if (!programName) newErrors.programName = "Program Name is required";
        if (!programID) newErrors.programID = "Program ID is required";
        if (!skillsGain) newErrors.skillsGain = "Skills Gain is required";
        if (!duration) newErrors.duration = "Duration is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const newProgram = {
            id: programID,
            name: programName,
            courses: "0", // Default courses count
            date: new Date().toLocaleDateString(),
            org: "KLC Tech College",
            state: active ? "Active" : "Inactive",
            student: (
                <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleStudentClick(programID)}
                >
                    Add
                </button>
            ),
        };

        const existingPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        localStorage.setItem("programs", JSON.stringify([...existingPrograms, newProgram]));

        setShowSuccessPopup(true);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
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
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {/* <div className="mb-4">
                    <Label htmlFor="description">Organization</Label>
                    <Input placeholder="Organization" value={} onChange={(e) => setDescription(e.target.value)} />
                </div> */}

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

                <Button className="bg-blue-600 text-white w-full mt-4" onClick={handleSubmit}>Submit</Button>
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
