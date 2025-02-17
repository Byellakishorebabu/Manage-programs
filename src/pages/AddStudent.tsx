import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X,  } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../components/ui/dialog";

const availableCourses = ["Sunny ", "Bhanu", "Ramu royal", "Sami", "Shankar", "Shiva", "Pardhu"];
const defaultSelectedCourses: string[] = []; // Changed to empty array initially

interface Student {
    id: string;
    name: string;
    programId: string;
}

interface AddStudentProps {
    programId: string;
    onValidityChange: (isValid: boolean) => void;
}

const AddStudent = ({ programId, onValidityChange }: AddStudentProps) => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );

const handleCourseSelect = (course: string) => {
    setSelectedCourses([...selectedCourses, course]);
    setFilteredCourses(filteredCourses.filter(c => c !== course));
};

    const handleCourseRemove = (course: string) => {
        const newSelected = selectedCourses.filter(c => c !== course);
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(newSelected);
        onValidityChange(newSelected.length > 0);
    };

    const handleSaveStudents = () => {
        if (selectedCourses.length === 0) {
            onValidityChange(false);
            return;
        }

        const studentsToSave = selectedCourses.map(student => ({
            id: Math.random().toString(36).substr(2, 9),
            name: student,
            programId
        }));

        // Save to localStorage
        const existingStudents = JSON.parse(localStorage.getItem("students") || "[]");
        const updatedStudents = [...existingStudents, ...studentsToSave];
        localStorage.setItem("students", JSON.stringify(updatedStudents));

        onValidityChange(true);
    };

    useEffect(() => {
        // Update form validity whenever selected students change
        onValidityChange(selectedCourses.length > 0);
    }, [selectedCourses, onValidityChange]);

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
                    <span>Selected Students</span>
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
                            <p className="text-center text-gray-500">No students are selected</p>
                        )}
                    </div>
                </div>

            </div>
            {selectedCourses.length === 0 && (
                <p className="text-red-500 text-sm">Please select at least one student</p>
            )}
        </div>
    );
};

export default CourseSelection;
