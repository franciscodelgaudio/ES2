package com.es2.equipe4.dto;

import java.math.BigDecimal;

public record CreateManagerDTO(
        String email,
        String name,
        String password,
        String address,
        String phoneManager,
        String roleManager
) {}