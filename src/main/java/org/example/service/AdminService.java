package org.example.service;

import org.example.entity.PickupRequest;
import org.example.entity.Recycler;
import org.example.repository.PickupRepository;
import org.example.repository.RecyclerRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PickupRepository pickupRepository;

    @Autowired
    private RecyclerRepository recyclerRepository;

    public Iterable<PickupRequest> getAllPickups(){
        return pickupRepository.findAll();
    }
    public PickupRequest assignRecycler( Long pickupId, Long recyclerId){
        PickupRequest pickup = pickupRepository.findById(pickupId).orElseThrow(() -> new ResourceNotFoundException("Pickup Not Found"));
        Recycler recycler = recyclerRepository.findById(recyclerId).orElseThrow(() -> new ResourceNotFoundException("Recycler Not Found"));
        pickup.setRecycler(recycler);
        pickup.setStatus("Assigned");
        return pickupRepository.save(pickup);
    }
}
