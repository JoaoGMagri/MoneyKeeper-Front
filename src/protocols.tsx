export type PropsAuthForm = {
    state: boolean;
    function: Function;
}

export type UserSubmitForm = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type spendingType = {
    createdAt: string;
    id: number;
    name: string;
    type: string;
    updatedAt: string;
    userId: number;
    value: string;
};

export type spendingInfosType = {
    id: number;
    name: string;
    type: string;
    value: string;
    functionSpendingGet: Function;
}

export type Props = {
    type: string;
}