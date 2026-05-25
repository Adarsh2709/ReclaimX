package org.example.controller;

import org.example.entity.PickupRequest;
import org.example.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public Iterable<?> users(){
        return adminService.getAllPickups();
    }

    @GetMapping("/pickups")
    public Iterable<PickupRequest> pickups(){
        return adminService.getAllPickups();
    }

    @PutMapping("/assign/{pickupId}/{recycleId}")
    public PickupRequest assign(@PathVariable Long pickupId, @PathVariable Long recyclerId){
        return adminService.assignRecycler(pickupId,recyclerId);
    }
}
