//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function checkId(id) {
  let regex = /^[0-9]+$/;
  if (!id) throw "Invalid URL Parameter";
  if (typeof id !== "string") throw "Invalid URL Parameter";
  id = id.trim();
  if (id.length === 0) throw "Invalid URL Parameter";
  if(Number.isNaN(parseInt(id))){
    throw "Invalid URL Parameter";
  }
  if (!regex.test(id)) {
    throw "Invalid URL Parameter";
  }
  return id;
}

function checkRange(id) {
  let a = parseInt(id);
  if (a <= 0 || a > 905) {
    throw "Pokémon Not Found!";
  }
}
module.exports = {
  checkId,
  checkRange,
};



