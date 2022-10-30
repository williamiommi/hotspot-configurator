import { EntityStatus } from '@contentful/f36-components';

export default interface IMedia {
  url?: string;
  title?: string;
  status: EntityStatus;
}
