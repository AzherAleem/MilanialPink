// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Wallpaper, WallList } = initSchema(schema);

export {
  Wallpaper,
  WallList
};