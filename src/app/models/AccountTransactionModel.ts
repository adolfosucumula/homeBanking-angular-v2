import { AccountClass } from "./AccountModel";

export class AccountTransactionModel {
  private id: number;
  private sourceAccount: string;
  private owner: string;
  private transactionType: string;
  private account: string;
  private balanceBefore: string;
  private amount: string;
  private balanceAfter: string;
  private operator: string;
  private status: string;
  private createdAt: string;
  private tableName: string;

  constructor(
    sourceAccount = '',
    owner = '',
    transactionType = '',
    account = '',
    balanceBefore = '',
    amount = '',
    balanceAfter = '',
    operator = '',
    status = '',
    createdAt = ''){
      this.id = 0;
      this.sourceAccount = sourceAccount;
      this.owner = owner;
      this.transactionType = transactionType;
      this.account = account;
      this.balanceBefore = balanceBefore;
      this.amount = amount;
      this.balanceAfter = balanceAfter;
      this.operator = operator;
      this.status = status;
      this.createdAt = createdAt;
      this.tableName = 'transactions';
  }
}
