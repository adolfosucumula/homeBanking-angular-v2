import { AccountClass } from "./AccountModel.model";

export class AccountTransactionModel {
  private id: number;
  private sourceAccount: string;
  private owner1: string;
  private transactionType: string;
  private targetAccount: string;
  private owner2: string;
  private balanceBefore: string;
  private amount: string;
  private balanceAfter: string;
  private operator: string;
  private status: string;
  private createdAt: string;
  tableName: string;

  constructor(
    sourceAccount = '',
    owner1 = '',
    targetAccount = '',
    owner2 = '',
    balanceBefore = '',
    amount = '',
    balanceAfter = '',
    operator = '',
    transactionType = '',
    status = '',
    createdAt = ''){
      this.id = 0;
      this.sourceAccount = sourceAccount;
      this.owner1 = owner1;
      this.transactionType = transactionType;
      this.targetAccount = targetAccount;
      this.owner2 = owner2
      this.balanceBefore = balanceBefore;
      this.amount = amount;
      this.balanceAfter = balanceAfter;
      this.operator = operator;
      this.status = status;
      this.createdAt = createdAt;
      this.tableName = 'transactions';
  }

  public setTableName(table: string){
    this.tableName = table
  }


}
