export const combineClassName = (...classes: string[]) => {
  return classes.filter((className) => Boolean(className)).join(' ');
};
