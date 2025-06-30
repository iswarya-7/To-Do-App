package com.example.Todo.App.repository;

import com.example.Todo.App.modal.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    //    find the tasks by userId
    List<Task> findByUser_userId(Integer userId);

    //    to mark the completed task
    Optional<Task> getTaskById(Integer id);


}
