# Assign Expense to Account

## Pre
- At least one account exists
- User has a pdf copy of receipt in local file system
- Account Listing page is shown

## Post
- Expense has been assigned to one account
- associated receipt copy is registered
- all is saved in database

## Good Case Flows
1) User selects an account 
2) System loads the account data and shows a waiting spinner, eventually showing the Account page
3) User clicks "Add Expenses" button
4) System shows "Add Expenses Form" (State: Collecting)  
- Amount 0 EUR,
- No Payment Tye Selection
- No Payment Status Selection
- No Receipt 
- CREATE disabled
- CANCEL enabled
5) User May enter Amount. System will validate Amount
6) User may select a Payment Type
7) User may load a receipt copy from local file system
8) User may click "CREATE" once all entries are valid. Frontend will enforce the following rules:

| Payment Status | Amount | Purpose | Bill Uploaded | Receipt Uploaded | Payment Date | Payment Type |
|----|--|--|---|------------------|---|----|
| Planned | Required | Required | 
| Obligo | Required | Required | Required |  | Required | 
| Due | Required | Required | Required | | Required |
| Paid | Required | Required | Required | Required  | Required | Required |
(Frontend will display appropriate error message immediately upon entering an invalid state.) 

9) System posts the request to backend, showing a spinner 
10) Upon success, system will update list of expenses and show it


## Bad Case Flows

### Backend Fails

9) If backend returns a fail, no records are created in database and system will show an error message
10) User may CANCEL or request a RETRY in which case shows the previously filled in data


### Local File System Error

7) If loading of a selected receipt copy fails, a file error message is shown
8) User clicks OK to try again or CANCEL the whole process altogether

