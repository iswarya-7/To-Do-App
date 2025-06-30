package com.example.Todo.App.modal;

import lombok.Data;

@Data
public class TaskResponse {
    private int id;
    private String title;
    private String description;
    private String dueDate;
    private String dueTime;
    private int userId;

    public TaskResponse(int id, String title, String description, String dueDate, String dueTime, int userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.userId = userId;
    }
}
