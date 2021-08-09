import { NCA } from '@/types/nca';

export const getAssignmentFromJSON = (json: string): NCA.Assignment => {
  // TODO: Validation and error handling.
  return JSON.parse(json) as NCA.Assignment;
};

export const getJSONFromAssignment = (assignment: NCA.Assignment): string => {
  return JSON.stringify(assignment, null, 2);
};
