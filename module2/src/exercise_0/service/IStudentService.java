package exercise_0.service;

import exercise_0.model.Student;


public interface IStudentService {
    void addStudent() ;
    void displayAllStudent();
    void removeStudent();
    void searchByBiologicalId();
    void searchByBiologicaName();
    void sortStudent();
}
