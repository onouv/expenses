package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.expense.dto.*;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyApiMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.domain.model.ExpenseStatus;
import onosoft.adapters.driving.expense.ExpenseJpaData;

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

    public Expense assignmentDtoToDomain(AssignExpenseRequestDto dto, Account account)
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
                .paymentTargetDate(dto.getPaymentTargetDate())
                .paymentType(dto.getPaymentType())
                .isInvoiced(dto.isInvoiced())
                .expenseStatus(ExpenseStatus.Planned)
                .build();
    }

    public Expense entityDtoToDomain(ExpenseEntityDto dto, Account account) throws AmountExceedsRangeException {
        return Expense.builder()
                .account(account)
                .recipient(dto.getRecipient())
                .purpose(dto.getPurpose())
                .amount(moneyApiMapper.dtoToDomain(dto.getAmount()))
                .accruedDate(dto.getAccruedDate())
                .paymentTargetDate(dto.getPaymentTargetDate())
                .paymentActualDate(dto.getPaymentActualDate())
                .paymentType(dto.getPaymentType())
                .isInvoiced(dto.isInvoiced())
                .expenseStatus(ExpenseStatus.Planned)
                .build();
    }

    public ExpenseEntityDto domainToDto(Expense domain) {
        return ExpenseEntityDto.builder()
                .expenseId(domain.getExpenseId())
                .accountNo(domain.getAccount().getAccountNo())
                .paymentType(domain.getPaymentType())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .paymentTargetDate(domain.getPaymentTargetDate())
                .paymentActualDate(domain.getPaymentActualDate())
                .paymentType(domain.getPaymentType())
                .isInvoiced(domain.isInvoiced())
                .expenseStatus(domain.getExpenseStatus())
                .build();
    }
    public ExpenseEntityDto toExpenseInfoDto(Expense domain) {
        return ExpenseEntityDto
                .builder()
                .expenseId(domain.getExpenseId())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .build();
    }

    public List<ExpenseEntityDto> toExpenseInfoDtoList(List<ExpenseJpaData> data)
            throws AmountExceedsRangeException {
        List<ExpenseEntityDto> dtos = new ArrayList<>();
        Iterator<ExpenseJpaData> iter = data.iterator();

        while(iter.hasNext()) {
            dtos.add(dataToExpenseInfo(iter.next()));
        }
        return dtos;
    }

    private ExpenseEntityDto dataToExpenseInfo(ExpenseJpaData data)
            throws AmountExceedsRangeException {
        return ExpenseEntityDto
                .builder()
                .expenseId(data.getId())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(moneyApiMapper
                        .domainToDto(moneyDataMapper.dataToDomain(data.getAmount())))
                .accruedDate(data.getAccruedDate())
                .expenseStatus(data.getExpenseStatus())
                .build();
    }

}
