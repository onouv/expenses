package onosoft.application.expense;

import onosoft.adapters.driven.expense.dto.*;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyApiMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.expense.ExpenseData;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExpenseApiMapper {
    public static Expense fromPlannedExpenseDto(PlannedExpenseDto dto)
            throws AmountExceedsRangeException {
        return Expense.builder()
                .accountNo(dto.getAccountNo())
                .paymentDate(dto.getPaymentDate())
                .paymentType(dto.getPaymentType())
                .invoiced(dto.isInvoiced())
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

    public static List<ExpenseInfoDto> toExpenseInfoDtoList(List<ExpenseData> data)
            throws AmountExceedsRangeException {
        List<ExpenseInfoDto> dtos = new ArrayList<>();
        Iterator<ExpenseData> iter = data.iterator();

        while(iter.hasNext()) {
            dtos.add(ExpenseApiMapper.dataToExpenseInfo(iter.next()));
        }
        return dtos;
    }

    private static ExpenseInfoDto dataToExpenseInfo(ExpenseData data)
            throws AmountExceedsRangeException {
        return ExpenseInfoDto
                .builder()
                .expenseId(data.getId())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(MoneyApiMapper
                        .domainToDto(MoneyDataMapper
                                .dataToDomain(data.getAmount())))
                .accruedDate(data.getAccruedDate())
                .build();
    }

}
