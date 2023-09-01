export class AccountClass {
  public id: number;
  public account: string;
  public iban: string;
  public swift: string;
  public owner: string;
  public ownerDoc: string;
  public initialBalance: string;
  public currentBalance: string;
  public currency: string;
  public createdAt: string;
  public updatedAt: string;
  public isActive: boolean;
  public tableName: string;

  constructor(
    id: number = 0,
    account: string = '',
    iban: string = '',
    swift: string = '',
    owner: string = '',
    ownerDoc: string = '',
    initialBalance: string = '',
    currentBalance: string = '',
    currency: string = '',
    isActive: boolean = false,
    createdAt: string = '',
    updatedAt: string = '',
    ){

    this.id = id;
    this.account = account;
    this.iban = iban;
    this.swift = swift;
    this.owner = owner;
    this.ownerDoc = ownerDoc;
    this.initialBalance = initialBalance;
    this.currentBalance = currentBalance;
    this.currency = currency;
    this.isActive = isActive;
    this.tableName = 'accounts';
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }


  public setTableName(tablename: string) {
    this.tableName = tablename;
  }

  public getTableName(): string {
    return this.tableName;
  }


}
