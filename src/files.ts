import RNFS from 'react-native-fs';

const STORAGE_PATH = RNFS.DocumentDirectoryPath;

const filePath = (fileName: string) => `${STORAGE_PATH}/${fileName}.json`;

export const writeFile = (name: string, content: string) =>
  RNFS.writeFile(filePath(name), content);

export const readFile = (name: string) => RNFS.readFile(filePath(name));

export const writeJson = (name: string, content: object) =>
  writeFile(name, JSON.stringify(content));

export const readJson = (name: string) => readFile(name).then(JSON.parse);
