

const getColor = (num) => {
  if (num <= 50) {
    return 'color-01';
  }else if (num >= 51 && num <= 100) {
    return 'color-02';
  }else if (num >= 101 && num <= 150) {
    return 'color-03';
  }else if (num >= 151 && num <= 200) {
    return 'color-04';
  }else if (num >= 201 && num <= 300) {
    return 'color-05';
  }else if (num >= 301 && num <= 400) {
    return 'color-06';
  }
};
