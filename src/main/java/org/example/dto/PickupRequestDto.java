package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PickupRequestDto {
    private String itemType;
    private String description;
    private double weight;
    private String pickupAddress;
    private LocalDate pickupDate;
}
