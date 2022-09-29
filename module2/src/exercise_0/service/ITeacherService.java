package exercise_0.service;

import exercise_0.model.Teacher;

import java.io.IOException;

public interface ITeacherService {
    void addTeacher() throws IOException;

    void displayAllTeacher() throws IOException;

    void removeTeacher();

    void searchByBiologicalId();

    void searchByBiologicaName();

    void sortTeacher();
}
