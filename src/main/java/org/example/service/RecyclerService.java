package org.example.service;

import org.example.entity.PickupHistory;
import org.example.entity.PickupRequest;
import org.example.entity.Recycler;
import org.example.repository.PickupHistoryRepository;
import org.example.repository.PickupRepository;
import org.example.repository.RecyclerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RecyclerService {

    @Autowired
    private PickupRepository pickupRepository;

    @Autowired
    private RecyclerRepository recyclerRepository;

    @Autowired
    private PickupHistoryRepository pickuphistoryRepository;

    public Recycler createRecyler(Recycler recycler){
        return recyclerRepository.save(recycler);
    }

    public Iterable<Recycler> getAllRecyclers() {
        return recyclerRepository.findAll();
    }

    public PickupRequest acceptPickup(Long pickupId){
        PickupRequest pickup = pickupRepository.findById(pickupId)
                .orElseThrow(()->new ResourceNotFoundException("Pickup Not Found"));
        pickup.setStatus("Collected");
        PickupHistory history = new PickupHistory();
        history.setPickupId(pickupId);
        history.setStatus("COLLECTED");
        history.setUpdatedAt(LocalDateTime.now());
        pickuphistoryRepository.save(history);
        return pickupRepository.save(pickup);
    }

    public PickupRequest recyclePickup(Long pickupId){
        PickupRequest pickup = pickupRepository.findById(pickupId)
                .orElseThrow(()->new ResourceNotFoundException("Pickup Not Found"));
        pickup.setStatus("Recycled");
        PickupHistory history = new PickupHistory();
        history.setPickupId(pickupId);
        history.setStatus("Recycled");
        history.setUpdatedAt(LocalDateTime.now());
        pickuphistoryRepository.save(history);
        return pickupRepository.save(pickup);
    }
}
