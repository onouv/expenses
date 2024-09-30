package onosoft.adapters.driven.expense;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import onosoft.adapters.driven.commons.money.MoneyDto;

import java.util.Date;

public record ExpenseDto(
        MoneyDto amount,

        @Size(max = 120)
        String purpose,
        Date accrued
) {}
