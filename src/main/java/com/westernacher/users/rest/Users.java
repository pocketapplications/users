package com.westernacher.users.rest;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import com.westernacher.users.data.User;
import com.westernacher.users.data.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest-api/")
@CrossOrigin
public class Users {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/users")
	public List<User> listUsers() {
		Iterator<User> result = userRepository.findAll().iterator();
		List<User> users = new LinkedList<>();
		while (result.hasNext()) {
			users.add(result.next());
		}

		return users;
	}

	@PostMapping(path = "/users", consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public User addUser(@RequestBody User user) {
		user.setId(null);
		return userRepository.save(user);
	}

	@PutMapping(path = "/users/{id}", consumes = "application/json")
	public User updateUser(@PathVariable Long id, @RequestBody User user) {
		user.setId(id);
		return userRepository.save(user);
	}

	@DeleteMapping("users/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable Long id) {
		userRepository.deleteById(id);
	}

	@PostMapping("/users:delete")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUsers(@RequestParam("id") Long[] ids) {
		for (Long id : ids) {
			this.userRepository.deleteById(id);
		}
	}

}
