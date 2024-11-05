package onosoft.ports.driven.account;

import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;

import java.util.List;

public interface AccountApiPort {

    Account createAccount(String AccountNo, String Name, String description)
            throws DuplicateAccountNoException, AmountExceedsRangeException;
}
