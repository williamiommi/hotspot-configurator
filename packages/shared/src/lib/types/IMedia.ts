import { EntityStatus } from '@contentful/f36-components';

export interface IMedia {
  url?: string;
  title?: string;
  status: EntityStatus;
}
