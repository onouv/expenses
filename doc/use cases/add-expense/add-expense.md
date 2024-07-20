# Add Expense

## Pre
- At least one account exists
- User has a pdf copy of receipt in local file system
- Expense List page is shown

## Post
- Expense has been assigned to one account
- associated receipt copy is registered
- all is saved in database

## Good Case Flows
1) User clicks "+" button
2) System shows "Add Expenses Form" (State: Collecting)  
- Amount 0 EUR,
- No Payment Tye Selection
- No Receipt 
- CREATE disabled
- CANCEL enabled
3) User May enter Amount. System will validate Amount
4) User may select a Payment Type
5) User may load a receipt copy from local file system
6) User may click "CREATE" once all entries are valid (system will keep button Diabled otherwise)
7) System posts the request to backend, showing a spinner 
8) Upon success, system will update list of expenses and show it


## Bad Case Flows

### Backend Fails

8) If backend returns a fail, no records are created in database and system will show an error message
9) User may CANCEL or request a RETRY


### Local File System Error

5) If loading of a selected receipt copy fails, a file error message is shown
6) User clicks OK to try again or CANCEL the whole process altogether



See [state machine diagram](./add-expense.state.puml)