CREATE TYPE payment_status_enum AS ENUM ('Unknown', 'Planned', 'Invoiced', 'Due');

CREATE TYPE payment_type_enum AS ENUM ('Unknown', 'Cash', 'CreditCard', 'ECCard', 'BankTransfer');

CREATE TABLE expense
(
    expense_id              BIGINT PRIMARY KEY,
    account_account_no      VARCHAR(16) REFERENCES account(account_no),
    expense_recipient       VARCHAR(120),
    expense_purpose         VARCHAR(120),
    money_micro_units       BIGINT,
    money_scale             SMALLINT,
    money_currency          NCHAR(3),
    expense_accrued_date    DATE,
    expense_payment_date    DATE,
    expense_payment_type    VARCHAR(32),
    expense_payment_status  VARCHAR(32),
    expense_is_invoiced     BIT
);
CREATE TABLE account
(
    account_no          VARCHAR(16) PRIMARY KEY,
    account_name        VARCHAR(127),
    account_description TEXT
);
