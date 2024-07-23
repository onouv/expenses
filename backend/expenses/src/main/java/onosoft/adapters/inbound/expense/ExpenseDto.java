package onosoft.adapters.inbound.expense;

import onosoft.domain.model.PaymentStatus;
import onosoft.domain.model.PaymentType;

public record ExpenseDto(
        String purpose,
        PaymentType type,
        PaymentStatus status,
        double amount,
        String currency) {}


