package org.example.repository;

import org.example.entity.PickupRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickupRepository extends CrudRepository<PickupRequest, Long> {

}
