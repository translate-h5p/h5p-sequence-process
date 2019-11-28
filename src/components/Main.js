import './SequenceStyle.scss';
import 'fonts/H5PReflectionFont.scss';
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import SequenceSurface from './SequenceSurface/SequenceSurface.js';
import Footer from "./Footer/Footer";

function Main(props) {

    const resourceContainer = useRef();

    const {
        id,
        language = 'en',
        collectExportValues,
        header,
        description = '',
        resources: resourcesList,
    } = props;

    useEffect(() => {
        const filterResourceList = element => Object.keys(element).length !== 0 && element.constructor === Object;
        if( resourcesList.params.resourceList && resourcesList.params.resourceList.filter(filterResourceList).length > 0){
            const resourceList = new H5P.ResourceList(resourcesList.params, id, language);
            resourceList.attach(resourceContainer.current);

            collectExportValues('resources', () => resourcesList.params.resourceList
                .filter(filterResourceList)
                .map(resource => Object.assign({}, {
                    title: "",
                    url: "",
                    introduction: "",
                }, resource)) || []);
        }
    }, [resourcesList]);

    return (
        <article>
            <h1
                className={"h5p-sequence-header"}
            >{header}</h1>
            <div
                className={"h5p-sequence-surface-main"}
            >
                <div
                    className={"h5p-sequence-surface-info"}
                    ref={resourceContainer}
                >
                    {description && (
                        <p className={'h5p-sequence-description'}>{description}</p>
                    )}
                </div>
                <SequenceSurface />
            </div>
            <Footer/>
        </article>
    );
}

Main.propTypes = {
    id: PropTypes.number,
    language: PropTypes.string,
    header: PropTypes.string,
    description: PropTypes.string,
    collectExportValues: PropTypes.func,
    resources: PropTypes.object,
};

export default Main;
