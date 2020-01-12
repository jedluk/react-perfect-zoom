import { isString, getProperty } from './utils';

export const isSingleSource = (source) => !isString(getProperty(source, 'realImage.url'));
