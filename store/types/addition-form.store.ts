import { WorkLevel } from '@prisma/client';

export type AdditionForm = {
  link: string;
  price: string;
  address: string;
  extraInfo: string;
  workLevel: WorkLevel;
  rating: number;
  listId: string;
};

export interface FormStore {
  additionForm: AdditionForm;
  listForm: {
    name: string;
  };
}

export interface AdditionFormActionParams {
  key: keyof AdditionForm;
  value: string | boolean;
}
