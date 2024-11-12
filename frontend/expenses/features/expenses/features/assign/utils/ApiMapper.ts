import PlannedExpenseT, {defaultPlannedExpense} from "@/features/expenses/types/PlannedExpenseT";
import PlannedExpenseDTO from "@/features/expenses/features/assign/api/PlannedExpenseDTO";

const

const domainToApi = (domain: PlannedExpenseT): PlannedExpenseDTO => {
    const exp: PlannedExpenseDTO = {...defaultPlannedExpense};
}