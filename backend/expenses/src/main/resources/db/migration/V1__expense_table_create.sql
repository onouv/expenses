CREATE TABLE expenses
(
    expense_id              BIGINT PRIMARY KEY,
    expense_purpose         VARCHAR(120),
    expense_payment_type    VARCHAR(32),
    expense_payment_status  VARCHAR(32),
    account_id              VARCHAR(16),
    money_micro_units       BIGINT,
    money_scale             SMALLINT,
    money_currency          NCHAR(3)
)