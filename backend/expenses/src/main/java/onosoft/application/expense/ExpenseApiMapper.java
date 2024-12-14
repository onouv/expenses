package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.commons.FormattedDate;
import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyApiMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.domain.model.ExpenseStatus;

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

        final String paymentTargetDate = dto.getPaymentTargetDate();

        return Expense.builder()
                .account(account)
                .recipient(dto.getRecipient())
                .purpose(dto.getPurpose())
                .amount(moneyApiMapper.dtoToDomain(dto.getAmount()))
                .accruedDate(new FormattedDate(dto.getAccruedDate()))
                .paymentTargetDate(paymentTargetDate != null ? new FormattedDate(paymentTargetDate): null)
                .paymentType(dto.getPaymentType())
                .isInvoiced(dto.isInvoiced())
                .expenseStatus(ExpenseStatus.Planned)
                .build();
    }

    public Expense entityDtoToDomain(ExpenseEntityDto dto, Account account) throws AmountExceedsRangeException {
        final String paymentTargetDate = dto.getPaymentTargetDate();
        final String paymentActualDate = dto.getPaymentActualDate();

        return Expense.builder()
                .account(account)
                .recipient(dto.getRecipient())
                .purpose(dto.getPurpose())
                .amount(moneyApiMapper.dtoToDomain(dto.getAmount()))
                .accruedDate(new FormattedDate(dto.getAccruedDate()))
                .paymentTargetDate(paymentTargetDate != null ? new FormattedDate(paymentTargetDate): null)
                .paymentActualDate(paymentActualDate != null ? new FormattedDate(paymentActualDate): null)
                .paymentType(dto.getPaymentType())
                .isInvoiced(dto.isInvoiced())
                .expenseStatus(ExpenseStatus.Planned)
                .build();
    }

    public ExpenseEntityDto domainToEntityDto(Expense domain) {

        final FormattedDate paymentTargetDate = domain.getPaymentTargetDate();
        final FormattedDate paymentActualDate = domain.getPaymentActualDate();

        return ExpenseEntityDto.builder()
                .expenseId(domain.getExpenseId())
                .accountNo(domain.getAccount().getAccountNo())
                .paymentType(domain.getPaymentType())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyApiMapper.domainToDto(domain.getAmount()))
                .accruedDate(domain.getAccruedDate().toString())
                .paymentTargetDate(paymentTargetDate != null ? paymentTargetDate.toString(): null)
                .paymentActualDate(paymentActualDate != null ? paymentActualDate.toString(): null)
                .paymentType(domain.getPaymentType())
                .isInvoiced(domain.isInvoiced())
                .expenseStatus(domain.getExpenseStatus())
                .build();
    }
}
