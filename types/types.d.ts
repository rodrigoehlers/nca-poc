declare namespace NCA {
  interface Assignment {
    id: string;
    title: string;
    tasks: Task[];
  }

  enum TaskType {
    TEXT = 'text',
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
  }

  interface Task {
    id: string;
    title: string;
    desc?: string;
    type: TaskType;
  }

  interface TextTask extends Task {
    type: TaskType.TEXT;
    desc: string;
  }

  interface ChoiceTask extends Task {
    options: Option[];
  }

  interface SingleChoiceTask extends ChoiceTask {
    type: TaskType.SINGLE_CHOICE;
  }

  interface MultipleChoiceTask extends ChoiceTask {
    type: TaskType.MULTIPLE_CHOICE;
  }

  interface Option {
    id: string;
    label: string;
  }

  interface AssignmentResponse {
    id: string;
    tasks: TaskResponse[];
  }

  interface TaskResponse {
    id: string;
  }

  interface TextTaskResponse extends TaskResponse {
    value: string;
  }

  interface ChoiceTaskResponse extends TaskResponse {
    values: string[];
  }
}
