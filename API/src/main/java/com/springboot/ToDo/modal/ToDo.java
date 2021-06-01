package com.springboot.ToDo.modal;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;


@Entity
@Table(name="toDo")
@Data
public class ToDo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int tId;
	
	@ManyToOne
	@JoinColumn
	@ToString.Exclude
	private User user;
	
	private String description;
}
