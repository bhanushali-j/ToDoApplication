package com.springboot.ToDo.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.ToDo.dto.ToDoDTO;
import com.springboot.ToDo.dto.ToDoInDTO;
import com.springboot.ToDo.exceptions.NotFoundException;
import com.springboot.ToDo.modal.ToDo;
import com.springboot.ToDo.modal.User;
import com.springboot.ToDo.repository.ToDoRepository;
import com.springboot.ToDo.repository.UserRepository;

@Service
public class ToDoService {

    @Autowired
    ToDoRepository toDoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelmapper;

    public ToDoDTO createToDo(ToDoInDTO toDoInDTO) {
        // Retrieve the corresponding User
        User user = userRepository.findById(toDoInDTO.getUserId()).get();
        System.out.println("a :"+user);

        // DTO to Entity
        ToDo toDo = modelmapper.map(toDoInDTO, ToDo.class);
        System.out.println("b: "+toDo);
        toDo.setUser(user);
        toDoRepository.save(toDo);

        // Entity to DTO
        return modelmapper.map(toDo, ToDoDTO.class);
    }

    public void deleteToDo(int id) {
        toDoRepository.deleteById(id);
    }

    public ToDoDTO updateTodo(ToDoDTO toDoDTO) {
        ToDo toDo = toDoRepository.findById(toDoDTO.getId()).orElseThrow(()-> new NotFoundException("User not found with id:"+toDoDTO.getId()));
            toDo.setDescription(toDoDTO.getDescription());
            ToDo updatedToDo = toDoRepository.save(toDo);
            return modelmapper.map(updatedToDo, ToDoDTO.class);
    }

    public Page<ToDoDTO> getAllToDos(int id, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<ToDo> pagedToDo = toDoRepository.findAllByUserId(id, paging);
        return pagedToDo.map(toDo -> modelmapper.map(toDo, ToDoDTO.class));
    }

}
