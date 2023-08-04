import moment from 'moment';
export const formatPhone = (phone = '') =>
  phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');

export const formatDate = (date = '', format = 'DD.MM.YYYY') =>
  date ? moment(date).format(format) : '';
