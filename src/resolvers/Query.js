const catsApi = require('../../services/cats-api');


async function search(parent, args, context, info) {
  const { data, error } = await catsApi.suggested(args.entry);
  const suggestedCats = data.map(cat => ({id: cat.id, catName: cat.name}));

  if(error) throw Error('Something wrong happenned!');

  return suggestedCats;
}

async function mostSearched(parent, args, context, info) {
  const breeds = await context.catsRepo.getPopularBreeds();
  const sortedByPopularityBreeds = breeds.sort(function(a, b) {
    return b.timesSearched - a.timesSearched;
  });

  return sortedByPopularityBreeds;
}

async function getBreed(parent, args, context, info) {
  const { data, error } = await catsApi.fetchBreed(args.breedId);

  if(error) {
    throw Error('Something wrong happenned!');
  } 

  const breed = data[0].breeds[0];
  breed.images = data.map(item => item.url);

  const breedInfo = generateBreedInfo(breed);
  const catsRepo = context.catsRepo;

  await updateBreedPopularity(catsRepo, breed);

  return breedInfo;
}

async function updateBreedPopularity(catsRepo, breed) {
  try {
    await catsRepo.upsertPopularBreeds({
      id: breed.id,
      name: breed.name,
      description: breed.description,
      image: breed.images[0]
    });
  }catch(error) {
    throw Error(error);
  }
}

function generateBreedInfo(breedInfo) {
  return {
    name: breedInfo.name,
    description: breedInfo.description,
    temperament: breedInfo.temperament,
    origin: breedInfo.origin,
    lifeSpan: breedInfo.life_span, 
    adaptability: breedInfo.adaptability,
    affectionLevel: breedInfo.affection_level,
    childFriendly: breedInfo.child_friendly,
    grooming: breedInfo.grooming,
    intelligence: breedInfo.intelligence,
    healthIssues: breedInfo.health_issues,
    socialNeeds: breedInfo.social_needs,
    strangerFriendly: breedInfo.stranger_friendly,
    images: breedInfo.images,
    wikipediaUrl: breedInfo.wikipedia_url
  }
}

module.exports = {
  mostSearched, 
  getBreed,
  search
}