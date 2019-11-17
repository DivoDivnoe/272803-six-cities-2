import NameSpace from '../name-space';

const getServerRespondingStatus = (state) => state[NameSpace.SERVER].isServerResponding;

export {
  getServerRespondingStatus
};
