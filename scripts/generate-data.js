'use strict';

const generateLeisureCenters = () => {
  return [
    {
      name: 'Mászóbirodalom',
      description: 'Termünk a falmászás iránt érdeklődők kedvéért jött létre, ahol kezdők és haladók egyaránt kipróbálhatják a falmászás nyújtotta élményeket akár felső biztosítással, akár elölmászásban.',
      address: 'HUN 1117, Budapest, Budafoki út 70.',
      link: 'http://www.maszobirodalom.hu/',
      activity: 'indoor climbing'
    },
    {
      name: 'Pole Heaven',
      description: 'Veled több, mint sport!',
      address: 'HUN 1074, Budapest, Szövetség utca 45.',
      link: 'http://www.poleheaven.hu/',
      activity: 'pole dancing'
    }
  ];
};

module.exports = generateLeisureCenters;
