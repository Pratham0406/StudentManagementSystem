package com.prathamesh.Student_Management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="studentmanagement")
public class Student {

    @Id
    private int rollNo;
    private String firstName;
    private String lastName;
    private String email;
}
