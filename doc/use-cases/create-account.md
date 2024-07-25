# Create Account

As an Accounter, I would like to create a new account so it can be used by Spenders to assign expenses to it.

## Pre
- Nothing

## Post
- An account has been created and saved to the database

## Good Case Flow
1) User navigates to "Account Management" page
2) System shows account list
3) User initiates "Create New Account" action
4) System shows "Create New Account" dialog with 
    - account id initialized to a new unique value
    - Initial value to Zero
    - Currency set to EUR 
5) User enters
   - Account Name
   - Account Description (optional)
   - Initial Amount (optional)
   - Currency selection (optional)
6) At any time system 
   - enforces Account Name not empty
   - prevents creating action as long as invalid entries exist
7) User Clicks "Create"
8) System creates Account with specified data
9) System updates account list, showing new account prominently 

## Alternative Good Cases

### User Cancels
At any time after step 3) and before step 7) , User may click "Cancel" which triggers immediate reloading of  
accounts list. Data entered in dialog so far is lost.

## Bad Case Flows

### Missing Account Name
6) After each keystroke, system evaluates and shows an error message below the entry field if   
last input did not produce a valid entry.  

### Database or Network Error
8) Saving to database fails in any way
9) System shows Error Pop Up indicating the fact
10) User clicks "OK" or "Retry"  
