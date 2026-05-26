package org.example.controller;

import org.example.entity.PickupRequest;
import org.example.entity.Recycler;
import org.example.service.RecyclerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recycler")
public class RecyclerController {

    @Autowired
    private RecyclerService recyclerService;

    @PostMapping
    public Recycler creatRecycler(@RequestBody Recycler recycler){
        return recyclerService.createRecyler(recycler);
    }

    @GetMapping
    public Iterable<Recycler> getAllRecycler(){
        return recyclerService.getAllRecyclers();
    }

    @PutMapping("/accept/{id}")
    public PickupRequest accept(@PathVariable Long id){
        return recyclerService.acceptPickup(id);
    }

    @PutMapping("/collect/{id}")
    public PickupRequest collect(@PathVariable Long id){
        return recyclerService.collectPickup(id);
    }

    @PutMapping("/recycle/{id}")
    public PickupRequest recycle(@PathVariable Long id){
        return recyclerService.recyclePickup(id);
    }
}
