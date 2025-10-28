export interface Session {
    fullname: string;
    email: string;
}

export interface Ticket {
    id: string;
    user: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    date: string;
}
