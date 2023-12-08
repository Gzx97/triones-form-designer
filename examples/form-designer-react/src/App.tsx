import React from 'react';
import './App.css';
import {
    ComponentsWidget,
    CompositePanel,
    FormDesigner,
    ResourceWidget, StudioPanel, ViewportPanel,
    WorkspacePanel
} from "@trionesdev/form-designer-react";
import {Form, Input, Select} from "./components";
import {AntdSettingsPanel} from "./AntdSettingsPanel";

function App() {
    return (
        <div className="App">
            <FormDesigner>
                <StudioPanel>
                    <CompositePanel style={{width: 300}}>
                        <ResourceWidget sources={[Input, Select]}/>
                    </CompositePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            <ComponentsWidget components={{Form, Input, Select}}/>
                        </ViewportPanel>
                    </WorkspacePanel>
                    <AntdSettingsPanel/>
                </StudioPanel>
            </FormDesigner>
        </div>
    );
}

export default App;
