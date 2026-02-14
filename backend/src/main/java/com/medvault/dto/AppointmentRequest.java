package com.medvault.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AppointmentRequest {
    private UUID doctorId;
    private String date;
    private String notes;
}
