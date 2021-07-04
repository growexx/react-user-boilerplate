const getReferenceIds = joinedArray =>
  joinedArray.map(singleReference => singleReference.id);
/**
 * getUniqueId - unique chat window id
 * @param {Array} joinedArray
 * @returns unique id based on array values
 */
export const getUniqueId = joinedArray => {
  const sortedParticipants = getReferenceIds(joinedArray).sort();
  return sortedParticipants.join('');
};
