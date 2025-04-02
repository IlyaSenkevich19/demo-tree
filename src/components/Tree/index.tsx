import React, { useEffect, useState } from 'react';
import { VITE_TREE_NAME } from '@app/config';

import TreeNode from '@components/TreeNode/index';
import { treeApi } from '@api/api';

import { ITreeNode as TreeNodeType, EActionTypes, TRequestPayload, IApiResponse } from 'src/@types/types';

interface ITreeProps {
  treeData: TreeNodeType[];
  onAddNewNode: (payload: TRequestPayload) => Promise<IApiResponse>;
  onEditNode: (payload: TRequestPayload) => Promise<IApiResponse>;
  onDeleteNode: (payload: TRequestPayload) => Promise<IApiResponse>;
}

const Tree: React.FC<ITreeProps> = ({ treeData, onAddNewNode, onEditNode, onDeleteNode }) => {
  const [data, setData] = useState<TreeNodeType[]>(treeData);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  useEffect(() => {
    setData(treeData);
  }, [treeData]);

  const fetchTreeData = async () => {
    const updatedData = await treeApi.fetchTree({ treeName: VITE_TREE_NAME });
    setData(updatedData.data);
  };

  const handleNodeOperation = async (action: EActionTypes, payload: TRequestPayload) => {
    let response: IApiResponse;
    switch (action) {
      case EActionTypes.ADD:
        response = await onAddNewNode(payload);
        break;
      case EActionTypes.EDIT:
        response = await onEditNode(payload);
        break;
      case EActionTypes.DELETE:
        response = await onDeleteNode(payload);
        break;
      default:
        throw new Error('Invalid operation');
    }
    if (response.success) {
      await fetchTreeData();
    }
  };

  const addNode = (parentId: number, name: string) => {
    handleNodeOperation(EActionTypes.ADD, { treeName: VITE_TREE_NAME, parentNodeId: parentId, nodeName: name });
  };

  const updateNode = (id: number, newName: string) => {
    handleNodeOperation(EActionTypes.EDIT, { treeName: VITE_TREE_NAME, nodeId: id, newNodeName: newName });
  };

  const deleteNode = (id: number) => {
    handleNodeOperation(EActionTypes.DELETE, { treeName: VITE_TREE_NAME, nodeId: id });
  };

  return (
    <>
      {data?.map(node => (
        <TreeNode
          key={node?.id}
          node={node}
          addNode={addNode}
          updateNode={updateNode}
          deleteNode={deleteNode}
          onSelect={setSelectedNodeId}
          selectedNodeId={selectedNodeId}
          level={0}
        />
      ))}
    </>
  );
};

export default Tree;