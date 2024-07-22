package online.onosoft.adapters.inbound.expense;

import online.onosoft.domain.model.PaymentStatus;
import online.onosoft.domain.model.PaymentType;

public record ExpenseDto(
        String purpose,
        PaymentType type,
        PaymentStatus status,
        double amount,
        String currency) {}


