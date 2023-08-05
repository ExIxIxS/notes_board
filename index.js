function createDebounceFunction(callBack, delay) {
  if (!isFunction(callBack) || !isPositiveInteger(delay)) {
    throw new Error('Invalid argument.');
  }

  let funcTimerId;

  return () => {
    if (funcTimerId) {
      clearTimeout(funcTimerId);
    }

    funcTimerId = setTimeout(callBack, delay);
  }
};

const API_ROOT_PATH = 'https://rickandmortyapi.com/api/';

class RickAndMorty {
  getCharacter(characterId) {
    if (!isPositiveInteger(characterId)) {
      throw new Error('Invalid character id');
    }

    return fetch(`${API_ROOT_PATH}/character/${characterId}`)
      .then(response => response.json())
      .then(character => {
        if (character.error) {
          throw new Error(character.error);
        };

        return character;
      })
      .catch(() => {
        return null;
      });
  }

  async getEpisode(episodeId) {
    if (!isPositiveInteger(episodeId)) {
      throw new Error('Invalid episode id');
    }

    try {
      const response = await fetch(`${API_ROOT_PATH}/episode/${episodeId}`);
      const episode = await response.json();

      if (episode.error) {
        throw new Error(episode.error);
      };

      return episode;
    } catch {
      return null;
    }
  }
}

function isFunction(func) {
  return (typeof(func) === 'function');
}

function isPositiveInteger(num) {
  return (Number.isInteger(num) && num >= 0);
}
