# DTO Types for Expense Lifecycle
| DTO                       | `accountNo` | `expenseId` | `expenseState`  | `recipient` | `amount` | `purpose` | `accruedDate` | `isInvoiced` | `paymentTargetDate` | `paymentActualDate` | `paymentType`  |
|---------------------------|-------------|-------------|-----------------|-------------|----------|-----------|---------------|--------------|---------------------|---------------------|----------------|
|                           | `string`    | `number`    | `ExpenseStateE` | `string`    | `string` | `string`  | DateString    | `boolean`    | DateString          | DateString          | `PaymentTypeE` |
| `AssignExpenseRequestDto` | Req.        | --          | `Planned`       | Req.        | Req.     | Req.      | Req.          | Req.         | Opt.                | `null`              | Opt.           |
| `ExpenseEntityDto`        | --          | Req.        | Req.            | Req.        | Req.     | Req.      | Req.          | Req.         | Opt.                | `null`              | Opt.           |


| DTO                       | `accountNo` | `expenseId` | `expenseState`  | `recipient` | `amount` | `purpose` | `accruedDate` | `isInvoiced` | document | `paymentTargetDate` | `paymentActualDate` | `paymentType`  |
|---------------------------|-------------|-------------|-----------------|-------------|----------|-----------|---------------|--------------|----------|---------------------|---------------------|----------------|
| `InvoicedExpenseDto`      | --          | Req.        | `Invoiced`      | Req.        | Req.     | Req.      | Req.          | `true`       | invoice  | Req.                | `null`              | Opt            |
| `PaidExpenseDto`          | --          | Req.        | `Paid`          | Req.        | Req.     | Req.      | Req.          | Req.         | receipt  | Req.                | Req.                | Req.           |


