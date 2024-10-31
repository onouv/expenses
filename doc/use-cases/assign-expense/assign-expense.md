# Assign Expense to Account

An Expense entity may be invoiced or non-invoiced.

## Invoiced Flow  
![Invoiced Flow](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/onouv/expenses/main/doc/use-cases/assign-expense/invoiced-flow.salt.puml)


The Frontend must enforce the following constraints and generate appropriate  
error messages upon entering an invalid entry if not fulfilled:

| Payment Status | Recipient | Amount   | Purpose  | Date Accrued | Invoice Uploaded | Receipt Uploaded | Payment Date | Payment Type |
|----------------|-----------|----------|----------|--------------|------------------|------------------|--------------|--------------|
| Planned        | Required  | Required | Required | Required     | --               | --               | Required     | Optional     |
| Invoiced       | Required  | Required | Required | Required     | Required         | --               | Required     | Optional     |
| Due            | Required  | Required | Required | Required     | Required         | --               | Required     | Optional     |
| Paid           | Required  | Required | Required | Required     | Required         | Required         | Required (*) | Required     |

(*)   potentially changed to Actual payment date  


## Non-Invoiced Flow

![Non-Invoiced Flow](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/onouv/expenses/main/doc/use-cases/assign-expense/non-invoiced-flow.salt.puml)  

The Frontend must enforce the following constraints and generate appropriate  
error messages upon entering an invalid entry if not fulfilled:

Payment Status | Recipient | Amount   | Purpose  | Date Accrued | Receipt Uploaded | Payment Date | Payment Type |
|--------------|-----------|----------|----------|--------------|------------------|--------------|--------------|
| Planned      | Required  | Required | Required | Required     | --               | Required     | Optional     |
| Due          | Required  | Required | Required | Required     | --               | Required     | Optional     |
| Paid         | Required  | Required | Required | Required     | Required         | Required (*) | Required     |

(*)   potentially changed to Actual payment date  
