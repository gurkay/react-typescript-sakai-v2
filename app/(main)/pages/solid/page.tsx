'use client';
import { Tree, TreeCheckboxSelectionKeys, TreeMultipleSelectionKeys } from "primereact/tree";
import { TreeNode } from "primereact/treenode";
import { useEffect, useState } from "react";
import { NodeService } from "../../../../demo/service/NodeService";


const Solid = () => {
    const [files, setFiles] = useState<TreeNode[]>([]);
    const [selectedFileKeys, setSelectedFileKeys] = useState<any>(null);

    useEffect(() => {
        NodeService.getFiles().then((files) => setFiles(files));

    }, []);

    return (
        <div className="col-12">
            <div className="card">
                <h2>Solid</h2>
            </div>
            <div className="card">
                <h5>Tree</h5>
                <Tree 
                    value={files} 
                    selectionMode="checkbox" 
                    selectionKeys={selectedFileKeys} 
                    // onSelectionChange={(e) => setSelectedFileKeys(e.value)}
                    onNodeClick={(e) => {
                        console.log('event: ', e.node)
                        setSelectedFileKeys(e.node);
                        console.log('evesetSelectedFileKeys: ', selectedFileKeys);
                    }}
                />
            </div>
        </div>

    );
}

export default Solid;