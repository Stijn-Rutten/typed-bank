interface Formatable {
    format(): string;
}

export function auditLog<T extends Formatable>(subject: T, action: string) {
    console.log(`[${subject.format()}]: ${action}`)
}