import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Schedule, Session } from '../../models/Schedule';
import { Business } from '../../models/Business';
export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  businesses: Business[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
