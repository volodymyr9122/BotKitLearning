exports.randomRef = () => {
  let result;
  const second = Math.floor((Math.random() * 9) + 1).toString();
  const first = Date.now().toString();
  result = first + second;
  return parseInt(result);
};
exports.meLinkCreator = () => `http://m.me/313826116086030?ref=${randomRef()}`;
/* module.exports.randomRef = randomRef;
module.exports.meLinkCreator = meLinkCreator; */
