package exercise_0.service;

import exercise_0.model.Student;

import java.io.IOException;


public interface IStudentService {
    void addStudent() throws IOException;
    void displayAllStudent() throws IOException;
    void removeStudent();
    void searchByBiologicalId();
    void searchByBiologicaName();
    void sortStudent();
}
