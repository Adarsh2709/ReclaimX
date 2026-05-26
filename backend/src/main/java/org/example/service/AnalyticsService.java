package org.example.service;

import org.example.entity.PickupRequest;
import org.example.repository.PickupRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PickupRepository pickupRepository;

    public String getAnalytics(){
        long users = userRepository.count();
        long pickups = pickupRepository.count();
        long recycled = 0;
        long pending = 0;
        for(PickupRequest i : pickupRepository.findAll()){
            if("Recycled".equals(i.getStatus())){
                recycled++;
            }
            else{
                pending++;
            }
        }
        return """
                Total Users : %d
                Total Pickups : %d
                Pending : %d
                Recycled : %d
                """.formatted(
                users,
                pickups,
                pending,
                recycled
        );
    }
}
