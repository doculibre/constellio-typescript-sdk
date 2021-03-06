import {useState} from "react";

import RecordElement from './recordElement';
import React from "react";
import './record.css';
import {faFolder, faFile, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface RuleListProps {
    record: RecordElement
};

export default function RecordPrint(props: RuleListProps) {
    const [folded, setFolded] = useState(!props.record.schemaType);

    const fold = () =>{
        setFolded(!folded);
    }

    const printMetadata = (record: any) => {
        if (record && record.metadatas) {
            return (<ul>
                {Object.keys(record.metadatas).map((keyName, i) => (
                    <li key={i}>
                        <span className="input-label"><b>{keyName}</b> : {record.metadatas[keyName]}</span>
                    </li>
                ))}
            </ul>);

        } else {
            return <div></div>
        }
    }

    const printIcon = (schemaType:string) => {
        if(schemaType && schemaType.includes("folder")){
            return <FontAwesomeIcon className="fa-record" icon={faFolder} />
        }
        else if(schemaType && schemaType.includes("document")){
            return <FontAwesomeIcon className="fa-record" icon={faFile} />
        }
        else{

            return <FontAwesomeIcon className="fa-record" icon={faQuestion} />
        }
    }

    return (
        <div>
            <div className="panel panel-primary">
                <div className="panel-heading display-hand" role="presentation" onClick={fold}>
                    {printIcon(props.record.schemaType)}

                    {props.record.title || props.record.metadatas.title}
                    {folded ?
                        (<i className="pull-right glyphicon glyphicon-chevron-up" />) :
                        (<i className="pull-right glyphicon glyphicon-chevron-down" />)
                    }
                </div>
                <div className="panel-body" hidden={folded}>
                    {printMetadata(props.record)}
                </div>
                <div className="panel-footer">
                    <div className="btn-toolbar">
                        <span>{props.record.metadatas.parent}</span>
                        <div className="btn-group btn-group-xs pull-right">
                            <button className="btn btn-primary" title="Update">
                                <i className="glyphicon glyphicon-pencil" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}