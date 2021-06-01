package com.springboot.ToDo.repository;

import com.springboot.ToDo.modal.ToDo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<ToDo, Integer> {

    Page<ToDo> findAllByUserId(int userId, Pageable pageRequest);

}
