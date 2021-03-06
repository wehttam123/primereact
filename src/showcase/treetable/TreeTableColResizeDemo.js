import React, { Component } from 'react';
import { TreeTable } from '../../components/treetable/TreeTable';
import { Column } from "../../components/column/Column";
import { NodeService } from '../service/NodeService';
import { TreeTableSubmenu } from '../../showcase/treetable/TreeTableSubmenu';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import AppContentContext from '../../AppContentContext';
import { LiveEditor } from '../liveeditor/LiveEditor';

export class TreeTableColResizeDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
        this.nodeservice = new NodeService();
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({ nodes: data }));
    }

    render() {
        return (
            <div>
                <TreeTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>TreeTable - Column Resize</h1>
                        <p>Columns can be resized using drag drop by setting the resizableColumns to true. There are two resize modes; "fit" and "expand".
                            Fit is the default one and the overall table width does not change when a column is resized whereas in "expand" mode, table width also changes along with the column width.</p>

                        <AppContentContext.Consumer>
                            {context => <button onClick={() => context.onChangelogBtnClick("treeTable")} className="layout-changelog-button">{context.changelogText}</button>}
                        </AppContentContext.Consumer>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Fit Mode</h3>
                    <TreeTable value={this.state.nodes} resizableColumns={true} columnResizeMode="fit">
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>

                    <h3>Expand Mode</h3>
                    <TreeTable value={this.state.nodes} resizableColumns={true} columnResizeMode="expand">
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>

                    <h3>Scrollable</h3>
                    <TreeTable value={this.state.nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>

                    <h3>Scrollable with Variable Width</h3>
                    <TreeTable value={this.state.nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                        <Column field="name" header="Name" expander style={{ width: '50%' }}></Column>
                        <Column field="size" header="Size" style={{ width: '30%' }}></Column>
                        <Column field="type" header="Type" style={{ width: '20%' }}></Column>
                    </TreeTable>
                </div>

                <TreeTableColResizeDemoDoc />
            </div>
        )
    }
}

class TreeTableColResizeDemoDoc extends Component {

    constructor(props) {
        super(props);

        this.sources = {
            'class': {
                tabName: 'Class Source',
                content: `
import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

export class TreeTableColResizeDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
        this.nodeservice = new NodeService();
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({nodes: data}));
    }

    render() {
        return (
            <div>
                <h3>Fit Mode</h3>
                <TreeTable value={this.state.nodes} resizableColumns={true} columnResizeMode="fit">
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>

                <h3>Expand Mode</h3>
                <TreeTable value={this.state.nodes} resizableColumns={true} columnResizeMode="expand">
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>

                <h3>Scrollable</h3>
                <TreeTable value={this.state.nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>

                <h3>Scrollable with Variable Width</h3>
                <TreeTable value={this.state.nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                    <Column field="name" header="Name" expander style={{width:'50%'}}></Column>
                    <Column field="size" header="Size" style={{width:'30%'}}></Column>
                    <Column field="type" header="Type" style={{width:'20%'}}></Column>
                </TreeTable>
            </div>
        )
    }
}
                `
            },
            'hooks': {
                tabName: 'Hooks Source',
                content: `
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

const TreeTableColResizeDemo = () => {
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();

    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h3>Fit Mode</h3>
            <TreeTable value={nodes} resizableColumns={true} columnResizeMode="fit">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Expand Mode</h3>
            <TreeTable value={nodes} resizableColumns={true} columnResizeMode="expand">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Scrollable</h3>
            <TreeTable value={nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Scrollable with Variable Width</h3>
            <TreeTable value={nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                <Column field="name" header="Name" expander style={{width:'50%'}}></Column>
                <Column field="size" header="Size" style={{width:'30%'}}></Column>
                <Column field="type" header="Type" style={{width:'20%'}}></Column>
            </TreeTable>
        </div>
    )
}
                `
            },
            'ts': {
                tabName: 'TS Source',
                content: `
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

const TreeTableColResizeDemo = () => {
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();

    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h3>Fit Mode</h3>
            <TreeTable value={nodes} resizableColumns={true} columnResizeMode="fit">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Expand Mode</h3>
            <TreeTable value={nodes} resizableColumns={true} columnResizeMode="expand">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Scrollable</h3>
            <TreeTable value={nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>

            <h3>Scrollable with Variable Width</h3>
            <TreeTable value={nodes} resizableColumns={true} scrollable={true} scrollHeight="200px">
                <Column field="name" header="Name" expander style={{width:'50%'}}></Column>
                <Column field="size" header="Size" style={{width:'30%'}}></Column>
                <Column field="type" header="Type" style={{width:'20%'}}></Column>
            </TreeTable>
        </div>
    )
}
                `
            }
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section documentation">
                <TabView>
                    {
                        this.sources && Object.entries(this.sources).map(([key, value], index) => {
                            return (
                                <TabPanel key={`source_${index}`} header={value.tabName} contentClassName="source-content">
                                    <LiveEditor name="TreeTableColResizeDemo" sources={[key, value]} service="NodeService" data="treetablenodes" />
                                </TabPanel>
                            );
                        })
                    }
                </TabView>
            </div>
        )
    }
}
