import { Observable } from "rxjs";

export class UserModel {

  [x: string]: any;

  private id: number;
  private fullname: string;
  private username: string;
  private email: string;
  private telephone: number;
  private password: string;
  private role: string;
  private isActive: boolean;
  private createdAt: string;
  private updatedAt: string;
  public tableName: string;
  private avatar: string;
  public signout: boolean = true;

  constructor(
    fullname: string = '',
    username: string = 'root',
    email: string = '',
    telephone: number = 0,
    password: string = '',
    role: string = 'ADMIN',
    isActive: boolean = false,
    createdAt: string = '',
    updatedAt: string = ''
    ){
      this.id = 0;
      this.fullname = fullname;
      this.username = username;
      this.email = email;
      this.telephone = telephone;
      this.password = password
      this.role = role;
      this.isActive = isActive;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.tableName = "users"
      this.avatar = 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png';
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number{
    return this.id;
  }

  public setUsername(username: string): void{
    this.username = username;
  }

  public getUsername(): string{
    return this.username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  public setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setTableName(tablename: string) {
    this.tableName = tablename;
  }

  public getTableName(): string {
    return this.tableName;
  }

  public setRole(role: string): void{
    this.role = role
  }

  public getRole(): string{
    return this.role
  }

  public setAvatar(avatar: string): void{
    this.avatar = avatar
  }

  public getAvatar(): string{
    return this.avatar;
  }

  public isPasswordsMatches(confirmPassword: string){
    return this.password == confirmPassword;
  }

  public thisPasswordsMatches(password: string, confirmPassword: string){
    return password == confirmPassword;
  }




}

