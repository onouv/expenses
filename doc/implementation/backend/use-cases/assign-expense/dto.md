# DTO Types for Expense Lifecycle
| DTO                       | `accountNo` | `expenseId` | `expenseStatus`  | `recipient` | `amount` | `purpose` | `accruedDate` | `isInvoiced` | `paymentTargetDate` | `paymentActualDate` | `paymentType`         |
|---------------------------|-------------|-------------|------------------|-------------|----------|-----------|---------------|--------------|---------------------|---------------------|-----------------------|
|                           | `string`    | `number`    | `ExpenseStatusE` | `string`    | `string` | `string`  | DateString    | `boolean`    | DateString          | DateString          | `PaymentTypeE`        |
| `AssignExpenseRequestDto` | Req.        | --          | --               | Req.        | Req.     | Req.      | Req.          | Req.         | Opt.                | --                  | Req. Def: "Unknown"   |
| `ExpenseEntityDto`        | --          | Req.        | Req.             | Req.        | Req.     | Req.      | Req.          | Req.         | Opt.                | Opt.                | Req. Def: "Unknown"   |


| DTO                       | `accountNo` | `expenseId` | `expenseState`  | `recipient` | `amount` | `purpose` | `accruedDate` | `isInvoiced` | document | `paymentTargetDate` | `paymentActualDate` | `paymentType`  |
|---------------------------|-------------|-------------|-----------------|-------------|----------|-----------|---------------|--------------|----------|---------------------|---------------------|----------------|
| `InvoicedExpenseDto`      | --          | Req.        | `Invoiced`      | Req.        | Req.     | Req.      | Req.          | `true`       | invoice  | Req.                | `null`              | Opt            |
| `PaidExpenseDto`          | --          | Req.        | `Paid`          | Req.        | Req.     | Req.      | Req.          | Req.         | receipt  | Req.                | Req.                | Req.           |


