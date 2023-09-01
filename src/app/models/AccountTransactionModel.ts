import { AccountClass } from "./AccountModel";

export interface AccountTransactionModel {
  id: number,
  sourceAccount: string,
  owner: string,
  account: string,
  balanceBefore: string,
  amount: string,
  balanceAfter: string,
  operator: string,
  status: string,
  createdAt: string
}
