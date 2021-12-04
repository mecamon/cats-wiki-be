const { default: axios } = require("axios");
const baseURL = require('../utils/base-url');


async function search(parent, args, context, info) {
  
  const data = suggestedFromExternalApi(args.entry);
  const suggestedCats = data.map(cat => ({id: cat.id, catName: cat.name}));

  return suggestedCats;
}

async function suggestedFromExternalApi(entry) {
  try {
    const { data } = await axios.get(`${baseURL}/breeds/search?q=${entry}`);
    return data;

  }catch(error) {
    throw Error('Something wrong happenned!');
  }
}

async function mostSearched(parent, args, context, info) {
  return await context.catsRepo.getPopularBreeds();
}

async function getBreed(parent, args, context, info) {
  
  const { data, error } = await fetchBreedFromExternalApi(args.breedId);

  if(error) throw Error('Something wrong happenned!');

  const breed = data[0].breeds[0];
  breed.images = data.map(item => item.url);

  const breedInfo = generateBreedInfo(breed);
  const catsRepo = context.catsRepo;

  await updateBreedPopularity(catsRepo, breed);

  return breedInfo;
}

async function fetchBreedFromExternalApi(breedId) {
  let results = { data: null, error: null };

  try {
    const { data } = await axios.get(`${baseURL}/images/search?breed_ids=${breedId}&limit=8`);
    results.data = data;

  } catch(error) {
    results.error = error.response.data;
  }
  return results;
}

async function updateBreedPopularity(catsRepo, breed) {
  try {
    await catsRepo.upsertPopularBreeds({
      id: breed.id,
      name: breed.name
    });
  }catch(error) {
    throw Error(error);
  }
}

function generateBreedInfo(breedInfo) {

  return {
    description: breedInfo.description,
    temperament: breedInfo.temperament,
    origin: breedInfo.origin,
    lifeSpan: breedInfo.life_span, 
    adaptability: breedInfo.adaptability,
    affectionLevel: breedInfo.affection_level,
    childFriendly: breedInfo.child_friendly,
    grooming: breedInfo.grooming,
    intelligence: breedInfo.intelligence,
    healthIsues: breedInfo.health_issues,
    socialNeeds: breedInfo.social_needs,
    strangerFriendly: breedInfo.stranger_friendly,
    images: breedInfo.images
  }
}

module.exports = {
  mostSearched, 
  getBreed,
  search
}