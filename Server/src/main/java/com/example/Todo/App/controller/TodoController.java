package com.example.Todo.App.controller;

import com.example.Todo.App.modal.*;
import com.example.Todo.App.repository.TaskRepository;
import com.example.Todo.App.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    @Autowired
    TodoService todoService;

    @Autowired
    TaskRepository taskRepository;

    //display the users
    @GetMapping("/users")
    public List<Users> ListofUsers() {
        return todoService.usersDetails();
    }

    //add the users details
    @PostMapping("/users")
    public ResponseEntity<?> RegisteredUsers(@RequestBody Users user) {
        Users user1 = todoService.regiteredUsers(user);
        if (user1 != null) {
            UserResponseDTO response = new UserResponseDTO(
                    user,
                    "Congratulations!" + user.getUserName() + " Successfully Created an account ! ",
                    "success",
                    200
            );
            return ResponseEntity.ok(response);  // ✅ send full user details as JSON
        } else {
            UserResponseDTO response = new UserResponseDTO(
                    null,
                    "Failed to create an account",
                    "fail",
                    401
            );
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);


        }
    }

    //  now login - check the user exist or not
    @PostMapping("/users/login")
    public ResponseEntity<?> LoginUsers(@RequestBody LoginRequest loginRequest) {
        Users user = todoService.loginCheck(loginRequest);

        if (user != null) {
            UserResponseDTO response = new UserResponseDTO(
                    user,
                    user.getUserName() + " has successfully logged in!",
                    "success",
                    200
            );
            return ResponseEntity.ok(response);  // ✅ send full user details as JSON
        } else {
            UserResponseDTO response = new UserResponseDTO(
                    null,
                    "Invalid Email or password",
                    "fail",
                    401
            );
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);

        }
    }

    //display the users
    @GetMapping("/users/task")
    public List<Task> ListofTask() {
        return todoService.ListofTask();
    }

    //  then  display the each users all tasks
    @GetMapping("/users/task/{userId}")
    public List<Task> ListofAllTasks(@PathVariable("userId") Integer userId) {
        return todoService.allTasks(userId);
    }

    //add the task
    @PostMapping("users/addTask")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        System.out.println("Received task: " + task);
        Task savedTask = todoService.addTask(task);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
// return new ResponseEntity<>(todoService.addTask(task), HttpStatus.CREATED);
    }


    //    Update the task
    @PutMapping("users/update")
    public ResponseEntity<?> updateTask(@RequestBody TaskResponse request) {
//            String result = todoService.updateTask(request);
        Task updatedTask = todoService.updateTask(request);
        if (updatedTask != null) {
            UserResponseDTO response = new UserResponseDTO(
                    updatedTask,
                    "Task Updated Successfully",
                    "success",
                    200
            );
            return ResponseEntity.ok(response);  // ✅
        } else {
            UserResponseDTO response = new UserResponseDTO(
                    null,
                    "Task Updated Failed or User not Found",
                    "error",
                    401
            );
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);

        }


    }

    //    Delete the task
    @DeleteMapping("users/deleteTask/{id}")
    public String deleteTask(@PathVariable Integer id) {
        todoService.deleteTask(id);
        return "Task Deleted Successfully !!";

    }

    //    update status for the task
    @PutMapping("task/updateStatus/{taskId}")
    public ResponseEntity<UserResponseDTO> markTaskCompleted(@PathVariable int taskId) {
        boolean isUpdated = todoService.taskCompletedStatus(taskId);

        if (isUpdated) {
            Task task = taskRepository.getTaskById(taskId).orElse(null);
            UserResponseDTO response = new UserResponseDTO(
                    task,
                    "Task Completed Successfully ..",
                    "success",
                    200
            );
            return ResponseEntity.ok(response);
        } else {
            UserResponseDTO response = new UserResponseDTO(
                    null,
                    "Task Completed Failed ..",
                    "error",
                    401
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }


    }

}

