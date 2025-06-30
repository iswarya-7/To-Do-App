package com.example.Todo.App.modal;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Users {
    @Id //primary key
    @Column(name = "userId") // 🔥 This is VERY important!
    @GeneratedValue(strategy = GenerationType.IDENTITY) //used to generate a id [auto-increment]
    private int userId;
    private String userName;
    private String userMail;
    private String password;

    public int getuserId() {
        return userId;
    }

    public void setuserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    constructor for pass a value
    public Users( String userName, String userMail, String password) {
        this.userName = userName;
        this.userMail = userMail;
        this.password = password;
    }

//    empty constructor
    public Users() {
    }
}
