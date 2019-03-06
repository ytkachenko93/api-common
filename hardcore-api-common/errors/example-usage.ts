import { errors } from './index';

const ErrorDefinitions = [
  {
    name: 'IncorrectPasswordError',
    defaultMessage: 'The password you provided is not correct',
    defaultExplanation: 'The password you provided is not correct',
    defaultResponse: 'Please provide the correct password.'
  }
];

ErrorDefinitions.forEach(element => {
  errors.create(element);
});

errors.mapper('IncorrectPasswordError', err => {
  return new errors.Http401Error(err.message, err.explanation, err.response);
});

export default errors;
