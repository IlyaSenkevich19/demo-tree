
import { ToastContainer } from 'react-toastify';
import { VITE_TREE_NAME } from '@app/config/index.js';

import Tree from './components/Tree/index';
import useFetch from '@hooks/useFetch';

import { treeApi } from './api/api';
import { EActionTypes, TRequestPayload } from './@types/types';

const App = () => {
  const { data, error, isLoading } = useFetch(treeApi.fetchTree, { treeName: VITE_TREE_NAME });

  const handleNodeChange = async (action: EActionTypes, payload: TRequestPayload) => {
    switch (action) {
      case EActionTypes.ADD:
        return await treeApi.createNode(payload);
      case EActionTypes.EDIT:
        return await treeApi.renameNode(payload);
      case EActionTypes.DELETE:
        return await treeApi.deleteNode(payload);
      default:
        throw new Error('Invalid action');
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!!data.length && (
        <Tree
          treeData={data}
          onAddNewNode={payload => handleNodeChange(EActionTypes.ADD, payload)}
          onEditNode={payload => handleNodeChange(EActionTypes.EDIT, payload)}
          onDeleteNode={payload => handleNodeChange(EActionTypes.DELETE, payload)}
        />
      )}
      <ToastContainer />
    </>
  )
}

export default App
