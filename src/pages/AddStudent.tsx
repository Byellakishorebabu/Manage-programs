import React, { useState, DragEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X,  } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../components/ui/dialog";

const availablestudents = ["Sunny ", "Bhanu", "Ramu royal", "Sami", "Shankar","Shiva","Pardhu"];
const defaultSelectedstudents = [" Ali ", "Teja"]; // Add default selected students here

const studentSelection = () => {
    const [successPopup, setSuccessPopup] = useState(false);
    const [selectedstudents, setSelectedstudents] = useState<string[]>(defaultSelectedstudents);
    const [filteredstudents, setFilteredstudents] = useState(
        availablestudents.filter(student => !defaultSelectedstudents.includes(student))
    );

const handlestudentSelect = (student: string) => {
    setSelectedstudents([...selectedstudents, student]);
    setFilteredstudents(filteredstudents.filter(c => c !== student));
    };

    // Success Popup Dialog
    <Dialog open={successPopup} onOpenChange={setSuccessPopup}>
        <DialogContent className="text-center">
            <DialogTitle className="text-[#1D1F71] ">Added</DialogTitle>
            <p>We have successfully added the student to the student Big Data Tools & Architecture.</p>
            <DialogFooter>
                <Button onClick={() => setSuccessPopup(false)} className="bg-[#1D1F71]">Continue</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

const handlestudentRemove = (student: string) => {
    setFilteredstudents([...filteredstudents, student]);
    setSelectedstudents(selectedstudents.filter(c => c !== student));
};

const handleDragStart = (event: DragEvent<HTMLDivElement>, student: string) => {
    event.dataTransfer.setData("text/plain", student);
};

const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
};

const handleDrop = (event: DragEvent<HTMLDivElement>, isAdding: boolean) => {
    event.preventDefault();
    const student = event.dataTransfer.getData("text/plain");
    if (student) {
        if (isAdding && !selectedstudents.includes(student)) {
            handlestudentSelect(student);
        } else if (!isAdding && !filteredstudents.includes(student)) {
            handlestudentRemove(student);
        }
    }
};

// Filter students based on search input and exclude selected students
const handleSearch = (searchTerm: string) => {
    setFilteredstudents(
        availablestudents.filter(student =>
            student.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !selectedstudents.includes(student)
        )
    );
};

    return (
        <div >
            <div className="flex space-x-4 border p-4 rounded-md">
                <div className="w-1/2">
                    <span>Students to Select</span>
                    <Input
                        placeholder="Search student..."
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch(e.target.value)
                        }
                    />
                    <div className="border h-40 overflow-auto p-2 mt-2">
                        {filteredstudents.map((student) => (
                            <div
                                key={student}
                                className="flex justify-between items-center p-2 border-b"
                                draggable
                                onDragStart={(e) => handleDragStart(e, student)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, false)}
                            >
                                <span>{student}</span>
                                <Button variant="ghost" onClick={() => handlestudentSelect(student)}>+</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/2">
                    <span>Selected Students</span>
                    <p className="text-sm text-gray-500">Drag to arrange the sequence of students.</p>
                    <div className="border h-40 overflow-auto p-2 mt-2">
                        {selectedstudents.length > 0 ? (
                            selectedstudents.map((student) => (
                            <div
                                key={student}
                                className="flex justify-between items-center p-2 border-b"
                                draggable
                                onDragStart={(e) => handleDragStart(e, student)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, true)}
                            >
                                    <span>{student}</span>
                                    <Button variant="ghost" onClick={() => handlestudentRemove(student)}>
                                        <X />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No students are selected</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default studentSelection;
