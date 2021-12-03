async function test() {
  return 'This is just a test query';
}

async function mostSearched(parent, args, context, info) {
  return await context.catsRepo.getMostSearchedCats();
}

module.exports = { test, mostSearched }