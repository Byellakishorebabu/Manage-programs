import React, { useState, DragEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X,  } from "lucide-react";

const availableCourses = ["Course A", "Course B", "Course C", "Course D", "Course E"];
const defaultSelectedCourses = ["Course A", "Course B"]; // Add default selected courses here

const CourseSelection = () => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );

    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };

    const handleCourseRemove = (course: string) => {
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(selectedCourses.filter(c => c !== course));
    };

    const handleDragStart = (event: DragEvent<HTMLDivElement>, course: string) => {
        event.dataTransfer.setData("text/plain", course);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>, isAdding: boolean) => {
        event.preventDefault();
        const course = event.dataTransfer.getData("text/plain");
        if (course) {
            if (isAdding && !selectedCourses.includes(course)) {
                handleCourseSelect(course);
            } else if (!isAdding && !filteredCourses.includes(course)) {
                handleCourseRemove(course);
            }
        }
    };

    return (
        <div >
            <h3 className="text-lg font-semibold">Tag Courses</h3>
            <div className="flex space-x-4 border p-4 rounded-md">
                <div className="w-1/2">
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
                </div>

                <div className="w-1/2">
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
                </div>

            </div>
        </div>
    );
};

export default CourseSelection;
