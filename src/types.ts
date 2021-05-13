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
  }

  interface TextTask extends Task {
    type: 'text';
  }

  interface ChoiceTask extends Task {
    options: Option[];
  }

  interface SingleChoiceTask extends ChoiceTask {
    type: 'single-choice';
  }

  interface MultipleChoiceTask extends ChoiceTask {
    type: 'multiple-choice';
  }

  interface Option {
    id: string;
    label: string;
    value: string;
  }
}
