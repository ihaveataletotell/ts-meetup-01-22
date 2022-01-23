export const person: BasePersonData = {
  firstName: 'Petya',
  email: 'petrovich@gmail.com',
};

export const org: BaseOrgData = {
  orgName: 'IT_ONE',
  email: 'info@it-one.ru',
}

export const innerPerson: InnerPersonsData = {
  clientId: 2,
}

export const innerPerson2: InnerPersonsData = {
  clientId: 2,
  docs: [{
    docKind: 'passport',
    docValue: '1234 567890',
  }],
  signings: [{
    signingId: 1,
  }]
}
