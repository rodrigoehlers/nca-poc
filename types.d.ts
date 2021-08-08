declare namespace NCA {
  interface Assignment {
    id: string;
    title: string;
    tasks: Task[];
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
    value: string;
  }

  enum TaskType {
    TEXT = 'text',
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
  }
}
