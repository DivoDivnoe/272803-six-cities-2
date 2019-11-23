import NameSpace from '../name-space';

const getIsAuthRequired = (state) => state[NameSpace.USER].isAuthorizationRequired;
const getUserData = (state) => state[NameSpace.USER].user;

export {
  getIsAuthRequired,
  getUserData
};
