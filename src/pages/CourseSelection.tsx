import React, { useState, DragEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X } from "lucide-react";

const availableCourses = ["Course A", "Course B", "Course C", "Course D", "Course E"];
const defaultSelectedCourses = ["Course A", "Course B"]; // Add default selected courses here

const CourseSelection = () => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>(defaultSelectedCourses);
    const [filteredCourses, setFilteredCourses] = useState(
        availableCourses.filter(course => !defaultSelectedCourses.includes(course))
    );

    const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleCourseSelect = (course: string) => {
        setSelectedCourses([...selectedCourses, course]);
        setFilteredCourses(filteredCourses.filter(c => c !== course));
    };

    const handleCourseRemove = (course: string) => {
        setFilteredCourses([...filteredCourses, course]);
        setSelectedCourses(selectedCourses.filter(c => c !== course));
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, course: string, fromSelected: boolean = false) => {
        event.dataTransfer.setData("text/plain", course);
        event.dataTransfer.setData("fromSelected", String(fromSelected));
        setDraggedCourse(course);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index?: number) => {
        event.preventDefault();
        if (index !== undefined) {
            setDragOverIndex(index);
        }
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, isSelectedArea: boolean, dropIndex?: number) => {
        event.preventDefault();
        setDragOverIndex(null);

        const course = event.dataTransfer.getData("text/plain");
        const fromSelected = event.dataTransfer.getData("fromSelected") === "true";

        if (!course) return;

        // Reordering within Selected Courses
        if (fromSelected && isSelectedArea && dropIndex !== undefined) {
            const currentIndex = selectedCourses.findIndex(c => c === course);
            if (currentIndex === -1) return;

            // Create new array without the dragged course
            const newSelectedCourses = [...selectedCourses];
            newSelectedCourses.splice(currentIndex, 1);

            // Insert at the new position
            newSelectedCourses.splice(dropIndex, 0, course);
            setSelectedCourses(newSelectedCourses);
        }
        // Moving from Available to Selected
        else if (!fromSelected && isSelectedArea) {
            if (!selectedCourses.includes(course)) {
                handleCourseSelect(course);
            }
        }
        // Moving from Selected to Available
        else if (fromSelected && !isSelectedArea) {
            if (!filteredCourses.includes(course)) {
                handleCourseRemove(course);
            }
        }

        setDraggedCourse(null);
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Tag Courses</h3>
            <div className="flex flex-col md:flex-row gap-4 border p-4 rounded-md">
                <div className="w-full md:w-1/2 space-y-2">
                    <span>Courses to Select</span>
                    <Input
                        placeholder="Search courses..."
                        className="w-full"
                    />
                    <div className="border h-40 sm:h-60 overflow-auto rounded-md">
                        {filteredCourses.map((course) => (
                            <div
                                key={course}
                                className="flex justify-between items-center p-2 border-b"
                                draggable
                                onDragStart={(e) => handleDragStart(e, course, false)}
                            >
                                <span>{course}</span>
                                <Button variant="ghost" onClick={() => handleCourseSelect(course)}>+</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-2">
                    <span>Selected Courses</span>
                    <p className="text-sm text-gray-500">Drag to arrange the sequence of courses.</p>
                    <div className="border h-40 sm:h-60 overflow-auto rounded-md">
                        {selectedCourses.length > 0 ? (
                            selectedCourses.map((course, index) => (
                                <div
                                    key={course}
                                    className={`flex justify-between items-center p-2 border-b ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''
                                        } ${draggedCourse === course ? 'opacity-50' : ''}`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, course, true)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, true, index)}
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