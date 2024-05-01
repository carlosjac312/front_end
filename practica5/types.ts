export enum Estado {
    TO_DO = "TO-DO", In_progress = "In progress", In_review = "In review", Done = "Done"
}

export type Tarea = {
    name: string;
    state: Estado;
}