package onosoft.application.expense;

import onosoft.adapters.driven.expense.*;
import onosoft.adapters.driven.expense.dto.*;
import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Expense;

public class ExpenseApiMapper {
    public static Expense fromPlannedExpenseDto(PlannedExpenseDto dto)
            throws AmountExceedsRangeException {
        return Expense.builder()
                .accountNo(dto.getAccountNo())
                .paymentDate(dto.getPaymentDate())
                .paymentType(dto.getPaymentType())
                .isInvoiced(dto.isInvoiced())
                .recipient(dto.getRecipient())
                .purpose(dto.getPurpose())
                .amount(MoneyApiMapper.dtoToDomain(dto.getAmount()))
                .accruedDate(dto.getAccruedDate())
                .build();
    }

    public static PlannedExpenseResponseDto toPlannedResponseDto(Expense domain) {
        return PlannedExpenseResponseDto.builder()
                .expenseId(domain.getExpenseId())
                .accountNo(domain.getAccountNo())
                .paymentDate(domain.getPaymentDate())
                .paymentType(domain.getPaymentType())
                .isInvoiced(domain.isInvoiced())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(MoneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .build();
    }
    public static ExpenseInfoDto toExpenseInfoDto(Expense domain) {
        return ExpenseInfoDto
                .builder()
                .expenseId(domain.getExpenseId())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(MoneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .build();
    }
}
