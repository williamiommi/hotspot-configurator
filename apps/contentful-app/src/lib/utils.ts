import { FieldExtensionSDK } from '@contentful/app-sdk';
import { EntityStatus } from '@contentful/f36-components';
import {
  AssetProps,
  ContentTypeProps,
  EntityMetaSysProps,
  EntryProps,
  PlainClientAPI,
} from 'contentful-management';
import { v4 as uuidv4 } from 'uuid';
import IHotspot from './ts/IHotspot';
import IMedia from './ts/IMedia';

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <F extends (...params: any[]) => void>(fn: F, delay: number) => {
  let timeoutID: number;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
};

export const generateEmptyHotspot = (): IHotspot => {
  let hotSpot: IHotspot = {
    id: uuidv4(),
    dark: true,
    title: 'Sample Title',
    content: 'Sample Content',
    x: 0,
    y: 0,
    naturalX: 0,
    naturalY: 0,
    percentageX: 0,
    percentageY: 0,
  };
  return hotSpot;
};

export const transformAsset = (asset: AssetProps, locale: string): IMedia => {
  const url = asset.fields.file[locale].url || '';
  const status = getEntityStatus(asset);
  return { url, status, title: asset.fields.title[locale] };
};

export const getEntityStatus = (entity: EntryProps): EntityStatus => {
  if (!entity.sys.publishedVersion) return 'draft';
  if (!!entity.sys.publishedVersion && entity.sys.version >= entity.sys.publishedVersion + 2)
    return 'changed';
  if (!!entity.sys.publishedVersion && entity.sys.version === entity.sys.publishedVersion + 1)
    return 'published';
  return 'archived';
};

export const saveHiddenMediaField = async (
  hiddenMediaRefFieldID: string,
  sdk: FieldExtensionSDK,
  cma: PlainClientAPI,
  assetSys: EntityMetaSysProps
) => {
  try {
    const contentType = await cma.contentType.get({ contentTypeId: sdk.ids.contentType });
    const entry = await cma.entry.get({ entryId: sdk.ids.entry });
    const hasHiddenMediaField = contentType.fields.find(
      (field) => field.id === hiddenMediaRefFieldID
    );

    if (!hasHiddenMediaField) {
      const isHotspotFieldLocalized =
        contentType.fields.find((field) => field.id === sdk.field.id)?.localized || false;

      await createHiddenMediaField(
        hiddenMediaRefFieldID,
        isHotspotFieldLocalized,
        contentType,
        cma
      );
    }
    await updateEntry(hiddenMediaRefFieldID, entry, cma, assetSys, sdk.field.locale);
  } catch (e: any) {
    sdk.notifier.error(e.message);
    console.log(e);
  }
};

const createHiddenMediaField = async (
  hiddenMediaRefFieldID: string,
  isLocalized: boolean,
  contentType: ContentTypeProps,
  cma: PlainClientAPI
) => {
  const newContentModel = {
    ...contentType,
    fields: [
      ...contentType.fields,
      {
        id: hiddenMediaRefFieldID,
        name: `***DO NOT DELETE*** // ${hiddenMediaRefFieldID}`,
        type: 'Link',
        linkType: 'Asset',
        disabled: true,
        omitted: true,
        required: false,
        localized: isLocalized,
      },
    ],
  };

  const updatedContentType = await cma.contentType.update(
    { contentTypeId: contentType.sys.id },
    newContentModel
  );
  await cma.contentType.publish({ contentTypeId: contentType.sys.id }, updatedContentType);
};

const updateEntry = async (
  hiddenMediaRefFieldID: string,
  entry: EntryProps,
  cma: PlainClientAPI,
  assetSys: EntityMetaSysProps,
  locale: string
) => {
  await cma.entry.update(
    { entryId: entry.sys.id },
    {
      ...entry,
      fields: {
        ...entry.fields,
        [hiddenMediaRefFieldID]: {
          ...entry.fields[hiddenMediaRefFieldID],
          [locale]: {
            sys: { type: assetSys.type, linkType: assetSys.type, id: assetSys.id },
          },
        },
      },
    }
  );
};
