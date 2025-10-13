package com.prathamesh.Student_Management.controller;

import com.prathamesh.Student_Management.model.Student;
import com.prathamesh.Student_Management.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }

    @PostMapping("/{rollNO}")
    public Student updateStudent(@PathVariable int rollNo, @RequestBody Student student){
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/{rollNo}")
    public String deleteStudent(@PathVariable int rollNo) {
        studentService.deleteStudent(rollNo);
        return "Student with Roll No " + rollNo + " deleted successfully!";
    }
}
