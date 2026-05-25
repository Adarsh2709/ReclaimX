package org.example.controller;

import org.example.dto.PickupRequestDto;
import org.example.entity.PickupRequest;
import org.example.repository.PickupRepository;
import org.example.service.PickupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pickup")
public class PickupController {

    @Autowired
    private PickupService pickupService;

    @PostMapping
    public String creatPickup(@RequestBody PickupRequestDto pickupRequestDto){
        return pickupService.creatPickup(pickupRequestDto);
    }

    @GetMapping
    public Iterable<PickupRequest> getAllPickups(){
        return pickupService.getAllPickups();
    }

    @GetMapping("/{id}")
    public PickupRequest getPickupById(@PathVariable Long id){
        return pickupService.getPickupById(id);
    }

    @DeleteMapping("/{id}")
    public String deletePickup(@PathVariable Long id){
        return pickupService.deletePickup(id);
    }
}
