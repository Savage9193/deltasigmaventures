import * as yup from 'yup';
import { UserStatus } from '../types/user';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  validation: yup.AnySchema;
  required: boolean;
  options?: string[];
}

export const userFormFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
    required: true
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validation: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: yup.string().required('Email is required').email('Invalid email format'),
    required: true
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    validation: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain only digits'),
    required: true
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    validation: yup.string().required('Status is required').oneOf(['pending', 'active', 'inactive'], 'Invalid status'),
    required: true,
    options: ['pending', 'active', 'inactive']
  }

];

export const userFormSchema: yup.ObjectSchema<UserFormData> = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain only digits'),
  status: yup.mixed<UserStatus>().required('Status is required').oneOf(['pending', 'active', 'inactive'], 'Invalid status'),
});

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: UserStatus;
}
