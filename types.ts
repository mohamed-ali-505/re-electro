export interface ClientType {
    _id: string;
    name: string
    specialization: string
    discountPercentage: number
    pointsRequired: number
    type: string
}
export interface RequestType {
    _id: string;
    name: string
    email: string
    phone: string
    address: string
    items: string
    status: string
}

export interface UsersType {
    _id: string;
    name: string
    email: string
    phone: string
    role: string
    points: number
}