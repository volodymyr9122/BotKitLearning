exports.randomRef =() => {
    let result;
    let second = Math.floor((Math.random() * 9) + 1).toString();
    let first = Date.now().toString();
    result = first+second
    return parseInt(result);
}
exports.meLinkCreator = () =>{
    return `http://m.me/313826116086030?ref=${randomRef()}`
}
/*module.exports.randomRef = randomRef;
module.exports.meLinkCreator = meLinkCreator;*/