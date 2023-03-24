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
    name: string;
    type: string;
    value: string;
}

export type Props = {
    type: string;
}