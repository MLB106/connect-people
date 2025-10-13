export interface User {
    id: string;
    email: string;
    role: string;
    authentificationMultiFacteurs?: boolean;
}
