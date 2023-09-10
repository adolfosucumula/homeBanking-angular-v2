import { FormGroup } from "@angular/forms";


export function patchDataToForm(
    form: FormGroup,
    tType: string,
    account: string,
    owner: string,
    balanceBefore: string,
    amount: string,
    xAccount: string,
    xOwner: string,
    operator: string,
    status: string,
    createdAt: string,
  ){
  return form.patchValue({
    tType: tType,
    account: account,
    owner: owner,
    balanceBefore: balanceBefore,
    amount: amount,
    xAccount: xAccount,
    xOwner: xOwner,
    operator: operator,
    status: status,
    createdAt: createdAt
  });
}
