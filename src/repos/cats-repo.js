const orm = require('./orm-client');
const ormClient = orm.getClient();

async function getPopularBreeds() {
  return await ormClient.mostSearched.findMany();
}

async function getBreed(breedId) {
  return await ormClient.mostSearched.findUnique({
    where: {
      originalId: breedId
    }
  });
}

async function upsertPopularBreeds(breed) {

  const localBreed = await getBreed(breed.id);

  const breedUpdated = await ormClient.mostSearched.upsert({
    where: {
      originalId: breed.id,
    },
    update: {
      timesSearched: localBreed ? localBreed.timesSearched + 1 : 1
    },
    create: {
      originalId: breed.id,
      name: breed.name,
      image: breed.image,
      timesSearched: 1
    }
  });

  return breedUpdated.id;
}

module.exports = {
  getPopularBreeds,
  getBreed,
  upsertPopularBreeds
}