package com.prathamesh.Student_Management.service;

import com.prathamesh.Student_Management.model.Student;
import com.prathamesh.Student_Management.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(int rollNo) {
        studentRepository.deleteById(rollNo);
    }

    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }
}

