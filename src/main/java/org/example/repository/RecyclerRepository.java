package org.example.repository;

import org.example.entity.Recycler;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclerRepository extends CrudRepository<Recycler,Long>{

}
