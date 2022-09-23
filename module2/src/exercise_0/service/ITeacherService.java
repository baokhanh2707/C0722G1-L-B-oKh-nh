package exercise_0.service;

import exercise_0.model.Teacher;

public interface ITeacherService {
    void addTeacher();

    void displayAllTeacher();

    void removeTeacher();

    void searchByBiologicalId();

    void searchByBiologicaName();

    void sortTeacher();
}
