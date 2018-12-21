import CompleteTextSolution from '../components/exercise/CompleteTextSolution';
import DefinitionNounSolution from '../components/exercise/DefinitionNounSolution';
import HiponimosSolution from '../components/exercise/HiponimosSolution';

// App common constants

export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'en';

export const exerciseTypes = {
  definicionSustantivos: 'definicion-sustantivos',
  verbosConjugados: 'verbos-conjugados',
  useOfEn: 'use-of-en',
  hiponimos: 'hiponimos'
};

export const exercisePaths = {
  [exerciseTypes.definicionSustantivos]: 'ejercicio-sustantivos',
  [exerciseTypes.verbosConjugados]: 'ejercicio-verbos',
  [exerciseTypes.useOfEn]: 'ejercicio-use-of-en',
  [exerciseTypes.hiponimos]: 'ejercicio-hiponimos',
};

export const exerciseComponents = {
  [exerciseTypes.definicionSustantivos]: DefinitionNounSolution,
  [exerciseTypes.verbosConjugados]: CompleteTextSolution,
  [exerciseTypes.useOfEn]: CompleteTextSolution,
  [exerciseTypes.hiponimos]: HiponimosSolution
};
