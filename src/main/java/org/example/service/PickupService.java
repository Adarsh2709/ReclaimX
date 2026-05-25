package org.example.service;

import org.example.dto.PickupRequestDto;
import org.example.entity.PickupRequest;
import org.example.exception.ResourceNotFoundException;
import org.example.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PickupService {

    @Autowired
    private PickupRepository pickupRepository;

    public String creatPickup(PickupRequestDto pickupRequestDto){
        PickupRequest pickupRequest = new PickupRequest();
        pickupRequest.setItemType(pickupRequestDto.getItemType());
        pickupRequest.setDescription(pickupRequestDto.getDescription());
        pickupRequest.setWeight(pickupRequestDto.getWeight());
        pickupRequest.setPickupAddress(pickupRequestDto.getPickupAddress());
        pickupRequest.setPickupDate(pickupRequestDto.getPickupDate());
        pickupRequest.setStatus("PENDING");
        pickupRepository.save(pickupRequest);
        return "Pickup Request Created";
    }

    public Iterable<PickupRequest> getAllPickups(){
        return pickupRepository.findAll();
    }

    public PickupRequest getPickupById(Long id){
        return pickupRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Pickup Not Found"));
    }

    public String deletePickup(Long id){
        pickupRepository.deleteById(id);
        return "Deleted Successfully!";
    }

}
