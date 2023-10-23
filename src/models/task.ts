export enum TaskStatus{
    completed,
    pending
}
export class Task{
    id?: number;
    named?: String;
    status?: TaskStatus;
}