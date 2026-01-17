export type User = {
    id: string;
    username: string;
    password: string;
};

export type ExpenseCategory =
    | 'HOUSING'
    | 'FOOD'
    | 'TRANSPORT'
    | 'HEALTH'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'SHOPPING'
    | 'INSURANCE'
    | 'DEBT_PAYMENT'
    | 'PERSONAL_CARE'
    | 'TRAVEL'
    | 'OTHER_EXPENSE';

export type IncomeCategory =
    | 'SALARY'
    | 'BUSINESS'
    | 'INVESTMENT'
    | 'RENTAL'
    | 'GIFT'
    | 'BENEFIT'
    | 'SALE'
    | 'OTHER_INCOME';

export type Transaction = {
    id: string;
    amount: number;
    description: string;
    date: string;
    user: User;
    type: 'EXPENSE' | 'INCOME';
    category?: ExpenseCategory | IncomeCategory;
};

export type Balance = {
    currentBalance: number;
};

export type AddIncomeDto = {
    userId: string;
    password: string;
    amount: number;
    description: string;
    category: IncomeCategory;
};

export type AddExpenseDto = {
    userId: string;
    password: string;
    amount: number;
    description: string;
    category: ExpenseCategory;
};
