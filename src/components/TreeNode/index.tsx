import React, { useState } from 'react';
import { VITE_TREE_NAME } from '@app/config';

import Modal from '@components/Modal/index';
import IconComponent from '@components/IconComponent/index';
import { showToast } from '@helpers/toast';

import { EActionTypes, ITreeNode } from 'src/@types/types';
import { EIconNames } from 'src/@types/IconNames';

import styles from './TreeNode.module.scss';

interface ITreeNodeProps {
    node: ITreeNode;
    addNode: (parentId: number, name: string) => void;
    updateNode: (id: number, newName: string) => void;
    deleteNode: (id: number) => void;
    onSelect: (id: number | null) => void;
    selectedNodeId: number | null;
    level: number;
}

const TreeNode: React.FC<ITreeNodeProps> = ({
    node,
    addNode,
    updateNode,
    deleteNode,
    onSelect,
    selectedNodeId,
    level
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState<{
        type: EActionTypes;
        id?: number;
        name?: string;
    } | null>(null);

    const openModal = (type: EActionTypes, name?: string) => {
        setShowModal({ type, id: node.id, name });
    };

    const closeModal = () => {
        setShowModal(null);
    };

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal(EActionTypes.ADD);
    };
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal(EActionTypes.EDIT, node.name);
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (node.children && node.children.length > 0) {
            showToast(`If you want to delete node ${node.name}, first delete all its children.`);
            return;
        }
        openModal(EActionTypes.DELETE);
    };

    const handleModalSubmit = (name: string) => {
        if (!showModal) return;

        const { type, id } = showModal;
        switch (type) {
            case EActionTypes.ADD:
                addNode(id!, name);
                break;
            case EActionTypes.EDIT:
                updateNode(id!, name);
                break;
            case EActionTypes.DELETE:
                deleteNode(id!);
                break;
            default:
                break;
        }
        closeModal();
    };

    const handleToggleNode = () => {
        setIsOpen((prev) => !prev);
        onSelect(node.id === selectedNodeId ? selectedNodeId : node.id);
    };

    const renderIcons = () => {
        if (node.children && node.children.length > 0) {
            return (
                <IconComponent
                    iconName={EIconNames.CHEVRON}
                    className={`${styles.icon} ${isOpen ? styles.open : ''}`}
                />
            );
        }
        return null;
    };

    const renderActionIcons = () => {
        if (selectedNodeId !== node.id) return null;

        return (
            <span style={{ marginLeft: 10 }}>
                <span onClick={handleAdd}>
                    <IconComponent iconName={EIconNames.PLUS} />
                </span>
                {node.name !== VITE_TREE_NAME && (
                    <>
                        <span onClick={handleUpdate}>
                            <IconComponent iconName={EIconNames.EDIT} />
                        </span>
                        <span onClick={handleDelete}>
                            <IconComponent iconName={EIconNames.TRASH} />
                        </span>
                    </>
                )}
            </span>
        );
    };

    return (
        <div style={{ marginLeft: `${level * 10}px` }}>
            <div onClick={handleToggleNode} className={styles.treeNode}>
                <span>{renderIcons()}</span>
                <span>{node.name}</span>
                {renderActionIcons()}
            </div>
            {isOpen && node.children && node.children.map((child) => (
                <TreeNode
                    key={child.id}
                    node={child}
                    addNode={addNode}
                    updateNode={updateNode}
                    deleteNode={deleteNode}
                    onSelect={onSelect}
                    selectedNodeId={selectedNodeId}
                    level={level + 1}
                />
            ))}
            {showModal && (
                <Modal
                    type={showModal.type}
                    name={showModal.name || node.name}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                />
            )}
        </div>
    );
};

export default TreeNode;