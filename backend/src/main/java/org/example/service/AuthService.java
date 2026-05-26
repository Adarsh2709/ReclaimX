package org.example.service;

import org.example.dto.AuthRequest;
import org.example.dto.AuthResponse;
import org.example.dto.RegisterRequest;
import org.example.entity.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            return "Email already exist";
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());
        userRepository.save(user);
        return "User Registered Successfully";
    }

    public AuthResponse login(AuthRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
