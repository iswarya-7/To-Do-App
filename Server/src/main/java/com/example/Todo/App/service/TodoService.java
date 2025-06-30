package com.example.Todo.App.service;

import com.example.Todo.App.modal.LoginRequest;
import com.example.Todo.App.modal.Task;
import com.example.Todo.App.modal.TaskResponse;
import com.example.Todo.App.modal.Users;
import com.example.Todo.App.repository.TaskRepository;
import com.example.Todo.App.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    TodoRepository usersRepository;

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


//    private BCryptPasswordEncoder encoder= new BCryptPasswordEncoder();

    public List<Users> usersDetails() {
        return usersRepository.findAll();
    }

    public Users regiteredUsers(Users user) {

//        user.setPassword(encoder.encode(user.getPassword()));

        //Encrypt the password before saving
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        Users user1 = usersRepository.save(user);
        return user1;

    }

    //    login -if the user is there or not
    public Users loginCheck(LoginRequest loginrequest) {

        Users user = usersRepository.findByUserMail(loginrequest.getEmail()).orElse(null);

        if (user != null && passwordEncoder.matches(loginrequest.getPassword(), user.getPassword())) {
            return user;
        }
        return null;


    }

    public List<Task> allTasks(Integer userId) {
        return taskRepository.findByUser_userId(userId);

    }


    public Task addTask(Task task) {
        int userId = task.getUser().getuserId();
        Users user = usersRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task updateTask(TaskResponse request) {
        Optional<Task> optionalTask = taskRepository.findById(request.getId());

        if (optionalTask.isEmpty()) {
            return null;
        }
//        set the new task to existing task
        Task task = optionalTask.get();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setDueTime(request.getDueTime());


        Users user = usersRepository.findById(request.getUserId()).orElse(null);
        if (user == null) {
            return null;
        }

        task.setUser(user);
        return taskRepository.save(task);

    }


//    update the existing task
//    public void updateTask(int id, Task updatedTask) {
//        Task existing = taskRepository.findById(id).orElseThrow(() -> new RuntimeException ("There is no task updated"));
//        existing.setTitle(updatedTask.getTitle());
//        existing.setDescription(updatedTask.getDescription());
//        existing.setDueDate(updatedTask.getDueDate());
//        existing.setDueTime(updatedTask.getDueTime());
//
//        taskRepository.save(existing);
//    }

    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    public List<Task> ListofTask() {
        return taskRepository.findAll();
    }


    public boolean taskCompletedStatus(int taskId) {
        Optional<Task> taskopt = taskRepository.getTaskById(taskId);

        if(taskopt.isPresent()){
            Task task=taskopt.get();
            task.setStatus("Completed");
            taskRepository.save(task);
            return true;
        }
        return false;
    }
}
