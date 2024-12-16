CREATE TYPE expense_status_enum AS ENUM ('Planned', 'Invoiced', 'Due', 'PastDue', 'Paid');

CREATE TYPE payment_type_enum AS ENUM ('Unknown', 'Cash', 'CreditCard', 'ECCard', 'BankTransfer');

CREATE SEQUENCE expenses_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE accounts
(
    account_no          VARCHAR(16) PRIMARY KEY,
    account_name        VARCHAR(127),
    account_description TEXT
);

CREATE TABLE expenses
(
    expense_id          BIGINT PRIMARY KEY,
    account_no          VARCHAR(16) REFERENCES accounts(account_no),
    recipient           VARCHAR(120),
    purpose             VARCHAR(120),
    money_micro_units   BIGINT,
    money_currency      NCHAR(3),
    accrued_date        VARCHAR(10),
    payment_target_date VARCHAR(10),
    payment_actual_date VARCHAR(10),
    payment_type        VARCHAR(32),
    expense_status      VARCHAR(32),
    is_invoiced         BOOLEAN
);
