import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X } from "lucide-react";

const availableCourses = ["Sunny ", "Bhanu", "Ramu royal", "Sami", "Shankar", "Shiva", "Pardhu"];
const defaultSelectedCourses: string[] = []; // Changed to empty array initially

interface AddStudentProps {
    onValidityChange: (isValid: boolean) => void;
}

const AddStudent = ({ onValidityChange }: AddStudentProps) => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(availableCourses);

    const handleCourseSelect = (course: string) => {
        const newSelected = [...selectedCourses, course];
        setSelectedCourses(newSelected);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
        onValidityChange(newSelected.length > 0);
    };

    const handleCourseRemove = (course: string) => {
        const newSelected = selectedCourses.filter(c => c !== course);
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(newSelected);
        onValidityChange(newSelected.length > 0);
    };

    return (
        <div>
            <div className="flex space-x-4 border p-4 rounded-md">
                <div className="w-1/2">
                    <span>Students to Select</span>
                    <Input
                        placeholder="Search student..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilteredCourses(availableCourses.filter(c => 
                                c.toLowerCase().includes(e.target.value.toLowerCase()) &&
                                !selectedCourses.includes(c)
                            ))
                        }
                    />
                    <div className="border h-40 overflow-auto p-2 mt-2">
                        {filteredCourses.map((course) => (
                            <div
                                key={course}
                                className="flex justify-between items-center p-2 border-b"
                            >
                                <span>{course}</span>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => handleCourseSelect(course)}
                                >
                                    +
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/2">
                    <span>Selected Students</span>
                    <p className="text-sm text-gray-500">
                        {selectedCourses.length > 0 
                            ? `${selectedCourses.length} student(s) selected` 
                            : 'Please select at least one student'}
                    </p>
                    <div className="border h-40 overflow-auto p-2 mt-2">
                        {selectedCourses.length > 0 ? (
                            selectedCourses.map((course) => (
                                <div
                                    key={course}
                                    className="flex justify-between items-center p-2 border-b"
                                >
                                    <span>{course}</span>
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => handleCourseRemove(course)}
                                    >
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

export default AddStudent;
