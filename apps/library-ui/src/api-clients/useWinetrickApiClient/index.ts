import { useWinetrickApiClient as useBaseWinetrickApiClient } from 'neu-wine-api';

export const useWinetrickApiClient = () => {
  const baseWinetrickApiClient = useBaseWinetrickApiClient();

  const listAll = async () => {
    const result = await baseWinetrickApiClient.listAll();
    console.log(result);
    return result.map((item) => item.stdOut);
  };

  return {
    listAll,
  };
};
