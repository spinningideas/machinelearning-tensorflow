export const APPBASEPATH = 'machinelearning-tensorflow';

export const reloadWindow = () => {
  window.location = window.location.origin
    ? window.location.origin + '/' + APPBASEPATH
    : window.location.protocol + '/' + window.location.host + '/' + APPBASEPATH;
};

export const pascalCaseUnHyphenated = (value) => {
  return (value || '').toLowerCase().replace(/(\b|-)\w/g, function (m) {
    return m.toUpperCase().replace(/-/, ' ');
  });
};

export const generateId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
