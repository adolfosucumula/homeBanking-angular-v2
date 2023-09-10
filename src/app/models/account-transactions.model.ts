export class AccountTransactions {

  private id: number;
  private tType: string;
  private account: string;
  private owner: string;
  private balanceBefore: string;
  private amount: string;
  private balanceAfter: string;
  private xAccount: string;
  private xOwner: string;
  private operator: string;
  private status: string;
  private createdAt: string;
  public tableName: string;

  constructor(
    tType = '',
    account = '',
    owner = '',
    balanceBefore = '',
    amount = '',
    balanceAfter = '',
    xAccount = '',
    xOwner = '',
    operator = '',
    status = '',
    createdAt = ''
    ){
      this.id = 0;
      this.tType = tType;
      this.account = account;
      this.owner = owner;
      this.balanceBefore = balanceBefore;
      this.amount = amount
      this.balanceAfter = balanceAfter;
      this.xAccount = xAccount;
      this.xOwner = xOwner;
      this.operator = operator;
      this.status = status;
      this.createdAt = createdAt;
      this.tableName = 'transactions';
  }

  public setTableName(table: string){
    this.tableName = table
  }

  getTypes(){
    return [
      'Credit', 'Debit', 'Deposit', 'Transfer'
    ]
  }


}
