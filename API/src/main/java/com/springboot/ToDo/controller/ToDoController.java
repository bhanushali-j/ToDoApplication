package com.springboot.ToDo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ToDo.dto.ToDoDTO;
import com.springboot.ToDo.dto.ToDoInDTO;
import com.springboot.ToDo.service.ToDoService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("todos")
@CrossOrigin(origins = "http://localhost:4200")
public class ToDoController {

    @Autowired
    private final ToDoService toDoService;

    @PostMapping
    public ResponseEntity<ToDoDTO> createToDo(@RequestBody ToDoInDTO toDoInDTO) {
        ToDoDTO toDoDTO = toDoService.createToDo(toDoInDTO);
        System.out.println("c :"+toDoDTO);
        return new ResponseEntity<>(toDoDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ToDoDTO>> getAllToDos(
            @RequestParam("id") int userId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        Page<ToDoDTO> toDoDTOPage = toDoService.getAllToDos(userId, pageNo, pageSize);
        return new ResponseEntity<>(toDoDTOPage, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ToDoDTO> updateTodo(@RequestBody ToDoDTO toDoDTO) {
        ToDoDTO updatedToDoDTO = toDoService.updateTodo(toDoDTO);
        return new ResponseEntity<>(updatedToDoDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTodo(@PathVariable int id) {
        toDoService.deleteToDo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
