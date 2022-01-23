interface InnerPersonsData {
  clientId: number;
  snils?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  dulSeries?: string;
  dulNumber?: string;
  docs?: {
    docKind: string;
    docValue: string;
  }[];
  signings?: {
    signingId: number;
  }[];
}

interface BasePersonData {
  email: string;
  firstName?: string;
  dateOfBirth?: string;
}

interface BaseOrgData {
  email: string;
  orgName?: string;
  dateOfFoundation?: string;
}

interface FrontendParticipantFormat {
  email: string;
  name?: string;
  date?: string;
}

interface IAdder<T> {
  data: Set<T>;
  add(toAdd: T): IAdder<T>;
  remove(toRemove: T): IAdder<T>;
}
