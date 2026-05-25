package org.example.repository;

import org.example.entity.PickupHistory;
import org.springframework.data.repository.CrudRepository;

public interface PickupHistoryRepository extends CrudRepository<PickupHistory,Long> {
}
