// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { ChevronLeft, ChevronRight, Pencil, Copy } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// const PAGE_SIZE = 5;
// const filterOptions = ["Program Name", "Status", "Program ID"];
// const conditionOptions = ["Equals to", "Starts with", "Contains"];

// const ProgramTable = () => {
//     const navigate = useNavigate();
//     const [programs, setPrograms] = useState([]);
//     const [page, setPage] = useState(1);
//     const [search, setSearch] = useState("");
//     const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
//     const [studentName, setStudentName] = useState("");
//     const [successPopup, setSuccessPopup] = useState(false);
//     const [selectedFilter, setSelectedFilter] = useState("Program Name");
//     const [selectedCondition, setSelectedCondition] = useState("Contains");

//     useEffect(() => {
//         const storedPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
//         setPrograms(storedPrograms);
//     }, []);




//     const filterPrograms = (program) => {
//         const value = search.toLowerCase();
//         const field = selectedFilter === "Program Name" ? program.name :
//             selectedFilter === "Status" ? program.state :
//                 program.id.toString();

//         if (selectedCondition === "Equals to") return field.toLowerCase() === value;
//         if (selectedCondition === "Starts with") return field.toLowerCase().startsWith(value);
//         if (selectedCondition === "Contains") return field.toLowerCase().includes(value);
//         return true;
//     };

//     const filteredPrograms = programs.filter(filterPrograms);
//     const totalPages = Math.ceil(filteredPrograms.length / PAGE_SIZE);
//     const startIndex = (page - 1) * PAGE_SIZE;
//     const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + PAGE_SIZE);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleAddStudent = () => {
//         setIsAddStudentOpen(false);
//         setSuccessPopup(true);
//     };

//     return (
//         <div className="p-4">
//             <div >
//                 <div className="flex justify-between ">
//                     <div className="flex items-center mb-4">
//                         <DropdownMenu className="">
//                             <DropdownMenuTrigger asChild>
//                                 <Button variant="outline">{selectedFilter}</Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 {filterOptions.map((option) => (
//                                     <DropdownMenuItem key={option} onClick={() => setSelectedFilter(option)}>
//                                         {option}
//                                     </DropdownMenuItem>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>

//                         <DropdownMenu >
//                             <DropdownMenuTrigger asChild>
//                                 <Button variant="outline">{selectedCondition}</Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 {conditionOptions.map((option) => (
//                                     <DropdownMenuItem key={option} onClick={() => setSelectedCondition(option)}>
//                                         {option}
//                                     </DropdownMenuItem>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>

//                         <Input
//                             placeholder="Search..."
//                             className="w-60"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />

//                     </div>
//                     <div className="flex">
//                             <Button className="bg-blue-600 text-white" onClick={() => navigate("/AddProgramForm")}>+ Add Program</Button>

//                         </div>
//                 </div>

//                 <Table>
//                     <TableHeader>
//                         <TableRow className="bg-[#FFDF9B]">
//                             <TableCell>Program ID</TableCell>
//                             <TableCell>Program Name</TableCell>
//                             <TableCell>Date Created</TableCell>
//                             <TableCell>Organization</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Add Student</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {paginatedPrograms.length > 0 ? (
//                             paginatedPrograms.map((p) => (
//                                 <TableRow key={p.id} >
//                                     <TableCell>{p.id}</TableCell>
//                                     <TableCell><Link to={`/ProgramName/${p.id}`} className="text-blue-600 underline">{p.name}</Link></TableCell>
//                                     <TableCell>{p.date}</TableCell>
//                                     <TableCell>{p.org}</TableCell>
//                                     <TableCell>{p.state}</TableCell>
//                                     <TableCell>
//                                         <Link onClick={() => setIsAddStudentOpen(true)} className="bg-neutral text-blue-700">Add</Link>
//                                     </TableCell>
//                                     <TableCell className="flex space-x-3">
//                                         <Button variant="ghost" size="icon" onClick={() => navigate(`/EditProgram/${p.id}`)}>
//                                             <Pencil className="h-5 w-5 text-blue-600" />
//                                         </Button>
//                                         <Button variant="ghost" size="icon" onClick={() => navigate(`/DuplicateProgram/${p.id}`)}>
//                                             <Copy className="h-5 w-5 text-green-600" />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={7} className="text-center">No programs found.</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>

//                 {totalPages > 1 && (
//                     <div className="flex justify-end items-center mt-6 space-x-2">
//                         <Button variant="ghost" disabled={page === 1} onClick={() => handlePageChange(page - 1)} >
//                             <ChevronLeft className="h-5 w-5" />
//                         </Button>
//                         {[...Array(totalPages)].map((_, index) => (
//                             <Button key={index} variant={page === index + 1 ? "default" : "ghost"} onClick={() => handlePageChange(index + 1)}>
//                                 {index + 1}
//                             </Button>
//                         ))}
//                         <Button variant="ghost" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
//                             <ChevronRight className="h-5 w-5" />
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProgramTable;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Pencil, Copy } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { ChevronLeft, ChevronRight, Pencil, Copy } from "lucide-react";
import AddStudent from "./AddStudent"

const PAGE_SIZE = 5;
const filterOptions = ["Program Name", "Status", "Program ID"];
const conditionOptions = ["Equals to", "Starts with", "Contains"];

const ProgramTable = () => {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
    const [assignedStudents, setAssignedStudents] = useState<{ [key: number]: any[] }>({});

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchStudent, setSearchStudent] = useState("");

    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
    const [currentProgramId, setCurrentProgramId] = useState<number | null>(null);
    const [successPopup, setSuccessPopup] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState("Contains");
    const [addedStudentName, setAddedStudentName] = useState("");


    useEffect(() => {
        const storedPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
        setPrograms(storedPrograms);
    }, []);


    const filterPrograms = (program) => {
        const value = search.toLowerCase();
        const field = selectedFilter === "Program Name" ? program.name :
            selectedFilter === "Status" ? program.state :
                program.id.toString();

        if (selectedCondition === "Equals to") return field.toLowerCase() === value;
        if (selectedCondition === "Starts with") return field.toLowerCase().startsWith(value);
        if (selectedCondition === "Contains") return field.toLowerCase().includes(value);
        return true;
    };
    // Sample students data
    const sampleStudents = [
        { id: 1, name: "sunny", email: "sunny@gmail.com" },
        { id: 2, name: "chandra", email: "chandra@gmail.com" },
        { id: 3, name: "gani", email: "gani@gamil.com" },
        { id: 4, name: "bunny", email: "bunny@gmail.com" },
        { id: 5, name: "steve", email: "steve@gmail.com" }
    ];

    // Load programs from local storage
    useEffect(() => {
        setPrograms(JSON.parse(localStorage.getItem("programs") || "[]"));
    }, []);

    // Load students from sample data
    useEffect(() => {
        setStudents(sampleStudents);
        setFilteredStudents(sampleStudents);
    }, []);

    // Filter students based on search
    useEffect(() => {
        setFilteredStudents(students.filter(student =>
            student.name.toLowerCase().includes(searchStudent.toLowerCase())
        ));
    }, [searchStudent, students]);

    // Pagination
    const filteredPrograms = programs.filter(program =>
        program.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredPrograms.length / PAGE_SIZE);
    const paginatedPrograms = filteredPrograms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("Program Name");

    // Open Add Student Popup
    const openAddStudentPopup = (programId: number) => {
        setCurrentProgramId(programId);
        setIsAddStudentOpen(true);
        setSearchStudent(""); // Reset search when opening modal
        setFilteredStudents(students); // Reset filtered students
    };

    // Add student to program
    const handleAddStudent = (student: any) => {
        if (currentProgramId === null) return;

        setAssignedStudents(prev => ({
            [currentProgramId]: [...(prev[currentProgramId] || []), student]
        }));

        setIsAddStudentOpen(false);
        setSuccessPopup(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };




    return (
        <div className="p-4">
            <div className="flex justify-between ">
                <div className="flex items-center mb-4">
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{selectedFilter}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {filterOptions.map((option) => (
                                <DropdownMenuItem key={option} onClick={() => setSelectedFilter(option)}>
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{selectedCondition}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {conditionOptions.map((option) => (
                                <DropdownMenuItem key={option} onClick={() => setSelectedCondition(option)}>
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Input
                        placeholder="Search..."
                        className="w-60"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
                <div className="flex">
                    <Button className="bg-blue-600 text-white" onClick={() => navigate("/AddProgramForm")}>+ Add Program</Button>

                </div>
            </div>


            <Table>
                <TableHeader>
                    <TableRow className="bg-[#FFDF9B]">
                        <TableCell>Program ID</TableCell>
                        <TableCell>Program Name</TableCell>
                        <TableCell>Date Created</TableCell>
                        <TableCell>Organization</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Add Student</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedPrograms.length > 0 ? (
                        paginatedPrograms.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>
                                    <Link to={`/ProgramName/${p.id}`} className="text-blue-600 underline">
                                        {p.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{p.date}</TableCell>
                                <TableCell>{p.org}</TableCell>
                                <TableCell className={`${p.state === "Active" ? "text-green-500" : "text-red-500"}`}>{p.state}</TableCell>
                                <TableCell>
                                    <Button className="mt-4 border-none shadow-none" variant="outline" onClick={() => setIsPopupOpen(true)} >
                                        Add             </Button>
                                    {/* Popup Dialog */}
                                    <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                                        <DialogContent className="fixed flex flex-col w-full h-max bg-white p-6">
                                            <DialogTitle>Tag Student</DialogTitle>

                                            {/* Render CourseSelection Component */}
                                            <div className="flex-grow overflow-auto">
                                                <AddStudent />
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsPopupOpen(false)}>
                                                    Close
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell className="flex space-x-3">
                                    <Button variant="ghost" size="icon" onClick={() => navigate(`/EditProgram/${p.id}`)}>
                                        <Pencil className="h-5 w-5 text-blue-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => navigate(`/DuplicateProgram/${p.id}`)}>
                                        <Copy className="h-5 w-5 text-green-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">No programs found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Add Student Dialog */}
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                <DialogContent>
                    <DialogTitle>Select a Student</DialogTitle>
                    <Input
                        placeholder="Search student..."
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                        className="mb-4"
                    />
                    <div className="max-h-60 overflow-y-auto">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <div key={student.id} className="flex justify-between p-2 border-b">
                                    <span>{student.name}</span>
                                    <Button variant="outline" onClick={() => handleAddStudent(student)}>Add</Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No students found.</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsAddStudentOpen(false)} className="bg-[#1D1F71]" >Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Popup */}
            <Dialog open={successPopup} onOpenChange={setSuccessPopup}>
                <DialogContent className="text-center">
                    <DialogTitle className="text-[#1D1F71] ">Added</DialogTitle>
                    <p>We have successfully added the student to the course Big Data Tools & Architecture.</p>
                    <DialogFooter>
                        <Button onClick={() => setSuccessPopup(false)} className="bg-[#1D1F71]">Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {totalPages > 1 && (
                <div className="flex justify-end items-center mt-6 space-x-2">
                    <Button variant="ghost" disabled={page === 1} onClick={() => handlePageChange(page - 1)} >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button key={index} variant={page === index + 1 ? "default" : "ghost"} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Button>
                    ))}
                    <Button variant="ghost" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProgramTable;
