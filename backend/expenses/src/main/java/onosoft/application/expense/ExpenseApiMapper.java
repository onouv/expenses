package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.expense.dto.*;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyApiMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.domain.model.PaymentStatus;
import onosoft.ports.driving.expense.ExpenseData;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class ExpenseApiMapper {

    @Inject
    MoneyApiMapper moneyApiMapper;

    @Inject
    MoneyDataMapper moneyDataMapper;

    public Expense fromPlannedExpenseDto(PlannedExpenseDto dto, Account account)
            throws AmountExceedsRangeException {
        if (!Objects.equals(account.getAccountNo(), dto.getAccountNo())) {
            throw new IllegalArgumentException("Account and assigned Expense have different account numbers.");
        }
        return Expense.builder()
                .account(account)
                .recipient(dto.getRecipient())
                .purpose(dto.getPurpose())
                .amount(moneyApiMapper.dtoToDomain(dto.getAmount()))
                .accruedDate(dto.getAccruedDate())
                .paymentDate(dto.getPaymentDate())
                .invoiced(dto.isInvoiced())
                .paymentType(dto.getPaymentType())
                .paymentStatus(PaymentStatus.Planned)
                .build();
    }

    public PlannedExpenseResponseDto toPlannedResponseDto(Expense domain) {
        return PlannedExpenseResponseDto.builder()
                .expenseId(domain.getExpenseId())
                .accountNo(domain.getAccount().getAccountNo())
                .paymentDate(domain.getPaymentDate())
                .paymentType(domain.getPaymentType())
                .isInvoiced(domain.isInvoiced())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .build();
    }
    public ExpenseInfoDto toExpenseInfoDto(Expense domain) {
        return ExpenseInfoDto
                .builder()
                .expenseId(domain.getExpenseId())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .build();
    }

    public List<ExpenseInfoDto> toExpenseInfoDtoList(List<ExpenseData> data)
            throws AmountExceedsRangeException {
        List<ExpenseInfoDto> dtos = new ArrayList<>();
        Iterator<ExpenseData> iter = data.iterator();

        while(iter.hasNext()) {
            dtos.add(dataToExpenseInfo(iter.next()));
        }
        return dtos;
    }

    private ExpenseInfoDto dataToExpenseInfo(ExpenseData data)
            throws AmountExceedsRangeException {
        return ExpenseInfoDto
                .builder()
                .expenseId(data.getId())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(moneyApiMapper
                        .domainToDto(moneyDataMapper.dataToDomain(data.getAmount())))
                .accruedDate(data.getAccruedDate())
                .build();
    }

}
