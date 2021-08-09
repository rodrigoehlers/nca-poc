export namespace NCA {
  export interface Assignment {
    id: string;
    title: string;
    tasks: Task[];
  }

  export enum TaskType {
    TEXT = 'text',
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
  }

  export interface Task {
    id: string;
    title: string;
    desc?: string;
    type: TaskType;
  }

  export interface TextTask extends Task {
    type: TaskType.TEXT;
    desc: string;
  }

  export interface ChoiceTask extends Task {
    options: Option[];
  }

  export interface SingleChoiceTask extends ChoiceTask {
    type: TaskType.SINGLE_CHOICE;
  }

  export interface MultipleChoiceTask extends ChoiceTask {
    type: TaskType.MULTIPLE_CHOICE;
  }

  export interface Option {
    id: string;
    label: string;
  }

  export interface AssignmentResponse {
    id: string;
    tasks: TaskResponse[];
  }

  export interface TaskResponse {
    id: string;
  }

  export interface TextTaskResponse extends TaskResponse {
    value: string;
  }

  export interface ChoiceTaskResponse extends TaskResponse {
    values: string[];
  }
}
