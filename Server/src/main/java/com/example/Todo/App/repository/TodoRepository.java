package com.example.Todo.App.repository;

import com.example.Todo.App.modal.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Users, Integer> {

    //    custom method for fetching the technology wise searching data
    Optional<Users> findByUserMail(String user_mail);
}

