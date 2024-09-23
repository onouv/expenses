CREATE TABLE expenses
(
    expense_id              BIGINT PRIMARY KEY,
    expense_purpose         TEXT,
    expense_payment_type    VARCHAR(16),
    expense_payment_status    VARCHAR(16)
)