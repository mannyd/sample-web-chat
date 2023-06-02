import { IMAGE_EXTENSIONS } from '../constants';

export function isImage(fileExtension) {
  if (!fileExtension) {
    return false;
  }
  return IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase());
};

export async function getDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};

// Function to get 3 random avatars for pre-engagement form
export function getRandomAvatars(formType) {
  let avatarArray = []
  if (formType && formType === 'Style') {
    avatarArray = ['ErinKuykendall.png', 'AftonFarley.png', 'StacyWaterbury.png', 'JessicaBaca.png',
      'FitzgeraldMorgan.png', 'ChaiseDennis.png', 'FaithRim.png', 'TheirryJacob.png',
      'SeylaRodolfo.png', 'SamMcReynolds.png', 'PaulaAbuhamdeh.png',
      'EricaKappes.png', 'AllaKarnig.png', 'TriciaShelley.png',
      'KelseyHagen.png', 'LolaBuckson.png', 'WincyChan.png', 'StaceyNathanson.png',
      'MaryAdams.png', 'JenUblasi.png', 'LaurenGremillion.png', 'AlexisWarren.png',
      'LaurieCrisci.png', 'SheilaVolkers.png', 'KristinaMichell.png', 'ShebCan.png',
      'NazishQasim.png', 'MichelleKantliss.png','MikkiSachs.png', 'LindseyDoom.png', 'AliceMoore.png',
      'JosephDeMari.png', 'DanieleCohen.png', 'MagenJuran.png', 'LaurenPowell.png',
      'EzellWilliams.png', 'MelissaSantry.PNG', 'MicheleOppenheimer.png', 'CaseyGreco.png',
      'YadiraBonilla.png', 'JacquelineStasium.PNG', 'KelvinMiller.png', 'AndreaLivolsi.png',
      'AnnaFriedler.png', 'VictoriaRivkin.png', 'JacklynStock.png', 'TamarahYotov.png',
      'AmandaBrown.png', 'JuliannaTrujillo.png']

  }

  const shuffled = avatarArray.sort(() => 0.5 - Math.random());

  // const result = shuffled.slice(0, 3);
  return shuffled.slice(0, 3);
}